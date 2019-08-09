// 创建dom用于获取style样式属性
let eleStyle = document.createElement('div').style
let vendor = (() => {
  let transformName = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransfrom',
    standard: 'transform'
  }
  for (let k in transformName) {
    if (eleStyle[transformName[k]] !== undefined) {
      return k
    }
  }
  return false
})()

export function prefixStyle (style) {
  if(vendor === false) {
    return false
  }
  if(vendor === 'standard') {
    return vendor
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
