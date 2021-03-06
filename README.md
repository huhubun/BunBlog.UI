# BunBlog.UI

> A blog front end site developed using [Nuxt.js](https://nuxtjs.org). Welcome to my Blog(Bun Dev Blog) https://bun.plus

## Development

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:17088
$ npm run dev
```

## Build and deploy

First, run `npm run build` to generate client and server code

```bash
$ npm install
$ npm run build
```

You will see the `.nuxt` folder generated.

Then copy the following to the server

- `.nuxt` folder
- `server` folder
- `static` folder
- `nuxt.config.js` file
- `package.json` file

And upload the `/.nuxt/dist/client/` folder to CDN `https://cdn.bun.plus/blog/client/`

Finally, execute the following code on the server

```bash
npm install
pm2 start -n bunblog ./node_modules/nuxt/bin/nuxt.js -- start
```

## Analyze

set `nuxt.config.js`

```javascript
build: {
  analyze: true;
}
```

```bash
npx nuxt build --analyze
```
