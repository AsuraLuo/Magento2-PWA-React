import { Configuration } from 'webpack'
import { Webpack, Config } from './packages'
import { webpackDevConfig, webpackProdConfig } from './build'

@Webpack()
export class webpack {
    @Config({
        ...webpackDevConfig
    })
    public dev(config: Configuration) {
        return config
    }

    @Config({
        ...webpackProdConfig
    })
    public build(config: Configuration) {
        return config
    }
}