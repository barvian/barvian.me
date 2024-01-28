/// <reference path=".astro/types.d.ts" />
/// <reference types="astro/client" />

interface CSSStyleDeclaration {
    viewTransitionName: string
}

declare module 'tailwindcss/src/util/dataTypes' {
    export function normalize(value: string): string
}