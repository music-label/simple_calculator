//GET_HTML
const input = document.querySelector(".input");
const clear = document.querySelector(".clear");
const clear_all = document.querySelector(".clear_all");
const ravno = document.querySelector(".ravno");
const minus = document.getElementById("minus");
const krapka = document.getElementById("krapka");
const history = document.querySelector(".history");
const history_div = document.getElementById("history_div");
const close_modal = document.querySelector(".close_modal");
const ul = document.querySelector(".ul");
const tema = document.getElementById("tema");
const calculator_div = document.getElementById("calculator_div");
//GET_HTML

//FUNCTION
function symbol_mouse(cen) {
  if ("-+=*/.".includes(input.value.slice(-1))) {
    input.value = input.value;
  } else {
    input.value += cen.textContent;
  }
}

function symbol_keyboard(cen) {
  if ("-+=*/.".includes(input.value.slice(-1))) {
    if (input.value === "") {
      input.value += minus.textContent;
    } else {
      return;
    }
  } else {
    input.value += cen;
  }
}

function krap() {
  const check = input.value;
  const val = check.split(/[+\-\*\/]/);
  const razdel = val.pop();
  if (!razdel.includes(".")) {
    if (input.value === "" || input.value === "-") {
      return;
    } else if ("-+/*".includes(input.value.slice(-1))) {
      return;
    } else {
      input.value += krapka.textContent;
    }
  }
}

function clr() {
  input.value = input.value.slice(0, -1);
}

const max_value_history = 8;

function ranvo() {
  if (input.value === "") return;
  const vall = input.value;
  const vva = math.evaluate(input.value);
  if (!Number.isInteger(vva)) {
    input.value = vva.toFixed(2);
    const li = document.createElement("li");
    li.style.color = "white";
    li.textContent = vall + " = " + vva.toFixed(2);
    li.classList.add("list_history");
    ul.appendChild(li);
  } else {
    const get_history = localStorage.getItem("value_history");
    input.value = vva;
    const li = document.createElement("li");
    li.textContent = vall + " = " + vva;
    li.classList.add("list_history");
    ul.appendChild(li);
  }

  while (ul.children.length > max_value_history) {
    ul.removeChild(ul.firstChild);
  }
  localStorage.setItem("value_history", ul.innerHTML);
}
//FUNCTION

//EVENTS
document.querySelectorAll(".number").forEach((value) => {
  value.addEventListener("click", () => {
    input.value += value.textContent;
  });
});

document.querySelectorAll(".symbol").forEach((value) => {
  value.addEventListener("click", () => {
    symbol_mouse(value);
  });
});

minus.addEventListener("click", () => {
  if (input.value === "") {
    input.value += minus.textContent;
  }
});

krapka.addEventListener("click", () => {
  krap();
});

clear.addEventListener("click", () => {
  clr();
});

clear_all.addEventListener("click", () => {
  input.value = "";
});

ravno.addEventListener("click", () => {
  ranvo();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    ranvo();
  } else if (event.key === "Backspace") {
    clr();
  } else if ("1234567890".includes(event.key)) {
    input.value += event.key;
  } else if (event.key === ".") {
    krap();
  } else if ("+-*/.".includes(event.key)) {
    symbol_keyboard(event.key);
  }
});

history.addEventListener("click", () => {
  history_div.classList.remove("history_div");
  history_div.classList.add("history_display");
});

close_modal.addEventListener("click", () => {
  history_div.classList.remove("history_display");
  history_div.classList.add("history_div");
});

tema.addEventListener("click", () => {
  calculator_div.classList.toggle("calculator_div_night");
  if (calculator_div.classList.contains("calculator_div_night")) {
    tema.innerHTML = "&#9681;";
    localStorage.setItem("value", "black");
  } else {
    tema.innerHTML = "&#9680;";
    localStorage.setItem("value", "white");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const get_tema = localStorage.getItem("value");
  if (get_tema === "black") {
    calculator_div.classList.toggle("calculator_div_night");
    tema.innerHTML = "&#9681;";
  } else {
    tema.innerHTML = "&#9680;";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const get_history = localStorage.getItem("value_history");
  if (get_history) {
    ul.innerHTML = get_history;
  }
});
//EVENTS
