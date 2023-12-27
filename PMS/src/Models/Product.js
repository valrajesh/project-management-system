export default class Product{
    constructor(productName,productCode,quantity,price,description,CategoryId,SubCategoryId){
        this.productName = productName;
        this.productCode = productCode;
        this.quantity = quantity;
        this.price = price;
        this.description = description;
        this.CategoryId = CategoryId;
        this.SubCategoryId = SubCategoryId;
    }
}