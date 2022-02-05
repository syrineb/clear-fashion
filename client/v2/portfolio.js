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
