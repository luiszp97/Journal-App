import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
   reducers: {

        savingNewNote: (state) =>{
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {

            state.notes.push( action.payload );
            state.isSaving = false;

        },
        setActiveNote: ( state, action ) => {

            state.active = action.payload;
            state.messageSaved = '';

        },
        setNote: ( state, action ) => {

            state.notes = action.payload

        },
        setSaving: ( state ) => {

            state.isSaving = true;
            state.messageSaved = ''

        },
        noteUpdated: ( state, action ) => {

          state.isSaving = false;
          state.notes = state.notes.map( note => {

            if(note.id === action.payload.id){
                return note = action.payload
            }

            return note

          } );

          state.messageSaved = `Tu nota se actualizo correctamente`

        },
        setPhotosToActiveNote : (state, action) => {

            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;

        },
        deleatedNoteById: ( state, action ) => {



        },
}
});

export const { 
        savingNewNote,
        addNewEmptyNote, 
        setActiveNote, 
        setNote, 
        setSaving, 
        noteUpdated,
        setPhotosToActiveNote, 
        deleatedNoteById } = journalSlice.actions;