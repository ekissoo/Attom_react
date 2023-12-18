import axios from "axios";
import { useState } from "react";

const REST_API_URL="http://192.168.1.46:5000";

function FormService()
{
    // const [result, setResult] = useState([]);
    // result = setResult([])
    
    function createProduct(product)
    {
        // return 0;
        let resp = axios.post(REST_API_URL + '/form', product);
        // console.log("response = " + resp.data);
        return resp;
    }
    
       
}




export default FormService();