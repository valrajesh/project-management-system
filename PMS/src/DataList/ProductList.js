import Popup from "reactjs-popup";
import {GetApiCall} from "../Hooks/UseCallAPI"
import noimg from "../staticfiles/noimage.png"
import UpdateProduct from "../Admin/UpdateProduct";
import 'reactjs-popup/dist/index.css';
import { UpdatePopup } from "../Popup/UpdatePopup";
import { useState } from "react";
export default function ProductList({categoryId,subcategoryId}){
    const [render,setRender]=useState(false);
    const [dependency,setDependency]=useState(false);
    const url = "https://localhost:7207/api/GetProducts?CategoryId="+categoryId+"&SubCategoryId="+subcategoryId;
    const response = GetApiCall(url,dependency);
    function handleRerender() {
        setRender((prev) => !prev);
        setDependency(!dependency);
      }
    let products = null;
    if(response.data && response.data.length>0){
        products = (<div>
            <table className="table-hover table-bordered border-warning table" style={{border:"1px solid orange"}}>
            <tbody>
                <th>
                <tr>
                    <td className="text-light bg-dark">Display</td>
                    <td className="text-light bg-dark">ProductName</td>
                    <td className="text-light bg-dark">ProductCode</td>
                    <td className="text-light bg-dark">Quantity</td>
                    <td className="text-light bg-dark">Price</td>
                    <td className="text-light bg-dark">Description</td>
                    <td className="text-light bg-dark">Action</td>
                </tr>
                   {response.data.map(prd=><tr className={prd.quantity<10?"bg-danger":prd.quantity>100?"bg-success":"bg-warning"}>
                    <td height="100" width="100">{prd.image == null || prd.image == ""? <img src={noimg} className="prd-img" />: prd.image}</td>
                    <td>{prd.productName}</td>
                    <td>{prd.productCode}</td>
                    <td>{prd.quantity}</td>
                    <td>{prd.price}</td>
                    <td>{prd.description}</td>
                    <td>   <div>
      <Popup trigger={<button className="btn btn-secondary">Edit</button>}  position="center center" contentStyle={{ width: '50%', height: '50%', overflow: 'auto', top: '1%', transform: 'translate(-5%, -1%)'}}>
      {(close) => (
        <div>
          <UpdatePopup product = {JSON.stringify(prd)} closePopup={close} rerender={handleRerender}/>
        </div>
      )}
      </Popup>
    </div></td>
                   </tr>)}
                </th>
            </tbody>
            </table>
        </div>)
    }
    return(<>
    
    <div>
        
        <h1>Available Products</h1>
        
        {products}
    </div>
    </>)
}