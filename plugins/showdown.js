import showdown from 'showdown'

// 使列表中空2格就可以进行缩进 https://github.com/showdownjs/showdown/wiki/Showdown-options#disableforced4spacesindentedsublists
showdown.setOption('disableForced4SpacesIndentedSublists', true)

// 配合 vue-lazyload 使用，将 img 的 src 改为 data-src 以支持懒加载
showdown.extension('vue-img-lazy', {
  type: 'html',
  regex: '<img src(.*)/>',
  replace: '<img data-src$1/>'
})
