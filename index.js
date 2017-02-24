function HtmlWebpackInlineChunksPlugin (opt) {
  this.chunks = opt && opt.chunks || []
}
HtmlWebpackInlineChunksPlugin.prototype.apply = function (compiler, callback) {
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlPluginData, callback) => {
      // 合并去重
      this.chunks = Array.from(new Set(this.chunks.concat(htmlPluginData.plugin.options.inlineChunks)))
      let publicPath = compilation.options.output.publicPath || ''
      if (publicPath && publicPath.substr(-1) !== '/') {
            publicPath += '/'
      }
      this.chunks.forEach(name => {
        if (name === undefined) {
           return
        }
        let chunkPath = (compilation.chunks.filter(chunk => {
            return chunk.name === name
        })[0] || { files: [] }).files[0]
        htmlPluginData.body.unshift({
          tagName: 'script',
          closeTag: true,
          attributes: {
            type: 'text/javascript'
          },
          innerHTML: compilation.assets[chunkPath].source()
        })
      })
      callback(null, htmlPluginData)
    })
  })
}

module.exports = HtmlWebpackInlineChunksPlugin
