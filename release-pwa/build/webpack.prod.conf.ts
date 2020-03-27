import * as path from 'path'
import * as webpack from 'webpack'
import * as os from 'os'
import { WebpackConfig, InputConfig } from '../packages'
import { themeConfig } from '../build'
import swCacheConfig from './swcache.config'
import manifestConfig from './webmanifest.config'
const readJsonSync = require('read-json-sync')
const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const { name, area, src } = themeConfig.default
const createHappyPlugin: any = (id: string, loaders: string[]) => new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verboseWhenProfiling: true
})
// const dllJson: any = readJsonSync(`../app/design/${area}/${src}/web/js/vendor.dll.manifest.json`)

const baseConfig = new WebpackConfig({
    root:  path.join(__dirname, '../app'),
    entry: () => new Promise((resolve) => resolve({
        app: path.resolve(__dirname, `../app/src/boostrap.tsx`)
    })),
    output: {
        filename: '[name].bundle.js',
        pathinfo: true,
        globalObject: 'this', 
        path: path.resolve(__dirname, `../../app/design/${area}/${src}/web/js/`),
        publicPath: path.resolve(__dirname, `../../app/design/${area}/${src}/web/js/`)
    },
    mode: 'development',
    devtool: 'inline-source-map',
    performance: {
        hints: 'warning',
        maxAssetSize: 50000000,
        maxEntrypointSize: 30000000
    },
    plugins: [
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: { 
        //         content: dllJson.content, 
        //         name: dllJson.name 
        //     }
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':  JSON.stringify('development')
        }),
        new FirendlyErrorePlugin(),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8889,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: true,
        //     generateStatsFile: false,
        //     statsFilename: 'stats.json',
        //     statsOptions: null,
        //     logLevel: 'info',
        // }),
        new ProgressBarPlugin({
            entries: true,
            modules: true,
            modulesCount: 100,
            profile: true
        }),
        createHappyPlugin('happy-babel', [{
            loader: 'babel-loader',
            options: {
                babelrc: true,
                cacheDirectory: true,
                cacheCompression: true
            }
        }]),
        new MiniCssExtractPlugin({
            filename: `../css/[name].bundle.css`
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HardSourceWebpackPlugin(),
        // new WorkboxWebpackPlugin.GenerateSW(swCacheConfig())
        // new WebpackPwaManifest(manifestConfig())
    ],
    optimization: {
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'development',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1, 
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            automaticNameDelimiter: '~'
        },
        noEmitOnErrors: true,
        minimize: true,
        minimizer: [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                workerCount: os.cpus().length,
                sourceMap: true,
                uglifyJS: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        collapse_vars: true,
                        reduce_vars: true,
                        reduce_funcs: true,
                        expression: true,
                        drop_debugger: true
                    }
                }
            })
        ]
    }
})
const webpackProdConfig: InputConfig = baseConfig.getConfig()

export default webpackProdConfig