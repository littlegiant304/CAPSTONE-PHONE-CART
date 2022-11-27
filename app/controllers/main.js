import Product from "../models/Product.js";
// import ProductInCart from "../models/ProductInCart.js";
import ProductService from "../Services/ProductService.js";
import CartService from "../Services/CartService.js";

const productSer = new ProductService();
// let newCart = new CartService();
let productList = [];
let totalProductInCart = 0;

let shoppingCart = new CartService();
let cart = shoppingCart.cart;
console.log(shoppingCart);

let saveCart=() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
let getLocalStorage=() =>{
    if (localStorage.getItem("shoppingCart") != null) {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        // hienThiTable(dssv.mangSV);
    }
    
}

getLocalStorage();
// Count cart 
let totalCount = ()=> {
    var totalCount = 0;
    if (cart!= null){
      totalCount = 0;
    }
    cart.map((item, index) => {
      totalCount += item.count;
    });
    document.querySelector("#total-count").innerHTML = totalCount;
    return totalCount;
}
const getProductListMain = () => {
    // console.log("ddax vao day");
    
  let promise = productSer.getProductList();
  promise.then((result) => {
    showProduct(result.data);
    productList = result.data;
    // console.log("productlist", productList);
  })
  promise.catch((error) => {
    console.log(error);
  });
  return promise;
};

getProductListMain();

const addItemToCart = (idPro) => {
    getLocalStorage();
    console.log("them gio hang");
        if (cart!=null){
            cart.map((item, index) => {
                if(item.id === idPro) {
                      item.count ++;
                      cart.addCart(item);
                      saveCart();
                      getLocalStorage();
                      totalCount();
                      return;
                }
              });
        }
        else {
            productList.map((temp, index)=>{
                if (temp.id === idPro) {
                    cart.addCart(productList[index]);
                    saveCart();
                    getLocalStorage();
                    totalCount();
                    
                }
            });
        }
        // else totalCount() =0;
        
}

function showProduct (prodArr) {
  let trArray = prodArr.map((product, index) => {
    let { id, name, price, screen, backCamera, frontCamera, img, desc, type } = product;
    return `
    <div class="col-md-3 mt-2">
    <div class="card">
        <figure class="product-media">
            <a href="#">
                <img src="${img}"
                    alt="Product image" class="product-image">
            </a>
            
        </figure>
        <div class="product-overlay">
            <div class="overlay__content">
                <h3>More detail</h3>
                <div class="productID">ID: ${id}</div>
                <div class="productType">Type: ${type}</div>
                <div class="screen">Screen: ${screen}</div>
                <div class="frontCam">Front Camara: ${frontCamera}</div>
                <div class="backCam">Back Camara: ${backCamera}</div>
            </div>
            
            <div class="wrap-product-btn">
                
                    <button class="btn btn-info btn-product-vertical" id ="add-to-cart" onclick="addItemToCart(1)">Add to cart</button>
              
            </div>
        </div>
    
        <div class="product-body" >
            <div class="product-cat">
                <a href="#">Cameras & Camcorders</a>
            </div>
            <h3 class="product-title"><a href="#">${name}</a>
            </h3>
            <div class="product-price">
                ${price}
            </div>
            <div class="description">Description: ${desc}</div>
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
  //   document.querySelector("#all__products").innerHTML = Content;
  
};
// document.getElementById("add-to-cart").onclick = () => {
//     addItemToCart(1);
// }

  $('#add-to-cart').click(function(event) {
    event.preventDefault();
    // var id = $this.data('id');
    // var img = $this.data('img');
    // var type = $this.data('type');
    // var name = $(this).data('name');
    // var price = Number($(this).data('price'));
    addItemToCart(1);
    // displayCart();
  });


// SHOPPING CART




// document.getElementById("add-to-cart").onClick = addItemToCart();