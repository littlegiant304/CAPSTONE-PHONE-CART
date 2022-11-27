export default class ProductService{
    getProductList = ()=> {
        let promise =  axios({
            method: 'get',
            url: 'https://638024b32f8f56e28e9c6201.mockapi.io/Products',
        });
        return promise;
    }
}