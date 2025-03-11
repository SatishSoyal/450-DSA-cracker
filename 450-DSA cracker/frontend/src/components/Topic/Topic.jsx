import React, { useEffect, useState } from 'react';
import { Container, Table, ProgressBar, DropdownButton, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import Data from '../db';
import { FaBookmark, FaRegBookmark, FaStickyNote, FaRegStickyNote, FaCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import NoteModal from '../NoteModal';
import './Topic.css';
import Chatbot from './Chatbot';


const Topic = () => {
    const { title } = useParams();
    const topicData = Data.find(topic => topic.topicName === title);

    if (!topicData) {
        return <p>Topic not found</p>;
    }


    // const [showCompiler, setShowCompiler] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false); 

    // const toggleCompiler = () => {
    //     setShowCompiler(!showCompiler);
    // };

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };



    const localStorageKey = `${title}_checkboxes`;
    const bookmarkStorageKey = `${title}_bookmarks`;
    const notesStorageKey = `${title}_notes`;

    // Initialize state based on local storage or default to question's Done/bookmark values
    const initialCheckedState = JSON.parse(localStorage.getItem(localStorageKey)) || 
    topicData.questions.map(q => q.Done);
    const initialBookmarks = JSON.parse(localStorage.getItem(bookmarkStorageKey)) || 
    topicData.questions.map(q => q.Bookmark);
    const initialNotes = JSON.parse(localStorage.getItem(notesStorageKey)) || {};

    const [bookmarkedItems, setBookmarkedItems] = useState(initialBookmarks);
    const [checkedItems, setCheckedItems] = useState(initialCheckedState);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [notes, setNotes] = useState(initialNotes);
    const [currentNote, setCurrentNote] = useState('');
    const [filter, setFilter] = useState('All'); 
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(checkedItems));
    }, [checkedItems]);
    
    useEffect(() => {
        localStorage.setItem(bookmarkStorageKey, JSON.stringify(bookmarkedItems));
    }, [bookmarkedItems]);

    useEffect(() => {
        localStorage.setItem(notesStorageKey, JSON.stringify(notes));
    }, [notes]);

    const toggleBookmark = (index) => {
        const updatedBookmarks = [...bookmarkedItems];
        updatedBookmarks[index] = !updatedBookmarks[index];
        setBookmarkedItems(updatedBookmarks);
    };

    const handleCheckboxChange = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);

        // Update Done status in topicData
        topicData.questions[index].Done = updatedCheckedItems[index];
        topicData.started = updatedCheckedItems.some(item => item); // Update topic start status

        localStorage.setItem(localStorageKey, JSON.stringify(updatedCheckedItems));
        localStorage.setItem(bookmarkStorageKey, JSON.stringify(updatedBookmarks));
        localStorage.setItem(`${title}_data`, JSON.stringify(topicData)); // Save updated topic data
    };

    const handleShowNoteModal = (question) => {
        setCurrentQuestion(question);
        setCurrentNote(notes[question] || '');
        setShowNoteModal(true);
    };

    const handleCloseNoteModal = () => setShowNoteModal(false);

    const handleSaveNote = (note) => {
        setNotes({ ...notes, [currentQuestion]: note });
        setCurrentNote(note);
    };

    const completedCount = checkedItems.reduce((count, checked) => count + (checked ? 1 : 0), 0);
    const totalCount = topicData.questions.length;
    const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    useEffect(() => {
        const completionStorageKey = `${title}_completionPercentage`;
        localStorage.setItem(completionStorageKey, JSON.stringify(completionPercentage));
    }, [completionPercentage, title]);

    const filterQuestions = (item, index) => {
        const includesSearchQuery = item.Problem.toLowerCase().includes(searchQuery.toLowerCase());
    
        switch (filter) {
            case 'Completed':
                // Only return questions that are completed (checked), and match the search query
                return checkedItems[index] && includesSearchQuery;
    
            case 'Bookmarked':
                // Only return questions that are bookmarked and match the search query
                return bookmarkedItems[index] && includesSearchQuery ;
    
            case 'Notes':
                // Only return questions that have notes and match the search query
                return notes[item.Problem] && includesSearchQuery;
    
            case 'All':
            default:
                // Show all questions that match the search query
                return includesSearchQuery;
        }
    };
    
   

    return (

        <Container>
         
         <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
    <button 
        onClick={toggleChatbot} 
        style={{
            padding: '12px 24px', 
            background: 'linear-gradient(90deg, #7f00ff, #e100ff)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: '16px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            minWidth: '170px'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
        <span style={{ position: 'relative', zIndex: 1 }}></span>
        <span 
            style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 100%)',
                zIndex: 0,
                animation: 'glitter 2s linear infinite',
            }}
        ></span>
        <style>
            {`
                @keyframes glitter {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
            `}
        </style>

        {showChatbot ? "Close Chatbot" : "Open Chatbot"}
    </button>
