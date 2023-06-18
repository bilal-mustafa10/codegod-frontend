import React from 'react';
import {Pane, TextInputField, Button} from 'evergreen-ui';
import "../styles.css"; // Import the CSS file

const ChatInput = ({value, onChange, onSend, isLoading, blankQuestionError, disabled}) => (
    <Pane className="chat-input-pane">
        <TextInputField
            className="chat-input-text"
            flex={1}
            marginRight={12}
            marginTop={0}
            marginBottom={0}
            placeholder="Ask a question about your repo"
            color="#00071C"
            value={value}
            onChange={onChange}
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault(); // Prevents the addition of a new line
                    onSend();
                }
            }}
            disabled={isLoading}
            fontFamily="monospace"
            fontSize={18}
            spellCheck={true}
            isInvalid={blankQuestionError}
        />
        <Button
            className="chat-input-button"
            marginRight={4}
            marginTop={8}
            marginBottom={0}
            iconBefore="send"
            intent="success"
            appearance="primary"
            onClick={onSend}
            backgroundColor="#008A4E"
            fontSize={18}
            disabled={isLoading}
        >
            Send
        </Button>
    </Pane>

);

export default ChatInput;
