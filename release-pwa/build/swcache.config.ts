import { themeConfig } from '../build'

const { name } = themeConfig.default

const swCacheConfig: Function = () => {
    return {
        cacheId: name,
        skipWaiting: true,
        clientsClaim: true,
        swDest: 'sw.js',
        include: [ 
            /\.js$/,
            /\.css$/
        ],
        precacheManifestFilename: 'wb-manifest.[manifestHash].js',
        offlineGoogleAnalytics: true,
        cleanupOutdatedCaches: true,
        importsDirectory: '../app/design/frontend/Pwa/react/web/js/',
        globDirectory: '../app/design/frontend/Pwa/react/web/',
        globPatterns: [
            'js/*.{bundle.js,dll.js}',
            'css/*.css',
            'images/**/*.{png,jpg,jpeg,gif,svg}'
        ],
        globIgnores: [
            'sw.js'
        ],
        importScripts: [
            'https://connect.facebook.net/en_US/sdk.js',
            'https://cdn.izooto.com/scripts/sdk/izooto.js',
            'https://d1igp3oop3iho5.cloudfront.net/v2/Rk5uTz6qQhwocuLi_kWJJw/zaius-min.js'
        ],
        runtimeCaching: [
            {
                urlPattern: /.*\.js/, 
                handler: 'networkFirst'
            },
            {
                urlPattern: /.*\.css/, 
                handler: 'cacheFirst'
            },
            {
                urlPattern: /.*\.png,jpg,jpeg,gif,svg/, 
                handler: 'cacheFirst'
            }
        ]
    }
}

export default swCacheConfig