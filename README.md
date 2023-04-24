## Wine Co.

A simulation of a growth funnel of a wine e-commerce. Made with Next.js, Tailwind, Mixpanel and more!


https://user-images.githubusercontent.com/13953703/233911965-c623fd7e-7442-4100-b457-82a4029761dd.mov


### Run the project

1. Install dependencies

```
npm i
```

2. Copy `.env.local.example` and paste it with a new name `.env.local`. Provide your Mixpanel token if you want to enable it.


3. Run in dev mode

```
npm run dev
```

### About Mixpanel

If you want to see all the mixpanel events that are being called access [here](https://github.com/vctormb/wineco/blob/main/utils/types.ts)

### Better DX

- Go to your VS Code settings and add the following Tailwind class regex config

```json
"tailwindCSS.experimental.classRegex": [
  ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
]
```

### Tech Stack
- typescript
- next.js
- next-auth
- tailwind (mobile-first)
- react-hook-form
- radix components
- zod
- testing-library
- mixpanel

### Todo
- add more sections to the landing page
- add google analytics
