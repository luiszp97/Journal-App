import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {
  
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch()
  
    useEffect( ()=>{
  
      onAuthStateChanged( FirebaseAuth, async( user )=>{
  
        if( !user ) return dispatch( logout() );
  
        const {uid, email, displayName, photoUrl} = user;
  
        dispatch( login({ uid, email, displayName, photoUrl }) );
        dispatch( startLoadingNotes() )
  
      } )
  
    }, []);

    return status;
    
};
