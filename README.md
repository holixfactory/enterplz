# enterplz
Supporting word break for CJK ( Chinese, Japanese, Korean ) in browsers which aren't support CSS property
```css
word-break: keep-all;
```
( Internet Explorer is only supporting this property currently. )

# Usage
Just run like this.
```javascript
enterplz.run({
  include: documnent.body,
  follow: true
});
```
# Prerequisite
This library is witten in ECMAScript 6 then transpiled to ES5 to be used in browsers ( Chrome, Firefox, Safari, ... )
There aren't many ES6 functions in web browsers, it should be used with [browser polyfill](https://github.com/momamene/enterplz/blob/master/dist/browser-polyfill.js)

# Example
- before

![image](https://cloud.githubusercontent.com/assets/3989796/6524796/fb4951e2-c440-11e4-8cd2-0f8bc3aa1966.png)
- after

![image](https://cloud.githubusercontent.com/assets/3989796/6524809/20ab6150-c441-11e4-8ae1-53d0a5575a35.png)
