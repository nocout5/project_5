// affiche le numero de commande
function printOrderId() {
  let orderElement = document.getElementById("orderId");
  let url = new URL(window.location.href);

  orderElement.innerText = url.searchParams.get("order_id");
}

printOrderId();
