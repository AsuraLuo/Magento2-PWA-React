import * as _ from 'lodash'
import * as webapck from 'webpack'

let webpackConf = null
let koaConf = null

if (process.env.NODE_ENV.indexOf('&&') !== 1) {
    let path = process.env.NODE_ENV.split('&&')
    webpackConf = path.shift()
    koaConf = path.shift()
} else {
    webpackConf = process.env.NODE_ENV
}

const dev = require(webpackConf)

let importKoa = app => (app)
if (koaConf) {
    if (_.isFunction(require(koaConf))) {
        importKoa = require(koaConf)
    } else {
        throw `not have function in koa config ...`
    }
}

const devKoa = importKoa

if (typeof dev === 'function') {
    throw `not have dev webapck config ...`;
}

const port = dev.devServer.port;
const compiler = webpack(dev);

if (!dev.devServer) {
    throw `not have dev server config ...`
}

const Koa = require('koa')
const convert = require('koa-convert')
const koaWebpackMiddleware = require('koa-webpack-middleware')
const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware
const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware

const app = new Koa()
const wdm = webpackDevMiddleware(compiler, dev.devServer)
app.use(convert(wdm))
app.use(convert(webpackHotMiddleware(compiler)))

const server = devKoa(app).listen(port, 'localhost', (err) => {
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