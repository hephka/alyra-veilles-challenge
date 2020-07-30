"use strict";

// La date
const dateNow = moment();
dateNow.locale("fr");
const datePos = document.getElementById("date-moment");
datePos.prepend(dateNow.format("dddd D MMMM YYYY"));

let filterCategory = "toutes";

console.log("toutes les categories", entries);
console.log("categories uniques", uniqueCategory);

function insertVeilles() {
  const ulEl = document.createElement("ul");
  const gridContainer = document.getElementById("section-content");
  ulEl.classList.add("list-unstyled");
  const filterEntries = entries.filter((el) => {
    // on utilise ici filterCategory
    if (filterCategory === "toutes") {
      return true;
    } else {
      return el.category.includes(filterCategory);
    }
  });
  for (let veille of filterEntries) {
    console.log(veille);
    const li = document.createElement("li");
    li.innerHTML = `<div class="card p-3 mb-3 shadow">
    <div class="card-body">
        <h2 class="card-title mb-2">${veille.subject}</h2>
        <div class="badge bg-primary p-1 mb-2">${veille.category}</div>
        <p class="card-text">${veille.date}</p>
        </div>
      </div>`;
    ulEl.append(li);
  }
  gridContainer.innerHTML = "";
  gridContainer.append(ulEl);
}

insertVeilles();
/*
function activateFilterByCategory() {
  // repérer select
  // boucle pour parcourir uniqueCategory
  const selectEL = document.getElementById("inputClassify");
  // trier uniqueCategory dans l'ordre alphabétique
  uniqueCategory.sort();
  console.log(uniqueCategory);
  console.log(selectEL);
  for (let tag of uniqueCategory) {
    const option = document.createElement("option");
    option.textContent = category;
    option.value = category;
    console.log(option);
    selectEL.append(option);
  }
  selectEL.addEventListener("change", () => {
    console.dir(selectEL);
    filterEntries = selectEL.value;
    insertGradients();
    console.log(filterEntries);
  });
}

activateFilterByCategory();
*/
