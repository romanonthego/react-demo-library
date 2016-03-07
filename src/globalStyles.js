const css = `
  html, body {
    margin: 0;
    padding: 0;
  }
`

export default function mountGlobalStyles() {
  const style = document.createElement('style')
  style.type = 'text/css'
  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
  document.head.appendChild(style)
}
