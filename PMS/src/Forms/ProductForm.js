import { useFormik } from "formik";
import * as yup from "yup";
import { ProdCategories } from "../Common/ProductCategories";
import { useEffect, useState } from "react";
export default function ProductForm(product,CreateProd,title){
    product = product!=null || ''? JSON.parse(product):product;
    const [subcat,setSubCat] = useState(0);
    function SubCatogoryupdate(value){
        setSubCat(value);
        productForm.setFieldValue('CategoryId', value);
    }
    function SubCatogoryChange(value){
        productForm.setFieldValue('SubCategoryId', value);
    }
    useEffect(()=>{
        if(product!=null){
            setSubCat(product.categoryId);
        }
    },[])
    
    let SubCategories = null;
    if(subcat>0){
        SubCategories = ProdCategories.find(c=>c.CategoryId == subcat).SubCategory;
    }
    var productForm = useFormik({
        initialValues:{productName:product.productName,productCode:product.productCode,quantity:product.quantity,price:product.price,description:product.description,CategoryId:product.categoryId,SubCategoryId:product.subCategoryId},
        validationSchema:yup.object({productName:yup.string().max(30,"Max length is 30").required("Product Name is required"),
                                                productCode:yup.string().required("Product Code is required"),
                                                quantity:yup.number().min(1,"Minimum should be 1").required("Quantity is Required"),
                                                price:yup.number().required("Price is Required").min(1,"Minimum price should be 1"),
                                                description:yup.string().required("Description is required"),
                                            CategoryId:yup.number().min(1,"Please select category"),
                                        SubCategoryId:yup.number().min(1,"Please select SubCategory")}),
        onSubmit:(values, { resetForm })=>{
            CreateProd(JSON.stringify(values))
            resetForm();

        },
    })
    return (
        <div>
        <h2>{title}</h2>
        <form onSubmit={productForm.handleSubmit}>
            
        <div class="form-group row">
                <label className="col-sm-2 col-form-label">Product Name: </label>
                <div class="col-sm-6">
                <input type="text" className="form-control" id = "productName" value={productForm.values.productName} onChange={productForm.handleChange}></input>
                <span className="text-danger">{productForm.errors.productName}</span>
                </div>
            </div>
            
            <div class="form-group row">
                <label className="col-sm-2 col-form-label">Product Code: </label>
                <div class="col-sm-6">
                <input type="text" className="form-control" id = "productCode" value={productForm.values.productCode} onChange={productForm.handleChange}></input>
                <span className="text-danger">{productForm.errors.productCode}</span>
                </div>
            </div>
            <div class="form-group row">
                <label className="col-sm-2 col-form-label">Quantity: </label>
                <div class="col-sm-6">
                <input type="number" className="form-control" id = "quantity" value={productForm.values.quantity} onChange={productForm.handleChange}></input>
                <span className="text-danger">{productForm.errors.quantity}</span>
                </div>
            </div>
            <div class="form-group row">
                <label className="col-sm-2 col-form-label">Price: </label>
                <div class="col-sm-6">
                <input type="number" className="form-control" id = "price" value={productForm.values.price} onChange={productForm.handleChange}></input>
                <span className="text-danger">{productForm.errors.price}</span>
                </div>
            </div>
            <div class="form-group row">
                <label className="col-sm-2 col-form-label">Description: </label>
                <div class="col-sm-6">
                <input type="text" className="form-control" id = "description" value={productForm.values.description} onChange={productForm.handleChange}></input>
                <span className="text-danger">{productForm.errors.description}</span>
                </div>
            </div>
            <div class="form-group row">
                <label className="col-sm-2 col-form-label">Category: </label>
                <div class="col-sm-6">
                <select id="CategoryId" type="dropdown" as="select" class="form-control" value ={productForm.values.CategoryId} onChange={(value)=>{SubCatogoryupdate(parseInt(value.target.value))}}>
                    <option>Choose...</option> 
                    {ProdCategories.map(c=>{
                        return <option value={c.CategoryId}>{c.CategoryName}</option>
                    })}
                </select>
                <span className="text-danger">{productForm.errors.CategoryId}</span>
                </div>
            </div>
            <div class="form-group row">
                <label className="col-sm-2 col-form-label">Sub Category: </label>
                <div class="col-sm-6">
                <select id="SubCategoryId" type="dropdown" as="select" value ={productForm.values.SubCategoryId} class="form-control" onChange={(value)=>{SubCatogoryChange(parseInt(value.target.value))}}>
                <option>Choose...</option> 
                {SubCategories && SubCategories.map((c)=>{
                        return <option value={c.SubCategoryId}>{c.SubCategoryName}</option>
                    })}
                </select>
                <span className="text-danger">{productForm.errors.SubCategoryId}</span>
                </div>
            </div>
            
            <button className="btn btn-success" type="submit">{title == 'Product Update'? "Update":"Create"}</button>
        </form>
        
        </div> 
)    
}