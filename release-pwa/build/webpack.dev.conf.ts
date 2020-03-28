import * as path from 'path'
import * as webpack from 'webpack'
import * as os from 'os'
import { WebpackConfig, InputConfig } from '../packages'
import { themeConfig } from '../build'
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const { area, src, port, https, host } = themeConfig.default
const createHappyPlugin: any = (id: string, loaders: string[]) => new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    verboseWhenProfiling: true
})

const baseConfig = new WebpackConfig({
    root:  path.resolve(__dirname, '../app'),
    entry: () => new Promise((resolve) => resolve({
        app: path.resolve(__dirname, `../app/src/boostrap.tsx`)
    })),
    cache: true,
    output: {
        filename: '[name].bundle.js',
        publicPath: '/',
        pathinfo: true,
        globalObject: 'this',
        path: path.resolve(__dirname, `../../app/design/${area}/${src}/web/js`)
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        inline: true,
        hot: true,
        port: port,
        host: host,
        https: https,
        compress: true,
        progress: true,
        overlay: {
            warnings: true,
            errors: true
        },
        historyApiFallback: true,
        disableHostCheck: false,
        contentBase: path.resolve(__dirname, '../app/src'),
        watchContentBase: true,
        publicPath: '/',
        proxy: {
            '/graphql': {
                target: 'http://dev.react-pwa.cn/graphql',
                changeOrigin: true,
                secure: false
            }
        }
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                VUE_VERSION: JSON.stringify('2.6.11'),
                MAGENTO_VERSION: JSON.stringify('2.3.4')
            } 
        }),
        new FirendlyErrorePlugin(),
        new ProgressBarPlugin({
            entries: true,
            modules: true,
            modulesCount: 100,
            profile: true
        }),
        new HtmlWebpackPlugin({
            title: 'Magento Vue Pwa',
            template: path.join(__dirname, `../app/src/index.html`),
            filename: 'index.html',
            inject: 'body',
            hash: true,
            publicPath: '/',
            showErrors: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true
            }
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
            filename: `[name].[contenthash:8].css`
        }),
        new DashboardPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HardSourceWebpackPlugin()
    ],
    optimization: {
        namedModules: true,
        namedChunks: true,
        nodeEnv: 'development',
        flagIncludedChunks: false,
        occurrenceOrder: false,
        sideEffects: false,
        usedExports: false,
        concatenateModules: false,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1, 
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            automaticNameDelimiter: '~'
        },
        minimize: false,
        runtimeChunk: {
            name: 'runtime'
        }
    }
})

const webpackDevConfig: InputConfig = baseConfig.getConfig()

export default webpackDevConfig