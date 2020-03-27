import * as path from 'path'
import * as merge from 'merge2'
import * as sourcemaps from 'gulp-sourcemaps'
import * as ts from 'gulp-typescript'
import { Gulp } from 'gulp'
import { Util } from './util/util'
import { themeConfig, webpackDevConfig, webpackProdConfig, webpackDllConfig } from './build'
import { GulpFile, Task, Watch, WebpackServer, Vkoa, GT } from './packages'
const clean = require('gulp-clean')
const pump = require('pump')

const { styles, name } = themeConfig.default

@GulpFile()
export class Gulpflie {
    @Task()
    public async default (gulp: Gulp, util: Util) {
        await Promise.resolve(
            console.log(gulp)
        )
    }

    @Task()
    public async del (gulp: Gulp, util: Util) {
        await Promise.resolve(
            pump([
                gulp.src([
                    // path.resolve(__dirname, `${util.getAppDir()}`),
                    // path.resolve(__dirname, `${util.getVarDir()}`),
                    path.resolve(__dirname, `${util.getPubDir()}`)
                ]),
                clean({
                    read: false,
                    force: true
                })
            ])
        )
    }

    @Task({
        befores: ['del']
    })
    public async copy (gulp: Gulp, watch: Watch, util: Util) {
        await Promise.resolve(
            // watch.run(
            //     path.resolve(__dirname, util.getSrcDir()),
            //     (gulp: Gulp, e?: any) => {
            //         util.logMsg(`Copy task start ...`, `green`)
            //         if (e) {
            //             util.copyFile(e)
            //         } else {
                        gulp.src([
                            path.resolve(__dirname, util.getSrcDir())
                        ])
                        .pipe(GT.multi([
                            path.resolve(__dirname, util.getAppDir())
                        ]))
            //         }
            //     }
            // )
        )
    }

    @Task()
    public async styles (gulp: Gulp, watch: Watch, util: Util) {
        await Promise.resolve(
            // watch.run(
            //     path.resolve(__dirname, `${util.getSrcDir()}${util.os()}**.${styles}`),
            //     (gulp: Gulp) => {
            //         util.logMsg(`${styles.toUpperCase()} task start ...`, `green`)
                    gulp.src([
                            path.resolve(__dirname, `${util.getSassDir()}main.${styles}`)
                        ])
                        .pipe(GT.sourcemaps.init())
                        .pipe(GT.sass({
                            outputStyle: 'compressed'
                        }))
                        .pipe(GT.postcss([
                            GT.autoprefixer({
                                cascade: true,
                                remove: true
                            })
                        ]))
                        .pipe(GT.sourcemaps.write('.', {
                            includeContent: true
                        }))
                        .pipe(GT.multi([
                            `${util.getAppDir()}${util.os()}web${util.os()}css`
                        ]))
                        .pipe(GT.logger({
                            display: 'name',
                            beforeEach: `Theme: ${name} `,
                            afterEach: ' Compiled!',
                            showChange: true
                        }))
                // }
            // )
        )
    }

    @Task()
    public async images (gulp: Gulp, watch: Watch, util: Util) {
        await Promise.resolve(
            watch.run([
                    path.join(__dirname, `${util.getSrcDir()}${util.os()}media${util.os()}*`),
                    path.join(__dirname, `${util.getSrcDir()}${util.os()}web${util.os()}images${util.os()}*`)
                ],
                (gulp: Gulp) => {
                    util.logMsg(`Optimize images task start ...`, `green`)
                    gulp.src([
                            path.join(__dirname, `${util.getSrcDir()}${util.os()}media${util.os()}*`),
                            path.join(__dirname, `${util.getSrcDir()}${util.os()}web${util.os()}images${util.os()}*`)
                        ])
                        .pipe(GT.if(util.mode(), GT.cache(GT.imagemin({
                            optimizationLevel: 5,
                            progressive: true,
                            interlaced: true,
                            multipass: true
                        }))))
                        .pipe(GT.multi([
                            `${util.getAppDir()}${util.os()}`
                        ]))
                        .pipe(GT.logger({
                            display: 'name',
                            beforeEach: `Theme: ${name} `,
                            afterEach: ' Optimize Image!',
                            showChange: true
                        }))
                }
            )
        )
    }

