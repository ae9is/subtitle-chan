export function getParam(name: string, url?: string) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&]*)|&|$)'),
    results = regex.exec(url)
  if (!results || !results[2]) return undefined
  return decodeURIComponent(results[2].replace(/\+/g, ' ')) ?? undefined
}
