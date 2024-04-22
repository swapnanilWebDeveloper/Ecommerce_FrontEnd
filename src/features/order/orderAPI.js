

export function createOrder(order) {
  // console.log(order);
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/orders",{
        method : 'POST',
        body : JSON.stringify(order),
        headers : {'content-type' : 'application/json'}
      });
      const data = await response.json();
      console.log(data);
      resolve({data});
    }
  );
}

export function updateOrder(order) {
  // console.log(order);
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/orders/"+order.id,{
        method : 'PATCH',
        body : JSON.stringify(order),
        headers : {'content-type' : 'application/json'}
      });
      const data = await response.json();
      console.log(data);
      resolve({data});
    }
  );
}

export function fetchAllOrders(sort , pagination) {
  let queryString = '';

  for(let key in sort){
    queryString += `${key}=${sort[key]}&` 
    console.log(queryString);
  }
  
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&` 
  }

  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/orders?"+queryString);
      const orders = await response.json();
    
     // console.log(orders);
      const totalOrder = orders.length;
      resolve({data : {orders : orders, totalOrders : totalOrder }});
    });
}