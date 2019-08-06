module.exports = {
    devServer: {
        port: 17088
    },
    chainWebpack: (config) => {
        config.plugin('define').tap((definitions) => {
          definitions[0]['process.env']['BUN_BLOG_UI_VERSION'] = JSON.stringify(require('./package.json').version);
          return definitions;
        }); 
    }
}
