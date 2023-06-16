import React from 'react';
import {Pane, TextInputField, Button} from 'evergreen-ui';

const ChatInput = ({value, onChange, onSend, isLoading, blankQuestionError}) => (
    <Pane
        padding={16}
        background="#0B0033"
        display="flex"
        alignItems="center"
        zIndex={2}
    >
        <TextInputField
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
            style={{height: '50px', borderRadius: '20px'}}
        />
        <Button
            marginRight={4}
            marginTop={8}
            marginBottom={0}
            iconBefore="send"
            intent="success"
            appearance="primary"
            onClick={onSend}
            backgroundColor="#008A4E"
            fontSize={18}
            borderRadius={20}
            style={{height: '50px'}}
            disabled={isLoading}
        >
            Send
        </Button>
    </Pane>

);

export default ChatInput;
