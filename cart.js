let totalProduct = [];

let productData = [];

let TotalPriceCart;

let addToCart = JSON.parse(localStorage.getItem("product"));


//mise en place de la page du panier avec les différents canapés les couleurs et quantités

const cartDisplay = async () => {
    if(addToCart){
        await addToCart;
        await getPrice();
    }

    document.getElementById("cart__items").innerHTML = addToCart.map(
        (product) => 
        `
    <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="Photographie d'un canapé ${product.name}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity} data-id="${product._id}" data-color="${product.color}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p data-id="${product._id}" data-color="${product.color}"class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `).join("");

    quantityChanger();

    removeProduct();

    productTotal();

    getPrice();
  
}; 

cartDisplay(); 

async function getPrice(){
  for (let product of addToCart) {
  const response = await fetch(`http://localhost:3000/api/products/${product._id}`)
    .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    })
    .then(function(item) {
    product.price = item.price;
    })
  }
} 


//modification de la quantité de produits dans le panier


const quantityChanger = async (cartDisplay) => {
  await cartDisplay;

  let newValue = document.querySelectorAll(".itemQuantity");
  
  newValue.forEach((ajout) => {
    ajout.addEventListener("change", () => {
      for (i = 0; i < addToCart.length; i++ ){
        if(
          addToCart[i]._id == ajout.dataset.id &&
          addToCart[i].color == ajout.dataset.color
        )
     {
          return(
            addToCart[i].quantity = ajout.value,
            localStorage.setItem("product", JSON.stringify(addToCart)),
            productTotal()    
          );
        }
      }
    });
  });
};


//actualisation des articles supprimés



const removeProduct = async (cartDisplay) => {
  await cartDisplay;

  let deleteProduct = document.querySelectorAll(".deleteItem");
  totalProduct = addToCart;

  let deleteAll = totalProduct.length;

  deleteProduct.forEach((trash) => {trash.addEventListener("click", () => {

    if (deleteAll == 1) {
      return (
        totalProduct.splice(0, totalProduct.length),
        document.querySelector("article").remove(),
        productTotal(),
        localStorage.removeItem("product")
      );
    }
    else {
      totalProduct = totalProduct.filter((product) => {
        if  (
          trash.dataset.id != product._id || 
          trash.dataset.color != product.color
          )
          {
          return true;
        }
      });
      trash.closest("article").remove();
      productTotal();
      localStorage.setItem("product", JSON.stringify(totalProduct));
      if (totalProduct.length < 1){
        localStorage.removeItem("product");
      };
    }
  });
});
return;
}; 


//création des regex pour valider le formulaire

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

//regex Prénom
firstName.addEventListener("input", function (e) {
  valueFirstName;
  if (e.target.value.length == 0){
    valueFirstName = null;
    firstNameErrorMsg.innerHTML = "";
  } else if (e.target.value.length < 3 || e.target.value.length > 25){
    firstNameErrorMsg.innerHTML = "Le prénom doit contenir entre 3 et 25 caractères";
    valueFirstName = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)){
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = e.target.value;
  }
  if (!e.target.value.match(/^[a-z A-Z]{3,25}$/) && 
  e.target.value.length > 3 && 
  e.target.value.length < 25)
  {
    firstNameErrorMsg.innerHTML = "Le prénom ne doit pas contenir de caractères spéciaux";
    valueFirstName = null;
  }

});

//regex Nom de famille

lastName.addEventListener("input", function (e) {
  valueLastName;
  if (e.target.value.length == 0){
    valueLastName = null;
    lastNameErrorMsg.innerHTML = "";
  } else if (e.target.value.length < 3 || e.target.value.length > 25){
    lastNameErrorMsg.innerHTML = "Le nom doit contenir entre 3 et 25 caractères";
    valueLastName = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)){
    lastNameErrorMsg.innerHTML = "";
    valueLastName = e.target.value;
  }
  if (!e.target.value.match(/^[a-z A-Z]{3,25}$/) && 
  e.target.value.length > 3 && 
  e.target.value.length < 25)
  {
    lastNameErrorMsg.innerHTML = "Le nom ne doit pas contenir de caractères spéciaux";
    valueLastName = null;
  }

});

//regex adresse

