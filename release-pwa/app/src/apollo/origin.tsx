const httpOrigin: Function = () => {
    let origin: string = ''

    if (!window.location.origin) {
        origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '')
    } else {
        origin = window.location.origin
    }

    return origin
}

export default httpOrigin