export interface ThemeConfig {
    [key: string]: {
        name: string,
        area: string,
        src: string,
        locale: string,
        parent?: string,
        port?: number,
        https?: boolean,
        host?: string,
        domain?: string,
        mode: string,
        styles: string,
        scripts: string,
        files: Array<string>
    }
}