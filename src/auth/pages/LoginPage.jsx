import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material";

import { chekingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth";
import { useForm } from "../../hook";

import { Google } from "@mui/icons-material";
import { AuthLayuout } from "../layout/AuthLayuout";
import { useMemo } from "react";


export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const { formState ,email, password, onInputChange } = useForm({
    email: '',
    password: ''
  });

  const isAuthenticating = useMemo(()=> status === 'authenticated', [status])

  const onSubmit = (event)=>{

      event.preventDefault();

      dispatch( chekingAuthentication() );

      dispatch( startLoginWithEmailPassword(formState) );

       
  }

  const onGoogleSingIn = ()=> {

    dispatch( startGoogleSingIn() )

  }

  return (

      <AuthLayuout title="Login">
        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs = {12} sx = {{mt: 2}}>
              <TextField
                label = "Correo"
                type="email"
                placeholder= "correo@example.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs = {12} sx = {{mt: 2}}>
              <TextField
                label = "Contraseña"
                type="password"
                placeholder= "*********"
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid 
                item 
                xs={12}
                sx = {{mt:1}}
                display = { !!errorMessage ? '' : 'none' }
              >

                  <Alert severity = 'error'>Usuario o contraseña incorrectos</Alert>

              </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>

              <Grid item xs={12} sm ={6}>

                <Button 
                  disabled = { isAuthenticating }
                  type = 'submit' 
                  variant = 'contained' 
                  fullWidth 
                >
                    Login
                </Button>

              </Grid>
               <Grid item xs={12} sm ={6}>

                <Button
                  disabled = { isAuthenticating }
                  variant = 'contained' 
                  onClick={ onGoogleSingIn }
                  fullWidth 
                >
                    <Google/>
                    <Typography sx={{ ml:1 }}>Google</Typography>
                </Button>

              </Grid>

            </Grid>
            
            <Grid container
              direction= 'row'
              justifyContent='end'
            >
              <Link component= {RouterLink} color='inherit' to = '/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
        </form>

      </AuthLayuout>

  )
}
