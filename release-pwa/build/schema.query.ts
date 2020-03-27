import * as fs from 'fs'
import * as path from 'path'
import fetch from 'node-fetch'
import { themeConfig } from '../build'

const { https, domain } = themeConfig.default
const protocol: string = https ? 'https' :  'http'

fetch(`${protocol}://${domain}/graphql`, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
        variables: {},
        query: `
            {
                __schema {
                    types {
                        kind
                        name
                        possibleTypes {
                            name
                        }
                    }
                }
            }
        `,
    })
})
.then((result: any) => result.json())
.then((result: any) => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData: any = result.data.__schema.types.filter(
        (type: any) => type.possibleTypes !== null
    )

    result.data.__schema.types = filteredData
    fs.writeFile(path.resolve(__dirname, '../fragmentTypes.json'), JSON.stringify(result.data), (err: any) => {
        if (err) {
            console.error('Error writing fragmentTypes file', err)
        } else {
            console.log('Fragment types successfully extracted!')
        }
    })
})