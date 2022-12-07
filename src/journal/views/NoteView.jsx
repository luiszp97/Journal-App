import { useMemo, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from "../../hook/useForm"
import { setActiveNote, startSaveNote } from "../../store/journal"
import { ImageGalery } from "../components"
import { startUploadingFiles } from "../../store/auth/thunks"

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active : note, isSaving, messageSaved } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState } = useForm( note );

    const fileInputRef = useRef();

    const dateString = useMemo( ()=>{

        const newDate = new Date( date );
        return newDate.toUTCString();

    }, [ date ] );

    useEffect( ()=>{

        dispatch( setActiveNote(formState) );

    }, [formState]);

    useEffect( ()=>{
        if( messageSaved.length > 0 ){

            Swal.fire('Nota actualizada', messageSaved, 'success');

        }
    }, [messageSaved] )

    const onSaveNote = ()=>{
        dispatch( startSaveNote() )
    }

    const onFileImputChange = ({target})=> {

        if(target.files === 0) return 

        dispatch( startUploadingFiles( target.files ) )

    }

  return (
    <Grid container
        className="animate__animated animate__fadeIn animate__faster"
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx = {{mb:1}}
    >
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
        </Grid>

        <Grid item>
            <input
                type='file'
                multiple
                onChange={ onFileImputChange }
                ref={ fileInputRef }
                style = {{display: 'none'}}
            />

            <IconButton
                color = 'primary'
                disabled= { isSaving }
                onClick = { ()=> fileInputRef.current.click() }
            >
                <UploadOutlined sx ={{width:30, height: 30}}/>
            </IconButton>

            <Button 
                disabled = { isSaving }
                color='primary' 
                sx={{padding:2}}
                onClick = { onSaveNote }
            >
                    <SaveOutlined sx={{ fontSize:30, mr:1}}/>
                    Guardar
            </Button>
        </Grid>

        <Grid container>

            <TextField
                type= 'text'
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label = 'Titulo'
                sx={{ border: 'none', mb:1 }}
                name = 'title'
                value={ title }
                onChange= { onInputChange }
            />

            <TextField
                type= 'text'
                variant="filled"
                fullWidth
                multiline
                placeholder="Que sucedio en el dia de hoy?"
                minRows={5}
                name = 'body'
                value={ body }
                onChange= { onInputChange }
            />

        </Grid>

        <ImageGalery/>

    </Grid>
  )
}
