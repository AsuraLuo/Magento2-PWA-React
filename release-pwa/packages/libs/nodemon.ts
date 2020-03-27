import * as path from 'path'
import * as _ from 'lodash'
import * as nodemon from 'gulp-nodemon'

export class NodeMon {
    private webpackConf: string
    private serverConf: string
    private koaConf: string

    constructor () {
        this.webpackConf = ''
        this.serverConf = ''
        this.koaConf = ''
    }

    public register (webpackConf: string) {
        this.webpackConf = webpackConf
        return this
    }

    public registerServer (serverConf: string) {
        this.serverConf = serverConf
        return this
    }

    public registerKoa (koaConf: string) {
        this.koaConf = koaConf
        return this
    }

    public start (conf?: object) {
        if (!conf) conf = {}
        let env = this.webpackConf

        if (this.koaConf) env = `${this.webpackConf}&&${this.koaConf}`

        nodemon(_.extend(conf, {
            script: this.serverConf ? this.serverConf : path.join(__dirname, 'scripts/server.js'),
            ext: 'js html css scss less jsx ts tsx json',
            env: { 
                'NODE_ENV': env 
            }
            // ignore: ['mock/']
            // tasks:['core']
        }))
    }
}