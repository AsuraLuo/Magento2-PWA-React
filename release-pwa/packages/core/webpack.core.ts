import * as _ from 'lodash'
import { Configuration } from 'webpack'
import { Base } from './base'
import { InputConfig } from '../decorators'

export class WebpackCore extends Base {
    public static register: () => WebpackCore
    private configs: { [key: string]: any }
    private buildConfig: { [key: string]: Configuration }

    constructor () {
        super()
        this.configs = {}
        this.buildConfig = {}
    }

    public pluginWebpack (target: any) {
        let mode = new target()
        
        _.map(this.configs, (item: { config: InputConfig, types: any[] }, index: string) => {
            if (_.isFunction(mode[index])) {
                let args: any = _.map(item.types, type => {
                    if (type.name === 'Object') return item.config
                });
                this.buildConfig = {
                    ...this.buildConfig,
                    [index]: mode[index](...args)
                }
            }
        })
    }

    public pluginConfig (key: string, config: InputConfig, types: any[]) {
        this.configs = {
            ...this.configs,
            [key]: {
                config,
                types
            }
        }
    }
}