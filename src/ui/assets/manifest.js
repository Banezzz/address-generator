import { getClientScript } from './app.js'
import { getStyles } from './styles.js'

function hashContent (value) {
  let hash = 5381
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) + hash) ^ value.charCodeAt(index)
  }
  return (hash >>> 0).toString(36)
}

let cachedManifest = null

export function getAssetManifest () {
  if (cachedManifest) {
    return cachedManifest
  }

  const js = getClientScript()
  const css = getStyles()
  cachedManifest = {
    js: {
      path: `/assets/app.${hashContent(js)}.js`,
      body: js
    },
    css: {
      path: `/assets/app.${hashContent(css)}.css`,
      body: css
    }
  }
  return cachedManifest
}
