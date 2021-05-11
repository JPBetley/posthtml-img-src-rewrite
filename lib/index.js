'use strict';

const path = require('path');

module.exports = function (options) {
  options = options || {};
  options.prefix = options.prefix || '';
  options.suffix = options.suffix || '';
  options.excludeClass = options.excludeClass || 'img-src-rewrite-exclude';

  function getImagePath(imgDetails) {
    return getPathPart(options.prefix) + imgDetails.name + getPathPart(options.suffix) + imgDetails.ext;
  }

  function getPathPart(option) {
    if (typeof option === 'function') {
      return option();
    }

    return option;
  }

  function imgSrcRewrite(tree) {
    return tree.match({tag: 'img'}, img => {
      img.attrs = img.attrs || {};

      if (!img.attrs.src) {
        return img;
      }

      const classes = (img.attrs.class || '')
        .split(/\s+/)
        .map(value => {
          return (value || '').trim();
        })
        .filter(Boolean);

      if (classes.includes(options.excludeClass)) {
        return img;
      }

      const imgDetails = path.parse(img.attrs.src);
      const newImgName = getImagePath(imgDetails);

      img = Object.assign(img, {attrs: {src: imgDetails.dir + '/' + newImgName}});

      return img;
    });
  }

  return imgSrcRewrite;
};
