import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './Noteitem';
import AddNote from './AddNote';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes,addNote } = context;
    return (
        <div>
            <AddNote/>
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />;
                })}
            </div>
        </div>
    )
}
