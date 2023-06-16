import React from 'react';
import {CrossIcon, Heading, IconButton, Pane, Tooltip, Select} from 'evergreen-ui';

const Header = ({onClose, onSelectModel}) => {
    const [selectedModel, setSelectedModel] = React.useState('GPT 3.5');

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
        onSelectModel(event.target.value);
    };

    return (
        <Pane
            background="#0B0033" // Dark Blue
            padding={16}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            zIndex={2}
        >
            <Pane display="flex" alignItems="center">
                {/*<img src="../../../assets/img/logo.png" alt="Codegod Logo" width="50" height="50"/>*/}
                <Heading size={800} fontFamily="'Roboto Mono', monospace" color="#F1F5FF">
                    Codegod
                </Heading>
            </Pane>
            <Pane display="flex" alignItems="center">
                <Heading size={600} fontFamily="'Roboto Mono', monospace" color="#F1F5FF" marginRight={16}>
                    Model:
                </Heading>
                <Select value={selectedModel} onChange={handleModelChange}>
                    <option value="gpt-3.5">GPT 3.5</option>
                    <option value="dolly">Dolly</option>
                </Select>
            </Pane>
            <Pane>
                <Tooltip content="Close">
                    <IconButton icon={CrossIcon} intent="danger" color="#06002C" onClick={onClose}/>
                </Tooltip>
            </Pane>
        </Pane>
    );
};

export default Header;
