const productCreateForm = document.getElementById("product-create-form");
const productUpdateForm = document.getElementById("product-update-form");
const productQuantityUpdateForm = document.getElementById("product-quantity-update-form");
const productDataList = document.getElementById("product-data-list");
const singleProductData = document.querySelector(".product-data");
const btnClose = document.querySelectorAll(".btn-close");
const msg = document.querySelector(".msg");



const getAllProducts = () => {
  // get all data form local storage
  const data = JSON.parse(localStorage.getItem("products"));

  let listData = "";
  

  if (data) {

    // Sort products by quantity in ascending order
    data.sort((a, b) => a.quantity - b.quantity);

    
    // Generate table rows
    data.map((item, index) => {
      

      listData += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.model}</td>
          <td><img src="${item.image}" alt="photo"></td>
          <td>${item.price}</td>
          <td>${item.quantity}</td>
          <td>${item.date}</td>
          <td>${timeNow(item.createdAt)}</td>
         
          <td>${
            item.quantity == 0
              ? `<button onclick="productQuantityUpdate('${item.id}')" data-bs-toggle="modal" data-bs-target="#product-quantity-update" class="btn btn-sm btn-success">Restock</button>`
              : ""
          }</td>
          <td>
            <button data-bs-toggle="modal" data-bs-target="#product-show" onclick="showSingleProduct('${item.id}')" class="btn btn-sm btn-info"><i class="fa fa-eye"></i></button>
            <button onclick="productUpdate('${item.id}')" data-bs-toggle="modal" data-bs-target="#product-update" class="btn btn-sm btn-warning"><i class="fa fa-edit"></i></button>
            <button onclick="deleteProduct('${item.id}')" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
          </td>
        </tr>`;
    });
  }

  else{
    listData=`
    <tr>
      <td colspan="7" class="text-center text-danger" ><b>No Data Found</b></td>
    </tr>
    `;
  }
 
  productDataList.innerHTML = listData;
};
getAllProducts();




//submit product create form

productCreateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  if (
    !data.name ||
    !data.model ||
    !data.image ||
    !data.price ||
    !data.quantity ||
    !data.date
   
 
  ) {
    msg.innerHTML = createAlert("All Fields Are Required!");
  } else {
    // Check Old Data Exists or Not

    let oldData = [];
    if (localStorage.getItem("products")) {
      oldData = JSON.parse(localStorage.getItem("products"));
    }

    // push new data
    oldData.push({
      ...data,
      id: createID(),
      createdAt: Date.now(),
      updatedAt: null,
    });
    //send Data to LS
    localStorage.setItem("products", JSON.stringify(oldData));
    e.target.reset();
    btnClose.forEach((item) => item.click());
    getAllProducts();
  }
};

//view product data

const showSingleProduct = (id) => {
  const { name, model, image, price, quantity, date } = getSingledata(
    "products",
    id
  );

  singleProductData.innerHTML = `
  
  <table>
                      
  <tr>
    <td>Name</td>
    <td>${name}</td>
  </tr>
  <tr>
    <td>Product Model</td>
    <td>${model}</td>
  </tr>
  
  <tr>
    <td>Image</td>
    <td><img src="${image}" alt="photo"></td> 
  </tr>
  <tr>
    <td>Price</td>
    <td>${price}tk</td> 
  </tr><tr>
  <td>Quantity</td>
  <td>${quantity}tk</td> 
</tr>
  <tr>
    <td>Date</td>
    <td>${date}</td>
  </tr>
  
</table>`;
};

//Delete Single Data
const deleteProduct = (id) => {
  const conf = confirm("Are You Sure!");
  if (conf) {
    deleteSingleData("products", id);
    getAllProducts();
  }
};

//Update SIngle product Data

const productUpdate = (id) => {
  const data = JSON.parse(localStorage.getItem("products"));
  const { name, model, image, price, quantity, date } = data.find(
    (data) => data.id == id
  );

  productUpdateForm.querySelector('input[placeholder="Product Name"]').value = name;
  productUpdateForm.querySelector('input[placeholder="Product Model"]').value =model;
  productUpdateForm.querySelector('input[placeholder="Product Image"]').value = image;
  productUpdateForm.querySelector('input[placeholder="Product Price"]').value = price;
  productUpdateForm.querySelector('input[placeholder="Quantity"]').value = quantity;
  productUpdateForm.querySelector('input[placeholder="Date"]').value = date;
  productUpdateForm.querySelector('input[placeholder="ID"]').value = id;
};

//edit product

productUpdateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const { name, model, image, price, quantity, date,id } =
    Object.fromEntries(form_data);
  const data = JSON.parse(localStorage.getItem("products"));

  const updateData = data.map((item) => {
    if (item.id == id) {
      return {
        ...item,
        name,
        model,
        image,
        price, 
        quantity,
        date,
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("products", JSON.stringify(updateData));

  btnClose.forEach((item) => item.click());
    getAllProducts();
};
//Re-stock


  const productQuantityUpdate = (id) => {
    const data = JSON.parse(localStorage.getItem("products"));
    const product = data.find((product) => product.id == id);
    
    if (product) {
      productQuantityUpdateForm.querySelector('input[placeholder="Quantity"]').value = product.quantity;
      productQuantityUpdateForm.querySelector('input[placeholder="ID"]').value = id;
    }
};

//edit quantity

productQuantityUpdateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const { quantity, id } =
    Object.fromEntries(form_data);
  const data = JSON.parse(localStorage.getItem("products"));

  const updateData = data.map((item) => {
    if (item.id == id) {
      return {
        ...item,
        quantity,
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("products", JSON.stringify(updateData));

  btnClose.forEach((item) => item.click());
    getAllProducts();
};
