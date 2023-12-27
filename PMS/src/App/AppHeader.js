import { NavLink, Route, Routes } from "react-router-dom";
import ProductList from "../DataList/ProductList";
import CreateProduct from "../Admin/CreateProduct";
import { ProdCategories } from "../Common/ProductCategories";

export default function AppHeader(){
    

    let productsData = null;
    if(ProdCategories && ProdCategories.length>0){
        productsData = ProdCategories.map(prod=>{
            return <li key={prod.CategoryId} className="nav-item dropdown">
                        <a className="nav-link link" data-toggle="dropdown" href="#" id={prod.CategoryId}>{prod.CategoryName}</a>
                        <div className="dropdown-menu">
                        {prod.SubCategory.map(s=>{
                            return <NavLink className="nav-link text-dark" to={s.SubCategoryPath} id={s.SubCategoryId}>{s.SubCategoryName}</NavLink>
                        }
                        )}
                        </div>
        </li>
        })
    }
    return(<>
    <div className="navbar bg-dark navbar-expand-sm navbar-dark">
        <NavLink className="navbar-brand text-warning">Product Management System</NavLink>
        <ul className="navbar-nav">
            <li className="nav-item dropdown">
            <a className="nav-link link" data-toggle="dropdown" href="#">Admin</a>
                        <div className="dropdown-menu"><NavLink to ="/createproduct" className="nav-link text-dark">Create Product</NavLink> </div>
            </li>
            {productsData} 
        </ul>
        <div>
        <button className="btn" onClick={()=>{document.getElementById('root').className == "" ? document.getElementById('root').className="Dark-mode": document.getElementById('root').className=""}}>🌓</button>
    </div>
    </div>
    
    
    <Routes>
        <Route path="/createproduct" Component={CreateProduct}></Route>
        {ProdCategories.map(prod=>{
            return prod.SubCategory.map(sub=>{
                return <Route path={sub.SubCategoryPath} Component={() => (<ProductList categoryId={prod.CategoryId} subcategoryId={sub.SubCategoryId} />)}></Route>
            })
        })}
    </Routes>
    </>)
}