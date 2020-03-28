import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './apollo/index'
import configureStore from './store'
import { App } from './app'
// import './styles/pwa.scss'

const store: Store = configureStore()

const render: Function = (Commponent: React.ComponentType) => {
    ReactDOM.render(
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <Commponent />
            </ApolloProvider>
        </Provider>, 
        document.getElementById('app') as HTMLElement
    )
}

render(App)