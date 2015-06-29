/**
* @license MIT, GPL, do whatever you want
* @requires polyfill: Array.prototype.slice fix {@link https://gist.github.com/brettz9/6093105}
*/

let isIE = (() => {
  var isIE11 = navigator.userAgent.indexOf(".NET CLR") > -1;
  var isIE11orLess = isIE11 || navigator.appVersion.indexOf("MSIE") != -1;
  return isIE11orLess;
})()

  let _splitNodes = function([node, ...remains]) {
    if (typeof(node) === "undefined") {
      return [[],[]]
    }
    var [textNodes, elNodes] = _splitNodes(remains)
      let isText = node.nodeType === 3
    let isComment = node.nodeType === 8
    if ( isText ) {
      textNodes.push(node)
    } else if (!isComment) {
      let isIgnored = node.getAttribute('data-no-enterplz') === ''
      let isPreformatted = node.nodeName === 'PRE'
      let isAlreadyDone = node.getAttribute('data-word') === ''
      if ( !isIgnored && !isPreformatted && !isAlreadyDone ) {
        elNodes.push(node)
      }
    }
    return [textNodes, elNodes]
  }

let makeWord = (text) => {
  var span = document.createElement('span')
    span.style.whiteSpace = 'nowrap'
  span.setAttribute('data-word', '')
    span.appendChild(document.createTextNode(text))
    return span
}

let makeBlank = () => document.createTextNode(' ')

  let trackAll // It defines when run

let traverse = function(parent) {
  var [textNodes, elNodes] = _splitNodes(parent.childNodes)

  let isTargeted = trackAll || parent.getAttribute('data-enterplz') === ''

  if (isTargeted) {
    for (var child of textNodes) {
      let words = child.textContent.split(/\s/)
                                   .filter((t) => t.trim() !== "")
        for (var text of words) {
          var word = makeWord(text)
            var blank = makeBlank()
            parent.insertBefore(word, child)
            parent.insertBefore(blank, child)
        }
      if (words.length > 0) {
        child.remove()
      }
    }
  }
  for (var child of elNodes) {
    if (parent.getAttribute('data-enterplz') === '') {
      child.setAttribute('data-enterplz', '')
    }
    traverse(child)
  }
}

export default {
  run: function(options) {
    options = options || {}
    let rootNode = document.body
    let trackAll = options.trackAll || false
    let follow = options.follow || true
    if (isIE) { rootNode.style.wordBreak = 'keep-all' }
    else {
      traverse(rootNode)
        if (follow) {
          (new MutationObserver((mutations) => {
            traverse(rootNode)
          })).observe(rootNode, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: false
          })
        }
    }
  }
}
