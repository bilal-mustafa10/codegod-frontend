// LoadingPanel.js
import React, { useState, useEffect } from 'react';
import { Pane, Heading, Text } from 'evergreen-ui';
import Lottie from "lottie-react";
import animationData from "../../assets/loading-robot.json";
import tips from '../../assets/tips.js'; // Import tips from the tips.js file
import '../styles.css';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const LoadingPanel = () => {
    // Set initial state to a random tip from the array
    const [currentTip, setCurrentTip] = useState(tips[Math.floor(Math.random() * tips.length)]);

    // Update the tip every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
        }, 5000);

        // Clean up the interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <Pane display="flex" flexDirection="column" className="loading-pane">
            <Pane className="header-pane">
                <Heading className="header-heading">CODEGOD</Heading>
            </Pane>
            <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1} className="animation-text-container">
                <div className="loading-animation-container">
                    <Lottie
                        options={defaultOptions}
                        animationData={animationData}
                    />
                </div>
                <Heading className="loading-text">Understanding the code....</Heading>
                <Text className="loading-tip">
                    {currentTip.split('\n').map((item, i) =>
                        i === 0
                            ? <React.Fragment key={i}><div className="tip-title">{item}</div><br /></React.Fragment>
                            : <React.Fragment key={i}><div className="tip-content">{item}</div><br /></React.Fragment>
                    )}
                </Text>
            </Pane>
        </Pane>
    );
};

export default LoadingPanel;
