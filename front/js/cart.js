let apiData = "http://localhost:3000/api/products/";
let key = 'key';

// recupere le panier dans localStorage
function getCart() {
    if (localStorage.getItem(key) === null) {
        return [];
    }
    else {
        return JSON.parse(localStorage.getItem(key));
    }
}

// requète GET à l'api pour récuperer des données
async function getData(url) {
    let data = await fetch(url)
        .then(data => { return data.json() })
        .catch(error => console.log(error));
    return data;
}

// affiche les elements du panier
async function printCart() {
    let cart = getCart();
    let section_items = document.getElementById("cart__items");
    for (let kanap of cart) {
        let kanapData = await getData(apiData + kanap.id);

        let article_cart = document.createElement("article");
        article_cart.classList.add("cart__item");
        // article_cart.getAttribute("data-id") = kanap.id;
        // article_cart.getAttribute('data-color') = kanap.color;

        let div_img = document.createElement("div");
        div_img.classList.add("cart__item__img");
        article_cart.appendChild(div_img);

        let img_kanap = document.createElement("img");
        img_kanap.src = kanapData.imageUrl;
        img_kanap.alt = kanapData.altTxt;
        div_img.appendChild(img_kanap);

        let div_content = document.createElement("div");
        div_content.classList.add("cart__item__content");
        article_cart.appendChild(div_content);

        let div_description = document.createElement("div");
        div_description.classList.add("cart__item__content__description");
        div_content.appendChild(div_description);

        let h2_name = document.createElement("h2");
        h2_name.innerText = kanapData.name;
        div_description.appendChild(h2_name);

        let p_color = document.createElement("p");
        p_color.innerText = kanap.color;
        div_description.appendChild(p_color);

        let p_price = document.createElement("p");
        p_price.innerHTML = kanapData.price;
        div_description.appendChild(p_price)

        let div_settings = document.createElement("div");
        div_settings.classList.add("cart__item__content__settings");
        div_content.appendChild(div_settings);

        let div_quantity = document.createElement("div");
        div_quantity.classList.add("cart__item__content__settings__quantity");
        div_settings.appendChild(div_quantity);

        let p_quantity = document.createElement("p");
        p_quantity.innerHTML = "Qté : ";
        div_quantity.appendChild(p_quantity);

        let input_quantity = document.createElement("input");
        input_quantity.classList.add = ("itemQuantity");
        input_quantity.setAttribute("value", kanap.quantity);
        div_quantity.appendChild(input_quantity);

        let div_delete = document.createElement("div");
        div_delete.classList.add("cart__item__content__settings__delete");
        div_settings.appendChild(div_delete);

        let p_delete = document.createElement("p");
        p_delete.classList.add("deleteItem");
        p_delete.innerHTML = "Supprimer";
        div_delete.appendChild(p_delete);



        section_items.appendChild(article_cart);

    }
}

printCart();