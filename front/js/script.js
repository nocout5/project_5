// url a passer vers l'api pour récupérer la liste de mes produits
let apiData = "http://localhost:3000/api/products";

// récupère les infos selon l'url passée en paramètre
async function getData(url) {
  // await va me permetre de retourner un objet et non une promesse
  let data = await fetch(url)
    .then((data) => {
      return data.json();
    })
    // affiche les erreur dans la console du navigateur
    .catch((error) => console.log(error));
  return data;
}

// affiche les éléments de l'api sur la page
async function printKanapList() {
  // requète GET vers l'API pour récuppèrer la liste de mes éléments à afficher
  let listOfKanap = await getData(apiData);
  let item = document.getElementById("items");

  for (let kanap of listOfKanap) {
    // boucle qui va parcourir la liste de mes éléments et inserer du contenu HTML

    const kanapLink = document.createElement("a");
    kanapLink.href = `../html/product.html?id=${kanap._id}`;

    const kanapArticle = document.createElement("article");

    const kanapImg = document.createElement("img");
    kanapImg.src = kanap.imageUrl;
    kanapImg.alt = kanap.altTxt;

    const kanapName = document.createElement("h3");
    kanapName.classList.add("productName");
    kanapName.innerHTML = kanap.name;

    const kanapDescription = document.createElement("p");
    kanapDescription.classList.add("productDescription");
    kanapDescription.innerHTML = kanap.description;

    kanapLink.appendChild(kanapArticle);
    kanapArticle.appendChild(kanapImg);
    kanapArticle.appendChild(kanapName);
    kanapArticle.appendChild(kanapDescription);
    item.appendChild(kanapLink);
  }
}

printKanapList();
