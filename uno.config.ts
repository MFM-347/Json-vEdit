import presetIcons from '@unocss/preset-icons'
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        height: '24px',
        width: '24px',
      },
    }),
  ],
  theme: {
    colors: {
      background: { subtle: 'var(--background-subtle)', DEFAULT: 'var(--background)' },
      subtle: 'var(--subtle)',
      foreground: 'var(--foreground)',
      primary: {
        foreground: 'var(--primary-foreground)',
        DEFAULT: 'var(--primary)',
      },
      secondary: {
        foreground: 'var(--secondary-foreground)',
        DEFAULT: 'var(--secondary)',
      },
      destructive: {
        foreground: 'var(--destructive-foreground)',
        DEFAULT: 'var(--destructive)',
      },
      muted: {
        foreground: 'var(--muted-foreground)',
        DEFAULT: 'var(--muted)',
      },
      accent: {
        foreground: 'var(--accent-foreground)',
        DEFAULT: 'var(--accent)',
      },
      border: 'var(--border)',
      input: 'var(--input)',
      ring: 'var(--ring)',
    },
  },
  shortcuts: [
    ['container', 'mx-auto max-w-xl w-full lg:max-w-2xl px-4 sm:px-6 lg:px-8'],

    ['title', 'scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl'],
    [
      'sub-title',
      'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
    ],
    [
      'btn',
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] h-9 px-4 py-2 has-[>svg]:px-3",
    ],
    ['btn-primary', 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90'],
    ['btn-secondary', 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80'],
    [
      'btn-destructive',
      'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
    ],
    ['btn-ghost', 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50'],
    [
      'input',
      'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    ],
  ],
})
