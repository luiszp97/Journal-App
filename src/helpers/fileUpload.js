export const fileUpload = async ( file )=>{

    if(!file) throw new Error('Selecciona al menos un archivo')

    const cloudURL = 'https://api.cloudinary.com/v1_1/doxsvfdyf/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'recat-journal');
    formData.append('file', file)

    try {

        const resp = await fetch( cloudURL, {
            method: 'POST',
            body: formData
        } );

        if(!resp.ok) throw new Error('Ha ocurrido un error inesperado');

        const cloudResp = await resp.json();
        console.log(cloudResp)

        return cloudResp.secure_url;

    } catch (error) { 

        console.log(error);
        throw new Error(error.message);

    }

}
