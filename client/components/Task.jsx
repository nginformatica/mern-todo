import React, { Component } from 'react';
import { connect } from 'react-refetch';
import { ListItem } from 'material-ui/List';
import dateFormat from 'dateformat';
import { green500, grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/action/check-circle';
import { Map } from 'immutable';
import TaskOptionsMenu from './TaskOptionsMenu';
import Connector from '../connector';

class Task extends Component {
    constructor(props) {
        super(props);
    }

    getOptions() {
        return {
            onDelete: this.props.onDelete,
            onEdit: this.props.onEdit,
            onToggleDone: this.onToggleDone.bind(this),
            isDone: this.props.isDone
        };
    }

    onToggleDone() {
        const updatedTask = this.state.task
            .set('isDone', !this.state.task.get('isDone'));
        this.props.updateTask(updatedTask);
        this.setState({ updatedTask });
    }


    handleTaskUpdate(response) {
        if (response && this.state.updatedTask) {
            if (response.fulfilled) {
                this.setState({ 
                    task: this.state.updatedTask,
                    updatedTask: null
                });
            } else if (response.rejected) {
                this.setState({ updatedTask: null });
            }
        }
    }

    componentWillMount() {
        this.setState({ task: Map(this.props.task) });
    }

    componentWillReceiveProps(nextProps) {
        this.handleTaskUpdate(nextProps.updateTaskResponse);
    }

    renderDescription() {
        if (this.props.task.description) {
            return (
                <span className='description'>
                    { ' • ' }
                    { this.props.task.description }
                </span>
            );
        } else {
            return '';
        };
    }

    render() {
        const dueDate = Date.parse(this.props.task.due);
        const prettyDate = dateFormat(dueDate, 'dddd, dd/mm/yy HH:MM');
        const dateClass = dueDate < Date.now() ? 'date-late': 'date-default';
        const description = this.renderDescription();

        const secondaryText = (
            <span>
                { 'Due: ' }
                <span className={ dateClass }>
                    { prettyDate }
                </span>
                { description }
            </span>
        )

        const taskIcon = this.state.task.get('isDone')
            ? (<Check color={ green500 }/>)
            : (<Check color={ grey400 }/>);

        return (
            <ListItem
                leftIcon={ taskIcon }
                primaryText={ this.props.task.summary }
                secondaryText={ secondaryText }
                secondaryTextLines={ 2 }
                rightIconButton={ 
                    (new TaskOptionsMenu(this.getOptions())).render()
                }
            />
        );
    }
}

export default Connector(props => {
    return {
        updateTask: task => ({
            updateTaskResponse: {
                url: 'api/tasks',
                method: 'PUT',
                body: JSON.stringify(task.toObject())
            }
        })    
    }
})(Task);