const Image = require('@11ty/eleventy-img');

module.exports = async function(src, alt) {
  if (!alt) {
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

  let stats = await Image(src, {
    widths: [25, 320, 640, 960, 1200, 1800],
    formats: ['jpeg', 'webp'],
    urlPath: '/assets/img/',
    outputDir: './public/assets/img/',
  });

  const srcset = Object.keys(stats).reduce(
    (acc, format) => ({
        ...acc,
        [format]: stats[format].map(image => `${image.url} ${image.width}w`).join(', '),
    }),
    {}
  );

  const source = `<source type="image/webp" srcset="${srcset['webp']}" sizes="(min-width: 1024px) 1024px, 100vw">`;

  const img = `<img
      loading="lazy"
      decoding="async"
      alt="${alt}"
      src="${stats['jpeg'][0].url}"
      sizes="(min-width: 1024px) 1024px, 100vw"
      srcset="${srcset['jpeg']}"
      width="${stats['jpeg'][0].width}"
      height="${stats['jpeg'][0].height}">`;
  
  return `<div class="image-wrapper">
      <picture> ${source} ${img} </picture></div>`;
    };