    @Task()
    public async base64 (gulp: Gulp, util: Util) {
        util.logMsg(`Base64 task start ...`, `green`)
        await Promise.resolve(
            gulp.src([
                    path.resolve(__dirname, `${util.getAppDir()}${util.os()}web${util.os()}css${util.os()}main.css`)
                ])
                .pipe(GT.base64({
                    baseDir: `${util.getAppDir()}${util.os()}web${util.os()}images`,
                    extensions: ['svg', 'png', /\.jpg#datauri$/i],
                    exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
                    maxImageSize: 8 * 1024,
                    debug: false
                }))
                .pipe(GT.multi([
                    `${util.getAppDir()}${util.os()}web${util.os()}css`
                ]))
                .pipe(GT.logger({
                    display: 'name',
                    beforeEach: `Theme: ${name} `,
                    afterEach: ' Base64!',
                    showChange: true
                }))
        )
    }

    @Task()
    public async shell (gulp: Gulp, util: Util) {
        util.logMsg(`Shell task start ...`, `green`)
        await Promise.resolve(
            GT.shell.task([
                `php ${util.getMgCommand()} cache:clean`
            ], {
                env: {
                    nodeEnv: util.mode()
                }
            })
        )
    }

    @Task()
    public async phtml (gulp: Gulp, watch: Watch, util: Util) {
        await Promise.resolve(
            watch.run(
                [
                    path.resolve(__dirname, `${util.getAppDir()}${util.os()}**${util.os()}**${util.os()}**.html`)
                ],
                (gulp: Gulp) => {
                    util.logMsg(`Html task start ...`, `green`)
                    gulp.src([
                            path.resolve(__dirname, `${util.getAppDir()}${util.os()}**${util.os()}**${util.os()}**.html`)
                        ])
                        .pipe(GT.plumber())
                        .pipe(GT.if(util.mode(), GT.htmlmin({
                            collapseWhitespace: true,
                            minifyCSS: true,
                            minifyJS: { 
                                compress: {
                                    drop_console: true
                                }
                            },
                            processConditionalComments: true,
                            removeComments: true,
                            removeEmptyAttributes: true,
                            removeScriptTypeAttributes: true,
                            removeStyleLinkTypeAttributes: true
                        })))
                        .pipe(GT.multi([
                            `${util.getAppDir()}${util.os()}`
                        ]))
                        .pipe(GT.logger({
                            display: 'name',
                            beforeEach: `Theme: ${name} `,
                            afterEach: ' Optimize Html!',
                            showChange: true
                        }))
                }
            )
        )
    }

    @Task({
        befores: ['copy']
    })
    public script (gulp: Gulp, watch: Watch, util: Util) {
        watch.run(
            path.join(__dirname, `src${util.os()}**${util.os()}*.ts`),
            (gulp: Gulp) => {
                console.log('watch init ...')
                let tsResult = gulp
                    .src([path.join(__dirname, `src${util.os()}**${util.os()}*.ts`)])
                    .pipe(sourcemaps.init())
                    .pipe(ts.createProject('tsconfig.json')());
                return merge([
                    tsResult.dts.pipe(gulp.dest(`.${util.os()}dist`)),
                    tsResult.js.pipe(sourcemaps.write('./sourcemaps'))
                        .pipe(gulp.dest(`.${util.os()}dist`))
                ])
            }
        )
    }
   
    @Task()
    public async dev(gulp: Gulp, webpackServer: WebpackServer) {
        await Promise.resolve(
            webpackServer.setConfig(
                webpackDevConfig,
                'development'
            ).runServer()
        )
    }

    @Task()
    public async build(gulp: Gulp, webpackServer: WebpackServer) {
        await Promise.resolve(
            webpackServer.setConfig(
                webpackProdConfig,
                'production'
            ).runBuild()
        )
    }

    @Task()
    public async dll(gulp: Gulp, webpackServer: WebpackServer) {
        await Promise.resolve(
            webpackServer.setConfig(
                webpackDllConfig,
                'production'
            ).runBuild()
        )
    }

    @Task()
    public async test (vkoa: Vkoa) {
        await Promise.resolve(
            vkoa
                .setWebpack('webpack')
                .setKoa('koa')
                .run()
        )
    }
}