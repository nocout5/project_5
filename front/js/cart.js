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

function addElement(kanap, section_items, kanapData) {

    let article_cart = document.createElement("article");
    article_cart.classList.add("cart__item");
    article_cart.dataset.id = kanap.id;
    article_cart.dataset.color = kanap.color;

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
    input_quantity.classList.add("itemQuantity");
    input_quantity.setAttribute("value", kanap.quantity);
    input_quantity.setAttribute("type", "number");
    input_quantity.setAttribute("name", "itemQuantity");
    input_quantity.setAttribute("min", "1");
    input_quantity.setAttribute("max", "100");
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

function addTotal(kanap, kanapData, total) {
    total.quantity += kanap.quantity;
    total.price += kanapData.price * kanap.quantity;
}

// affiche les elements du panier
async function printCart() {
    let cart = getCart();
    let section_items = document.getElementById("cart__items");
    let totalQuantity = document.getElementById("totalQuantity");
    let totalPrice = document.getElementById("totalPrice");
    let total = {
        quantity: 0,
        price: 0
    };
    for (let kanap of cart) {
        let kanapData = await getData(apiData + kanap.id);

        addElement(kanap, section_items, kanapData);
        addTotal(kanap, kanapData, total);
    }

    deleteCartElement(cart, section_items);
    changeCartElement(cart, section_items);
    totalQuantity.innerHTML = total.quantity;
    totalPrice.innerHTML = total.price;
}


function changeCartElement(cart, section_items) {
    let quantityInput = document.querySelectorAll(".itemQuantity");
    quantityInput.forEach(element => {
        element.addEventListener('change', function () {
            if (this.value < 1 || this.value > 100) {
                alert("choisissez de bonne valeur  !!");
                return 0;
            }
            let article = element.closest('article');
            let index = cart.findIndex(object => { return object.itemCheck == (article.dataset.id + article.dataset.color) })
            cart[index].quantity = parseInt(this.value);
            localStorage.setItem(key, JSON.stringify(cart));
            section_items.innerHTML = "";
            printCart();
        })
    })
}

function deleteCartElement(cart, section_items) {
    let deleteButton = document.querySelectorAll('.deleteItem');
    deleteButton.forEach(element => {
        element.addEventListener('click', function () {
            let article = element.closest('article');
            let index = cart.findIndex(object => { return object.itemCheck == (article.dataset.id + article.dataset.color) })
            cart.splice(index, 1);
            localStorage.setItem(key, JSON.stringify(cart));
            section_items.innerHTML = "";
            printCart();
        });
    });


}

printCart();

let orderProducts = [];
let cart = getCart();
for (let i = 0; i < cart.length; i++) {
    orderProducts.push(cart[i].id);
}

function sendForm() {
    const orderUserProduct = {
        contact: {
            firstName: "jean",
            lastName: "camus",
            address: "asnieres",
            city: "paris",
            email: "myemail",
        },
        products: orderProducts,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(orderUserProduct),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };


    fetch("http://localhost:3000/api/products/order", options)
        .then((res) => res.json())
        .then((data) => {
            // Renvoi de l'orderID dans l'URL
            console.log(data);
        })
        .catch(function (err) {
            console.log("Erreur fetch" + err);
        });
}

sendForm();