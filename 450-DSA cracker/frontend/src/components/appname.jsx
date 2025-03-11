import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Appname = () => {
    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Raleway:wght@400&display=swap');

                    body {
                        font-family: 'Raleway', sans-serif;
                        background: linear-gradient(270deg, #b8f5ed, #64DDCD);
                        min-height: 100vh;
                        margin: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-start;
                    }

                    .app-container {
                        margin-top: 50px; /* Space for the navbar */
                        padding: 25px;
                        width: 1040px; /* Fixed width set to 1040px */
                        text-align: center;
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 30px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                        position: relative;
                        overflow: hidden; /* To hide overflow of decorative shapes */
                    }

                    .app-title {
                        font-family: 'Playfair Display', serif;
                        font-size: 4.5rem;
                        font-weight: 700;
                        color: #FF5722;
                        letter-spacing: 2px;
                        text-shadow: 1px 3px 8px rgba(0, 0, 0, 0.3);
                    }

                    .divider {
                        width: 300px;
                        height: 3px;
                        background: linear-gradient(90deg, #7f00ff, #e100ff);
                        margin: 20px auto;
                        border-radius: 20px;
                    }

                    .desc {
                        font-family: 'Raleway', sans-serif;
                        font-size: 1.8rem;
                        color: #34495E;
                        margin-top: 10px;
                    }

                    
                   .rhombus {
                        width: 10px; /* Set the width of the rhombus */
                        height: 140px; /* Set the height of the rhombus */
                        background-color:#7f00ff; /* Rhombus color */
                        position: absolute;
                        top : -20px;
                        left: 20px;
                        transform: rotate(27deg); /* Rotate to form a rhombus */
                        margin: 0px; /* Center the rhombus */
                        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
                    }


                    .kite-right {
                     position: absolute;
                        top: 0px; /* Adjusted position */
                        width: 0;
                        height: 0;
                        border-left: 40px solid transparent;
                        border-right: 40px solid transparent;
                        border-bottom: 80px solid #7f00ff; 
                        right: 1005px; /* Adjusted position */
                        border-bottom-color: #e100ff; /* Blue kite */
                        transform: rotate(180deg); /* Flip for the right kite */
                        
                    }

                      .decorative-circle-large {
                        position: absolute;
                        bottom: -40px;
                        right: -40px;
                        width: 120px;
                        height: 120px;
                        background: linear-gradient(90deg, #7f00ff, #e100ff);
                        border-radius: 50%;
                        opacity: 0.8;
                    }


                    /* Add responsiveness */
                    @media (max-width: 768px) {
                        .app-container {
                            width: calc(100% - 40px); /* Allow responsiveness on smaller screens */
                            padding: 20px;
                        }

                        .app-title {
                            font-size: 3rem;
                        }

                        .desc {
                            font-size: 1.4rem;
                        }
                    }
                `}
            </style>
            <div className="app-container">
                <div className="rhombus"></div>
                <div className="kite-right"></div>
                <div className="decorative-circle-large"></div>
                <h1 className="app-title">CODECLIMB</h1>
                <div className="divider"></div>
                <p className="desc">Track your progress and enhance your skills!</p>
            </div>
        </>
    );
};

export default Appname;