</div>

    {showChatbot && <Chatbot />}
            <div style={{ marginTop: '15px', marginBottom: '20px', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '5px' }}>
                    <h4>Completion Progress: {`${Math.round(completionPercentage)}%`}</h4>
                </div>
                <div style={{ position: 'relative', height: '25px', backgroundColor: '#e0e0e0', borderRadius: '15px', padding: '7px' }}>
                    <div 
                        style={{ 
                            position: 'absolute', 
                            top: '-5px', 
                            left: `calc(${completionPercentage}% - 20px)`, 
                            width: '30px', 
                            height: '30px', 
                            backgroundColor: 'cyan', 
                            borderRadius: '7px', 
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '40px', 
                            color: '#111',
                            transition: 'left 0.3s ease' 
                        }}>
                        🚀
                    </div>
                    <ProgressBar now={completionPercentage} style={{ height: '100%', borderRadius: '10px' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
    <DropdownButton
        title={`Filter: ${filter}`}
        className="custom-dropdown-button" // Custom class for button
        onSelect={(eventKey) => setFilter(eventKey)}
    >
        <Dropdown.Item eventKey="All" className="custom-dropdown-item">
            <span style={{ marginRight: '10px' }}><FaRegStickyNote /></span> All
        </Dropdown.Item>
        <Dropdown.Item eventKey="Completed" className="custom-dropdown-item">
            <span style={{ marginRight: '10px' }}><FaCheck /></span> Completed
        </Dropdown.Item>
        <Dropdown.Item eventKey="Bookmarked" className="custom-dropdown-item">
            <span style={{ marginRight: '10px' }}><FaBookmark /></span> Bookmarked
        </Dropdown.Item>
        <Dropdown.Item eventKey="Notes" className="custom-dropdown-item">
            <span style={{ marginRight: '10px' }}><FaStickyNote /></span> Notes
        </Dropdown.Item>
    </DropdownButton>

    <InputGroup style={{ width: '820px', marginLeft: '15px', height: '44px' }}>
    <FormControl
        placeholder="Search Questions ...🔍 "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
            borderRadius: '25px',
            border: '2px solid #7f00ff',
            backgroundColor: '#ffffff',
            padding: '10px 15px', // Added padding
            fontSize: '16px',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease', // Enhanced transition
        }}
        className="custom-search-bar"
    />
</InputGroup>


