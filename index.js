function HtmlWebpackInlineChunksPlugin (opt) {
  this.chunks = opt && opt.chunks || []
}
HtmlWebpackInlineChunksPlugin.prototype.apply = function (compiler, callback) {
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlPluginData, callback) => {
      // 合并去重
      let chunks = Array.from(new Set(this.chunks.concat(htmlPluginData.plugin.options.inlineChunks)))
      let publicPath = compilation.options.output.publicPath || ''
      if (publicPath && publicPath.substr(-1) !== '/') {
            publicPath += '/'
      }
      chunks.forEach(name => {
        if (name === undefined) {
           return
        }
        // chunks 信息
        let chunkInfo = (compilation.chunks.filter(chunk => {
            return chunk.name === name
        })[0] || { files: [] })
        let chunkJsPath = chunkInfo.files[0]
        // 需配合extract-text-webpack-plugin使用，减小打包体积
        let chunkCssPath = chunkInfo.files[1]
        htmlPluginData.body.unshift({
          tagName: 'script',
          closeTag: true,
          attributes: {
            type: 'text/javascript'
          },
          innerHTML: compilation.assets[chunkJsPath].source()
        })
        if (chunkCssPath) {
          htmlPluginData.head.unshift({
            tagName: 'style',
            closeTag: true,
            attributes: {
              type: 'text/css'
            },
            innerHTML: compilation.assets[chunkCssPath].source()
          })
        }
      })
      callback(null, htmlPluginData)
    })
  })
}
module.exports = HtmlWebpackInlineChunksPlugin
