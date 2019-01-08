let table = document.querySelector("table");
let price = document.querySelector(".price p");
let tableno = document.querySelector(".order");

$.ajax({
  method: "GET",
  url: "/order",
  dataType: "json",
  success: function(data) {
    console.log(data.data.order);

    let length = data.data.order.length;
    let payment = 0;
    for (let i = 0; i < length; i++) {
      payment += data.data.order[i].price;
      table.innerHTML += `<tr><td>${data.data.order[i].name}</td><td>${
        data.data.order[i].price
      }</td></tr>`;
    }
    price.innerHTML += `Total: ${payment} Rs/-`;
    tableno.innerHTML += `TABLE: ${data.data.tablenumber}`;
  }
});
tableno.style.fontSize = "24px";
tableno.style.fontFamily = "Cabin, sans - serif";
tableno.style.textTransform = "uppercase;";
tableno.style.fontColor = "#861313";
tableno.style.textAlign = "center";
