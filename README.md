# BunBlog.UI

> A blog front end site developed using [Nuxt.js](https://nuxtjs.org). Welcome to my Blog(Bun Dev Blog) https://bun.dev

## Development
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:17088
$ npm run dev
```

## Build and deploy
First, run `npm run build` to generate client and server code

``` bash
$ npm run install
$ npm run build
```

You will see the `.nuxt` folder generated.  

Then copy the following to the server
- `.nuxt` folder
- `static` folder
- `server` folder
- `package.json` file
- `nuxt.config.js` file

Finally, execute the following code on the server

```bash
npm install
npm run start
```