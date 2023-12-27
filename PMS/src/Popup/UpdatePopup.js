import UpdateProduct from "../Admin/UpdateProduct"

export const UpdatePopup =({ product, closePopup, rerender })=>{
    function handleRerender() {
        rerender();
        closePopup();
      }
    return(<div>
        <UpdateProduct product = {product} closePopup={closePopup} rerender = {handleRerender}/>
    </div>)
}