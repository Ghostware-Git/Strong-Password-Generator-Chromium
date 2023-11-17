/** Storage IDs of buttons */
const btnIds = ["check_upper", "check_lower", "check_numbers", "check_symbols"];
/** Storage ID of length */
const lenId = "text_length";

/** Manages data storage */
class DataStorage {
  /** Saves given index button state
   * @param {number} index The index of button to save state of
   * @param {boolean} state The state to save
   * @returns {boolean} Boolean indicating if the storage was successful
   */
  saveButtonState(index, state) {
    if (index < 0 || index > 3) return false;
    localStorage.setItem(btnIds[index], state ? 1 : 0);
    return true;
  }

  /** Gets stored state of button at given index
   * @param {number} index The index of button to get state of
   * @returns {boolean} Boolean indicating checked state
   */
  getButtonState(index) {
    if (index < 0 || index > 3) return false;
    return localStorage.getItem(btnIds[index]) !== "0";
  }

  /** Saves given number as length
   * @param {string} length The length to store
   * @returns {boolean} Boolean indicating if the storage was successful
   */
  saveLength(length) {
    const l = parseInt(length);
    if (l.toString() !== length || l < 1 || l > 50) return false;
    localStorage.setItem(lenId, l);
    return true;
  }

  /** Gets saved length data
   * @returns {number} The stored length
   */
  getLength() {
    const length = localStorage.getItem(lenId);
    if (length) {
      const i = parseInt(length);
      if (i.toString() === length) return i;
    }
    return 15;
  }
}

/** Storage instance */
const storage = new DataStorage();

/** Last copied text */
let lastCopy;

/** Generates a password for given max length
 * @param {number} max The maximum length for password
 * @returns {string} The generated password
 */
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

/** Initiates password generation process. Automatically
 * extracts input and sets output text.
 */
function generate() {
  const inp = document.querySelector("#txtMain");
  if (inp.value > 50 || inp.value < 1) {
    inp.value = 15;
    showNotif("Invalid length value! Please enter from 1 to 50.");
    return;
  }
  document.querySelector("#output").value = generatePass(inp.value);
}

/** Copies generated text to clipboard */
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

/** Checks selected filters and returns indexes of
 * selected filters.
 * @returns {number[]} Selected filter indexes
 */
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
/** Selects/deselects given button
 * @param {HTMLElement} btn The button to check
 * @param {number} i Index of the button
 */
    btn.classList.remove("checkBtn-selected");
  } else {
    btn.classList.add("checkBtn-selected");
  }
/** Sets length text to given value
 * @param {number} length Length to set the value to
 *
 */
}

/** Shows given text in notification view
 * @param {string} text The text to show
 */
function showNotif(text) {
  if (lastCopy != null) clearTimeout(lastCopy);
  let el = document.querySelector("#notif");
  el.innerHTML = text;
  el.style.opacity = 1;
  lastCopy = setTimeout(function () {
    el.style.opacity = 0;
  }, 3000);
}
