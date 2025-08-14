const container = document.getElementById("container");

function handleSubmit() {
  let msg = document.getElementById("msg_ref");
  let name = document.getElementById("name").value;
  let profession = document.getElementById("profession").value;
  let age = document.getElementById("age").value;
  let result = [];

  let currentId = parseInt(localStorage.getItem("employeeIdCounter")) || 1;

  if (name === "" || profession === "" || age === "") {
    msg.innerHTML = `<span class="msg_error">Error: Please Make sure All the fields are filled before adding in an employee!</span>`;
    return;
  } else {
    msg.innerHTML = `<span class="nsg_success">Success: Employee Added</span>`;
  }

  let localData = JSON.parse(localStorage.getItem("data"));

  result.push({ _id: currentId, name: name, profession: profession, age: age });

  if (localData) {
    localStorage.setItem("data", JSON.stringify([...localData, ...result]));
  } else {
    localStorage.setItem("data", JSON.stringify([...result]));
  }

  localStorage.setItem("employeeIdCounter", currentId + 1);

  createElement();
  document.getElementById("name").value = "";
  document.getElementById("profession").value = "";
  document.getElementById("age").value = "";
}

function handleDelete(id) {
  let resultData = JSON.parse(localStorage.getItem("data"));
  let res = resultData.filter((val) => val._id !== id);
  localStorage.setItem("data", JSON.stringify(res));
  createElement();
}

function createElement() {
  let resultData = JSON.parse(localStorage.getItem("data"));

  if (resultData && resultData.length > 0) {
    container.innerHTML = resultData
      .map((val) => {
        return `<div class="list_box">
      <div class="paraContainer">  
      <p>${val._id}.</p>  
      <p>Name : ${val.name}</p>
      <p>Profession : ${val.profession}</p>
      <p>Age : ${val.age}</p>
      </div>
      <button onclick="handleDelete(${val._id})">Delete user</button>
    </div>`;
      })
      .join("");
  } else {
    container.innerHTML = `<div class="data_not_found">You have 0 employees</div>`;
  }
}

createElement();
