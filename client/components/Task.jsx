import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { green500, grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/action/check-circle';
import TaskOptionsMenu from './TaskOptionsMenu';

export default class Task extends Component {
    constructor(props) {
        super(props);
    }

    getOptions() {
        return {
            onDelete: this.props.onDelete,
            onEdit: this.props.onEdit,
            onDone: this.props.onDone
        };
    }

    renderDescription() {
        if (this.props.description) {
            return (
                <span className='description'>
                    { ' • ' }
                    { this.props.description }
                </span>
            );
        } else {
            return '';
        };
    }

    render() {
        const dateClass = this.props.isLate ? 'date-late': 'date-default';
        const description = this.renderDescription();
        const secondaryText = (
            <span>
                { 'Due: ' }
                <span className={ dateClass }>
                    { this.props.due }
                </span>
                { description }
            </span>
        )
        const taskIcon = this.props.isDone
            ? (<Check color={ green500 }/>)
            : (<Check color={ grey400 }/>);

        return (
            <ListItem
                leftIcon={ taskIcon }
                primaryText={ this.props.summary }
                secondaryText={ secondaryText }
                secondaryTextLines={ 2 }
                rightIconButton={ 
                    (new TaskOptionsMenu(this.getOptions())).render()
                }
            />
        );
    }
}