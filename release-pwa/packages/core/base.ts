export interface BaseHook {
    OnInit: () => any
}

export class Base {
    protected static _this: Base

    public static register () {
        if (!Base._this) {
            Base._this = new this
        }
        let { OnInit } = <any>Base._this
        OnInit && OnInit()
        return Base._this
    }
}