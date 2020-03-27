import fetch from 'unfetch'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink, FetchOptions } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache, IntrospectionFragmentMatcher, FragmentMatcherInterface } from 'apollo-cache-inmemory'
import httpOrigin from './origin'
import deviceType from './device'
import * as fragmentTypesJson from '../../../fragmentTypes.json'

// HTTP options 
let httpOptions: FetchOptions = {
    uri: `${httpOrigin()}/graphql`,
    credentials: 'same-origin',
    useGETForQueries: true
}

if (deviceType.isMobile()) {
    httpOptions = Object.assign(httpOptions, {
        fetch: fetch
    })
}

// HTTP connection to the API
const httpLink: ApolloLink = createHttpLink({
    ...httpOptions
})

// HTTP headers middleware
const middlewareLink: ApolloLink = new ApolloLink((operation: any, forward: any) => {
    const token: string = ''

    operation.setContext({
        headers: {
            Authorization: `Bearer ${token}` || null
        }
    })

    return forward(operation)
})

// HTTP errors done
const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message }, index: number) => {
            graphQLErrors[index].message = message.replace('GraphQL error: ', '')
        })
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
})

// Fragment Matcher
const fragmentMatcher: FragmentMatcherInterface = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: fragmentTypesJson
})

// Cache implementation
const cache: InMemoryCache = new InMemoryCache({
    addTypename: false,
    fragmentMatcher: fragmentMatcher
})

// Merge http to middleware
const apolloLink: ApolloLink = middlewareLink.concat(httpLink)

// Create the apollo client
const apolloClient: any = new ApolloClient({
    link: errorLink.concat(apolloLink),
    cache,
    connectToDevTools: true
})

// Create the apolo options
const apolloOptions: any = {
    defaultClient: apolloClient,
    defaultOptions: {
        $query: {
            loadingKey: 'loadding',
            fetchPolicy: 'cache-and-network'
        }
    },
    errorHandler: (error: any) => {
        console.error(error)
    }
}

export default apolloOptions