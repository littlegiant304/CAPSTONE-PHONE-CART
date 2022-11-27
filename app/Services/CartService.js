export default class CartService{
    cart = [];
    addCart = (product) => {
        cart.push(product);
    }
}