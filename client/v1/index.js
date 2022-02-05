// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

var CHEAPEST_TSHIRTS = [
  {'name' : 'Hopaal','link':'https://hopaal.com/collections/t-shirts-homme/products/classique-forest-t-shirt-homme?variant=19733822111830'},
  {'name' : 'Loom','link':'https://www.loom.fr/collections/tous-les-vetements/products/le-t-shirt'},
  {'name' : 'ADRESSE','link':'https://adresse.paris/t-shirts-et-polos/4336-t-shirt-thomas-lateur-1300000266864.html#/79-taille_fastmag-m'},
];
console.log(CHEAPEST_TSHIRTS)



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

var NUMBER_PRODUCTS = marketplace.length
console.log(NUMBER_PRODUCTS)

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have
var BRANDS_NAME =[]
marketplace.forEach(x=>BRANDS_NAME.push(x.brand))
BRANDS_NAME=[...new Set(BRANDS_NAME)]
console.log(BRANDS_NAME)
console.log(BRANDS_NAME.length)


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
function sortByPrice(x){
  return x.sort(function(x1,x2){return x1.price-x2.price})
}
var sortedMarketplacePrice = sortByPrice(marketplace)
console.log(sortedMarketplacePrice)

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable
function sortByDate(x){
  return x.sort(function(x1,x2){return new Date(x2.date)-new Date(x1.date)})
}
var sortedMarketplaceDate = sortByDate(marketplace)
console.log(sortedMarketplaceDate)

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list
var FILTER_PRICE =[]
marketplace.forEach(function(x){
  if(x.price>=50 && x.price<=100){FILTER_PRICE.push(x)}})
console.table(FILTER_PRICE)

// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average

var average_basket=0
marketplace.forEach(x=>average_basket+=x.price)
average_basket = average_basket/marketplace.length
console.log(average_basket)



/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands
var products_brands={}
BRANDS_NAME.forEach(function(x){
  products_brands[x]=[]
  marketplace.forEach(function(y)

  {if(y.brand==x){products_brands[x].push(y)}}
)
});
console.log(products_brands)



// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort
var sortPriceBrands=products_brands

for (var [key, value] of Object.entries(sortPriceBrands)) {
  value=sortByPrice(sortPriceBrands[key]);
}
console.log(sortPriceBrands)

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

var sortDateBrands=products_brands

for (var [key, value] of Object.entries(sortDateBrands)) {
  value=sortByDate(sortPriceBrands[key]);
}
console.log(sortDateBrands)



/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

for (var [key, value] of Object.entries(products_brands)) {
  var prices = []
  products_brands[key].forEach(elmt=>prices.push(elmt.price))
  var p90 = 100 *prices.reduce((acc, v) => acc + (v < 90 ? 1 : 0) + (v === 90 ? 0.5 : 0),0) /prices.length;
  console.log(key + " : " + p90)
}


/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
var res =new Boolean(false)
COTELE_PARIS.forEach(function(elmt){
  var today = (new Date()).getTime();
  var difference= (today - new Date(elmt.released).getTime())/(1000*3600*24)

  if(difference<=14){res=true}
})
console.log(res)

// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
res=true
COTELE_PARIS.forEach(function(elmt){
  if(elmt.price>100){res=false}
})
console.log(res)

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
COTELE_PARIS.forEach(function(elmt){
  if(elmt.uuid=='b56c6d88-749a-5b4c-b571-e5b5c6483131'){console.log(elmt)}
})

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product
var filtered = COTELE_PARIS.filter(function(ele){return ele.uuid != 'b56c6d88-749a-5b4c-b571-e5b5c6483131';});
console.log(filtered)

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?
console.log(blueJacket)
console.log(jacket);
// by making a change to jacket, the same change is  applied to blue jacket
blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};



// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket = Object.assign({},blueJacket);
jacket.favorite = true;

console.log(blueJacket)
console.log(jacket);


/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
localStorage.setItem("favorite brands" , MY_FAVORITE_BRANDS)
console.log(window.localStorage)
