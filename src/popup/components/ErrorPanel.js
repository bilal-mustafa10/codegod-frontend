import React from 'react';
import {Pane, Heading, Alert, Button, Dialog, Text} from 'evergreen-ui';
import "../styles.css"; // Import the CSS file

const ErrorPanel = ({url, error, onReload}) => {
    const [isDialogShown, setIsDialogShown] = React.useState(true);

    return (
        <Pane className="error-panel">
            <Heading size={700} className="error-heading">Oops, something went wrong!</Heading>
            <Alert
                intent="danger"
                title="Error Message:"
            >
                {error}
            </Alert>
            <Button
                appearance="primary"
                className="button"
                onClick={onReload}
            >
                Try Again
            </Button>
            <Button
                appearance="minimal"
                onClick={() => setIsDialogShown(true)}
                color="#F1F5FF"
            >
                More Info
            </Button>
            <Dialog
                isShown={isDialogShown}
                title="Troubleshooting"
                onCloseComplete={() => setIsDialogShown(false)}
                confirmLabel="Got it"
            >
                <Text>
                    Make sure you're on a GitHub repository page.
                    If the problem persists, please check your internet connection or try again later.
                </Text>
            </Dialog>
        </Pane>
    );
}

export default ErrorPanel;
