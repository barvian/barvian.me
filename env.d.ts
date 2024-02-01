/// <reference path=".astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
    __PROJECTS_WITH_DEMOS__: string[]
}

interface CSSStyleDeclaration {
    viewTransitionName: string
}

declare module 'tailwindcss/src/util/dataTypes' {
    export function normalize(value: string): string
}

declare namespace astroHTML.JSX {
    interface TimeHTMLAttributes {
        pubdate: boolean
    }
}