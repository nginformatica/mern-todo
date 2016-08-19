import React from 'react';
import { white } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui/svg-icons/action/info';

export default class AboutDialogButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        };

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }
    
    openDialog() {
        this.setState({ dialogOpen: true });
    }

    closeDialog() {
        this.setState({ dialogOpen: false });
    }

    render() {
        const okayButton = (
            <FlatButton
                label="Okay!"
                primary={ true }
                onTouchTap={ this.closeDialog }
            />
        );

        return (
            <div>
                <IconButton
                    onTouchTap={ this.openDialog }
                    tooltip="About"
                >
                    <InfoIcon color={ white } />
                </IconButton>
                <Dialog
                    title="About"
                    actions={ okayButton }
                    modal={ false }
                    open={ this.state.dialogOpen }
                    onRequestClose={ this.closeDialog }
                >
                    Hello!
                </Dialog>
            </div>
        );
    }
}