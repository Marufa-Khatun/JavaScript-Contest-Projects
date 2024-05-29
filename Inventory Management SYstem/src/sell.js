const sellCreateForm = document.getElementById("sell-create-form");
const productDropdown = document.getElementById('product-dropdown');
const availableQuantityInput = document.getElementById('available-quantity');
const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const sellDataList = document.getElementById("sell-data-list");
const singleSellData = document.querySelector(".sell-data");
const btnClose = document.querySelectorAll(".btn-close");
const msg = document.querySelector(".msg");






// Get all sells
const getAllSells = () => {
  const data = JSON.parse(localStorage.getItem("sells")) || [];


//product name show
  const products = JSON.parse(localStorage.getItem("products")) || [];
   // Create a map of product IDs to product names
   const productMap = products.reduce((map, product) => {
    map[product.id] = product.name;
    return map;
  }, {});


  

  let listData = "";

  if (data.length > 0) {
    data.reverse().forEach((item, index) => {
      listData += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.location}</td>
          <td>${productMap[item.product] || 'Unknown Product'}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>${item.date}</td>
          <td>${timeNow(item.createdAt)}</td>
          <td>
            <button data-bs-toggle="modal" data-bs-target="#sell-show" onclick="showSingleSell('${item.id}')" class="btn btn-sm btn-info"><i class="fa fa-eye"></i></button>
            <button onclick="deleteSell('${item.id}')" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
          </td>
        </tr>`;
    });
  } else {
    listData = `
    <tr>
      <td colspan="10" class="text-center text-danger"><b>No Data Found</b></td>
    </tr>`;
  }

  sellDataList.innerHTML = listData;
};

// Initialize product dropdown
const populateProductDropdown = () => {
  const products = JSON.parse(localStorage.getItem('products')) || [];

  let options = '<option value="">--select product--</option>';
  products.forEach(product => {
    options +=`<option value="${product.id}" data-price="${product.price}">${product.name}</option>`;
  });

  productDropdown.innerHTML = options;
};


//Total Price Update
// Function to update price input field based on selected product
const updatePrice = () => {
  const selectedProductId = productDropdown.value;
  const quantity = parseInt(quantityInput.value);

  if (selectedProductId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const selectedProduct = products.find(product => product.id === selectedProductId);

    if (selectedProduct) {
      const totalPrice = selectedProduct.price * quantity;
      priceInput.value = totalPrice.toFixed(2);
    }
  } else {
    priceInput.value = '';
  }
};

// Event listeners for product selection and quantity input
productDropdown.addEventListener('change', updatePrice);
quantityInput.addEventListener('input', updatePrice);


// Populate available quantity on product change
productDropdown.addEventListener('change', () => {
  const selectedProductId = productDropdown.value;

  if (selectedProductId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const selectedProduct = products.find(product => product.id === selectedProductId);

    if (selectedProduct) {
      availableQuantityInput.value = selectedProduct.quantity;
    } else {
      availableQuantityInput.value = '';
    }
  } else {
    availableQuantityInput.value = '';
  }
});

// Handle form submission
sellCreateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const { name, email,  location, product, quantity, price, date } = Object.fromEntries(form_data.entries());

  if (!product || !quantity) {
    msg.innerHTML = createAlert("Please select a product and enter the quantity.!");
   
  }

  const sellQuantity = parseInt(quantity);
  if (isNaN(sellQuantity) || sellQuantity <= 0) {
    msg.innerHTML = createAlert("Please enter a valid quantity!");
   
    return;
  }

  let products = JSON.parse(localStorage.getItem('products')) || [];
  const selectedProduct = products.find(p => p.id === product);

  if (selectedProduct.quantity < sellQuantity) {
    msg.innerHTML = createAlert("Insufficient stock.!");
    
    return;
  }

  selectedProduct.quantity -= sellQuantity;
  localStorage.setItem('products', JSON.stringify(products));
  populateProductDropdown();  // Refresh dropdown in case stock is updated
  availableQuantityInput.value = selectedProduct.quantity; // Update available quantity display

  if (!name || !email ||  !location || !product || !quantity || !price || !date) {
    msg.innerHTML = createAlert("All Fields Are Required!");
    return;
  }

  let oldData = JSON.parse(localStorage.getItem("sells")) || [];

  oldData.push({
    id: createID(),
    name,
    email,
    location,
    product,
    quantity,
    price,
    date,
    createdAt: Date.now(),
    updatedAt: null,
  });

  localStorage.setItem("sells", JSON.stringify(oldData));
 alert('Product Sold!');
  sellCreateForm.reset();
  btnClose.forEach(item => item.click());
  getAllSells();
};

// Show single sell data
const showSingleSell = (id) => {
  const sellData = JSON.parse(localStorage.getItem("sells")).find(item => item.id === id);

  if (!sellData) 
    return;

  const { name, email,  location, product, quantity, price, date } = sellData;

  singleSellData.innerHTML = `
    <table>
      <tr><td>Cus Name</td><td>${name}</td></tr>
      <tr><td>Customer Email</td><td>${email}</td></tr>
      <tr><td>Customer Location</td><td>${location}</td></tr>
      <tr><td>Product</td><td>${product}</td></tr>
      <tr><td>Quantity</td><td>${quantity}</td></tr>
      <tr><td>Price</td><td>${price}</td></tr>
      <tr><td>Date</td><td>${date}</td></tr>
    </table>`;
};

// Delete single data
const deleteSell = (id) => {
  if (confirm("Are You Sure!")) {
    let sells = JSON.parse(localStorage.getItem("sells")) || [];
    sells = sells.filter(item => item.id !== id);
    localStorage.setItem("sells", JSON.stringify(sells));
    getAllSells();
  }
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  getAllSells();
  populateProductDropdown();
});
