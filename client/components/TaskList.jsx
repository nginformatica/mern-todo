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
            creatingTask: false
        };

        this.handleTaskCreation = this.handleTaskCreation.bind(this);
        this.handleAfterTaskCreation = this.handleAfterTaskCreation.bind(this);
    }

    handleTaskRemoval(task) {
        this.setState({
            tasks: this.state.tasks.filterNot(currentTask => {
                return currentTask._id === task._id;
            }),
            toRemove: task
        });
        this.props.removeTask(task._id);
    }

    handleAfterTaskRemoval() {
        const response = this.props.removeTaskResponse;
        if (response.isSettled && this.state.toRemove) {
            if (response.isFulfilled) {
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

    handleTaskCreation() {
        this.setState({ creatingTask: true });
    }

    handleAfterTaskCreation(task) {
        if (task) {
            // TODO implement
            console.log(task);
        }
        this.setState({ creatingTask: false });
    }

    componentWillMount() {
        this.setState({
            tasks: this.state.tasks.concat(
                this.props.tasks.map((task, key) => [key, task])
            )
        });
    }

    render() {
        if (this.props.removeTaskResponse) {
            this.handleAfterTaskRemoval();
        }

        const tasks = this.state.tasks.map((task, key) => {
            return (
                <Task
                    task={ task }
                    key={ key }
                    onDelete={ this.handleTaskRemoval.bind(this, task) }
                />
            );
        });

        return (
            <MList className="login-form">
                <TaskEditDialog
                    open={ this.state.creatingTask }
                    onCloseDialog={ this.handleAfterTaskCreation }
                />
                <Subheader>Tasks</Subheader>
                { tasks }
                <RaisedButton
                    className="login-button"
                    label="New task"
                    secondary={ true }
                    onTouchTap={ this.handleTaskCreation }
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
        })
    };
})(TaskList);
