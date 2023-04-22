## Wine Co.

Wine Co. is a Wine e-commerce made with Next.js and Tailwind

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
