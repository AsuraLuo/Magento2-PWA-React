import React, { ReactElement } from 'react'

declare global {
    namespace JSX {
        interface Element extends ReactElement {}
        interface ElementClass extends React.Component {}
        interface ElementAttributesProperty {
            props: {}
        }
        interface IntrinsicElements {
            [key: string]: any
        }
        interface PropsType {
            children: JSX.Element
            name: string
        }
        interface ElementChildrenAttribute {
            children: {}
        }
    }
}