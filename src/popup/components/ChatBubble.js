import React from 'react';
import {Pane, Text, Spinner, Strong} from 'evergreen-ui';
import { motion } from 'framer-motion';
import FormatResponse from "../utils/FormatResponse";
import "../styles.css";

const ChatBubble = ({chat}) => (
    <React.Fragment key={'message' + chat.id}>
        {chat.id === 0 ? (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="fade-enter"
            >
                <Pane className="bot-pane chat-bubble-pane">
                    <Strong className="chat-bubble-text">
                        Codegod
                    </Strong>
                    <br/>
                    {chat.answer === 'Loading...' ?
                        <Spinner size={16} />
                        : <FormatResponse content={chat.answer} />
                    }
                </Pane>
            </motion.div>
        ) : (
            <>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fade-enter"
                >
                    <Pane className="user-pane chat-bubble-pane">
                        <Strong className="chat-bubble-text">
                            You
                        </Strong>
                        <br/>
                        <Text className="chat-bubble-text">
                            {chat.question}
                        </Text>
                    </Pane>
                    <Pane className="bot-pane chat-bubble-pane">
                        <Strong className="chat-bubble-text">
                            Codegod
                        </Strong>
                        <br/>
                        {chat.answer === 'Loading...' ?
                            <Text className="loading-text">
                                {chat.answer}
                            </Text>
                            :
                            <FormatResponse content={chat.answer} />
                        }
                    </Pane>
                </motion.div>
            </>
        )}
    </React.Fragment>
);

export default ChatBubble;
