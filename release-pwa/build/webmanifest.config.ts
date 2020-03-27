import * as path from 'path'
import { themeConfig } from '../build'

const { name, area, src, locale, port, https, host } = themeConfig.default

const manifestConfig: Function = () => {
    return {
        name: `${name} Progressive Web App`,
        short_name: name,
        filename: 'manifest.json',
        start_url: `${(https ? 'https:' : 'http:')}//${host}:${port}`,
        description: `Magento2 ${name} Progressive Web App!`,
        orientation: 'portrait',
        display: 'standalone',
        lang: locale,
        crossorigin: 'use-credentials',
        inject: true,
        fingerprints: true,
        includeDirectory: true,
        theme_color: '#0086C0',
        background_color: '#ffffff',
        ios: {
            'apple-mobile-web-app-title': `${name} Progressive Web App`,
            'apple-mobile-web-app-status-bar-style': 'black'
        },
        publicPath: path.join(__dirname, `../../app/design/${area}/${src}/web/js/`),
        icons: [
            {
                src: path.resolve('./app/src/web/images/logo.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                ios: true
            }
        ]
    }
}

export default manifestConfig