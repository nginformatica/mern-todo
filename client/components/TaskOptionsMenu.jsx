import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

export default class TaskOptionsMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const iconButtonElement = (
            <IconButton
                touch={ true }
                tooltip="Options"
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon/>
            </IconButton>
        );
        return (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={ this.props.onEdit }>Edit</MenuItem>
                <MenuItem onTouchTap={ this.props.onDelete }>Delete</MenuItem>
                <MenuItem onTouchTap={ this.props.onToggleDone }>{
                    this.props.isDone 
                    ? 'Undone'
                    : 'Done'
                }</MenuItem>
            </IconMenu>
        );
    }
}