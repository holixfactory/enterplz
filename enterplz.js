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
  if ( isText ) {
    textNodes.push(node)
  } else {
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

let traverse = function(parent) {
  var [textNodes, elNodes] = _splitNodes(parent.childNodes)
  for (var child of textNodes) {
    console.log(child.textContent)
    for (var text of child.textContent.split(/\s/).filter((t) => t !== "")) {
      var word = makeWord(text)
      var blank = makeBlank()
      parent.insertBefore(word, child)
      parent.insertBefore(blank, child)
    }
    child.remove()
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
