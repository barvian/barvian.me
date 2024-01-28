import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      nesting: true,
      applyBaseStyles: false
    }),
    svelte(),
    vue({
      script: {
        propsDestructure: true
      }
    })
  ],
  srcDir: './'
});