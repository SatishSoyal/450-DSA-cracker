import React, { useState } from 'react';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';  // Import icons from react-icons

const Chatbot = () => {
    const [chatInput, setChatInput] = useState('');  // State for chatbot input
    const [chatOutput, setChatOutput] = useState('');  // State for chatbot output
    const [chatHistory, setChatHistory] = useState([]);  // History of chats
    const [loading, setLoading] = useState(false);  // Loading state for spinner

    // Handle chat input change
    const handleChatChange = (event) => {
        setChatInput(event.target.value);
    };

    // Call the backend API using Eden AI
    const handleChatSubmit = async () => {
        if (!chatInput) return;

        setLoading(true);  // Show spinner when loading

        const response = await fetch('http://localhost:5000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: chatInput })
        });

        const data = await response.json();
        const botResponse = data.response || "Sorry, I don't understand that. Please ask something else.";
        
        // Update the chat history
        setChatHistory([...chatHistory, { question: chatInput, answer: botResponse }]);
        setChatInput('');  // Clear input
        setChatOutput(botResponse);
        setLoading(false);  // Stop spinner after API call
    };

    return (
        <div style={{ margin: '20px 0', textAlign: 'center', padding: '10px' }}>
           <div 
    style={{
        backgroundColor: 'rgba(230, 230, 250, 0.5)',  // Light lavender with transparency
        borderRadius: '20px',
        padding: '20px',
        color: '#ffffff',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        marginBottom: '20px',
        maxWidth: '1042px',  // Set max width to 1042px
        marginLeft: 'auto',
        marginRight: 'auto',
        backdropFilter: 'blur(20px)',  // Increase blur for an enhanced glassy appearance
        border: '1px solid rgba(255, 255, 255, 0.4)',  // Lighter border for contrast
    }}
>
                <h3 style={{ color: '#1a2447',fontWeight:'bolder' }}>Chatbot</h3>
                <textarea
                    placeholder="Ask me anything... (e.g., 'reverse the array definition')"
                    value={chatInput}
                    onChange={handleChatChange}
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '12px',
                        borderRadius: '20px',
                        border: '1px solid #444',
                        fontFamily: 'monospace',
                        backgroundColor: '#434352',  // Dark background for typing
                        color: '#ffffff',  // White text for contrast
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                        outline: 'none',
                        transition: 'border 0.2s ease',
                    }}
                    onFocus={e => e.currentTarget.style.border = '5px solid #fae03e'}  
                    onBlur={e => e.currentTarget.style.border = '5px solid #73f577'}
                />
                <button 
    onClick={handleChatSubmit}
    style={{
        marginTop: '10px',
        padding: '12px 24px', 
        backgroundColor: '#28a745',  // Green background
        color: '#fff', 
        border: 'none', 
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',  // Align icon and text in button
        gap: '10px',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        position: 'relative', // Position relative for spinner
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    disabled={loading}  // Disable button when loading
>
    {loading ? 
        <FaSpinner 
            style={{
                animation: 'spin 1s linear infinite',
                display: 'block', // Ensures spinner appears properly
                marginRight: '10px' // Space between spinner and text
            }} 
        /> 
        : 
        <FaPaperPlane />
    }
    {loading ? "Sending..." : "Ask"}
</button>

<style>
{`
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`}
</style>

            </div>

            <div 
                style={{
                    marginTop: '15px',
                    textAlign: 'left',
                    padding: '20px',
                    fontWeight: 'bolder',
                    border: '1px solid #fae03e',  // Cool border style
                    borderRadius: '10px',
                    backgroundColor: 'rgba(230, 230, 250, 0.5)',  // Light lavender with transparency
                    color: '#1a2447',  // White text
                    maxWidth: '1042px', // Set max width to 1042px
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',  // Deeper shadow for the output box
                    fontSize: '18px',  // Slightly larger text for readability
                    lineHeight: '1.6',  // Line height for better spacing
                    wordWrap: 'break-word',  // Ensure long words break nicely
                }}
            >
                <strong>Output:</strong>
                <pre style={{ 
    fontFamily: 'monospace', 
    marginTop: '0px', 
    padding: '10px',
    backgroundColor: '#1f1f2e',
    borderRadius: '5px',
    color: '#73f577',  
    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',  
    whiteSpace: 'pre-wrap',  
    wordWrap: 'break-word', 
    overflow: 'hidden', 
    maxHeight: 'none', 
    height: 'auto', 
}}>
    {chatOutput}
</pre>

            </div>

            <div 
                style={{
                    marginTop: '15px',
                    textAlign: 'left',
                    padding: '10px',
                    border: '5px solid #ddd',
                    borderRadius: '5px',
                    backgroundColor: '#2d2d3f',
                    color: '#fff',
                    maxWidth: '1042px',  // Set max width to 1042px
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <strong>Chat History:</strong>
                <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                    {chatHistory.map((chat, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            <div><strong>You:</strong> {chat.question}</div>
                            <div><strong>Bot:</strong> {chat.answer}</div>
                            {index < chatHistory.length - 1 && <hr style={{ border: '1px solid white', marginTop: '10px' }} />}  {/* White line between chat pairs */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Chatbot;
