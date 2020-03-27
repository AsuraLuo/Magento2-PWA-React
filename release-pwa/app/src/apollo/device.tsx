const deviceType: any = {
    isMobile () {
        const userAgent: string = navigator.userAgent
        const appVersion: string = navigator.appVersion
        const vendor: string = navigator.vendor
        const regexp: RegExp = new RegExp(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|Trident)/i)
        
        const ua: string = (userAgent + ' ' + appVersion + ' ' + vendor).toLowerCase()
        const match: any = /(chrome)[ \/]([\w.]+)/.exec(ua)
            || /(webkit)[ \/]([\w.]+)/.exec(ua)
            || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)
            || /(msie) ([\w.]+)/.exec(ua)
            || /(trident)(?:.*? rv:([\w.]+)|)/.exec(ua)
            || ua.indexOf("compatible") < 0
            && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || []
    
        const engine: string = match[0]
        const mainVersion: any = match[2].split('.')[0]
    
        // chrome version > 46， firefox version > 39 enable fetch
        if (engine.indexOf('chrome') === 0 && mainVersion >= 46) {
            return false
        } else if (engine.indexOf('mozilla') === 0 && mainVersion >= 39) {
            return false
        } else {
            return userAgent.match(regexp)
        }
    }
}

export default deviceType