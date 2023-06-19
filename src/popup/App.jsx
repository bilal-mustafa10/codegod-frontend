// Import necessary modules and components
import React, {useCallback, useEffect, useRef, useReducer} from 'react';
import {Pane} from 'evergreen-ui';
import {askQuestion, loadBot, updateModel} from "./api";
import ErrorPanel from "./components/ErrorPanel";
import Header from "./components/Header";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import {initialState, reducer} from './stateReducer';
import LoadingPanel from "./components/LoadingPanel";
import './styles.css';

// Function to check if URL is a GitHub repository URL
const isValidGithubRepoUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts.length >= 3 && urlParts[2] === "github.com";
};

// Function to parse URL and retain only necessary parts
const parseGithubRepoUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts.slice(0, 5).join("/");
};

// Memoized version of the ChatBubble component to avoid unnecessary re-renders
const MemoizedChatBubble = React.memo(ChatBubble);

function App() {
    // Using useReducer hook for state management
    const [state, dispatch] = useReducer(reducer, initialState);
    // useRef hook to enable auto-scrolling to the latest message
    const messagesEndRef = useRef(null);

    // Function to load data from the current active GitHub repository
    const loadData = async () => {
        dispatch({type: 'SET_ERROR', payload: null});

        chrome.tabs.query({active: true, currentWindow: true}, async function (tabs) {
            const currentUrl = tabs[0].url;

            if (!isValidGithubRepoUrl(currentUrl)) {
                dispatch({type: 'SET_ERROR', payload: "Please navigate to a GitHub repository page and try again."});
                dispatch({type: 'SET_LOADING', payload: false});
                return;
            }

            const parsedUrl = parseGithubRepoUrl(currentUrl);
            dispatch({type: 'SET_URL', payload: parsedUrl});

            const response = await loadBot(parsedUrl);

            if (response.status !== 200) {
                dispatch({type: 'SET_ERROR', payload: `Error: ${response}`});
                dispatch({type: 'SET_LOADING', payload: false});
                return;
            }

            dispatch({
                type: 'SET_MESSAGE_HISTORY', payload: [{
                    id: 0,
                    question: '',
                    answer: 'Hi, I am Codegod. I can answer any question about the repo you are currently viewing.'
                }]
            });

            dispatch({type: 'SET_LOADING', payload: false});
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

    // Function to handle model selection
    const handleSelectModel = useCallback((model) => {
        dispatch({type: 'SET_MODEL', payload: model});

        updateModel(model).then(() => {
            console.log("Model updated");
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    // Function to close tab
    const closeTab = () => {
        window.close();
    }

    // Load data when the component mounts
    useEffect(() => {
        loadData().catch(console.log);
    }, []);

    // Auto-scroll to the latest message whenever a new message is added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [state.messageHistory]);

    // Loading and error state rendering
    if (state.loading) {
        return <LoadingPanel/>;
    }
    if (state.error) {
        return <ErrorPanel url={state.url} error={state.error} onReload={loadData}/>;
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
