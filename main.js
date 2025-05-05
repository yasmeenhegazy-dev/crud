let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let searchMood = "title";
let tmp;

let products;

if (localStorage.length > 0) {
  products = JSON.parse(localStorage.products);
} else {
  products = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProduct.count < 100
  ) {
    if (mood == "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; ++i) {
          products.push(newProduct);
        }
      } else {
        products.push(newProduct);
      }
    } else {
      products[tmp] = newProduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("products", JSON.stringify(products));

  showData();
};

function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "rgb(58, 163, 58)";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(176, 13, 13)";
  }
}

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.background = "rgb(176, 13, 13)";
}

function showData() {
  let table = "";

  for (let i = 0; i < products.length; ++i) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
      </tr>
    `;
  }

  let tbody = document.getElementById("tbody");
  tbody.innerHTML = table;
  let deleteBtn = document.getElementById("deleteAll");

  if (products.length > 0) {
    deleteBtn.innerHTML = `<button id="deleteAll" onclick="deleteAll()">delete All (${products.length})</button>`;
  } else {
    deleteBtn.innerHTML = "";
  }
}

showData();

function deleteData(i) {
  products.splice(i, 1);
  localStorage.products = JSON.stringify(products);
  showData();
}

function deleteAll() {
  localStorage.clear();
  products.splice(0);
  showData();
}

function updateData(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  getTotal();

  count.style.display = "none";
  category.value = products[i].category;

  submit.innerHTML = "Update";

  mood = "update";
  tmp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search by " + searchMood;
  search.focus();

  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < products.length; ++i) {
    if (searchMood == "title") {
      if (products[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
          </tr>
        `;
      }
    } else {
      if (products[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
          </tr>
        `;
      }
    }
  }
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = table;
}