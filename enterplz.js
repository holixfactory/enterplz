let isIE = navigator.userAgent.toLowerCase().indexOf("msie") !== -1

let _splitNodes = function([node, ...remains]) {
  if (typeof(node) === "undefined") {
    return [[],[]]
  }
  var [textNodes, elNodes] = _splitNodes(remains)
  let isText = node.nodeType === 3
  if ( isText ) {
    textNodes.push(node)
  } else {
    let isIgnored = node.getAttribute('data-no-enterplz')
    let isPreformatted = node.nodeName === 'PRE'
    let isAlreadyDone = node.getAttribute('data-word') === ''

    if ( !isIgnored && !isPreformatted && !isAlreadyDone ) {
      elNodes.push(node)
    }
  }
  return [textNodes, elNodes]
}

let traverse = function(parent) {
  var [textNodes, elNodes] = _splitNodes(parent.childNodes)
  for (var child of textNodes) {
    console.log(child.textContent)
  }
  for (var child of elNodes) {
    traverse(child)
  }
}


export default {
  run: function(options) {
    options = options || {};
    let rootNode = options.include || document.body
    if (isIE) { rootNode.style.wordBreak = 'keep-all'; }
    else {
      traverse(rootNode);
    }
  }
}
