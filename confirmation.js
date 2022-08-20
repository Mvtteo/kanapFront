const orderId = window.location.search.split("?").join("");


document.getElementById("orderId").innerHTML = orderId;

//suppression du localstorage après avoir confirmé la commande 

localStorage.clear();