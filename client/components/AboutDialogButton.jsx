import React, { Component } from 'react';
import { white } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui/svg-icons/action/info';

export default class AboutDialogButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        };

        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleDialogOpen() {
        this.setState({ dialogOpen: true });
    }

    handleDialogClose() {
        this.setState({ dialogOpen: false });
    }

    render() {
        const okayButton = (
            <FlatButton
                label="Okay!"
                primary={ true }
                onTouchTap={ this.handleDialogClose }
            />
        );

        return (
            <div>
                <IconButton
                    onTouchTap={ this.handleDialogOpen }
                    tooltip="About"
                >
                    <InfoIcon color={ white }/>
                </IconButton>
                <Dialog
                    title="About"
                    actions={ okayButton }
                    modal={ false }
                    open={ this.state.dialogOpen }
                    onRequestClose={ this.handleDialogClose }
                >
                    Hello!
                </Dialog>
            </div>
        );
    }
}
