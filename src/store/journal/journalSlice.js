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

            state.active = action.payload

        },
        setNote: ( state, action ) => {

            state.notes = action.payload

        },
        setSaving: ( state ) => {



        },
        updateNote: ( state, action ) => {



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
        updateNote, 
        deleatedNoteById } = journalSlice.actions;