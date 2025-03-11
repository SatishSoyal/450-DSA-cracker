import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container,} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Data from '../db'; // Import your data
import './TopicCard.css';
import Navbar from '../Navbar';

// TopicCard component that accepts props for dynamic content
const TopicCard = ({ title, totalQuestions, status, completionPercentage }) => {
    const [isHovered, setIsHovered] = useState(false); // State to track hover

    return (
        <Link to={`/topic/${title}`} style={{ textDecoration: 'none' }}>
            <Card
                style={{
                    width: '25rem',
                    minHeight:'200px',
                    backgroundColor: status === "In Progress" ? '#d1f7c4' : '#fceed1', // Change color based on status
                    borderRadius: '30px',
                    borderLeftWidth:'1px',
                    borderTopWidth:'1px',
                    borderRightWidth: '4px',
                    borderBottomWidth:'4px',
                    borderColor:'#454647',
                    padding: '10px',
                    transition: 'transform 0.1s',
                    animation: isHovered ? 'pulse 1s infinite' : 'none',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Card.Body>
                    <Row className="mb-3">
                        <Col>
                            <Card.Title style={{ fontWeight: 'bold', fontFamily: 'Times New Roman', fontSize: '1.5rem' }}>
                                {title}
                            </Card.Title>
                        </Col>
                        <Col className="text-end">
                            <Button
                                variant={status === "In Progress" ? "success" : "primary"} // Change button color based on status
                                style={{
                                    borderColor: status === "In Progress" ? "#5cb85c" : "#c89666", // Match border color to button color
                                    borderRadius: '30px',
                                    fontFamily: 'monospace'
                                }}
                            >
                                {status === "In Progress" ? "Resume " : "Start Now"} {/* Change button text based on status */}
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <Card.Text style={{ fontFamily: 'monospace', fontSize: '1rem' }}>
                                Total Questions: {totalQuestions}
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Text style={{ fontStyle: 'italic', fontFamily: 'monospace', color: 'gray' }}>
                                {status}
                            </Card.Text>
                        </Col>
                    </Row>

                    {/* Conditional Progress Bar */}
                    {status === "In Progress" && (
                        <div style={{ marginTop: '5px', marginBottom: '0px', position: 'relative' }}>
                            <h6>Completion Progress</h6>

                            {/* Label showing the percentage above the bar */}
                            <div style={{ textAlign: 'center', marginBottom: '3px' }}>
                                {`${Math.round(completionPercentage)}%`}
                            </div>

                            {/* Progress bar wrapper */}
                            <div style={{ position: 'relative', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '15px', padding: '5px' }}>

                                {/* Moving custom indicator */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-3px',// Adjust to align with the progress bar
                                        left: `calc(${completionPercentage}% - 5px)`, // Adjust the left position based on the percentage
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: 'cyan', // Indicator color
                                        borderRadius: '7px', // To simulate a stylized design
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '30px',
                                        color: '#111',
                                        transition: 'left 0.3s ease'
                                    }}>
                                    {/* Design */}
                                    🚀
                                </div>

                                {/* Actual progress bar fill */}
                                <div style={{
                                    height: '100%',
                                    borderRadius: '15px',
                                    width: `${completionPercentage}%`,
                                    backgroundColor: '#4CAF50', // Color for completed portion
                                    transition: 'width 0.3s ease'
                                }} />
                            </div>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Link>
    );
};

// TopicGrid component that renders multiple TopicCards
const TopicGrid = () => {
    // State to store the topics with their started status
    const [topics, setTopics] = useState([]);

    // Fetch and store topics from Data, updating the started status from local storage
    useEffect(() => {
        const storedTopics = Data.map(topic => {
            const localStorageKey = `${topic.topicName}_started`;
            const startedStatus = JSON.parse(localStorage.getItem(localStorageKey)) || topic.started;

            // Fetch the completion percentage from local storage
            const completionStorageKey = `${topic.topicName}_completionPercentage`;
            const completionPercentage = JSON.parse(localStorage.getItem(completionStorageKey)) || 0;

            return {
                ...topic,
                started: startedStatus, // Set started status from local storage
                completionPercentage 
            };
        });

        setTopics(storedTopics);
    }, []);

    useEffect(() => {
        topics.forEach(topic => {
            const localStorageKey = `${topic.topicName}_started`;
            localStorage.setItem(localStorageKey, JSON.stringify(topic.started));

            const completionStorageKey = `${topic.topicName}_completionPercentage`;
            const totalQuestions = Array.isArray(topic.questions) ? topic.questions.length : 0;
            const completedCount = topic.questions.filter(q => q.Done).length; 
            const completionPercentage = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;
            localStorage.setItem(completionStorageKey, JSON.stringify(completionPercentage)); 
        });
    }, [topics]);

    return (<>
        <Container 
            style={{
                marginTop: '70px'
            }}
            >
            
            {Array.from({ length: Math.ceil(topics.length / 3) }).map((_, rowIndex) => (
                <Row key={rowIndex} className="mb-4">
                    {topics.slice(rowIndex * 3, rowIndex * 3 + 3).map((topic, index) => {
                        const totalQuestions = Array.isArray(topic.questions) ? topic.questions.length : 0;
                        const completedCount = topic.questions.filter(q => q.Done).length; 
                        const completionPercentage = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

                        return (
                            <Col key={index} className="d-flex justify-content-center">
                                <TopicCard
                                    title={topic.topicName}
                                    totalQuestions={totalQuestions}
                                    status={topic.started ? "In Progress" : "Not yet started"}
                                    completionPercentage={topic.completionPercentage
                                    }
                                />
                            </Col>
                        );
                    })}
                </Row>
            ))}
        </Container>
        </>
    );
};

export default TopicGrid;
