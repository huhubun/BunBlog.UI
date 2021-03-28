import showdown from 'showdown'

// 使列表中空2格就可以进行缩进 https://github.com/showdownjs/showdown/wiki/Showdown-options#disableforced4spacesindentedsublists
showdown.setOption('disableForced4SpacesIndentedSublists', true)

// 配合 vue-lazyload 使用，将 img 的 src 改为 data-src 以支持懒加载
showdown.extension('vue-img-lazy', {
  type: 'html',
  regex: '<img src(.*)/>',
  replace: '<img data-src$1/>'
})

// 博文正文使用，为一部分 html 标签添加 class
showdown.extension('post-content', function () {
  const classMap = {
    h2: 'v-heading text-h4 text-sm-h4 mb-3',
    h3: 'v-heading text-h5 mb-2',
    img: 'my-4',
    blockquote: 'blockquote mb-4 pr-6',
    pre: 'mb-4'
  }

  return Object.keys(classMap)
    .map(key => ({
      type: 'output',
      regex: `<${key}(.*)>`,
      replace: `<${key} class="${classMap[key]}" $1>`
    }))
})