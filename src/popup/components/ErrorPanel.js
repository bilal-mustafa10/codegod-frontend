// ErrorPanel.js
import React from 'react';
import { Pane, Heading, Text, Button } from 'evergreen-ui';
import Lottie from 'lottie-react';
import animationData from '../../assets/robot.json';
import '../styles.css';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const ErrorPanel = ({ error, onReload }) => {
    return (
        <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center" className="error-panel">
            <div className="animation-container">
                <Lottie
                    options={defaultOptions}
                    animationData={animationData}
                />
            </div>
            <Heading size={700} className="error-heading">Oops, something went wrong!</Heading>
            <Text className="error-heading-small">{error}</Text>
            <Pane display="flex" justifyContent="space-between" width="100%">
                <Button
                    appearance="primary"
                    className="button"
                    onClick={onReload}
                >
                    Try Again
                </Button>
                <Button
                    appearance="primary"
                    className="github-button"
                    onClick={() => window.open('https://github.com', '_blank')}
                >
                    Go to GitHub
                </Button>
            </Pane>
        </Pane>
    );
};

export default ErrorPanel;
