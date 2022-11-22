import { useDispatch, useSelector } from "react-redux"

import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView } from "../views"
import { startNewNote } from "../../store/journal/thunks"

export const JournalPage = () => {

  const { isSaving, active } = useSelector(state => state.journal);

  const dispatch = useDispatch();

  const onClickNote = () => {
    dispatch( startNewNote() )
  }
  
  return (
    <JournalLayout>
      { (!!active) ? <NoteView/> : <NothingSelectedView/> }
    
      <IconButton
        onClick={ onClickNote } 
        disabled = { isSaving }
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover':{backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>

    </JournalLayout>
  )
}
