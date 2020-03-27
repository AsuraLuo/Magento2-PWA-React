import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as makeDir from 'make-dir'
import args from './args'
import { themeConfig } from '../build'
const tool = require('gulp-util')

const { area, src, locale, mode } = themeConfig.default

export class Util {
    public url: string

    constructor () {
        this.url = src.replace(`/`, `${this.os()}`)
    }

    public isDir (dir: string): boolean {
        return fs.existsSync(dir)
    }

    public createDir (dir: string, callback?: Function) {
        makeDir(dir).then((path: string) => {
            this.logMsg(`Directory init success：${dir}`, `magento`)
            if (callback) callback()
        })
    }

    public copyFile (e: any) {
        const os: string = this.os()
        let origin: string = e.path
        let target: string = origin.replace(
            `${os}release-gulp${os}app${os}src${os}`, 
            `${os}app${os}design${os}${area}${os}${this.url}${os}`
        )
        if (this.isDir(target)) {
            this.logMsg(`Directory is exists ...`, `magento`)
            this.generateFile(origin, target)
        } else {
            this.logMsg(`Directory is not exists ...`, `magento`)
            this.createDir(target, () => {
                this.generateFile(origin,  target)
            })
        }
    }

    public generateFile (old: string, dest: string) {
        this.logMsg(`Copy File: ${old}`, 'magento')

        const generate = async (sc: string, ds: string) => {
            try {
                await this.readStream(sc, ds)
            } catch (e) {
                this.logMsg(`${e.message}`, 'red')
            }
        }

        generate(old, dest)
    }

    public readStream (origin: string, target: string): Promise<any> {
        return new Promise((resolve?: any, reject?: any) => {
            let readStream: fs.ReadStream = fs.createReadStream(origin)
            let writeStream: fs.WriteStream = fs.createWriteStream(target)

            readStream.pipe(writeStream)
            readStream.on('end', () => {
                readStream.close()
                resolve(this.logMsg(`Copy file success ...`, 'green'))
            }).on('error', (err) => {
                reject(this.logMsg(`Copy file error ...`, 'red'))
            })
        })
    }

    public mode (): boolean {
        return mode === 'development' ? true : false
    }

    public logMsg (msg: string, color: string): any {
        return tool.log(tool.colors[color](`${msg}`))
    }

    public getOs (): NodeJS.Platform {
        return os.platform()
    }

    public os (): string {
        return this.getOs() === 'win32' ? '\\' : '/'
    }

    public getMgCommand (): any {
        const os: string = this.os()
        const bin: string = path.resolve(__dirname, `..${os}bin${os}magento`)

        if (this.isDir(bin)) {
            return bin
        }
        return false
    }

    public getSrcDir (): string {
        const os: string = this.os()
        const src_path: string = `.${os}app${os}base${os}**${os}**`
        
        return src_path
    }

    public getAppDir (): string {
        const os: string = this.os()
        const app_path: string = `..${os}app${os}design${os}${area}${os}${this.url}`
        
        return app_path
    }

    public getPubDir (): string {
        const os: string = this.os()
        const pub_path: string = `..${os}pub${os}static${os}${area}${os}${this.url}${os}${locale}`
        
        return pub_path
    }

    public getVarDir (): string {
        const os: string = this.os()
        const var_path: string = `..${os}var${os}view_preprocessed${os}pub${os}static${os}${area}${os}${this.url}${os}${locale}`
        
        return var_path
    }

    public getSassDir (): string {
        const os: string = this.os()
        const scss_path: string = `.${os}app${os}src${os}styles${os}`
        
        return scss_path
    }

    public getModule (): string {
        return args.module
    }
}