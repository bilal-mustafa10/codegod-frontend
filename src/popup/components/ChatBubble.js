import React from 'react';
import {Pane, Text, Spinner, Strong} from 'evergreen-ui';
import { motion } from 'framer-motion'; // Import framer-motion for animations

const ChatBubble = ({chat}) => (
    <React.Fragment key={'message' + chat.id}>
        {chat.id === 0 ? (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Pane
                    backgroundColor="#350063"
                    padding={16}
                    borderRadius={16}
                    maxWidth="70%"
                    marginTop={16}
                    marginRight="auto"
                >
                    <Strong marginTop={0} size={500} fontFamily="'Roboto Mono', monospace" color="#F1F5FF">
                        Codegod
                    </Strong>
                    <br/>
                    <Text marginTop={8} size={400} fontFamily="'Roboto Mono', monospace" color="#F1F5FF">
                        {chat.answer === 'Loading...' ? <Spinner size={16} /> : chat.answer}
                    </Text>
                </Pane>
            </motion.div>
        ) : (
            <>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Pane
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        marginBottom={16}
                        padding={16}
                        fontFamily="'Roboto Mono', monospace"
                    >
                        <Pane
                            backgroundColor="#0070f3"
                            padding={16}
                            borderRadius={16}
                            maxWidth="70%"
                            marginTop={16}
                            marginLeft="auto"
                        >
                            <Strong marginTop={0} size={500} fontFamily="'Roboto Mono', monospace" color="#F1F5FF">
                                You
                            </Strong>
                            <br/>
                            <Text marginTop={8} size={400} fontFamily="'Roboto Mono', monospace" color="#F1F5FF">
                                {chat.question}
                            </Text>
                        </Pane>
                        <Pane
                            backgroundColor="#350063"
                            padding={16}
                            borderRadius={16}
                            maxWidth="70%"
                            marginTop={16}
                            marginRight="auto"
                        >
                            <Strong marginTop={0} size={500} fontFamily="'Roboto Mono', monospace" color="#F1F5FF">
                                Codegod
                            </Strong>
                            <br/>
                            {chat.answer === 'Loading...' ?
                                <Text marginTop={8} size={400} fontFamily="'Roboto Mono', monospace" color="#F1F5FF" className="loading-text">
                                    {chat.answer}
                                </Text>
                                :
                                <Text marginTop={8} size={400} fontFamily="'Roboto Mono', monospace" color="#F1F5FF">
                                    {chat.answer}
                                </Text>
                            }
                        </Pane>
                    </Pane>
                </motion.div>
            </>
        )}
    </React.Fragment>
);

export default ChatBubble;
