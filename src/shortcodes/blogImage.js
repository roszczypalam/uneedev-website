const Image = require('@11ty/eleventy-img');

module.exports = async function(src, alt) {
    if (!alt) {
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    let stats = await Image(src, {
      widths: [25, 320, 640, 960, 1200, 1800 ],
      formats: ['jpeg', 'webp'],
      urlPath: '/content/posts/img/',
      outputDir: './public/content/posts/img/',
    });

    let lowestSrc = stats['jpeg'][0];
    let largestSrc = stats['jpeg'][2];

    const srcset = Object.keys(stats).reduce(
      (acc, format) => ({
        ...acc,
        [format]: stats[format].reduce(
          (_acc, curr) => `${_acc} ${curr.srcset} ,`,
          '',
        ),
      }),
      {},
    );

    const source = `<source type="image/webp" srcset="${srcset['webp']}" >`;

    const img = `<img
      loading="lazy"
      alt="${alt}"
      src="${lowestSrc.url}"
      sizes='(min-width: 1024px) 1024px, 100vw'
      srcset="${srcset['jpeg']}"
      width="${lowestSrc.width}"
      height="${lowestSrc.height}">`;

      return `<div class="image-wrapper blur-load" >
        <img class="placeholder" src="${lowestSrc.url}" alt="Placeholder" width="${largestSrc.width}" height="${largestSrc.height}"><picture> ${source} ${img} </picture></div>`;
  };