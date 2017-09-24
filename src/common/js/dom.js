export function hasClass (el, className) {
  var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass (item, className) {
  if (hasClass(item, className)) {
    return
  }
  let newClass = item.className.split(' ')
  newClass.push(className)
  item.className = newClass.join(' ')
}

export function getData (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  } else {
    return el.getAttribute(prefix + name)
  }
}

//  自动加前缀的

let elementStyle = document.createElement('div').style

let vender = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle (style) {
  if (vender === false) {
    return false
  }
  if (vender === 'standard') {
    return style
  }
  return vender + style.charAt(0).toUpperCase() + style.substr(1)
}