address.addEventListener("input", function (e) {
  valueAddress;
  if (e.target.value.length == 0){
    valueAddress = null;
    addressErrorMsg.innerHTML = "";
  } else if (e.target.value.length > 50){
    addressErrorMsg.innerHTML = "Votre adresse ne doit pas dépasser 50 caractères";
    valueAddress = null;
  }
  if (e.target.value.match(/^[#.0-9a-zA-Z\s,-]{5,50}$/)){
    addressErrorMsg.innerHTML = "";
    valueAddress = e.target.value;
  }
  if (!e.target.value.match(/^[#.0-9a-zA-Z\s,-]{5,50}$/) && 
  e.target.value.length > 5 && 
  e.target.value.length < 50)
  {
    addressErrorMsg.innerHTML = "La saisie de votre adresse a été effectuée avec des caractères non autorisés";
    valueAddress = null;
  }

});

//regex Ville

city.addEventListener("input", function (e) {
  valueCity;
  if (e.target.value.length == 0){
    valueCity = null;
    cityErrorMsg.innerHTML = "";
  } else if (e.target.value.length > 30){
    cityErrorMsg.innerHTML = "Votre ville ne doit pas dépasser 30 caractères";
    valueCity = null;
  }
  if (e.target.value.match(/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']{2,30}$/)){
    cityErrorMsg.innerHTML = "";
    valueCity = e.target.value;
  }
  if (!e.target.value.match(/^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']{2,30}$/) && 
  e.target.value.length > 2 && 
  e.target.value.length < 30)
  {
    cityErrorMsg.innerHTML = "La saisie de votre ville a été effectuée avec des caractères non autorisés";
    valueCity = null;
  }

});

//regex Email

email.addEventListener("input", function (e) {
  valueEmail;
  if (e.target.value.length == 0){
    valueEmail = null;
    emailErrorMsg.innerHTML = "";
  } else if (e.target.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
    emailErrorMsg.innerHTML = "";
    valueEmail = e.target.value;
  }
  if (
    !e.target.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) &&
    !e.target.value.length == 0
  
  ){
    emailErrorMsg.innerHTML = "Votre adresse email est incorrecte";
    valueEmail = null;
  }
});

const formOrder = document.querySelector(".cart__order__form");

//mise en place de l'envoi des informations du clients vers l'api et changement de page vers la page confirmation

formOrder.addEventListener("submit", (e) => {
  e.preventDefault();

  if(valueFirstName && valueLastName && valueAddress && valueCity && valueEmail){

    const finalOrder = JSON.parse(localStorage.getItem("product"));
    let productsId = [];

    finalOrder.forEach((order) => {
      productsId.push(order._id);
    });

    const data = {
      contact :{
        firstName : valueFirstName,
        lastName : valueLastName,
        address : valueAddress,
        city : valueCity,
        email : valueEmail,
      },
      products: productsId,
    };

    createCart(data);
    
    if (delTab == 1){
      localStorage.removeItem("product");
    }else{
      localStorage.setItem("product", JSON.stringify(totalProduct));
    }
    window.localStorage.setItem("orderInfo", JSON.stringify(data));

  } else {

    alert("Veuillez remplir le formulaire correctement");
  
  }
});



async function createCart(data){
  let sendToServer = await fetch("http://localhost:3000/api/products/order",{
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type" : "application/json",
    }
  });

  if (sendToServer.ok) {
    let json = await sendToServer.json();
    window.localStorage.setItem("orderId", json.orderId);
    window.location = `confirmation.html?${json.orderId}`;
  } else {
    alert("Une erreur s'est produite" + sendToServer.status);
  };

};


//calul du total des produits, quantités et prix


const productTotal = async (
  cartDisplay
) => {
  await cartDisplay;

  let productPrice = [];
  let totalQuantityProduct = [];

  let newTab = totalProduct;

  newTab.forEach((product) => {
  productPrice.push(product.price.toString() * product.quantity);
    totalQuantityProduct.push(product.quantity);
  });

  totalQuantity.textContent = `${eval(totalQuantityProduct.join("+"))}`;

  TotalPriceCart = eval(productPrice.toString().replace(/,/g, "+"));
  totalPrice.textContent = TotalPriceCart;
}; 

