import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tooltip, IconButton } from 'evergreen-ui';
import '../styles.css';

const CodeBlock = ({language, value}) => {
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
            <CopyToClipboard text={value} onCopy={handleCopy}>
                <Tooltip content={isCopied ? "Copied!" : "Click to copy"}>
                    <IconButton icon="clipboard" appearance="minimal" height={24} position="absolute" top={0} right={0} zIndex={1} />
                </Tooltip>
            </CopyToClipboard>
            <SyntaxHighlighter
                className="syntax-highlighter"
                style={solarizedlight}
                language={language}
                children={value}
                customStyle={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordWrap: 'break-word' }}
            />
        </div>
    );
};


const renderers = {
    code: CodeBlock
};

function FormatResponse({ content }) {
    return (
        <div className="format-response-container">
            <ReactMarkdown renderers={renderers} children={content} />
        </div>
    );
}

export default FormatResponse;
