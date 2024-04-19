
export function fetchAllProducts() {
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/products");
      const data = await response.json();
      resolve({data});
    }
  );
}

export function fetchAllProductsByFilters(filter, sort, pagination) {
  // filter = {"category" :["smartphones"]}
  // sort = {_sort : "price"}
  // pagination = {_page : 4 , _per_page : 15} // _page=4&_per_page=15

  // on server we will support multivalues in filter...

  let queryString = "";

  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`
      console.log(queryString);
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&` 
    // console.log(queryString);
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&` 
    console.log(queryString);
  }

  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/products?"+queryString);
      const products = await response.json();
      
      console.log(products);
      console.log(products.length);
    //  console.log(products.items);
      resolve({data : {products : products, totalItems : products.length }});
    }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/categories");
      const data = await response.json();
      resolve({data});
    }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/brands");
      const data = await response.json();
      resolve({data});
    }
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/products/"+id);
      const data = await response.json();
      resolve({data});
    }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/products/", {
        method : 'POST',
        body : JSON.stringify(product),
        headers : {'content-type' : 'application/json'}
      });
      const data = await response.json();
      resolve({data});
    }
  );
}

export function updateProduct(update) {
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/products/"+update.id,{
        method : 'PATCH',
        body : JSON.stringify(update),
        headers : {'content-type' : 'application/json'}
      });
      const data = await response.json();
      console.log(data);
      // on server it will return some user info (not password)
      resolve({data});
    }
  );
}