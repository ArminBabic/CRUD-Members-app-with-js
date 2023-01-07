function save() {
  contactList = JSON.parse(localStorage.getItem("listItem")) ?? [];
  let optionType;

  const checkType = () => {
    if (document.getElementById("regularni").checked) {
      optionType = document.getElementById("regularni").value;
    } else if (document.getElementById("povlasceni").checked) {
      optionType = document.getElementById("povlasceni").value;
    }
    console.log(optionType);
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
        value.regularni = document.getElementById("regularni").checked;
        value.povlasceni = document.getElementById("povlasceni").checked;
      }
    });

    //remove hidden input
    document.getElementById("id").value = "";
  } else {
    //save
    //get data from form
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
}
