let apiData = "http://localhost:3000/api/products/";
let kanapUrl = new URL(window.location.href)
let kanapId = kanapUrl.searchParams.get("id");

async function getData(url) {
    let data = await fetch(url)
        .then(data => { return data.json() })
        .catch(error => console.log(error));
    return data;
}

async function printKanap() {
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

printKanap();

