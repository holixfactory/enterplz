(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "module"], factory);
  } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.enterplz = mod.exports;
  }
})(this, function (exports, module) {
  "use strict";

  function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

  function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

  /**
  * @license MIT, GPL, do whatever you want
  * @requires polyfill: Array.prototype.slice fix {@link https://gist.github.com/brettz9/6093105}
  */
  if (!window.Array.from) {
    window.Array.from = function (object) {
      "use strict";
      return [].slice.call(object);
    };
  }

  var isIE = (function () {
    var isIE11 = navigator.userAgent.indexOf(".NET CLR") > -1;
    var isIE11orLess = isIE11 || navigator.appVersion.indexOf("MSIE") != -1;
    return isIE11orLess;
  })();

  var _splitNodes = function _splitNodes(_ref) {
    var _ref2 = _toArray(_ref);

    var node = _ref2[0];

    var remains = _ref2.slice(1);

    if (typeof node === "undefined") {
      return [[], []];
    }

    var _splitNodes2 = _splitNodes(remains);

    var _splitNodes22 = _slicedToArray(_splitNodes2, 2);

    var textNodes = _splitNodes22[0];
    var elNodes = _splitNodes22[1];

    var isText = node.nodeType === 3;
    var isComment = node.nodeType === 8;
    if (isText) {
      textNodes.push(node);
    } else if (!isComment) {
      var isIgnored = node.getAttribute("data-no-enterplz") === "";
      var isPreformatted = node.nodeName === "PRE";
      var isAlreadyDone = node.getAttribute("data-word") === "";
      if (!isIgnored && !isPreformatted && !isAlreadyDone) {
        elNodes.push(node);
      }
    }
    return [textNodes, elNodes];
  };

  var makeWord = function makeWord(text) {
    var span = document.createElement("span");
    span.style.whiteSpace = "nowrap";
    span.setAttribute("data-word", "");
    span.appendChild(document.createTextNode(text));
    return span;
  };

  var makeBlank = function makeBlank() {
    return document.createTextNode(" ");
  };

  var trackAll = undefined; // It defines when run

  var traverse = function traverse(parent) {
    var _splitNodes3 = _splitNodes(parent.childNodes);

    var _splitNodes32 = _slicedToArray(_splitNodes3, 2);

    var textNodes = _splitNodes32[0];
    var elNodes = _splitNodes32[1];

    var isTargeted = trackAll || parent.getAttribute("data-enterplz") === "";

    if (isTargeted) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = textNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          var words = child.textContent.split(/\s/).filter(function (t) {
            return t.trim() !== "";
          });
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = words[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var text = _step2.value;

              var word = makeWord(text);
              var blank = makeBlank();
              parent.insertBefore(word, child);
              parent.insertBefore(blank, child);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          if (words.length > 0) {
            child.remove();
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = elNodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var child = _step3.value;

        if (parent.getAttribute("data-enterplz") === "") {
          child.setAttribute("data-enterplz", "");
        }
        traverse(child);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  };

  module.exports = {
    run: function run(options) {
      options = options || {};
      var rootNode = document.body;
      var trackAll = options.trackAll || false;
      var follow = options.follow || true;
      if (isIE) {
        rootNode.style.wordBreak = "keep-all";
      } else {
        traverse(rootNode);
        if (follow) {
          new MutationObserver(function (mutations) {
            traverse(rootNode);
          }).observe(rootNode, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: false
          });
        }
      }
    }
  };
});