let apiData = "http://localhost:3000/api/products/";
let kanapUrl = new URL(window.location.href);
let kanapId = kanapUrl.searchParams.get("id");
// ideally generate by server
let key = "key";

// requète GET à l'api pour récuperer des données
async function getData(url) {
  let data = await fetch(url)
    .then((data) => {
      return data.json();
    })
    .catch((error) => console.log(error));
  return data;
}

//affiche les détails du produit
async function printKanap() {
  // je passe l'id de mon produit dans l'url pour récupérer les infos de ce produit spécifique
  let kanapData = await getData(apiData + kanapId);

  let kanapImg = document.getElementsByClassName("item__img")[0];
  const kanapImgElement = document.createElement("img");
  kanapImgElement.src = kanapData.imageUrl;
  kanapImgElement.alt = kanapData.altTxt;
  kanapImg.appendChild(kanapImgElement);

  let kanapTitle = document.getElementById("title");
  kanapTitle.innerText = kanapData.name;

  let kanapPrice = document.getElementById("price");
  kanapPrice.innerText = kanapData.price;

  let kanapDescription = document.getElementById("description");
  kanapDescription.innerText = kanapData.description;

  let kanapColors = document.getElementById("colors");
  for (color of kanapData.colors) {
    let newColor = document.createElement("option");
    newColor.value = color;
    newColor.innerText = color;
    kanapColors.appendChild(newColor);
  }
}

// envoie les infos au localStorage suite à un événement click
function addToCart() {
  let cartButton = document.getElementById("addToCart");
  cartButton.addEventListener("click", saveInfo);
}

// recupere le panier dans localStorage
function getCart() {
  if (localStorage.getItem(key) === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

// vérifie et récupère les input de l'utilisateur
function getInput() {
  let kanapColors = document.getElementById("colors").value;
  let kanapQuantity = document.getElementById("quantity").value;

  if (kanapQuantity.match(/^[0-9]+$/) == null) {
    alert("la sélèction quantité ne doit pas prendre de caractères !");
    return 0;
  } else kanapQuantity = parseInt(kanapQuantity);

  if (kanapColors == "" || kanapQuantity < 1 || kanapQuantity > 100) {
    alert("valeurs incorect !!");
    return 0;
  }

  let object = {
    color: kanapColors,
    quantity: kanapQuantity,
    // itemcheck permet d'identifier les produits selon leur type et leur couleur
    itemCheck: kanapId + kanapColors,
  };
  return object;
}

// stock les infos sur localStorage
function saveInfo() {
  if ((input = getInput()) === 0) return;
  let cart = getCart();
  let index = cart.findIndex((object) => {
    return object.itemCheck == input.itemCheck;
  });

  if (index === -1) {
    let kanapObject = {
      itemCheck: input.itemCheck,
      id: kanapId,
      color: input.color,
      quantity: input.quantity,
    };
    cart.push(kanapObject);
  } else cart[index].quantity += input.quantity;

  localStorage.setItem(key, JSON.stringify(cart));
  alert("votre produit à bien été ajouté au panier");
}

printKanap();
addToCart();
