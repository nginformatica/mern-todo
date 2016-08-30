import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

class TaskOptionsMenu extends Component {
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
            <IconMenu iconButtonElement={ iconButtonElement }>
                <MenuItem onTouchTap={ this.props.onEdit }>Edit</MenuItem>
                <MenuItem onTouchTap={ this.props.onDelete }>Delete</MenuItem>
                <MenuItem onTouchTap={ this.props.onToggleDone }>
                    { this.props.isDone ? 'Undone' : 'Done' }
                </MenuItem>
            </IconMenu>
        );
    }
}

TaskOptionsMenu.propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onToggleDone: React.PropTypes.func.isRequired,
    isDone: React.PropTypes.bool.isRequired
};

export default TaskOptionsMenu;
