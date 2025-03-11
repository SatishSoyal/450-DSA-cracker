import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const NoteModal = ({ show, handleClose, question, saveNote, initialNote }) => {
    const [note, setNote] = useState('');
    useEffect(() => {
        setNote(initialNote); 
    }, [initialNote, show]);

    const handleSave = () => {
        saveNote(note); 
        handleClose(); 
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title>{question}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter your note here : "
                    style={{
                        width: '100%',
                        height: '150px',
                        border: '2px solid #7f00ff',
                        borderRadius: '5px',
                        padding: '10px',
                        fontSize: '14px'
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleSave}>
                    Save
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NoteModal;
