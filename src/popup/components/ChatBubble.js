import React from 'react';
import {Pane, Text, Spinner, Strong, IconButton, Tooltip} from 'evergreen-ui';
import { motion } from 'framer-motion';
import FormatResponse from "../utils/FormatResponse";
import { FiCopy } from 'react-icons/fi';
import "../styles.css";

const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    const copyBtn = document.getElementById(id);
    copyBtn.classList.add("copied");
    setTimeout(() => {
        copyBtn.classList.remove("copied");
    }, 3500);
};

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
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Strong className="chat-bubble-text">
                            Codegod
                        </Strong>
                        <Tooltip content="Copy to clipboard">
                            <IconButton
                                id={`copy-btn-${chat.id}`}
                                icon={FiCopy}
                                appearance="minimal"
                                onClick={() => copyToClipboard(chat.answer, `copy-btn-${chat.id}`)}
                            />
                        </Tooltip>
                    </div>
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
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Strong className="chat-bubble-text">
                                You
                            </Strong>
                            <Tooltip content="Copy to clipboard">
                                <IconButton
                                    id={`copy-btn-${chat.id}`}
                                    icon={FiCopy}
                                    appearance="minimal"
                                    onClick={() => copyToClipboard(chat.question, `copy-btn-${chat.id}`)}
                                />
                            </Tooltip>
                        </div>
                        <br/>
                        <Text className="chat-bubble-text">
                            {chat.question}
                        </Text>
                    </Pane>
                    <Pane className="bot-pane chat-bubble-pane">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Strong className="chat-bubble-text">
                                Codegod
                            </Strong>
                            <Tooltip content="Copy to clipboard">
                                <IconButton
                                    id={`copy-btn-${chat.id}`}
                                    icon={FiCopy}
                                    appearance="minimal"
                                    onClick={() => copyToClipboard(chat.answer, `copy-btn-${chat.id}`)}
                                />
                            </Tooltip>
                        </div>
                        <br/>
                        {chat.answer === 'Loading...' ?
                            <Text className="loading-text">
                                {chat.answer}<span className="loading-ellipsis">...</span>
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
