/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart=require('./sources/montlimart');
const adresse=require('./sources/adresse');
const loom=require('./sites/loom');
const akho=require('./sources/akho');
const fs = require('fs').promises;


//null prices
//duplicates

async function sandbox () {
  try {

    // DEDICATED BRAND
    let eshop = 'https://www.dedicatedbrand.com/en/men/all-men?limit=all'
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    let  productsDedicated = await dedicatedbrand.scrape(eshop);
    console.log('number of products from DEDICATED :'+productsDedicated.length.toString())

    //MONTLIMART
    eshop="https://www.montlimart.com/toute-la-collection.html?limit=all"
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    const productsMontlimart = await montlimart.scrape(eshop);
    console.log('number of products from Montlimart :'+productsMontlimart.length.toString())

    //ADRESSE PARIS
    eshop="https://adresse.paris/630-toute-la-collection"
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    let productsAdresse = await adresse.scrape(eshop);
    eshop="https://adresse.paris/630-toute-la-collection?p=2"
    let productsAdresse2 = await adresse.scrape(eshop);
    productsAdresse=productsAdresse.concat(productsAdresse2)
    console.log('number of products from Adresse Paris :'+productsAdresse.length.toString())


    //loom
    eshop="https://www.loom.fr/collections/tous-les-vetements"
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    let productsLoom = await loom.scrape(eshop);
    console.log('number of products from Loom :'+productsLoom.length.toString())

    //AKHO
    eshop="https://www.akhoparis.com/collections/all"
    console.log(`🕵️‍♀️  browsing ${eshop} source`);
    let productsAkho = await akho.scrape(eshop);
    console.log('number of products from Akho :'+productsAkho.length.toString())

    //
    // //WRITE IN JSON FILE

    const products =productsDedicated.concat(productsMontlimart,productsAdresse,productsLoom,productsAkho)

    await fs.writeFile('all_products.json', JSON.stringify(products),function (err){ if (err) return console.log(err);})
    console.log(products)

    console.log('done');
    console.log('TOTAL NUMBER OF PRODUCTS :'+products.length.toString())
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
