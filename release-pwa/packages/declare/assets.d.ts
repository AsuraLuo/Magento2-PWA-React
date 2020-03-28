declare interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
    const content: SvgrComponent
    export default content
}

declare module '*.png' {
    const content: any
    export default content
}

declare module '*.jpg' {
    const content: any
    export default content
}

declare module '*.jpeg' {
    const content: any
    export default content
}

declare module '*.gif' {
    const content: any
    export default content
}

declare module '*.scss' {
    const content: any
    export = content
}

declare module '*.less' {
    const content: any
    export = content
}

declare module '*.styl' {
    const content: any
    export = content
}