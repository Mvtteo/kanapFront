// récupération de l'orderId dans l'URL et insertion dans la page
var url_string = window.location.href;
    var url = new URL(url_string);
    var paramValue = url.searchParams.get("OrderId");

const orderId = paramValue;

//Insertion de l'id de commande dans le code HTML
document.getElementById("orderId").innerHTML = orderId;

//suppression du localstorage après avoir confirmé la commande 
localStorage.clear();