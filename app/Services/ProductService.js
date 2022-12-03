export default class ProductService{
    // this.listProduct =[];
    constructor(){

    }
    getProductList = () => {
        return  axios({
            method: 'get',
            url: 'https://638024b32f8f56e28e9c6201.mockapi.io/Products',
        });
    }
    getProduct = (id) => {
        return axios({
            method: 'get',
            url: `https://638024b32f8f56e28e9c6201.mockapi.io/Products/${id}`,
        });
    }
}