const yargs = require('yargs')

const args = yargs.options({
        'module': {
            alias: 'm',
            type: 'string',
            default: '',
            desc: 'Modules'
        }
    })
    .epilog('Modules Configuration ...')
    .help()
    .argv

export default args