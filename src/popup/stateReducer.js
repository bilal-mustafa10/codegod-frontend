// stateReducer.js

export const initialState = {
    loading: true,
    question: '',
    messageHistory: [],
    error: null,
    url: null,
    chatHistory: "[('' , '')]",
    loadingChat: false,
    model: 'gpt-3.5',
    blankQuestionError: false,
    questionId: null  // Add this
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {...state, loading: action.payload};
        case 'SET_QUESTION':
            return {...state, question: action.payload};
        case 'SET_MESSAGE_HISTORY':
            return {...state, messageHistory: action.payload};
        case 'SET_ERROR':
            return {...state, error: action.payload};
        case 'SET_URL':
            return {...state, url: action.payload};
        case 'SET_CHAT_HISTORY':
            return {...state, chatHistory: action.payload};
        case 'SET_LOADING_CHAT':
            return {...state, loadingChat: action.payload};
        case 'SET_MODEL':
            return {...state, model: action.payload};
        case 'SET_BLANK_QUESTION_ERROR':
            return {...state, blankQuestionError: action.payload};
        case 'UPDATE_LAST_MESSAGE':
            return {
                ...state,
                messageHistory: state.messageHistory.map((chat, index) =>
                    index === state.messageHistory.length - 1
                        ? {...chat, answer: action.payload}
                        : chat
                )
            };
        case 'SET_CHAT_ERROR':
            const lastMessageIndex = state.messageHistory.length - 1;
            const lastMessage = state.messageHistory[lastMessageIndex];
            const updatedMessage = { ...lastMessage, answer: action.payload };
            const updatedMessageHistory = [...state.messageHistory];
            updatedMessageHistory[lastMessageIndex] = updatedMessage;

            return {
                ...state,
                chatError: action.payload,
                loadingChat: false,
                questionId: action.questionId  // Add this
            };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};
