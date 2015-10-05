# enterplz
Supporting word break for CJK ( Chinese, Japanese, Korean ) in browsers which aren't support CSS property
```css
word-break: keep-all;
```
( Internet Explorer is only supporting this property currently. )

**enterplz** is inpired by [jquery-word-break-keep-all](https://github.com/mytory/jquery-word-break-keep-all) but there are  some of bugs and it can't trail dynamic HTML which is made by Ajax or Websocket.
Using [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver), **enterplz** can track modified HTML and dynamically make word not break by lines 
**enterplz** 

# Usage
Just run like this.
```javascript
enterplz.run();
```
And put `data-enterplz` to any DOM you want.
```html
<div class="title" data-enterplz>
에듀캐스트에서는 누구나 가르칠 수 있고 무엇이든 배울 수 있습니다
</div>
```
then **enterplz** find DOM containing data-enterplz and make inner words never wrap to the next line.

# Prerequisite
This library is witten in ECMAScript 6 then transpiled to ES5 to be used in browsers ( Chrome, Firefox, Safari, ... )
There aren't many ES6 functions in web browsers, so it should be used with [browser polyfill](https://github.com/momamene/enterplz/blob/master/dist/browser-polyfill.js)

# Example
- before

![image](https://cloud.githubusercontent.com/assets/3989796/6524796/fb4951e2-c440-11e4-8cd2-0f8bc3aa1966.png)
- after

![image](https://cloud.githubusercontent.com/assets/3989796/6524809/20ab6150-c441-11e4-8ae1-53d0a5575a35.png)
