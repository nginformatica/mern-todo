import React, { Component } from 'react';
import { List } from 'material-ui/List';
import { PromiseState } from 'react-refetch';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { Map } from 'immutable';
import connector from '../connector';
import * as propTypes from '../prop-types';
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
            <List className="login-form">
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
            </List>
        );
    }
}

TaskList.propTypes = {
    tasks: React.PropTypes.arrayOf(propTypes.task),
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
