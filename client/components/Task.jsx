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

        this.handleEditionDialog = this.handleEditionDialog.bind(this);
        this.handleEdition = this.handleEdition.bind(this);
    }

    getOptions() {
        return {
            onDelete: this.props.onDelete,
            onEdit: this.handleEditionDialog,
            onToggleDone: this.onToggleDone.bind(this),
            isDone: this.state.task.get('isDone')
        };
    }

    onToggleDone() {
        const updatedTask = this.state.task
            .set('isDone', !this.state.task.get('isDone'));
        this.props.updateTask(updatedTask);
        this.setState({
            task: updatedTask,
            oldTask: this.state.task
        });
    }

    handleEditionDialog() {
        this.setState({ editionDialogIsOpen: true });
    }

    handleEdition(task) {
        if (task) {
            task._id = this.props.task._id;
            this.props.updateTask(task);
            this.setState({
                task: new Map(task),
                oldTask: this.state.task,
                editionDialogIsOpen: false
            });
        } else {
            this.setState({ editionDialogIsOpen: false });
        }
    }

    handleEditionResponse(response) {
        if (response && response.settled && this.state.oldTask) {
            if (response.fulfilled) {
                this.setState({
                    oldTask: null
                });
            } else {
                this.setState({
                    task: this.state.oldTask,
                    oldTask: null
                });
            }
        }
    }

    componentWillMount() {
        this.setState({
            task: new Map(this.props.task),
            editionDialogIsOpen: false
        });
    }

    componentWillReceiveProps(props) {
        this.handleEditionResponse(props.updateTaskResponse);
    }

    renderDescription(description) {
        if (description) {
            return (
                <span className="description">
                    { ' • ' }
                    { description }
                </span>
            );
        }
        return '';
    }

    render() {
        const task = this.state.task.toObject();
        const dueDate = Date.parse(task.due);
        const prettyDate = dateFormat(dueDate, 'dddd, dd/mm/yy HH:MM');
        const dateClass = dueDate < Date.now() ? 'date-late' : 'date-default';
        const description = this.renderDescription(task.description);

        const secondaryText = (
            <span>
                { 'Due: ' }
                <span className={ dateClass }>
                    { prettyDate }
                </span>
                { description }
            </span>
        );

        const taskIcon = task.isDone
            ? (<Check color={ green500 }/>)
            : (<Check color={ grey400 }/>);

        return (
            <div>
                <TaskEditDialog
                    open={ this.state.editionDialogIsOpen }
                    task={ task }
                    onCloseDialog={ this.handleEdition }
                />
                <ListItem
                    leftIcon={ taskIcon }
                    primaryText={ task.summary }
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
                body: JSON.stringify(task)
            }
        })
    };
})(Task);
