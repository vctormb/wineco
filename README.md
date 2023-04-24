## Wine Co.

A simulation of a growth funnel of a wine e-commerce. Made with Next.js, Tailwind, Mixpanel and more!

### Run the project

Install dependencies

```
npm i
```

Run in dev mode

```
npm run dev
```

### Better DX

- Go to your VS Code settings and add the following Tailwind class regex config

```json
"tailwindCSS.experimental.classRegex": [
  ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
]
```
