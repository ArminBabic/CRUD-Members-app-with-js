function removeData(id) {
  contactList = JSON.parse(localStorage.getItem("listItem")) ?? [];

  contactList = contactList.filter(function (value) {
    return value.id != id;
  });

  // save array into localstorage
  localStorage.setItem("listItem", JSON.stringify(contactList));

  //get data again
  allData();
}
