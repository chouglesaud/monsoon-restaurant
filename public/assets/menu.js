let clipart = document.querySelectorAll(".clipart");
let Add_Remove = document.querySelectorAll(".add-remove button");
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