</div>
       </div>

       <Table striped bordered hover responsive style={{ borderCollapse: 'separate', borderSpacing: '2px 10px', minWidth: '1042px' }}>
    <thead>
        <tr>
            <th style={{
                background: 'linear-gradient(to right, #7f00ff, #e100ff)',
                color: 'white',
                textAlign: 'center',
                padding: '10px',
                borderTopLeftRadius: '30px',
                borderBottomLeftRadius: '5px'
            }}>#
            </th>
            <th style={{
                background: 'linear-gradient(to right, #7f00ff, #e100ff)',
                color: 'white',
                textAlign: 'center',
                padding: '10px'
            }}>Questions
            </th>
            <th style={{
                background: 'linear-gradient(to right, #7f00ff, #e100ff)',
                color: 'white',
                textAlign: 'center',
                padding: '10px'
            }}>Links
            </th>
            <th style={{
                background: 'linear-gradient(to right, #7f00ff, #e100ff)',
                color: 'white',
                textAlign: 'center',
                padding: '10px',
                borderTopRightRadius: '30px',
                borderBottomRightRadius: '5px',
            }}>Remarks
            </th>
        </tr>
    </thead>
    <tbody>
        {topicData.questions
            .filter(filterQuestions)
            .map((item, index) => {
                const originalIndex = topicData.questions.indexOf(item); // Get the original index
                return (
                    <tr key={originalIndex} style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    }}>
                        <td style={{
                            padding: '15px',
                            textAlign: 'center',
                            border: 'none',
                            borderTopLeftRadius: '20px',
                            borderBottomLeftRadius: '20px'
                        }}>
                            <label style={{ position: 'relative', cursor: 'pointer', top: '3px' }}>
                                <input
                                    type="checkbox"
                                    checked={checkedItems[originalIndex]} // Use the original index for checkbox state
                                    onChange={() => handleCheckboxChange(originalIndex)} // Use the original index
                                    style={{
                                        appearance: 'none',
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: checkedItems[originalIndex] ? '#7f00ff' : '#e0e0e0',
                                        borderRadius: '5px',
                                        border: '2px solid #7f00ff',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'relative',
                                        transition: 'background-color 0.3s ease, border 0.3s ease'
                                    }}
                                />
                                {checkedItems[originalIndex] && (
                                    <FaCheck 
                                        size={16} 
                                        color="white" 
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }} 
                                    />
                                )}
                            </label>
                            <span style={{ paddingLeft: '8px' }}>{originalIndex + 1}</span> {/* Use original index for numbering */}
                        </td>
                        <td style={{
                            padding: '15px',
                            textAlign: 'center',
                            border: 'none'
                        }}>
                            <a 
                                className="text-decoration: none;"
                                href={item.URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none' , color: 'blue' , fontWeight: 'bold'}}
                            >
                                {item.Problem}
                            </a>
                        </td>
                        <td style={{
                            padding: '15px',
                            textAlign: 'center',
                            border: 'none'
                        }}>
                            <a href={item.URL} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                                <img src="https://img.icons8.com/color/20/link.png" alt="" />
                            </a>
                        </td>
                        <td style={{
                            padding: '15px',
                            textAlign: 'center',
                            border: 'none',
                            borderTopRightRadius: '20px',
                            borderBottomRightRadius: '20px'
                        }}>
                            {bookmarkedItems[originalIndex] ? (
                                <FaBookmark
                                    size={23}
                                    color="#e100ff"
                                    onClick={() => toggleBookmark(originalIndex)} // Use the original index
                                    style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '15px' }}
                                />
                            ) : (
                                <FaRegBookmark
                                    size={20}
                                    color="gray"
                                    onClick={() => toggleBookmark(originalIndex)} // Use the original index
                                    style={{ cursor: 'pointer', marginLeft: '10px', marginRight: '15px' }}
                                />
                            )}
                            {notes[item.Problem] ? (
                                <FaStickyNote
                                    size={20}
                                    color="#e100ff"
                                    onClick={() => handleShowNoteModal(item.Problem)}
                                    style={{ cursor: 'pointer' }}
                                />
                            ) : (
                                <FaRegStickyNote
                                    size={20}
                                    color="gray"
                                    onClick={() => handleShowNoteModal(item.Problem)}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </td>
                    </tr>
                );
            })}
    </tbody>
</Table>

{topicData.questions.filter(filterQuestions).length === 0 && (
            <h3 className="text-center" style={{ marginTop: '20px', fontWeight: 'bold' }}>
                No matches found
            </h3>
        )}

            <NoteModal
                show={showNoteModal}
                handleClose={handleCloseNoteModal}
                question={currentQuestion}
                saveNote={handleSaveNote}
                initialNote={currentNote}
            />  
        </Container>
    );
};

export default Topic;