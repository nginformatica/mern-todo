import React, { Component } from 'react';
import { List as MList } from 'material-ui/List';
import { PromiseState } from 'react-refetch';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { Map, List } from 'immutable';
import connector from '../connector';
import Task from './Task';
import TaskEditDialog from './TaskEditDialog';

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: new Map(),
            creationDialogIsOpen: false
        };

        this.handleCreationDialog = this.handleCreationDialog.bind(this);
        this.handleCreation = this.handleCreation.bind(this);
    }

    handleRemoval(task) {
        this.setState({
            tasks: this.state.tasks.filterNot(currentTask => {
                return currentTask._id === task._id;
            }),
            toRemove: task
        });
        this.props.removeTask(task._id);
    }

    handleRemovalResponse() {
        const response = this.props.removeTaskResponse;
        if (response && response.settled && this.state.toRemove) {
            if (response.fulfilled) {
                // TODO spawn a success toast, or anything else
                this.setState({ toRemove: null });
            } else {
                this.setState({
                    tasks: this.state.tasks.concat(this.state.toRemove),
                    toRemove: null
                });
            }
        }
    }

    handleCreationDialog() {
        this.setState({ creationDialogIsOpen: true });
    }

    handleCreation(task) {
        if (task) {
            this.props.createTask(task);
            this.setState({ toCreate: task });
        }
        this.setState({ creationDialogIsOpen: false });
    }

    handleCreationResponse() {
        const response = this.props.createTaskResponse;
        if (response && response.settled && this.state.toCreate) {
            const createdTask = this.state.toCreate;
            createdTask._id = JSON.parse(response.value);
            this.setState({
                tasks: this.state.tasks.concat(
                    [[createdTask._id, createdTask]]
                ),
                toCreate: null
            });
        }
    }

    componentWillMount() {
        this.setState({
            tasks: this.state.tasks.concat(
                this.props.tasks.map(task => [task._id, task])
            )
        });
    }

    render() {
        this.handleRemovalResponse();
        this.handleCreationResponse();

        const tasks = this.state.tasks.map((task, key) => {
            return (
                <Task
                    task={ task }
                    key={ key }
                    onDelete={ this.handleRemoval.bind(this, task) }
                />
            );
        });

        return (
            <MList className="login-form">
                <TaskEditDialog
                    open={ this.state.creationDialogIsOpen }
                    onCloseDialog={ this.handleCreation }
                />
                <Subheader>Tasks</Subheader>
                { tasks }
                <RaisedButton
                    className="login-button"
                    label="New task"
                    secondary={ true }
                    onTouchTap={ this.handleCreationDialog }
                />
            </MList>
        );
    }
}

TaskList.propTypes = {
    tasks: React.PropTypes.instanceOf(List),
    removeTask: React.PropTypes.func.isRequired,
    removeTaskResponse: React.PropTypes.instanceOf(PromiseState)
};

export default connector(() => {
    return {
        removeTask: taskId => ({
            removeTaskResponse: {
                url: 'api/tasks/'.concat(taskId),
                method: 'DELETE'
            }
        }),
        createTask: task => ({
            createTaskResponse: {
                url: 'api/tasks',
                method: 'POST',
                body: JSON.stringify(task)
            }
        })
    };
})(TaskList);
