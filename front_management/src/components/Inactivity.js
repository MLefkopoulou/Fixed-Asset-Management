import {React, useEffect} from 'react'
import { useKeycloak } from '@react-keycloak/web'
import store from '../redux/store';


function Innactivity(props) {

    const { keycloak } = useKeycloak()
    const url =props.url;


    const login = async () => {
        store.dispatch({type:"TOKEN_UPDATE",payload:""})

        keycloak.login({redirectUri:url}); 
    }

    useEffect(()=> {login()},[])
    return (
        <div></div>
    )
}

export default (Innactivity)