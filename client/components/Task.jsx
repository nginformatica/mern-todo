import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import dateFormat from 'dateformat';
import { green500, grey400 } from 'material-ui/styles/colors';
import Check from 'material-ui/svg-icons/action/check-circle';
import { Map } from 'immutable';
import connector from '../connector';
import * as propTypes from '../prop-types';
import TaskOptionsMenu from './TaskOptionsMenu';
import TaskEditDialog from './TaskEditDialog';

class Task extends Component {
    constructor(props) {
        super(props);

        this.handleTaskEdition = this.handleTaskEdition.bind(this);
        this.handleAfterTaskEdition = this.handleAfterTaskEdition.bind(this);
    }

    getOptions() {
        return {
            onDelete: this.props.onDelete,
            onEdit: this.handleTaskEdition,
            onToggleDone: this.onToggleDone.bind(this),
            isDone: this.state.task.get('isDone')
        };
    }

    onToggleDone() {
        const updatedTask = this.state.task
            .set('isDone', !this.state.task.get('isDone'));
        this.props.updateTask(updatedTask);
        this.setState({ updatedTask });
    }

    handleTaskEdition() {
        this.setState({ editingTask: true });
    }

    handleAfterTaskEdition() {
        this.setState({ editingTask: false });
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
        this.setState({
            task: new Map(this.props.task),
            editingTask: false
        });
    }

    componentWillReceiveProps(nextProps) {
        this.handleTaskUpdate(nextProps.updateTaskResponse);
    }

    renderDescription() {
        if (this.props.task.description) {
            return (
                <span className="description">
                    { ' • ' }
                    { this.props.task.description }
                </span>
            );
        }
        return '';
    }

    render() {
        const dueDate = Date.parse(this.props.task.due);
        const prettyDate = dateFormat(dueDate, 'dddd, dd/mm/yy HH:MM');
        const dateClass = dueDate < Date.now() ? 'date-late' : 'date-default';
        const description = this.renderDescription();

        const secondaryText = (
            <span>
                { 'Due: ' }
                <span className={ dateClass }>
                    { prettyDate }
                </span>
                { description }
            </span>
        );

        const taskIcon = this.state.task.get('isDone')
            ? (<Check color={ green500 }/>)
            : (<Check color={ grey400 }/>);

        return (
            <div>
                <TaskEditDialog
                    open={ this.state.editingTask }
                    task={ this.state.task.toObject() }
                    onCloseDialog={ this.handleAfterTaskEdition }
                />
                <ListItem
                    leftIcon={ taskIcon }
                    primaryText={ this.props.task.summary }
                    secondaryText={ secondaryText }
                    secondaryTextLines={ 2 }
                    rightIconButton={
                        (new TaskOptionsMenu(this.getOptions())).render()
                    }
                />
            </div>
        );
    }
}

Task.propTypes = {
    onDelete: React.PropTypes.func.isRequired,
    updateTask: React.PropTypes.func.isRequired,
    task: propTypes.task.isRequired
};

export default connector(() => {
    return {
        updateTask: task => ({
            updateTaskResponse: {
                url: 'api/tasks',
                method: 'PUT',
                body: JSON.stringify(task.toObject())
            }
        })
    };
})(Task);
