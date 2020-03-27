import * as _ from 'lodash'
import * as webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import { MultiCompiler, Compiler } from 'webpack'
import { InputConfig } from '../decorators'
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

export class WebpackServer {
    private webpack: any
    private webpackConfig?: InputConfig
    private compiler?: Compiler | MultiCompiler
    private env: 'development' | 'production' | 'none' = 'development'

    constructor () {
        this.webpack = webpack
        this.webpackConfig = {}
    }

    injectWebpack (inject: any) {
        this.webpack = inject
        return this
    }

    setConfig (config: string | InputConfig, env?: 'development' | 'production' | 'none') {
        if (_.isString(config)) {
            this.webpackConfig = require(config)
        } else {
            this.webpackConfig = config
        }
        if (env) this.env = env
        return this
    }

    runBuild (callback?: (err: Error, stats: any) => void) {
        if (!this.webpackConfig) return this
        this.webpackConfig.mode = this.env
        if (!callback) callback = () => {}

        this.compiler = webpack(smp.wrap(this.webpackConfig))
        this.compiler.apply(new webpack.ProgressPlugin())
        this.compiler.run(callback)
        return this
    }

    runServer () {
        if (!this.webpackConfig) return this
        if (!this.webpackConfig.devServer) {
            this.webpackConfig.devServer = {
                historyApiFallback: true,
                hot: false,
                inline: true,
                progress: true,
                compress: true,
                port: 3000,
                host: '127.0.0.1',
                disableHostCheck: true
            }
        }
        if (!this.webpackConfig.devServer.port) {
            this.webpackConfig.devServer.port = 3000
        }
        if (!this.webpackConfig.devServer.host) {
            this.webpackConfig.devServer.host = '127.0.0.1'
        }
        let { port, host } = this.webpackConfig.devServer
        this.webpackConfig.mode = this.env
        if (_.isString(this.webpackConfig.entry)) {
            this.webpackConfig.entry = [
                `webpack-dev-server/client?http://${host}:${port}`,
                this.webpackConfig.entry
            ]
        } else if (_.isArray(this.webpackConfig.entry)) {
            this.webpackConfig.entry.unshift(`webpack-dev-server/client?http://${host}:${port}`)
        }
        this.compiler = this.webpack(this.webpackConfig)
        let server = new WebpackDevServer(
            (<any>this.compiler),
            this.webpackConfig.devServer
        )
        server.listen(port, (err: any) => {
            (<any>this.webpackConfig).devServer.port += 1
            let { port, host } = (<any>this.webpackConfig).devServer;

            (<any>this.webpackConfig).entry.shift()
            (<any>this.webpackConfig).entry.unshift(`webpack-dev-server/client?http://${host}:${port}`)
            this.runServer()
            console.log(`HMR Listening at http://localhost:${port}`)
        })
        return this
    }
}