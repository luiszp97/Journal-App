import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { chekingCredentials, login, logout } from "./authSlice";

export const chekingAuthentication = ( email, password ) =>{
    return async (dispatch) => {
        
        dispatch(chekingCredentials());
    
    }
};

export const startGoogleSingIn = () =>{
    return async (dispatch) => {
        dispatch(chekingCredentials());

        const results = await signInWithGoogle();

        if(!results.ok) return dispatch(logout(results.errorMessage));

        dispatch (login(results))
    }
};

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        
        dispatch( chekingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName});
       
        if(!ok) return dispatch( logout( {errorMessage} ) );

        dispatch( login({ uid, displayName, email, photoURL }) )
    }
};

export const startLoginWithEmailPassword = ({email, password})=>{

    return async (dispatch) =>{

        dispatch( chekingCredentials() );

        const {ok, uid, photoURL, displayName, errorMessage} = await loginWithEmailPassword({email, password});

        if(!ok) return dispatch( logout( {errorMessage} ) );
        
        dispatch( login({ uid, displayName, email, photoURL }) )
        
    }
};

export const startLogout = ()=>{
    return async ( dispatch ) => {

       await logoutFirebase()

        dispatch( logout() );

    }
}