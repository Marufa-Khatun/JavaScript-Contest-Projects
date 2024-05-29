const incomeCreateForm = document.getElementById("income-create-form");
const incomeUpdateForm = document.getElementById("income-update-form");
const incomeDataList = document.getElementById("income-data-list");
const singleIncomeData = document.querySelector(".income-data");
const btnClose = document.querySelectorAll(".btn-close");
const msg = document.querySelector(".msg");



const getAllIncomes = () => {
  // get all data form local storage
  const data = JSON.parse(localStorage.getItem("incomes"));

  let listData = "";
  let totalIncome = 0; // Initialize the total income

  if (data) {
    data.reverse().map((item, index) => {
      totalIncome += parseFloat(item.amount); // Accumulate the income amounts

      listData += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.relationship}</td>
          <td>${item.source}</td>
          <td>${item.date}</td>
          <td>${item.amount}</td>
          <td>${timeIs(item.createdAt)}</td>
          <td>
            <button data-bs-toggle="modal" data-bs-target="#income-show" onclick="showSingleIncome('${item.id}')" class="btn btn-sm btn-info"><i class="fa fa-eye"></i></button>
            <button onclick="incomeUpdate('${item.id}')" data-bs-toggle="modal" data-bs-target="#income-update" class="btn btn-sm btn-warning"><i class="fa fa-edit"></i></button>
            <button onclick="deleteIncome('${item.id}')" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
          </td>
        </tr>`;
    });
  }

  incomeDataList.innerHTML = listData;

  // Update the total income in the HTML
  localStorage.setItem('totalIncome', totalIncome.toFixed(2));
  document.getElementById("total-income").innerText = ` ${totalIncome.toFixed(2)} tk`;
  // Read total income and expense from localStorage
let totalIncm = parseFloat(localStorage.getItem('totalIncome')) || 0;
let totalExpns = parseFloat(localStorage.getItem('totalExpense')) || 0;

// Calculate final amount
let finalAmount = totalIncm - totalExpns;

// Display the final amount
document.getElementById("final-amount").innerText = `${finalAmount.toFixed(2)} tk`;
};
getAllIncomes();


//submit income create form

incomeCreateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  if (
    !data.name ||
    !data.relationship ||
    !data.source ||
    !data.amount ||
    !data.date
  ) {
    msg.innerHTML = createAlert("All Fields Are Required!");
  } else {
    // Check Old Data Exists or Not

    let oldData = [];
    if (localStorage.getItem("incomes")) {
      oldData = JSON.parse(localStorage.getItem("incomes"));
    }

    // push new data
    oldData.push({
      ...data,
      id: createID(),
      createdAt: Date.now(),
      updatedAt: null,
    });
    //send Data to LS
    localStorage.setItem("incomes", JSON.stringify(oldData));
    e.target.reset();
    btnClose.forEach((item) => item.click());
    getAllIncomes();
  }
};

//view income data

const showSingleIncome = (id) => {
  const { name, relationship, source, amount, date } = getSingledata(
    "incomes",
    id
  );

  singleIncomeData.innerHTML = `
  
  <table>
                      
  <tr>
    <td>Name</td>
    <td>${name}</td>
  </tr>
  <tr>
    <td>Relationship</td>
    <td>${relationship}</td>
  </tr>
  <tr>
    <td>Income Source</td>
    <td>${source}</td>
  </tr>
  <tr>
    <td>Amount</td>
    <td>${amount}tk</td> 
  </tr>
  <tr>
    <td>Date</td>
    <td>${date}</td>
  </tr>
  
</table>`;
};

//Delete Single Data
const deleteIncome = (id) => {
  const conf = confirm("Are You Sure!");
  if (conf) {
    deleteSingleData("incomes", id);
    getAllIncomes();
  }
};

//Update SIngle Income Data

const incomeUpdate = (id) => {
  const data = JSON.parse(localStorage.getItem("incomes"));
  const { name, relationship, source, amount, date } = data.find(
    (data) => data.id == id
  );

  incomeUpdateForm.querySelector('input[placeholder="Name"]').value = name;
  incomeUpdateForm.querySelector('input[placeholder="Relationship"]').value =
    relationship;
  incomeUpdateForm.querySelector('input[placeholder="Income Source"]').value =
    source;
  incomeUpdateForm.querySelector('input[placeholder="Amount"]').value = amount;
  incomeUpdateForm.querySelector('input[placeholder="Date"]').value = date;
  incomeUpdateForm.querySelector('input[placeholder="ID"]').value = id;
};

//edit Post

incomeUpdateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const { name, relationship, source, amount, date,id } =
    Object.fromEntries(form_data);
  const data = JSON.parse(localStorage.getItem("incomes"));

  const updateData = data.map((item) => {
    if (item.id == id) {
      return {
        ...item,
        name,
        relationship,
        source,
        amount,
        date,
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("incomes", JSON.stringify(updateData));

  btnClose.forEach((item) => item.click());
    getAllIncomes();
};
