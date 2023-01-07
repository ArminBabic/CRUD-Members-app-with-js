//method to get all data
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
