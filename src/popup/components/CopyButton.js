const CopyButton = ({ text, id }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (
        <Tooltip content={copied ? "Copied!" : "Copy to clipboard"}>
            <IconButton
                id={`copy-btn-${id}`}
                icon={FiCopy}
                appearance="minimal"
                onClick={copyToClipboard}
            />
        </Tooltip>
    );
};

export default CopyButton;
