export const getAddresses = () => {
  return fetch("http://localhost:8080/addresses")
  .then((res) => res.json())
}

export const getAddressesById = (id) => { 
  return fetch(`http://localhost:8080/addresses/${id}`)
  .then((res) => res.json())
}

export const postAddress = (addressData) => {
  return fetch('http://localhost:8080/addresses', {
    method: 'POST',
    body: JSON.stringify(addressData),
    headers: { 'Content-Type': 'application/json' },
  })
  .then((res) => res.json())
  .then(data => {
    return {
      ...data,
      ...addressData
    }
  })
}

// export const updateAddress = (id, updatedData) => {
//   return fetch(`http://localhost:8080/addresses/${id}`, {
//     method: "PUT",
//     body: JSON.stringify(updatedData),
//     headers: { "Content-Type": "application/json" },
//   })
//   .then(res => res.json())
// }

// export const updateAddress = (id, updatedData) => {
//   return fetch(`http://localhost:8080/addresses/${id}`, {
//     method: "PUT",
//     body: JSON.stringify(updatedData),
//     headers: { "Content-Type": "application/json" },
//   })
//   .then(res => {
//     if (!res.ok) {
//       throw new Error('Network response was not ok');
//     }
//     // Check if there is content to parse
//     return res.text().then(text => text ? JSON.parse(text) : {});
//   });
// }

export const updateAddress = (id, updatedData) => {
  return fetch(`http://localhost:8080/addresses/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json" },
  })
  .then(res => {
    console.log('Response Status Code:', res.status); // Log the status code
    console.log('Response OK:', res.ok); // Log if .ok is true
    
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Check if there is content to parse
    return res.text().then(text => {
      console.log('Response Text:', text); // Log the response text
      return text ? JSON.parse(text) : {};
    });
  });
}


// export const deleteAddress = (id) => {
//   return fetch(`http://localhost:8080/addresses/${id}`, {
//     method: "DELETE",
//   })
//   .then(res => res.json())
// }

export const deleteAddress = (id) => {
  return fetch(`http://localhost:8080/addresses/${id}`, {
    method: "DELETE",
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  });
}
