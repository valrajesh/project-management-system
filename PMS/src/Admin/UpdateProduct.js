import { useState } from "react";
import axios from "axios";
import ProductForm from "../Forms/ProductForm";

export default function UpdateProduct(props){
    const [output,setOutput] = useState({responseData:'',error:null,errorStatus:''})
    const headers = { 
        'Content-Type': 'application/json'
    };
    function UpdateProd(values){
            var prod = JSON.parse(values);
            const prd = JSON.parse(props.product);
            prod.productId= prd.productId;
            values = JSON.stringify(prod);
            axios.put("https://localhost:7207/api/UpdateProduct",values,{headers})
            .then(response=>setOutput({responseData:response.status}),error=>setOutput({error:error.message,errorStatus:error.response.status}))
            props.rerender();
            props.closePopup();
            
    }
   
    let ProdForm = ProductForm(props.product,UpdateProd,"Product Update")
    return (
            <div>
            {ProdForm}
            <div>
            <h2>{output.responseData == '200'?<span className="text-success">Product Updated</span>:output.errorStatus!=''?<span className="text-danger">Failed to Update Product due to {output.error}</span>:""}</h2>
            
            </div>
            </div> 
    )      
}