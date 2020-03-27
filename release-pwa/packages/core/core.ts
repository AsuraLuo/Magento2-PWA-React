import * as gulp from 'gulp'
import * as _ from 'lodash'
import { Gulp } from 'gulp'
import { Base } from './base'
import { ITask } from './models'

export interface Tasks {
    [key: string]: {
        config?: ITask
        types: object
    }
}

export class Core extends Base {
    protected static _this: Core
    private gulp: Gulp
    private target: Function
    private tasks: Tasks
    public static register: () => Core

    constructor () {
        super()
        this.gulp = gulp
        this.target = () => { }
        this.tasks = {}
    }

    private toArray (data?: string | any[]): any[] {
        if (!data) return []
        if (_.isString(data)) return [data]
        return data
    }

    private injectLibs (types: object, gulp: Gulp) {
        return _.map(types, (item: { [key: string]: any }) => {
            return item.name !== 'Object' ? new (<any>item)(gulp) : gulp
        })
    }

    public GulpFile (target: Function, gulp?: Gulp) {
        if (gulp) this.gulp = gulp
        this.target = target
        let instanc = new (<any>this.target)()
        let _self = this

        _.map(this.tasks,
            (item: {
                config: ITask,
                types: object
            }, key: string) => {
                if (!item.config) item.config = {}

                let befores = this.toArray(item.config.befores)
                let afters = this.toArray(item.config.afters)

                if (befores.length > 0) {
                    befores.push(function (done: Function) {
                        instanc[key].bind(instanc, ..._self.injectLibs(item.types, _self.gulp))(done);
                        done()
                    }.bind(instanc))
                    if (afters.length > 0) {
                        befores.concat(afters)
                    }
                    this.gulp.task(key, this.gulp.series(...befores))
                } else {
                    this.gulp.task(key, function (done: Function) {
                        instanc[key].bind(instanc, ..._self.injectLibs(item.types, _self.gulp))(done)
                        done()
                    }.bind(instanc))
                }
            })
    }

    public Task (key: string, types: object, config?: ITask) {
        this.tasks[key] = {
            config: config,
            types: types
        }
    }
}