## Wine Co.

Wine Co. is a Wine e-commerce made with Next.js and Tailwind

### To start the project

- npm run dev

### Better DX

- Go to your VS Code settings and add the following Tailwind class regex config

```json
"tailwindCSS.experimental.classRegex": [
  ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
]
```
