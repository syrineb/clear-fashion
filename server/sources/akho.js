const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data, {'xmlMode': true});

  return $('.ProductgridContainer .product-grid')
    .map((i, element) => {
      const link = `https://www.akhoparis.com/${$(element)
        .find('.card-wrapper group .card card--product .card_inner a')
        .attr('href')}`;

      return {
        'brand': 'akho',
        link,
        'id': uuidv5(link, uuidv5.URL),
        'image': $(element)
          .find('.media media--transparent media--portrait media--hover-effect img')
          .attr('srcset'),
        'name': $(element)
          .find('.h3 .card-information__text h5 !p-0 full-unstyled-link')
          .text()
          .trim()
          .replace(/\s/g, ' '),
        'price': parseFloat(
          $(element)
            .find('.price-item price-item--sale price-item--last')
            .text()
            .replace('', ' €')
            .replace('.', ',')
        ),
        'released' : new Date()
      };
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
