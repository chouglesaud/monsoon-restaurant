let table = document.querySelector("table");
let price = document.querySelector(".price p");
$.ajax({
  method: "GET",
  url: "/order",
  dataType: "json",
  success: function(data) {
    console.log(data.data.order);
    let length = data.data.order.length;
    console.log(length);
    let payment = 0;
    for (let i = 0; i < length; i++) {
      payment += data.data.order[i].price;
      table.innerHTML += `<tr><td>${data.data.order[i].name}</td><td>${
        data.data.order[i].price
      }</td></tr>`;
    }
    price.innerHTML += `Total: Rs ${payment}/-`;

    // data.data.order.forEach(el => {
    //   table.innerHTML += `<tr><td>${el.name}</td><td>${el.price}</td></tr>`;
    // });
    // let store = $.parseJSON(data);
    // console.log(store);
  }
});
