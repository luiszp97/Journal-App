import { useState, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material"
import { AuthLayuout } from "../layout/AuthLayuout"
import { useForm } from "../../hook";
import { startCreatingUserWithEmailPassword } from "../../store/auth";


const fromData ={
  email:'',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value)=> value.includes('@'), 'Introduzca un correo valido'],
  password: [(value)=> value.length >= 6, 'Debe contener mas de 6 caracteres'],
  displayName: [(value)=> value.length >= 2, 'Debe ingresar un nombre valido'],
}


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false)

  const {status, errorMessage} = useSelector((state) => state.auth);
  
  const inCheckingAuthentication = useMemo( ()=> status === 'checking' || status === 'authenticated', [ status ] );

  const { 
    formState, displayName ,email, password, onInputChange,  
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(fromData, formValidations);


  const onSubmit = ( event )=> {

    event.preventDefault()
    setFormSubmited(true)

    if( !isFormValid ) return;

    dispatch( startCreatingUserWithEmailPassword (formState) );

  }


  return (
      <AuthLayuout title="Login">
        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>

            <Grid item xs = {12} sx = {{mt: 2}}>
              <TextField
                label = "Nombre completo"
                type="text"
                name="displayName"
                value={ displayName }
                onChange = { onInputChange }
                placeholder= "Tu nombre"
                error = { !!displayNameValid && formSubmited}
                helperText = { formSubmited && displayNameValid }
                fullWidth
              />
            </Grid>

            <Grid item xs = {12} sx = {{mt: 2}}>
              <TextField
                label = "correo"
                type="email"
                name="email"
                value={ email }
                onChange = { onInputChange }
                placeholder= "correo@example.com"
                error = { !!emailValid && formSubmited }
                helperText = {formSubmited && emailValid }
                fullWidth
              />
            </Grid>

            <Grid item xs = {12} sx = {{mt: 2}}>
              <TextField
                label = "contraseña"
                type="password"
                name="password"
                value={ password }
                onChange = { onInputChange }
                placeholder= "*********"
                error = { !!passwordValid && formSubmited }
                helperText = { formSubmited && passwordValid }
                fullWidth
              />
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>

              <Grid 
                item 
                xs={12}
                display = { !!errorMessage ? '' : 'none' }
              >

                  <Alert severity = 'error'>{errorMessage}</Alert>

              </Grid>

              <Grid item xs={12}>

                <Button 
                  disabled = { inCheckingAuthentication }
                  type = 'submit'
                  variant = 'contained' 
                  fullWidth
                >
                    Crear cuenta
                </Button>

              </Grid>

            </Grid>
            
            <Grid container
              direction= 'row'
              justifyContent='end'
            >
              <Typography sx = {{mr:1}}> Ya tienes uan cuenta?</Typography>
              <Link component= {RouterLink} color='inherit' to = '/auth/login'>
                Ingresar
              </Link>
            </Grid>

          </Grid>
        </form>

      </AuthLayuout>
  )
}