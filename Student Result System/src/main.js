 const StudentCreatForm = document.getElementById("student-create-form");
 const StudentUpdateForm = document.getElementById("student-update-form");
const StudentResulttForm = document.getElementById("student-result-form");
const StudentResultViewForm = document.getElementById("student-result-view");
const studentDataList = document.getElementById("student-data-list");
const singleStudentData = document.querySelector(".student-data");
const msg = document.querySelector(".msg");
const btnClose = document.querySelectorAll(".btn-close");



const getAllStudents = () => {
  // get all data form ls
  const data = JSON.parse(localStorage.getItem("students"));
  
  let listData="";
  if (data) {
    data.reverse().map((item, index) => {
      listData += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.roll}</td>
          <td>${item.reg}</td>
          <td>${item.board}</td>
          <td>${timeAgo(item.createdAt)}</td>
          <td>
          ${item.results ?
             ('<button class="btn btn-sm btn-success" onclick="getViewResultData(\''+item.id+'\')" data-bs-toggle="modal" data-bs-target="#student-result-view">View Result</button>'):
          ('<button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#student-result-form" onclick="addStudentResultModal(\''+ item.id + "')\">Add Result</button>")}
          </td>
          <td>
          <button class="btn btn-sm btn-info" onclick="showSingleStudent('${item.id}')" data-bs-toggle="modal" data-bs-target="#student-show"><i class="fa fa-eye"></i></button>
            <button class="btn btn-sm btn-warning" onclick="studentUpdate('${item.id}')" data-bs-toggle="modal" data-bs-target="#student-update"><i class="fa fa-edit"></i></button>
            <button class="btn btn-sm btn-danger"  onclick="deleteStudent('${item.id}')"><i class="fa fa-trash"></i></button>
          </td>
        </tr>`;
    });
  }else{

  }
  studentDataList.innerHTML =listData;
};
getAllStudents();


//Submit Student Create Form
StudentCreatForm.onsubmit=(e)=>{
  e.preventDefault();

  const form_data=new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  if(!data.name || !data.father || !data.mother || !data.dob || !data.roll || !data.reg ||!data.group || 
    !data.type || !data.exam || !data.inst || !data.year || !data.board ){
      msg.innerHTML= createAlert("All Fields Are Required!");
    }else{

      // Check Old Data Exists or Not

      let oldData = [];
    if (localStorage.getItem("students")) {
      oldData = JSON.parse(localStorage.getItem("students"));
    }

    // push new data
    oldData.push({
      ...data,
      id: createID(),
      createdAt: Date.now(),
      updatedAt: null,
      results: null,
    });
//send Data to LS
    localStorage.setItem("students",  JSON.stringify(oldData));
    e.target.reset();
    btnClose.forEach((item)=>item.click());
    getAllStudents();
    }
};

const addStudentResultModal =(id)=>{
  StudentResulttForm.querySelector('input[name="id"]').value = id;
}

//submit Student Result form

StudentResulttForm.onsubmit=(e)=>{
  e.preventDefault();


  //Get Form Data
  const form_data=new FormData(e.target);
  const data=Object.fromEntries(form_data.entries());
  

   // get all student
   const students = JSON.parse(localStorage.getItem("students"));

   // add result
   const updatedData = students.map((item) => {
     if (item.id == data.id) {
       return {
         ...item,
         results: {
           bangla: data.bangla,
           english: data.english,
           math: data.math,
           science: data.science,
           social: data.social,
           religion: data.religion,
         },
       };
     } else {
       return item;
     }
   });
 
   // now update LS
   localStorage.setItem("students", JSON.stringify(updatedData));
 
   e.target.reset();
   btnClose.forEach((item)=>item.click());
   getAllStudents();
 
}

//get view result data

const getViewResultData = (id) => {
  const studentData = JSON.parse(localStorage.getItem("students"));

  const viewData = studentData.find((data) => data.id == id);

  StudentResultViewForm.querySelector('input[name="bangla"]').value =
    viewData.results.bangla;
  StudentResultViewForm.querySelector('input[name="english"]').value =
    viewData.results.english;
  StudentResultViewForm.querySelector('input[name="math"]').value =
    viewData.results.math;
  StudentResultViewForm.querySelector('input[name="social"]').value =
    viewData.results.social;
  StudentResultViewForm.querySelector('input[name="science"]').value =
    viewData.results.science;
  StudentResultViewForm.querySelector('input[name="religion"]').value =
    viewData.results.religion;
    StudentResultViewForm.querySelector('input[name="id"]').value = id;
  
 
};

/* student Result View form submit */


StudentResultViewForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data);

  // update new result
  const oldData = JSON.parse(localStorage.getItem("students"));

  const updateData = oldData.map((item) => {
    if (item.id == data.id) {
      return {
        ...item,
        results: {
          bangla: data.bangla,
          english: data.english,
          math: data.math,
          science: data.science,
          social: data.social,
          religion: data.religion,
        },
      };
    } else {
      return item;
    }
  });
  localStorage.setItem("students", JSON.stringify(updateData));
  btnClose.forEach((item) => item.click());
  getAllStudents();
};



//Student Update 



const studentUpdate = (id) => {
  const data = JSON.parse(localStorage.getItem("students"));
  const { name , father ,mother ,dob ,roll ,reg ,group ,type ,exam ,inst ,year ,board  } = data.find(
    (data) => data.id == id
  );

  StudentUpdateForm.querySelector('input[placeholder="Name"]').value = name;
  StudentUpdateForm.querySelector('input[name="father"]').value =father;
  StudentUpdateForm.querySelector('input[name="mother"]').value = mother;
  StudentUpdateForm.querySelector('input[name="dob"]').value = dob;
  StudentUpdateForm.querySelector('input[name="roll"]').value = roll;
  StudentUpdateForm.querySelector('input[name="reg"]').value = reg;
// Set the radio buttons for group
const groupRadios = StudentUpdateForm.querySelectorAll('input[name="group"]');
groupRadios.forEach((radio) => {
  if (radio.value === group) {
    radio.checked = true;
  }
});

// Set the radio buttons for type
const typeRadios = StudentUpdateForm.querySelectorAll('input[name="type"]');
typeRadios.forEach((radio) => {
  if (radio.value === type) {
    radio.checked = true;
  }
});
  StudentUpdateForm.querySelector('select[name="exam"]').value = exam;
  StudentUpdateForm.querySelector('select[name="inst"]').value = inst;
  StudentUpdateForm.querySelector('select[name="year"]').value = year;
  StudentUpdateForm.querySelector('select[name="board"]').value = board;
  StudentUpdateForm.querySelector('input[placeholder="ID"]').value = id;
};

//edit Post

StudentUpdateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const { name , father ,mother ,dob ,roll ,reg ,group ,type ,exam ,inst ,year ,board,id } =
    Object.fromEntries(form_data);
  const data = JSON.parse(localStorage.getItem("students"));

  const updateData = data.map((item) => {
    if (item.id == id) {
      return {
        ...item,
         name ,
         father ,
         mother ,
         dob ,
         roll ,
         reg ,
         group ,
         type ,
         exam ,
         inst ,
         year ,
         board
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("students", JSON.stringify(updateData));

  btnClose.forEach((item) => item.click());
  getAllStudents();
};



//view Single  Student data

const showSingleStudent = (id) => {
  const { name , father ,mother ,dob ,roll ,reg ,group ,type ,exam ,inst ,year ,board } = getSingledata(
    "students",
    id
  );

  singleStudentData.innerHTML = `
  
  <table>
                      
  <tr>
    <td>Name</td>
    <td>${name}</td>
  </tr>
  <tr>
    <td>Father's Name</td>
    <td>${father}</td>
  </tr>
  
  <tr>
    <td>Mother's Name</td>
    <td>${mother}tk</td> 
  </tr>
  <tr>
  <td>Date of Birth</td>
  <td>${dob}tk</td> 
</tr>
  <tr>
    <td>Roll</td>
    <td>${roll}</td>
  </tr>
  <tr>
  <td>Reg</td>
  <td>${reg}</td>
</tr>
<tr>
<td>Group</td>
<td>${group}</td>
</tr>
<tr>
<td>Type</td>
<td>${type}</td>
</tr>
<tr>
<td>Exam</td>
<td>${exam}</td>
</tr>
<tr>
<td>Institute</td>
<td>${inst}</td>
</tr>
<tr>
<td>Year</td>
<td>${year}</td>
</tr>
<tr>
<td>Board</td>
<td>${board}</td>
</tr>
  
</table>`;
};
    
//Delete Single Data
const deleteStudent = (id) => {
  const conf = confirm("Are You Sure!");
  if (conf) {
    deleteSingleData("students", id);
    getAllStudents();
  }
};


