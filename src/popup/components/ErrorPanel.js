import React from 'react';
import {Pane, Heading, Alert, Button, Dialog, Text, majorScale} from 'evergreen-ui';

const ErrorPanel = ({url, error, onReload}) => {
    const [isDialogShown, setIsDialogShown] = React.useState(true);

    return (
        <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height={600}
            background="#00071C"
            padding={majorScale(2)}
        >
            <Heading size={700} color="#F1F5FF" marginBottom={majorScale(2)}>Oops, something went wrong!</Heading>
            <Alert
                intent="danger"
                title="Error Message:"
                marginBottom={majorScale(2)}
            >
                {error}
            </Alert>
            <Button
                appearance="primary"
                onClick={onReload}
                marginTop={16}
                backgroundColor="#E40000"
                marginBottom={majorScale(2)}
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
