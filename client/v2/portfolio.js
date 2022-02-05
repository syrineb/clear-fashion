// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let all_brand = ['All','loom','adresse','1083','dedicated','coteleparis']

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectFilter=document.querySelector('#filter-select')
const selectSort=document.querySelector('#sort-select')
const spanNewProducts = document.querySelector('#nbNewProducts');
const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');
selectSort.innerHTML="<option value='choose' selected> Choose here</option>"+selectSort.innerHTML
/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};
/**
*Percentiles
*/
function percentiles(products,p){
  products.sort(function(x,y){return x.price-y.price})

  return products[Math.floor(p*139/100)].price
}

const renderPercentile = async (pagination) => {
  const products = await fetch(  `https://clear-fashion-api.vercel.app?page=${1}&size=${139}`);
  const body= await products.json()

    spanp50.innerHTML=percentiles(body.data.result,50)
    spanp90.innerHTML=percentiles(body.data.result,90)
    spanp95.innerHTML=percentiles(body.data.result,95)
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};
/**
 * Render brands
 * @param  {Object} all_brand
 */
const renderBrand = all_brand => {
  const options = Array.from(
    all_brand,
    x => `<option value="${x}">${x}</option>`
  ).join('');
  selectBrand.innerHTML = options;

};
/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderBrand(all_brand)
  renderPercentile(pagination)
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
 selectShow.addEventListener('change', async(event) => {
     var products =await fetchProducts(1, parseInt(event.target.value))
     setCurrentProducts(products)
      render(currentProducts, currentPagination);

  });
  document.addEventListener('DOMContentLoaded', async () => {

    const products = await fetchProducts();

    setCurrentProducts(products);
    render(currentProducts, currentPagination);
  });

  /**
   * Browse pages
   */

     selectPage.addEventListener('change', async(event) => {

       var products = await   fetchProducts(parseInt(event.target.value),currentPagination.pageCount)
       setCurrentProducts(products)
         render(currentProducts, currentPagination)
     });


     /**
      * Filter by brands
      */
      selectBrand.addEventListener('change', async(event) => {

        if (event.target.value == "All"){
          const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
          setCurrentProducts(products);
         }
     else{
       const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
       products.result = products.result.filter(product => product.brand == event.target.value);
       setCurrentProducts(products);

     }

     render(currentProducts, currentPagination);

      });
      /**
       * Filter by recent products and reasonable price
       */
       var today = new Date();
       var today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

   selectFilter.addEventListener('change', async(event) => {
       const products = await   fetchProducts(currentPagination.currentPage,currentPagination.pageCount)
       if(event.target.value=="Recently released"){
       products.result =products.result.filter(function(item,idx){return new Date(today).getTime()-new Date(item.released).getTime()<=12096e5});

     }
       else if (event.target.value=="Reasonable price") {


         products.result=products.result.filter(function(item,idx){return item.price<=50});

       }

       setCurrentProducts(products)
       render(currentProducts, currentPagination);

      });



/**
 *  Sort
 */
function sortByPriceAsc(x){
         return x.sort(function(x1,x2){return x1.price-x2.price})
       }

 function sortByDate(x){
         return x.sort(function(x1,x2){return new Date(x2.released)-new Date(x1.released)})
       }

selectSort.addEventListener('change', async(event) => {
     var products =    await   fetchProducts(currentPagination.currentPage,currentPagination.pageCount)

       if (event.target.value=="price-asc") {
        products.result = sortByPriceAsc(products.result)

      }
      else if (event.target.value=="price-desc") {
        products.result = sortByPriceAsc(products.result).reverse()

      }
      else if (event.target.value=="date-asc") {
        products.result = sortByDate(products.result)

      }
      else if (event.target.value=="date-desc") {
        products.result = sortByDate(products.result).reverse()

      }
      setCurrentProducts(products)
      render(currentProducts, currentPagination)
});
