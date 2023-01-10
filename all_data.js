//method to get all data
let number1 = Math.round(Math.random() * 10);
let number2 = Math.round(Math.random() * 10);
let operatorsPicker = Math.round(Math.random() * 3);
let operators = ["+", "-", "*", "/"];
let operator = operators[operatorsPicker];

function clearData() {
  document.getElementById("form").reset();
  document.getElementById("id").value = "";
}

function allData() {
  table.innerHTML = ``;
  //get data from localstorage and store to contaclist array
  //we must to use JSON.parse, because data as string, we need convert to array

  contactList = JSON.parse(localStorage.getItem("listItem")) ?? [];

  //looping data and show data in table
  contactList.forEach(function (value, i) {
    var table = document.getElementById("table");
    let membership;

    if (value.options === "regularni") {
      membership = 3000;
    } else if (value.options === "povlasceni") {
      membership = 3000 - (3000 * 20) / 100;
    }

    table.innerHTML += `
                    <tr>
                        
                        <td>${value.ID}</td>
                        <td>${value.name}</td>
                        <td>${value.age}</td>
                        <td>${value.address}</td>
                        <td>${value.options}</td>
                        <td>${membership}</td>
                        <td>
                            <button class="btn btn-sm btn-success" onclick="find(${value.id})">
                                <i class="fa fa-edit"></i>
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="removeData(${value.id})">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
  });
}

function save() {
  contactList = JSON.parse(localStorage.getItem("listItem")) ?? [];
  let optionType;

  const checkType = () => {
    if (document.getElementById("regularni").checked) {
      optionType = document.getElementById("regularni").value;
    } else if (document.getElementById("povlasceni").checked) {
      optionType = document.getElementById("povlasceni").value;
    }
    return optionType;
  };
  checkType();

  var id;
  contactList.length != 0
    ? contactList.findLast((item) => (id = item.id))
    : (id = 0);

  if (document.getElementById("id").value) {
    //edit contactlist array based on value
    contactList.forEach((value) => {
      if (document.getElementById("id").value == value.id) {
        (value.ID = document.getElementById("ID").value),
          (value.name = document.getElementById("name").value),
          (value.age = document.getElementById("age").value),
          (value.address = document.getElementById("address").value);
        value.options = optionType;
      }
    });

    document.getElementById("id").value = "";

    ////////////////////
  } else {
    if (document.getElementById("ID").value === "") {
      document.querySelector(".ID-error").style.display = "block";
      return;
    } else {
      document.querySelector(".ID-error").style.display = "none";
    }
    if (document.getElementById("name").value.length < 6) {
      document.querySelector(".name-error").style.display = "block";
      return;
    } else {
      document.querySelector(".name-error").style.display = "none";
    }

    if (
      document.getElementById("age").value.trim() < 0 ||
      document.getElementById("age").value.trim() > 2023 ||
      document.getElementById("age").value.trim() === ""
    ) {
      document.querySelector(".year-error").style.display = "block";
      return;
    } else {
      document.querySelector(".year-error").style.display = "none";
    }

    if (!document.getElementById("address").value.includes("@")) {
      document.querySelector(".email-error").style.display = "block";
      return;
    } else {
      document.querySelector(".email-error").style.display = "none";
    }

    if (!optionType) {
      document.querySelector(".type-error").style.display = "block";
      return;
    } else {
      document.querySelector(".type-error").style.display = "none";
    }
    const timeH = document.querySelector(".time");
    let timer = () => {
      let timeSecond = 30;

      timeH.style.display = "block";

      ////////////////////////////////////////
      displayTime(timeSecond);

      const countDown = setInterval(() => {
        timeSecond--;
        displayTime(timeSecond);
        if (timeSecond == 0 || timeSecond < 1) {
          endCount();
          clearInterval(countDown);
        }
      }, 1000);

      function displayTime(second) {
        const min = Math.floor(second / 60);
        const sec = Math.floor(second % 60);
        timeH.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
      }

      function endCount() {
        alert("Zao nam je vrijeme je isteklo!");
        location.reload();
      }
    };
    timer();
    document.querySelector(".brojevi").innerHTML =
      number1 + operator + number2 + "=";
    document.querySelector(".inputfield").style.display = "block";

    ///////////////////////////////////////////////

    let inputValue = document.querySelector(".inputfield").value;

    let result;

    if (!inputValue == "") {
      switch (operatorsPicker) {
        case 0:
          console.log(number1 + number2);
          result = number1 + number2;
          break;
        case 1:
          console.log(number1 - number2);
          result = number1 - number2;
          break;
        case 2:
          console.log(number1 * number2);
          result = number1 * number2;
          break;
        case 3:
          console.log(number1 / number2);
          result = number1 / number2;
          break;
      }
      let finalresult = result == inputValue;
      if (!finalresult) {
        alert("zao nam je rezultat je netacan!");
        location.reload();
        return;
      } else {
      }
    } else {
      alert("molimo unesite rezultat");
      return;
    }

    var item = {
      id: id + 1,
      ID: document.getElementById("ID").value,
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      address: document.getElementById("address").value,
      options: optionType,
    };

    //add item data to array contactlist
    contactList.push(item);
  }

  // save array into localstorage

  localStorage.setItem("listItem", JSON.stringify(contactList));

  //update table list
  allData();
  document.getElementById("ID").style.display = "block";

  //remove form data
  document.getElementById("form").reset();
  location.reload();
}
