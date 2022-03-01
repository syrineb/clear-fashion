const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { 'v5': uuidv5 } = require('uuid');
/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  const numberPage=Math.ceil(parseInt($('.paging-showing .js-allItems-total').text())/parseInt($('.paging-showing .js-items-current').text()))

  return [$('.productList-container .productList')
    .map((i, element) => {
      const brand='DEDICATED.';
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const link=$(element).find('.productList-link').attr('href');
      const image=$(element) .find('.productList-image img').attr('data-src')
      const id=$(element) .find('.js-saveToFavorites productList-favorites').attr('data-id')

      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );

      return {brand,link,id,image,name, price};
    })
  .get(),numberPage]
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
      const nbPages=parse(body)[1];
      let allProducts=[];

      for(let i=1;i<=nbPages;i++)
      {
        const link=url+"#page="+i.toString()
        try {
                   const response2 = await fetch(link);

                   if (response2.ok) {
                       const body2 = await response2.text();
                       allProducts = allProducts.concat(parse(body2)[0]);
                   } else {
                       console.error(response2);
                       return null
                   }
               } catch (error) {
                   console.error(error);
                   return null;
               }

      }
      return allProducts;
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
