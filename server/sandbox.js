/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart=require('./sources/montlimart');
const adresse=require('./sources/adresse');
const fs = require('fs').promises;

//Missing pages in adresse and dedicatedbrand
//null prices

async function sandbox () {
  try {

    //DEDICATED BRAND
    let eshop = 'https://www.dedicatedbrand.com/en/men/all-men'
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const productsDedicated = await dedicatedbrand.scrape(eshop);

    //MONTLIMART
    eshop="https://www.montlimart.com/toute-la-collection.html?limit=all"
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const productsMontlimart = await montlimart.scrape(eshop);

    //ADRESSE PARIS
    eshop="https://adresse.paris/630-toute-la-collection"
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const productsAdresse = await adresse.scrape(eshop);


    //WRITE IN JSON FILE
    const products =productsDedicated.concat(productsMontlimart,productsAdresse)
    await fs.writeFile('all_products.json', JSON.stringify(products),function (err)
    {
      if (err) return console.log(err);
    })

    console.log(products);
    console.log('done');
    console.log(products.length);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
