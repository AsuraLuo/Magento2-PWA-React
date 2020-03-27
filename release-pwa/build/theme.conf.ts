import { ThemeConfig } from '../packages'

const themeConfig: ThemeConfig = {
    default: {
        name: 'pwa',
        area: 'frontend',
        src: 'Pwa/react',
        locale: 'en_US',
        parent: '',
        mode: 'development',
        port: 8080,
        https: false,
        host: '127.0.0.1',
        domain: 'dev.react-pwa.cn',
        styles: 'scss',
        scripts: 'tsx',
        files: [
            'css/app.css'
        ]
    }
}

export default themeConfig