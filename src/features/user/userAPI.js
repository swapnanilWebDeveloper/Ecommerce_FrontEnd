
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/orders/user/"+userId);
      const result = await response.json();
      resolve({data : result});
    }
  );
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/users/"+userId);
      const result = await response.json();
      resolve({data : result});
    }
  );
}

export function updateUser(updtae) {
  return new Promise(async (resolve) =>
    {
      const response = await fetch("http://localhost:8080/users/"+updtae.id,{
        method : 'PATCH',
        body : JSON.stringify(updtae),
        headers : {'content-type' : 'application/json'}
      });
      const data = await response.json();
      
      // console.log(data);
      resolve({data});
    }
  );
}
