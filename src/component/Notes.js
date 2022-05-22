import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './Noteitem';
import AddNote from './AddNote';

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        getNotes();
        //   react-hooks/exhaustive-deps
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: ""})

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    const handleClick = ()=>{
        console.log('Updating the note...', note);
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert('Updated Successfully','success');
    }

    return (
        <div>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Edit a Note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5||note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="continer">
                    {notes.length===0&&'No notes to display.'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
                })}
            </div>
        </div>
    )
}
