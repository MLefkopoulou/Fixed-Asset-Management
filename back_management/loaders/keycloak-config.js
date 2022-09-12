var session = require('express-session');
var Keycloak =require('keycloak-connect');
const chalk =require('chalk');

let keycloak;
var keycloakConfig={
    url: "http://localhost:8080/",
    realm: "FixedAssetManagement",
    clientId: "node-js-app"

};
function initKeycloak(){
    if(keycloak){
        console.log('Returning existing keycloak instance');
        return keycloak;
    }else{
        console.log("Initializing Keycloak");
        var memoryStore=new session.MemoryStore();

        keycloak= new Keycloak({
            store:memoryStore,
            secret:'any_key',
            resave :false,
            saveUnitialized:true
        },keycloakConfig);
        return keycloak
    }
}
module.exports={
    initKeycloak
};
