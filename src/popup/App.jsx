import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pane, Heading} from 'evergreen-ui';
import {askQuestion, loadBot, updateModel} from "./api";
import ErrorPanel from "./components/ErrorPanel";
import Header from "./components/Header";
import ChatBubble from "./components/ChatBubble";
import ChatInput from "./components/ChatInput";
import './App.css';


// Move functions outside of component if they don't use props or state
const isValidGithubRepoUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts.length >= 5 && urlParts[2] === "github.com";
};

const parseGithubRepoUrl = (url) => {
    const urlParts = url.split("/");
    return urlParts.slice(0, 5).join("/");
};

// Memoize ChatBubble to avoid unnecessary re-renders
const MemoizedChatBubble = React.memo(ChatBubble);

function App() {
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [chatHistory, setChatHistory] = useState("[('' , '')]");
    const messagesEndRef = useRef(null);
    const [loadingChat, setLoadingChat] = useState(false);
    const [model, setModel] = useState('gpt-3.5');
    const [blankQuestionError, setBlankQuestionError] = useState(false);

    const load = async () => {
        setError(null);

        chrome.tabs.query({active: true, currentWindow: true}, async function (tabs) {
            let current_url = tabs[0].url;
            if (!isValidGithubRepoUrl(current_url)) {
                setError("Please navigate to a GitHub repository page and try again.");
                setLoading(false);
                return;
            }

            let parsed_url = parseGithubRepoUrl(current_url);
            setUrl(parsed_url);

            const response = await loadBot(parsed_url);

            if (response.status !== 200) {
                setError(`Error: ${response}`);
                setLoading(false);
                return;
            }

            setMessageHistory([
                {
                    id: 0,
                    question: '',
                    answer: 'Hi, I am Codegod. I can answer any question about the repo you are currently viewing.'
                }
            ])

            setLoading(false);
        });
    }

    const submitQuestion = async () => {

        if (question === '') {
            setBlankQuestionError(true);
            return;

        }
        setLoadingChat(true);
        const data = {
            'user_question': question,
            'chat_history': chatHistory,
            'model': model
        };

        setMessageHistory(prevMessageHistory => [
            ...prevMessageHistory,
            {
                id: prevMessageHistory.length,
                question: question,
                answer: 'Loading...'
            }
        ]);

        try {
            const response = await askQuestion(data);
            if (response.status !== 200) {
                setError(`Error: ${response}`);
                setLoadingChat(false);
                return;
            }

            setChatHistory(response.data.chat_history)

            setMessageHistory(prevMessageHistory => {
                let lastChatIndex = prevMessageHistory.length - 1;

                return prevMessageHistory.map((chat, index) =>
                    index === lastChatIndex
                        ? {...chat, answer: response.data.bot}
                        : chat
                );
            });

            setQuestion('');
        } catch (error) {
            console.log(error);
            setError(`Error: ${error}`);
        } finally {
            setLoadingChat(false);
        }
    }

    const handleSelectModel = useCallback((model) => {
        setModel(model);
        updateModel(model);
    }, []);


    const closeTab = () => {
        window.close()
        // Send a message to the parent window
       // window.parent.postMessage('close', '*'); // * allows any origin, but you should use your extension's URL in production
    }

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messageHistory]);


    if (loading) {
        return (
            <Pane
                height="100vh"
                display="flex"
                flexDirection="column"
                overflow="hidden"
                backgroundColor="#00071C"
            >
                <Pane
                    background="#0B0033" // Dark Blue
                    padding={16}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    zIndex={2}
                >
                    <Heading size={800} fontFamily="'Roboto Mono', monospace" color="#F1F5FF">
                        Codegod
                    </Heading>
                </Pane>
                <Pane
                    display="flex"
                    padding={8}
                    background="#00071C"
                    alignItems="center"
                    justifyContent="center"
                    flex="1"
                >
                    <Heading size={800} fontFamily="'Roboto Mono', monospace" color="#F1F5FF" className="loading-text">
                       Analysing the code....
                    </Heading>

                </Pane>
            </Pane>
        );
    }


    if (error) {
        return <ErrorPanel url={url} error={error} onReload={load}/>;
    }

    return (
        <Pane
            height="100vh"
            display="flex"
            flexDirection="column"
            overflow="hidden"
            backgroundColor="#00071C"
        >
            <Header onClose={closeTab} onSelectModel={handleSelectModel}/>
            <Pane
                background="#00071C"
                flex={1}
                padding={8}
                overflowY="scroll"
                marginTop={8}
                marginBottom={8}
            >
                {messageHistory.map((chat) => <MemoizedChatBubble key={chat.id} chat={chat}/>)}
                <div ref={messagesEndRef}/>
            </Pane>

            <ChatInput
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onSend={submitQuestion}
                isLoading={loadingChat}
                blankQuestionError={blankQuestionError}
            />

        </Pane>
    );
}

export default App;
