import * as path from 'path'
import { InputConfig } from '../decorators'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolve = (dir: string) => path.join(__dirname, '../../', dir)

export class WebpackConfig {
    private path: string
    private useConfig: InputConfig

    constructor (config: InputConfig) {
        this.path = config.root || ''
        this.useConfig = config
    }

    public get utils () {
        return {
            assetsPath: (_path?: string) => {
                _path = _path || ''
                let assetsSubDirectory = this.path
                return path.posix.join(assetsSubDirectory, _path)
            },
            cssLoaders: (options?: any) => {
                options = options || {}

                let cssLoader = {
                    loader: 'css-loader',
                    options: {
                        sourceMap: options.sourceMap
                    }
                }

                const generateLoaders = (loader?: any, loaderOptions?: any) => {
                    let loaders = [cssLoader]
                    if (loader) {
                        loaders.push({
                            loader: `${loader}-loader`,
                            options: Object.assign({}, loaderOptions, {
                                sourceMap: options.sourceMap
                            })
                        })
                    }

                    if (options.extract) {
                        return [
                            MiniCssExtractPlugin.loader, 
                            cssLoader,
                            {
                                loader: 'sass-loader',
                                options: { 
                                    sourceMap: options.sourceMap
                                }
                            }
                        ]
                    } else {
                        
                    }
                }

                return {
                    css: generateLoaders(),
                    postcss: generateLoaders(),
                    less: generateLoaders('less'),
                    sass: generateLoaders('sass'),
                    scss: generateLoaders('sass'),
                    stylus: generateLoaders('stylus'),
                    styl: generateLoaders('stylus')
                }
            },
            styleLoaders: (options: any) => {
                let output = []
                let loaders = this.utils.cssLoaders(options)
                for (let extension in loaders) {
                    let loader = (<any>loaders)[extension]
                    output.push({
                        test: new RegExp(`\\.${extension}$`),
                        use: loader
                    })
                }
                return output
            }
        }
    }

    setEntry (config: InputConfig) {
        this.useConfig = config
    }

    getConfig () {
        let config = this.useConfig
        let { output } = this.useConfig
        let { entry } = this.useConfig
        let { plugins } = this.useConfig
        delete config.output
        delete config.entry
        delete config.plugins
        delete config.root

        return {
            entry: entry,
            output,
            resolve: {
                extensions: [
                    '.tsx',
                    '.ts',
                    '.js', 
                    '.scss', 
                    '.less', 
                    '.stylus', 
                    '.css', 
                    '.json',
                    '.svg'
                ],
                modules: [
                    resolve('app/src/components/'),
                    resolve('node_modules')
                ],
                alias: {
                    '@components': resolve('app/src/components/'),
                    '@helper': resolve('app/src/helper/'),
                    '@config': resolve('app/src/config'),
                    '@utils': resolve('app/src/utils/'),
                    '@store': resolve('app/src/store/')
                }
            },
            module: {
                rules: [
                    // {
                    //     test: /\.(tsx|jsx)$/,
                    //     loader: ['eslint-loader'],
                    //     enforce: 'pre',
                    //     include: [this.path],
                    //     exclude: [
                    //         /node_modules/
                    //     ]
                    // },
                    ...this.utils.styleLoaders({
                        sourceMap: true,
                        extract: true
                    }),
                    {
                        test: /\.js$/,
                        use: ['happypack/loader?id=happy-babel'],
                        include: [this.path],
                        exclude: [
                            /node_modules/
                        ]
                    },
                    {
                        test: /\.tsx?$/,
                        use: [
                            'cache-loader',
                            'happypack/loader?id=happy-babel',
                            {
                                loader: 'ts-loader',
                                options: { 
                                    happyPackMode: true,
                                    transpileOnly: true,
                                    appendTsxSuffixTo: [/\.jsx$/] 
                                }
                            }
                        ],
                        include: [this.path],
                        exclude: [
                            /node_modules/
                        ]
                    },
                    {
                        test: /\.ts$/,
                        loader: 'ts-loader',
                        include: [this.path],
                        exclude: [
                            /node_modules/
                        ],
                        options: {
                            transpileOnly: true,
                            happyPackMode: true
                        }
                    },
                    {
                        test: /\.(graphql|gql)$/,
                        use: [
                            'graphql-tag/loader',
                            'minify-graphql-loader'
                        ],
                        include: [this.path],
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: this.utils.assetsPath(`${this.path}/[name].[hash:7].[ext]`)
                        }
                    },
                    {
                        test: /\.svg$/i,
                        loader: 'raw-loader'
                    },
                    {
                        test: /\.(png|jpe?g|gif)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: this.utils.assetsPath(`${this.path}/[name].[hash:7].[ext]`)
                        }
                    },
                    {
                        test: /\.(woff2?|eot|ttf|otf|rtf)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: this.utils.assetsPath(`${this.path}/[name].[hash:7].[ext]`)
                        }
                    }
                ]
            },
            plugins,
            ...config
        }
    }
}