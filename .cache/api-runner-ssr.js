var plugins = [{
      plugin: require('/Users/joellopez/Library/Mobile Documents/com~apple~CloudDocs/Nueva carpeta con elementos/Proyectos/LASFLORESPROPIEDADES/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[],"displayName":true,"fileName":true,"minify":true,"namespace":"","transpileTemplateLiterals":true,"pure":false},
    },{
      plugin: require('/Users/joellopez/Library/Mobile Documents/com~apple~CloudDocs/Nueva carpeta con elementos/Proyectos/LASFLORESPROPIEDADES/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/joellopez/Library/Mobile Documents/com~apple~CloudDocs/Nueva carpeta con elementos/Proyectos/LASFLORESPROPIEDADES/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"output":"/sitemap.xml","createLinkInHead":true},
    },{
      plugin: require('/Users/joellopez/Library/Mobile Documents/com~apple~CloudDocs/Nueva carpeta con elementos/Proyectos/LASFLORESPROPIEDADES/node_modules/gatsby-plugin-transition-link/gatsby-ssr'),
      options: {"plugins":[],"layout":"/Users/joellopez/Library/Mobile Documents/com~apple~CloudDocs/Nueva carpeta con elementos/Proyectos/LASFLORESPROPIEDADES/src/layout/index.js"},
    },{
      plugin: require('/Users/joellopez/Library/Mobile Documents/com~apple~CloudDocs/Nueva carpeta con elementos/Proyectos/LASFLORESPROPIEDADES/node_modules/gatsby-plugin-google-fonts/gatsby-ssr'),
      options: {"plugins":[],"fonts":["Lato:400","Raleway:300,500"],"display":"swap"},
    },{
      plugin: require('/Users/joellopez/Library/Mobile Documents/com~apple~CloudDocs/Nueva carpeta con elementos/Proyectos/LASFLORESPROPIEDADES/node_modules/gatsby-plugin-react-leaflet/gatsby-ssr'),
      options: {"plugins":[],"linkStyles":true},
    },{
      plugin: require('/Users/joellopez/Library/Mobile Documents/com~apple~CloudDocs/Nueva carpeta con elementos/Proyectos/LASFLORESPROPIEDADES/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"icon":"src/images/icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"3132fcccbf082808a33d56e5c40224cd"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
