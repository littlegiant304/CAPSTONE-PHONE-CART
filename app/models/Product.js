// "id": "1",
// "name": "iphoneX",
// "price": "1000",
// "screen": "screen 68",
// "backCamera": "2 camera 12 MP",
// "frontCamera": "7 MP",
// "img": "https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg",
// "desc": "Thiết kế mang tính đột phá",
// "type": "iphone"
// },

export default class Product {
    constructor (name, price, screen, backCamera, frontCamera, img, desc, type){
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.desc = desc;
        this.type = type;
    }
}
