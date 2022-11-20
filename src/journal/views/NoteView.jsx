import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGalery } from "../components"

export const NoteView = () => {
  return (
    <Grid container
        className="animate__animated animate__fadeIn animate__faster"
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx = {{mb:1}}
    >
        <Grid item>
            <Typography frontSize={39} fontWeight='light'>03 de noviembre de 2022</Typography>
        </Grid>

        <Grid item>
            <Button color='primary' sx={{padding:2}}>
                <SaveOutlined sx={{ fontSize:30, mr:1 }}/>
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
            />

            <TextField
                type= 'text'
                variant="filled"
                fullWidth
                multiline
                placeholder="Que sucedio en el dia de hoy?"
                minRows={5}
            />

        </Grid>

        <ImageGalery/>

    </Grid>
  )
}
