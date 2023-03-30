import React, {useEffect, useState} from "react";
import {Note as NoteModel} from "./models/note";

import Note from "./components/note.component";

import {Col, Container, Row, Button} from "react-bootstrap";
import styles from "./styles/notePage.module.scss";

import {fetchNotes} from "./network/notes_api";

import createHttpError from "http-errors"
import Add_note_dialogComponent from "./components/add_note_dialog.component";
import AddNoteDialog from "./components/add_note_dialog.component";

function App() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const[showAddNoteDialog, setShowAddNoteDialog]= useState(false);

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const notes = await fetchNotes();
                setNotes(notes);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        };
        loadNotes();
    }, []);

    return (
        <Container>
            <Button className="mb-4"
                onClick={()=> setShowAddNoteDialog(true)}>
                Add new note
            </Button>
            <Row xs={1} md={2} xl={3} className="g-4">
                {notes.map((note) => (
                    <Col key={note._id}>
                        <Note note={note} className={styles.note}/>
                    </Col>
                ))}
            </Row>
            { showAddNoteDialog && <AddNoteDialog  onDismiss={()=>setShowAddNoteDialog(false)}
                                                   onNoteSaved={(newNote)=>{
                                                       setNotes([...notes, newNote ])
                                                       setShowAddNoteDialog(false)
                                                   }}/>

            }
        </Container>
    );
}

export default App;
