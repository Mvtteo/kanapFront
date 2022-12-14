//Récupération de l'ID du canapé via le lien dans l'url
var url_string = window.location.href;
    var url = new URL(url_string);
    var paramValue = url.searchParams.get("Kanap");

const product = paramValue;

//Récupération des informations du canapé demandé via l'api
let productData = [];

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
  .then(response => {
    if (response.ok) {
      return response.json()
    } else if (response.status === 404) {
      alert("Erreur identifiant canapé")
    }
  })
  .then((promise) => {
    productData = promise;
    })
};

//Affichage du canapé avec toutes ses caractéristiques
const productDisplay = async () => {
    await fetchProduct();

    document.querySelector('article > .item__img').innerHTML = `
    <img src="${productData.imageUrl}" alt="image de canape ${productData.name}"></img>
    `;

    document.getElementById('title').innerHTML = `
    ${productData.name}`

    document.getElementById('price').innerHTML = `
    ${productData.price}`

    document.getElementById('description').innerHTML = `
    ${productData.description}`

    document.querySelector('select').innerHTML = `
    <option value="">--SVP, choisissez une couleur --</option>
    `;

    let select = document.getElementById("colors")

    //choix de couleur

    productData.colors.forEach((couleurs) => {
    let tagOption = document.createElement("option");

    tagOption.innerHTML = `${couleurs}`;
    tagOption.value = `${couleurs}`;

    select.appendChild(tagOption);
    });

    addToBasket();

};

productDisplay();

//mise en place du bouton d'ajout au panier via le storage
const addToBasket = () => {
    let achat = document.getElementById("addToCart");
    achat.addEventListener("click", () => {

        let productTab = JSON.parse(localStorage.getItem("product"));
        let listenQty = document.getElementById("quantity");
        let listenColor = document.getElementById("colors");

        const colorQuantity = Object.assign({}, productData, 
            {
            color: `${colors.value}`,
            quantity: `${quantity.value}`,
        });
        colorQuantity.price = null;

        // Alerte si la quantité n'est pas comprise entre 1 et 100 annule l'achat
        if(listenQty.value < 1 || listenQty.value > 100){
            alert("Veuillez choisir une quantité comprise entre 1 et 100");
        }
        // Alerte si la couleur n'est pas choisie annule l'achat
        else if (listenColor.value ==""){
            alert("Veuillez choisir une couleur");
        }
        else {
            if (productTab == null) {
                productTab = [];
                productTab.push(colorQuantity);
                alert("produit ajouté au panier");
                localStorage.setItem("product", JSON.stringify(productTab));     
            }
            else if (productTab != null){
                for (i=0; i < productTab.length; i++){
                    if( productTab[i]._id == productData._id && productTab[i].color == colors.value){
                        return (
                            productTab[i].quantity = +colorQuantity.quantity + +productTab[i].quantity,
                            localStorage.setItem("product",JSON.stringify(productTab)),
                            (productTab = JSON.parse(localStorage.getItem("product"))),
                            alert("produit ajouté au panier")
                        );
                    }
                }
                for (i = 0; i < productTab.length; i++){
                    if(productTab[i]._id == productData._id && productTab[i].color != colors.value)
                        {
                        return (
                            productTab.push(colorQuantity),
                            localStorage.setItem("product",JSON.stringify(productTab)),
                            (productTab = JSON.parse(localStorage.getItem("product"))),
                            alert("produit ajouté au panier")
                        );
                    }
                }
            }
    }
    });
    return (productTab = JSON.parse(localStorage.getItem("product")));
};

