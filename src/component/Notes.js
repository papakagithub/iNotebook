import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './Noteitem';

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    return (
        <div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <NoteItem note={note} />;
                })}
            </div>
        </div>
    )
}
