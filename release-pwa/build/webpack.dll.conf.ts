import * as path from 'path'
import * as webpack from 'webpack'
import * as os from 'os'
import { WebpackConfig, InputConfig } from '../packages'
import { themeConfig } from '../build'
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const { area, src } = themeConfig.default

const baseConfig = new WebpackConfig({
    root:  path.join(__dirname, '../app'),
    entry: {
        vendor: ['@babel/polyfill', 'intersection-observer', 'vue', 'vuex', 'unfetch', 'apollo-client', 'apollo-link', 'apollo-link-http', 'apollo-cache-inmemory', 'graphql-tag', 'vue-apollo', 'vue-lazyload', 'vee-validate']
    },
    output: {
        path: path.join(__dirname, `../../app/design/${area}/${src}/web/js`),
        filename: '[name].dll.js',
        library: '_dll_[name]'
    },
    mode: 'development',
    performance: {
        hints: 'warning',
        maxAssetSize: 50000000,
        maxEntrypointSize: 30000000
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':  JSON.stringify('development')
        }),
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, `../../app/design/${area}/${src}/web/js`, '[name].dll.manifest.json'),
            context: __dirname
        }),
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
            name: true
        },
        noEmitOnErrors: true,
        minimize: true,
        minimizer: [
            new ParallelUglifyPlugin({
                cacheDir: '.cache/',
                workerCount: os.cpus().length,
                sourceMap: false,
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
                        drop_debugger: false,
                        drop_console: false
                    }
                }
            })
        ]
    }
})
const webpackDllConfig: InputConfig = baseConfig.getConfig()

export default webpackDllConfig