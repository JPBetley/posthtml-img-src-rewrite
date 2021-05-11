# Image Source Rewrite <img align="right" height="100" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

[![Actions Status][action]][action-url]
[![NPM][npm]][npm-url]
[![Coverage][cover]][cover-badge]
[![XO code style][style]][style-url]

Rewrite an img src according to prefix/suffix rules

Before:
``` html
<html>
  <body>
    <img src="images/test.png">
  </body>
</html>
```

After:
``` html
<html>
  <body>
    <img src="images/prefix_test_suffix.png">
  </body>
</html>
```

## Install

```bash
npm i posthtml-img-src-rewrite
```

## Usage

Pass in options for the `prefix` and `suffix` values to be used for the `<img src>` rewrites.

``` js
const fs = require('fs');
const posthtml = require('posthtml');
const imgSrcRewrite = require('posthtml-img-src-rewrite');

posthtml()
    .use(imgSrcRewrite({ prefix: 'prefix_', suffix: '_suffix' }))
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

## Options

Pass in the values to be used as the `prefix` and `suffix` of all `<img src>` rewrites.

### Function options

Options allow the use of functions to calculate the values as well.

Before:
``` html
<html>
  <body>
    <img src="images/test.png">
  </body>
</html>
```

Add option:
``` js
const fs = require('fs');
const posthtml = require('posthtml');
const imgSrcRewrite = require('posthtml-img-src-rewrite');

posthtml()
    .use(imgSrcRewrite({ prefix: () => 'prefix_', suffix: () => '_suffix' }))
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

After:
``` html
<html>
  <body>
    <img src="images/prefix_test_suffix.png">
  </body>
</html>
```

### Exclusion

Exclude images from rewrite based on class. By default, this class is `img-src-rewrite-exclude`.

Before:
``` html
<html>
  <body>
    <img src="images/test.png">
    <img src="images/exclude.png" class="img-src-rewrite-exclude">
  </body>
</html>
```

Add option:
``` js
const fs = require('fs');
const posthtml = require('posthtml');
const imgSrcRewrite = require('posthtml-img-src-rewrite');

posthtml()
    .use(imgSrcRewrite({ prefix: () => 'prefix_', suffix: () => '_suffix', excludeClass: 'img-src-rewrite-exclude' }))
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

After:
``` html
<html>
  <body>
    <img src="images/prefix_test_suffix.png">
    <img src="images/exclude.png" class="img-src-rewrite-exclude">
  </body>
</html>
```

### Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs) and [contribution guide](CONTRIBUTING.md).

[action]: https://github.com/JPBetley/posthtml-img-src-rewrite/workflows/Actions%20Status/badge.svg
[action-url]: https://github.com/JPBetley/posthtml-img-src-rewrite/actions?query=workflow%3A%22CI+tests%22

[npm]: https://img.shields.io/npm/v/posthtml-img-src-rewrite.svg
[npm-url]: https://npmjs.com/package/posthtml-img-src-rewrite

[style]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[style-url]: https://github.com/xojs/xo

[cover]: https://coveralls.io/repos/JPBetley/posthtml-img-src-rewrite/badge.svg?branch=master
[cover-badge]: https://coveralls.io/r/JPBetley/posthtml-img-src-rewrite?branch=master
