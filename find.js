function find(id) {
  contactList = JSON.parse(localStorage.getItem("listItem")) ?? [];

  contactList.forEach(function (value) {
    if (value.id == id) {
      document.getElementById("id").value = value.id;
      document.getElementById("ID").value = value.ID;
      document.getElementById("ID").style.display = "none";
      document.getElementById("name").value = value.name;
      document.getElementById("age").value = value.age;
      document.getElementById("address").value = value.address;

      function check() {
        if (value.options === "regularni") {
          document.getElementById("regularni").checked = true;
        } else if (value.options === "povlasceni") {
          document.getElementById("povlasceni").checked = true;
        }
      }
      check();
    }
  });
}
