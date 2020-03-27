import * as _ from 'lodash'
import * as watch from 'gulp-watch'
import { Gulp } from 'gulp'

export class Watch {
    private gulp: Gulp

    constructor (gulp: Gulp) {
        this.gulp = gulp
    }

    run (path: string | string[], callback: Function): Gulp {
        callback(this.gulp)
        watch(path, (e: any) => {
            callback(this.gulp, e)
        })

        return this.gulp
    }
}