"use strict";

// La date du jour
const dateNow = moment();
dateNow.locale("fr");
const datePos = document.getElementById("date-moment");
datePos.prepend(dateNow.format("dddd D MMMM YYYY"));

let filterCategory = "toutes";
let compteur = 0;

console.log("toutes les categories", entries);
console.log("categories uniques", uniqueCategory);

// fonction permettant d'afficher une liste de toutes les cards de veilles
function insertVeilles() {
  const ulEl = document.createElement("ul");
  const gridContainer = document.getElementById("section-content");
  ulEl.classList.add("list-unstyled");
  const filterEntries = entries.filter((el) => {
    // on utilise ici filterCategory pour classer les catégories
    if (filterCategory === "toutes") {
      return true;
    } else {
      return el.category.includes(filterCategory);
    }
  });
  // boucle qui créée une card pour chaque veille
  for (let veille of filterEntries) {
    console.log(veille);
    const li = document.createElement("li");
    const dateFormat = moment(veille.date, "DD/MM/YYYY")
      .locale("fr")
      .format("dddd DD/MM/YYYY");
    li.classList.add("card", "shadow-sm", "p-3", "mb-3");
    li.innerHTML = `<div class="card-body">
      <h2 class="card-title mb-2">${veille.subject}</h2>
      <div class="badge bg-primary p-1 mb-2">${veille.category}</div>
      <p class="card-text"><time datetime="${veille.date}">${dateFormat}</time></p>
  </div>`;
    ulEl.append(li);
    // boucle permettant l'alternance de bg des veilles
    compteur += 1;
    if (compteur % 2 == 0) {
      li.classList.add("bg-light");
    }
  }
  gridContainer.innerHTML = ""; // remet ul vide avant de réexecuter une action dessus
  gridContainer.append(ulEl); // place les li
}

insertVeilles();

// fonction permettant d'insérer des options par genre de catégories et d'exécuter cette dernière en fonction de "insertVeilles()"
function activateFilterByCategory() {
  const selectEL = document.getElementById("inputClassify");
  uniqueCategory.sort(); // trie "uniqueCategory" par ordre alphabétique
  console.log(uniqueCategory);
  console.log(selectEL);
  // boucle qui renvoie une option par élément dans "uniqueCategory"
  for (let tag of uniqueCategory) {
    const option = document.createElement("option");
    option.textContent = tag;
    option.value = tag;
    console.log(option);
    selectEL.append(option);
  }
  selectEL.addEventListener("change", () => {
    console.dir(selectEL);
    filterCategory = selectEL.value;
    insertVeilles();
    console.log(filterCategory);
  });
}

activateFilterByCategory();

// fonction pour trier les veilles de a à z, de z à a, par date -> avec onchange
function selectOption(val) {
  if (val.value == "sort-az") {
    entries.sort(function (a, b) {
      if (a.subject < b.subject) {
        return -1;
      }
      if (a.subject > b.subject) {
        return 1;
      }
      return 0;
    });
  } else if (val.value == "sort-za") {
    entries.sort(function (a, b) {
      if (a.subject < b.subject) {
        return 1;
      }
      if (a.subject > b.subject) {
        return -1;
      }
      return 0;
    });
  } else if (val.value == "sort-date") {
    const dateFormat = "DD/MM/YYYY";
    const filterEntriesByDate = entries.sort(
      (a, b) => moment(a.date, dateFormat) - moment(b.date, dateFormat)
    );
  }
  insertVeilles();
}

// fonction qui retourne un array des veilles à venir
function entriesToCome(list) {
  const dateFormat = "DD/MM/YYYY";
  let listEntriesToCome = [];
  list.forEach((el) => {
    if (moment(el.date, dateFormat) > moment(dateNow, dateFormat)) {
      listEntriesToCome.push(el);
    }
  });
  return listEntriesToCome;
}

// fonction permettant d'afficher une liste de toutes les cards de veilles à venir
// Poosibilité de simplifier le code avec insertVeilles() - A voir
function insertVeillesAvenir() {
  const ulEl = document.createElement("ul");
  const dateFormat = "DD/MM/YYYY";
  // const dateFormat = moment(veilles.date, "DD/MM/YYYY").locale("fr").format("dddd DD/MM/YYYY");
  // const dateFormat = moment(veille.date, "DD/MM/YYYY")
  const gridContainer = document.getElementById("section-content");
  ulEl.classList.add("list-unstyled");
  //const filterV = entries.filter((el) => {
  let listVeillesavenir = [];
  entries.forEach((el) => {
    if (moment(el.date, dateFormat) > moment(dateNow, dateFormat)) {
      listVeillesavenir.push(el);
    }
  });
  const filterV = listVeillesavenir;

  let compteur = 0;
  for (let veille of filterV) {
    console.log(veille);
    const dateFormat1 = moment(veille.date, "DD/MM/YYYY")
      .locale("fr")
      .format("dddd DD/MM/YYYY");
    //const dateFormat = "dddd DD/MM/YYYY";
    // const dateFormat = moment(veille.date, "DD/MM/YYYY")
    // .locale("fr")
    // .format("dddd DD/MM/YYYY");
    const li = document.createElement("li");
    li.classList.add("card", "shadow-sm", "p-3", "mb-3");
    li.innerHTML = `<div class="card-body">
      <h2 class="card-title mb-2">${veille.subject}</h2>
      <div class="badge bg-primary p-1 mb-2">${veille.category}</div>
      <p class="card-text">${dateFormat1}</p>
  </div>`;

    ulEl.append(li);
    compteur += 1;
    if (compteur % 2 == 0) {
      li.classList.add("bg-light");
    }
  }
  gridContainer.innerHTML = "";
  gridContainer.append(ulEl);
}

// fonction pour activer le click sur checkbox
function activateFilterVeillesAvenir() {
  // repérer select
  // boucle pour parcourir uniqueCategory
  const boxEL = document.getElementById("check-btn");
  console.log(boxEL.value);
  console.log(boxEL.checked);
  boxEL.addEventListener("click", () => {
    if (boxEL.checked) {
      console.log(boxEL.checked);
      insertVeillesAvenir();
    } else {
      insertVeilles();
    }
  });
}

activateFilterVeillesAvenir();
