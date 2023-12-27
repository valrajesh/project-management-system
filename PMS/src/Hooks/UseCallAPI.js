import axios from "axios";
import { useEffect, useState } from "react";

export function GetApiCall(url,dependency){
    const [result,setResult] = useState({data:[],error:null})
    useEffect(()=>{
        axios.get(url).then(response=>setResult({data:response.data}),error=>setResult({error:error.data}))
    },[dependency])
    return result;
}
