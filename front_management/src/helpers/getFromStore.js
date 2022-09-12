import store from "../redux/store";


export function  getFromStore(action) {
    let return_value='';
    if(action==="token"){

        return_value=store.getState().token;
    }
    if(action === "auth"){
        return_value=store.getState().auth;

    }
    if(action === "username"){
        return_value=store.getState().username;

    }
    if(action === "team"){
        return_value=store.getState().team;

    }
    if(action === "team_id"){
        return_value=store.getState().team_id;

    }
    return(return_value);

   
};
