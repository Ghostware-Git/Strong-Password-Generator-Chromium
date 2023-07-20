var lastCopy;

function generatePass(max) {
  let filters = checkSelectedFilters();
  if (filters.length == 0) {
    showNotif("Please select at least 1 filter!");
    return document.querySelector("#output").value;
  }
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const sym = "!@#$%^&*()_+-=";
  let chars = "";
  if (filters.length == 4) {
    chars = upper + lower + nums + sym;
  } else {
    if (filters.includes(0)) chars += upper;
    if (filters.includes(1)) chars += lower;
    if (filters.includes(2)) chars += nums;
    if (filters.includes(3)) chars += sym;
  }
  let out = "";
  for (let i = 0; i < max; i++) {
    out += chars[Math.floor(Math.random() * chars.length - 1 + 1)];
  }
  return out;
}

function generate() {
  const inp = document.querySelector("#txtMain");
  if (inp.value > 50 || inp.value < 1) {
    inp.value = 15;
    showNotif("Invalid length value! Please enter from 1 to 50.");
    return;
  }
  document.querySelector("#output").value = generatePass(inp.value);
}

function copy() {
  const text = document.querySelector("#output").value;
  navigator.clipboard.writeText(text).then(
    function () {
      showNotif("Copied!");
    },
    function (err) {
      console.error("Could not copy text: ", err);
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#btnGen").onclick = generate;
  document.querySelector("#btnCopy").onclick = copy;
  document.querySelectorAll(".checkBtn").forEach(function (item) {
    item.addEventListener("click", function () {
      checkBtnClicked(item);
    });
  });
  generate();
});

function checkSelectedFilters() {
  var checks = document.querySelectorAll(".checkBtn");
  list = [];
  for (let i = 0; i < 4; i++) {
    if (checks[i].classList.contains("checkBtn-selected")) {
      list.push(i);
    }
  }
  return list;
}

function checkBtnClicked(btn) {
  if (btn.classList.contains("checkBtn-selected")) {
    btn.classList.remove("checkBtn-selected");
  } else {
    btn.classList.add("checkBtn-selected");
  }
}

function showNotif(text) {
  if (lastCopy != null) clearTimeout(lastCopy);
  let el = document.querySelector("#notif");
  el.innerHTML = text;
  el.style.opacity = 1;
  lastCopy = setTimeout(function () {
    el.style.opacity = 0;
  }, 3000);
}
