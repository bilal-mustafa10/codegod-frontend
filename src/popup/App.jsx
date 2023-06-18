// App.js

import React, {useCallback, useEffect, useRef, useReducer} from 'react';
import {Pane, Heading} from 'evergreen-ui';
import {askQuestion, loadBot, updateModel} from "./api";
import ErrorPanel from "./components/ErrorPanel";
import Header from "./components/Header";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import './styles.css';
import { initialState, reducer } from './stateReducer';

const isValidGithubRepoUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts.length >= 5 && urlParts[2] === "github.com";
};

const parseGithubRepoUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts.slice(0, 5).join("/");
};

const MemoizedChatBubble = React.memo(ChatBubble);

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const messagesEndRef = useRef(null);

    const load = async () => {
        dispatch({ type: 'SET_ERROR', payload: null });

        chrome.tabs.query({active: true, currentWindow: true}, async function (tabs) {
            let current_url = tabs[0].url;
            if (!isValidGithubRepoUrl(current_url)) {
                dispatch({ type: 'SET_ERROR', payload: "Please navigate to a GitHub repository page and try again." });
                dispatch({ type: 'SET_LOADING', payload: false });
                return;
            }

            let parsed_url = parseGithubRepoUrl(current_url);
            dispatch({ type: 'SET_URL', payload: parsed_url });

            const response = await loadBot(parsed_url);

            if (response.status !== 200) {
                dispatch({ type: 'SET_ERROR', payload: `Error: ${response}` });
                dispatch({ type: 'SET_LOADING', payload: false });
                return;
            }

            dispatch({ type: 'SET_MESSAGE_HISTORY', payload: [{
                    id: 0,
                    question: '',
                    answer: 'Hi, I am Codegod. I can answer any question about the repo you are currently viewing.'
                }]
            });

            dispatch({ type: 'SET_LOADING', payload: false });
        });
    }

    const submitQuestion = async () => {

        if (state.question === '') {
            dispatch({ type: 'SET_BLANK_QUESTION_ERROR', payload: true });
            return;
        }

        dispatch({ type: 'SET_LOADING_CHAT', payload: true });

        const data = {
            'user_question': state.question,
            'chat_history': state.chatHistory,
            'model': state.model
        };

        dispatch({ type: 'SET_MESSAGE_HISTORY', payload: [
                ...state.messageHistory,
                {
                    id: state.messageHistory.length,
                    question: state.question,
                    answer: 'Loading...'
                }
            ]});

        try {
            const response = await askQuestion(data);

            if (response.status !== 200) {
                dispatch({ type: 'SET_ERROR', payload: `Error: ${response}` });
                dispatch({ type: 'SET_LOADING_CHAT', payload: false });
                return;
            }

            dispatch({ type: 'SET_CHAT_HISTORY', payload: response.data.chat_history });

            dispatch({ type: 'UPDATE_LAST_MESSAGE', payload: response.data.bot });

            dispatch({ type: 'SET_QUESTION', payload: '' });
        } catch (error) {
            console.log(error);
            dispatch({ type: 'SET_ERROR', payload: `Error: ${error}` });
        } finally {
            dispatch({ type: 'SET_LOADING_CHAT', payload: false });
        }
    }


    const handleSelectModel = useCallback((model) => {
        dispatch({ type: 'SET_MODEL', payload: model });
        updateModel(model);
    }, []);

    const closeTab = () => {
        window.close();
    }

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [state.messageHistory]);

    if (state.loading) {
        return (
            <Pane className="loading-pane">
                <Pane className="header-pane">
                    <Heading className="header-heading">CODEGOD</Heading>
                </Pane>
                <Pane className="loading-content-pane">
                    <Heading className="loading-text">Understanding the code....</Heading>
                </Pane>
            </Pane>
        );
    }


    if (state.error) {
        return <ErrorPanel url={state.url} error={state.error} onReload={load}/>;
    }

    return (
        <Pane className="main-pane">
            <Header onClose={closeTab} onSelectModel={handleSelectModel}/>
            <Pane className="message-pane">
                {state.messageHistory.map((chat) => <MemoizedChatBubble key={chat.id} chat={chat}/>)}
                <div ref={messagesEndRef}/>
            </Pane>
            <ChatInput
                value={state.question}
                onChange={(e) => dispatch({ type: 'SET_QUESTION', payload: e.target.value })}
                onSend={submitQuestion}
                isLoading={state.loadingChat}
                blankQuestionError={state.blankQuestionError}
            />
        </Pane>
    );
}

export default App;
