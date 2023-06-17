import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './FormatResponse.css'; // Include your custom CSS file

const renderers = {
    code: ({ language, value }) => {
        return <SyntaxHighlighter style={solarizedlight} language={language} children={value} />;
    },
};

function FormatResponse({ content }) {
    const languageRegExp = /```([\w-]+)?\s/;
    const formattedContent = content.split('\n').map(part => {
        const match = part.match(languageRegExp);
        const language = match && match[1] ? match[1] : '';
        const code = part.replace(languageRegExp, '');
        return part.startsWith('```') ? `\n\`\`\`${language}\n${code}\n\`\`\`\n` : `\n${part}\n`;
    }).join('');

    return (
        <div className="format-response-container"> {/* apply your custom CSS class here */}
            <ReactMarkdown renderers={renderers} children={formattedContent} />
        </div>
    );
}

export default FormatResponse;
