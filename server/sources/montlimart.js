const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');
/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.category-products .item')
    .map((i, element) => {
      const brand='Montlimart';
      const name = $(element)
        .find('h2.product-name a')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt($(element).find('span.price').text())

      const link = `${$(element).find('a').attr('href')}`;
      const id=uuidv5(link, uuidv5.URL);
      const released = new Date();
      const image = decodeURI($(element).find('.product-image img').attr('src')).replace(/\s/g,'%20');
      return {brand,link,id,image,name, price,released};
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
