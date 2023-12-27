import { useState } from "react";
import axios from "axios";
import ProductForm from "../Forms/ProductForm";
import Product from "../Models/Product";

export default function CreateProduct(){
    const [output,setOutput] = useState({responseData:'',error:null,errorStatus:''})
    const headers = { 
        'Content-Type': 'application/json'
    };
    function CreateProd(values){
            axios.post("https://localhost:7207/api/CreateProduct",values,{headers})
            .then(response=>setOutput({responseData:response.status}),error=>setOutput({error:error.message,errorStatus:error.response.status}))
    }
   
    let ProdForm = ProductForm(JSON.stringify(new Product('','','','','',0,0)),CreateProd,"Product Creation")
    return (
            <div>
            {ProdForm}
            <div>
            <h2>{output.responseData == '200'?<span className="text-success">Product Created</span>:output.errorStatus!=''?<span className="text-danger">Failed to create Product due to {output.error}</span>:""}</h2>
            </div>
            </div> 
    )      
}