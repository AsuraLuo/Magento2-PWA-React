import 'reflect-metadata'
import { Gulp } from 'gulp'
import { Output, Plugin, Configuration } from 'webpack'
import { Core } from './core/core'
import { ITask } from './core/models'
import { WebpackCore } from './core/webpack.core'

export interface InputConfig extends Configuration {
    root?: string,
    entry?: any,
    plugins?: Plugin[],
    output?: Output,
    devServer?: {
        open?: boolean,
        hot?: boolean,
        inline?: boolean,
        progress?: boolean,
        compress?: boolean,
        port?: number,
        host?: string,
        https?: boolean,
        overlay?: {
            warnings?: boolean
            errors?: boolean
        },
        public?: string,
        publicPath?: string,
        contentBase?: string,
        watchContentBase?: boolean,
        disableHostCheck?: boolean,
        historyApiFallback?: boolean,
        proxy?: any
    },
    [key: string]: any
}

export function GulpFile (gulp?: Gulp) {
    return function (target: Function, key?: string) {
        return Core
            .register()
            .GulpFile(target, gulp)
    }
}

export function Task (task?: ITask) {
    return function (target: any, key: string) {
        let types = Reflect.getMetadata('design:paramtypes', target, key)
        
        return Core
            .register()
            .Task(key, types, task)
    }
}

export function Webpack () {
    return function (target: any, key?: string) {
        return WebpackCore
            .register()
            .pluginWebpack(target)
    }
}

export function Config (config: InputConfig) {
    return function (target: any, key: string) {
        let types = Reflect.getMetadata('design:paramtypes', target, key)
        
        return WebpackCore
            .register()
            .pluginConfig(key, config, types)
    }
}