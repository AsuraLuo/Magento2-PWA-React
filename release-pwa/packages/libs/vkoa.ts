import * as fs from 'fs'
import * as path from 'path'
import * as  _ from 'lodash'
import * as  webpack from 'webpack'
import { WebpackConfig } from '../config/webpack.base.conf'
const Koa = require('koa')
const convert = require('koa-convert')
const koaWebpackMiddleware = require('koa-webpack-middleware')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware
const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware

export class Vkoa {
    private webpackConfig: any
    private koaConfig: any
    private port: number
    private compiler: any
    private webpackName: string
    private koaName: string
    private env: 'development' | 'production'

    constructor () {
        this.webpackConfig = {}
        this.port = 3000
        this.webpackName = 'webpack'
        this.koaName = 'koa'
        this.env = 'development'
    }

    setWebpack (name: string) {
        this.webpackConfig = name
        return this
    }

    setKoa (name: string) {
        this.koaConfig = name
        return this
    }

    setEnv (env: 'development' | 'production') {
        this.env = env
    }

    run () {
        fs.exists(path.resolve(process.cwd(), this.webpackConfig), exists => {
            if (!exists) {
                return console.error(`not have ${this.webpackConfig}.ts in ${path.resolve(process.cwd(), 'webpack.ts')}`)
            }
            let useCallback = require(path.resolve(process.cwd(), this.koaConfig)).default
            this.webpackConfig = useCallback(
                new WebpackConfig({
                    root: process.cwd(),
                    entry: path.resolve(process.cwd(), 'src/index.js'),
                    output: {
                        path: path.resolve(process.cwd(), 'dist'),
                        filename: '[name].js',
                        publicPath: '/'
                    },
                    plugins: [
                        new HtmlWebpackPlugin({
                            template: path.resolve(process.cwd(), 'index.html'),
                            filename: 'index.html',
                            inject: 'body',
                            hash: true
                        })
                    ]
                }).getConfig()
            )
            const port = this.webpackConfig.devServer.port
            if (this.webpackConfig[this.env]) this.webpackConfig = this.webpackConfig[this.env]
            delete this.webpackConfig.root
            this.webpackConfig.mode = this.env
            const compiler = webpack(this.webpackConfig)
            fs.exists(path.resolve(process.cwd(), this.koaConfig), exists => {
                let KoaMap = (app: any) => app
                const app = new Koa()
                if (exists) {
                    KoaMap = require(path.resolve(process.cwd(), this.koaConfig)).default.bind(this)
                }
                const wdm = webpackDevMiddleware(compiler, this.webpackConfig.devServer)
                app.use(convert(wdm))
                app.use(convert(webpackHotMiddleware(compiler)))

                const server = KoaMap(app).listen(port, 'localhost', (err: any) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log(`HMR Listening at http://localhost:${port}`)
                })
                process.on('SIGTERM', () => {
                    console.log('Stopping dev server')
                    wdm.close()
                    server.close(() => {
                        process.exit(0)
                    })
                })
            })
        })
    }
}