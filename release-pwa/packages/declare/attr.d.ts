import * as React from 'react'

declare module 'react' {
    interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
        referrerPolicy?: 'no-referrer' | 'origin' | 'unsafe-url'
    }
}