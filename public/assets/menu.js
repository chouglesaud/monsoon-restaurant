let clipart = document.querySelectorAll(".clipart");
let Add_Remove = document.querySelectorAll(".add-remove button");
let orderbtn = document.querySelector(".order");
let tablenumber = document.querySelector(".myform");

Add_Remove.forEach(btn => {
  btn.innerHTML = "ADD";
  btn.addEventListener("click", () => {
    if (btn.innerHTML == "ADD") {
      btn.innerHTML = "R";
      btn.style.backgroundColor = "#cb2b2b";
      btn.style.color = "#fff";
    } else {
      btn.innerHTML = "ADD";
      btn.style.backgroundColor = "#5cb85c";
      btn.style.color = "#fff";
    }
  });
});

clipart.forEach(el => {
  el.addEventListener("click", function(e) {
    el.classList.toggle("toggled");
    if (e.target.nodeName == "DIV") {
      let parent = e.target.parentElement;
      let child = parent.childNodes;
      child[3].classList.toggle("toggled1");
    } else {
      let parent = e.target.parentElement;
      let sibling = parent.nextElementSibling;
      sibling.classList.toggle("toggled1");
    }
  });
});

orderbtn.addEventListener("click", () => {
  let store = tablenumber.value;
  console.log(store);

  let btnValue = Add_Remove.innerHTML;
  let i = 0;
  let array = [];

  Add_Remove.forEach(button => {
    if (button.innerHTML == "R") {
      let store = button.parentElement;
      let Strprice = store.previousElementSibling.children[0].innerHTML.split(
        "Rs"
      );
      let name =
        store.previousElementSibling.previousElementSibling.children[0]
          .innerHTML;
      let price = parseInt(Strprice[0], 10);

      array[i] = { name: name, price: price };
      i++;
    }
    let store = tablenumber.value;
  });
  if (array.length < 1 && store === null) {
    alert("Sir, you have't select any order");
  } else {
    $.ajax({
      method: "POST",
      url: "/tablenumber",
      data: { store: store },
      success: function(data) {
        console.log(data);
      }
    });
    $.ajax({
      method: "POST",
      url: "/order",
      contentType: "application/json",
      data: JSON.stringify(array),
      success: function(data) {
        console.log(data);
      }
    });
  }
});
