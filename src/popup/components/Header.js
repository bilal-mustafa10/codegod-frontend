import React from 'react';
import { Avatar, CrossIcon, Heading, IconButton, Pane, Tooltip, Select, minorScale } from 'evergreen-ui';
import "../styles.css";

const Header = ({onClose, onSelectModel}) => {
    const [selectedModel, setSelectedModel] = React.useState('GPT 3.5');

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
        onSelectModel(event.target.value);
    };

    return (
        <Pane className="header-pane" elevation={1} display="flex" alignItems="center" justifyContent="space-between" padding={minorScale(1)}>
            <Pane display="flex" alignItems="center">
                <Heading size={600} className="header-heading">
                    CODEGOD
                </Heading>
            </Pane>
            <Pane display="flex" alignItems="center" className="header-selection">
                <Heading size={400} className="select-model" marginRight={minorScale(1)}>
                    Model
                </Heading>
                <Select value={selectedModel} onChange={handleModelChange} marginRight={minorScale(2)} height={28}>
                    <option value="gpt-3.5">GPT 3.5</option>
                    <option value="dolly">Dolly</option>
                </Select>
            </Pane>
            <Pane>
                <Tooltip content="Close">
                    <IconButton icon={CrossIcon} intent="danger" onClick={onClose} height={24}/>
                </Tooltip>
            </Pane>
        </Pane>
    );
};

export default Header;
