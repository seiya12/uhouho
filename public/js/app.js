import {apiAddress} from "./request/api.js";


apiAddress({
    keyid:'9b5495f984dbf1bfaca72ae3c6036536',
    name:'ぐる'
}).then((res)=>{
    console.log(res)
});