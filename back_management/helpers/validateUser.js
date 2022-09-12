 const axios=require('axios');
const { ConnectionClosedEvent } = require('mongodb');

var return_data ={
    data:null,
    code:""
};
module.exports =  async function(token){
    const  data  = await axios.get(
        'http://localhost:8080/realms/FixedAssetManagement/protocol/openid-connect/userinfo',{
        headers: {
            Authorization: token,
        }
        }
    ).catch(err=>{
        return_data={
            data:null,
            code:err.response.status
        }
        return(return_data)
    }   
    );
    return_data={
        data:data,
        code:data.status
    }
      return(return_data)
}
