import Product from "../models/Product.js";
import ProductService from "../Services/ProductService.js";


const productSer = new ProductService();
let shoppingCart = [];
let productList = [];
function setLocalStorage() {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}
function getLocalStorage(){
    if (localStorage.getItem("shoppingCart") != null) {
        return shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

    }
}
function getProductListMain() {
  productSer.getProductList()
  .then((result) => {
    showProduct(result.data);
    result.data.map((item, index) => { 
        productList.push(item);
     });
    //  console.log("inside", productList);
  })
  .catch((error) => {
    console.log(error);
  })
}
getProductListMain();
console.log("product list", productList);
function showProduct(prodArr) {
  let trArray = prodArr.map((product) => {
    // let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
    //   product;
    return `
    <div class="col-md-3 mt-2">
    <div class="card">
        <figure class="product-media">
            <a href="#">
                <img src="${product.img}"
                    alt="Product image" class="product-image">
            </a>
            
        </figure>
        <div class="product-overlay">
            <div class="overlay__content">
                <h3>More detail</h3>
                <div class="productID">ID: ${product.id}</div>
                <div class="productType">Type: ${product.type}</div>
                <div class="screen">Screen: ${product.screen}</div>
                <div class="frontCam">Front Camara: ${product.frontCamera}</div>
                <div class="backCam">Back Camara: ${product.backCamera}</div>
            </div>
            
            <div class="wrap-product-btn">
                
                    <button class="btn btn-info btn-product-vertical" id ="add-to-cart" onclick="addItemToCart('${product.id}')">Add to cart</button>
              
            </div>
        </div>
    
        <div class="product-body" >
            <div class="product-cat">
                <a href="#">Cameras & Camcorders</a>
            </div>
            <h3 class="product-title"><a href="#">${product.name}</a>
            </h3>
            <div class="product-price">
                ${product.price}
            </div>
            <div class="description">Description: ${product.desc}</div>
            <div class="ratings-container">
                <div class="ratings">
                    <div class="ratings-val" style="width: 60%;"></div>
                </div>
                <span class="ratings-text">( 2 Reviews )</span>
            </div>
        </div>
    </div>
</div>
    `;
  });

  document.querySelector("#show-products").innerHTML = trArray.join("");
}


const addItemToCart = (id)=> {
        for (const item of shoppingCart) {
            if(item.productCart.id === id) {
                // console.log("is exist");
                item.quantity++;
                setLocalStorage();
                getLocalStorage();
                renderTotalitem();
                return;
            }
        }

        let cartItem = {
            productCart: {},
            quantity: 0
        };
        productSer.getProduct(id)
        .then((result) => { 
            cartItem.productCart = result.data;
            cartItem.quantity++;
            shoppingCart.push(cartItem);
            setLocalStorage();
            getLocalStorage();
            renderTotalitem();
         })
        .catch((error) => { 
            console.log(error);
        })
        
        return;
        
    
    
}
window.addItemToCart = addItemToCart;

const renderTotalitem = () => {
    let totalCount = 0;
    getLocalStorage();
    for(var item of shoppingCart) {
      totalCount += Number(item.quantity);
    }
    document.querySelector("#total-count").innerHTML = totalCount;
    return totalCount;
}
renderTotalitem();

const totalCart =()=>{
    getLocalStorage();
    var totalCart = 0;
    for(var item of shoppingCart) {
      totalCart += Number(item.productCart.price) * Number(item.quantity);
    }
    document.querySelector("#total-cart").innerHTML = Number(totalCart.toFixed(3));
    return Number(totalCart.toFixed(3));
}

const displayCart =()=> {
    getLocalStorage();
  let strCart = shoppingCart.map((item, index) => {
    // let { id, img, type, name, price, count } = item;
    return `
        <tr>
            <td class="w-25">
                <img src="${item.productCart.img}" class="img-fluid img-thumbnail" alt="Sheep">
            </td>
            <td>${item.productCart.name}</td>
            <td>${item.productCart.price}</td>
            <td class="qty units d-flex">
                <div class="btn minus changeUnits" ><button class="btn btn-info" onclick="changeNumberOfUnits('minus', '${item.productCart.id}')">-</button></div>
                <div class="number">${item.quantity}</div>
                <div class="btn plus changeUnits" ><button class="btn btn-success" onclick="changeNumberOfUnits('plus', '${item.productCart.id}')">+</button></div>
            </td>
            <td ">${item.productCart.price * item.quantity}</td>
            <td >
                <a href="#" class="btn btn-danger btn-sm" onclick="removeItemFromCart('${item.productCart.id}')">
                    <i class="fa fa-times" ></i>
                </a>
            </td>
        </tr>
      `;
  });
  document.querySelector("#cartModalBody").innerHTML = strCart.join("");
  renderTotalitem();
  totalCart();
}
window.displayCart = displayCart;
// displayCart();

const changeNumberOfUnits = (action, id) => {
    shoppingCart.map((item, index) => { 
        if (item.productCart.id === id ) {
            if (action =="minus"){
                item.quantity--;
                if(item.quantity <1) {
                    shoppingCart.splice(index, 1);
                  }
                    setLocalStorage();
                    displayCart();
                  return;
            }
            else if (action == "plus") {
                item.quantity++;
                setLocalStorage();
                displayCart();
            }
        }
     })
    
     
}
window.changeNumberOfUnits = changeNumberOfUnits;

const removeItemFromCart = (id)=>{
    shoppingCart.map((item, index) => { 
        if (item.productCart.id === id){
            shoppingCart.splice(index,1);
            setLocalStorage();
            displayCart();
            return;
        }
        
     });
}

window.removeItemFromCart = removeItemFromCart;

const emptyCart = () => {
    shoppingCart = [];
    setLocalStorage();
    displayCart();
}
window.emptyCart = emptyCart;

const checkOut = ()=> {
    emptyCart();
    alert("Pay successfully!");
}

window.checkOut = checkOut;

const filterOfProduct = () => {
    let type = document.querySelector("#sortby").value;
    // console.log("type", type);
    if (document.querySelector("#sortby").selectedIndex >=1) {
        let tempProductList = productList.filter((item) => { 
            console.log(item.type);
            return type.toLowerCase() === item.type.toLowerCase();
         });
         showProduct(tempProductList);
         return;
    }
    else{
        showProduct(productList);
        return;
    }
}
// filterOfProduct();
document.querySelector("#sortby").onchange = filterOfProduct;