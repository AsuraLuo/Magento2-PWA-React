import * as React from 'react'

export class App extends React.Component<any, any> {
    static displayName: string = `APP`

    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        console.log(`Magento2 App is bootstrap ...`)
    }

    render() {
        return (
            <div className="rn-page">
                <main className="rn-main">
                    
                </main>
            </div>
        )
    }
}