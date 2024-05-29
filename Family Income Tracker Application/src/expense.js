const expenseCreateForm = document.getElementById("expense-create-form");
const expenseUpdateForm = document.getElementById("expense-update-form");
const expenseDataList = document.getElementById("expense-data-list");
const singleExpenseData = document.querySelector(".expense-data");
const btnClose = document.querySelectorAll(".btn-close");
const msg = document.querySelector(".msg");


const getAllExpenses = () => {
  // get all data form local storage
  const data = JSON.parse(localStorage.getItem("expenses"));

  let listData = "";
  let totalExpense = 0; // Initialize the total Expense

  if (data) {
    data.reverse().map((item, index) => {
        totalExpense += parseFloat(item.amount); // Accumulate the expense amounts

      listData += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.reason}</td>
          <td>${item.amount}</td>
          <td>${item.date}</td>
          <td>${timeIs(item.createdAt)}</td>
          <td>
            <button data-bs-toggle="modal" data-bs-target="#expense-show" onclick="showSingleExpense('${item.id}')" class="btn btn-sm btn-info"><i class="fa fa-eye"></i></button>
            <button onclick="expenseUpdate('${item.id}')" data-bs-toggle="modal" data-bs-target="#expense-update" class="btn btn-sm btn-warning"><i class="fa fa-edit"></i></button>
            <button onclick="deleteExpense('${item.id}')" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
          </td>
        </tr>`;
    });
  }

  expenseDataList.innerHTML = listData;

  // Update the total expense in the HTML
  localStorage.setItem('totalExpense', totalExpense.toFixed(2));
  document.getElementById("total-expense").innerText = ` ${totalExpense.toFixed(2)} tk`;
};
getAllExpenses();





//submit expense create form

expenseCreateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  if (
    !data.reason ||
    !data.amount ||
    !data.date
  ) {
    msg.innerHTML = createAlert("All Fields Are Required!");
  } else {
    // Check Old Data Exists or Not

    let oldData = [];
    if (localStorage.getItem("expenses")) {
      oldData = JSON.parse(localStorage.getItem("expenses"));
    }

    // push new data
    oldData.push({
      ...data,
      id: createID(),
      createdAt: Date.now(),
      updatedAt: null,
    });
    //send Data to LS
    localStorage.setItem("expenses", JSON.stringify(oldData));
    e.target.reset();
    btnClose.forEach((item) => item.click());
    getAllExpenses();
  }
};

//view income data

const showSingleExpense = (id) => {
  const { reason, amount, date } = getSingledata("expenses", id);

  singleExpenseData.innerHTML = `
  
  <table>
                      
  <tr>
    <td>Name</td>
    <td>${reason}</td>
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
const deleteExpense = (id) => {
  const conf = confirm("Are You Sure!");
  if (conf) {
    deleteSingleData("expenses", id);
    getAllExpenses();
  }
};

//Update SIngle Expense Data

const expenseUpdate = (id) => {
  const data = JSON.parse(localStorage.getItem("expenses"));
  const { reason, amount, date } = data.find(
    (data) => data.id == id
  );

  expenseUpdateForm.querySelector('input[placeholder="Reasons for expenses"]').value = reason;
  expenseUpdateForm.querySelector('input[placeholder="Expense Amount"]').value =
    amount;
  expenseUpdateForm.querySelector('input[placeholder="Date"]').value =
    date;
 
  expenseUpdateForm.querySelector('input[placeholder="ID"]').value = id;
};

//edit Post

expenseUpdateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const { reason, amount, date,id } =
    Object.fromEntries(form_data);
  const data = JSON.parse(localStorage.getItem("expenses"));

  const updateData = data.map((item) => {
    if (item.id == id) {
      return {
        ...item,
       reason,
        amount,
        date,
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("expenses", JSON.stringify(updateData));

  btnClose.forEach((item) => item.click());
  getAllExpenses();
};
