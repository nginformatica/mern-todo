import React, { Component } from 'react';
import { List } from 'material-ui/List';
import { connect, PromiseState } from 'react-refetch';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { Map } from 'immutable';
import Task from './Task';
import TaskEditDialog from './TaskEditDialog';
import Connector from '../connector';

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: Map(),
            creatingTask: false
        }

        this.createTask = this.createTask.bind(this);
        this.afterCreateTask = this.afterCreateTask.bind(this);
    }

    onDelete(task) {

    }    

    onEdit(task) {
        console.log('onEdit: ' + taskId);
    }

    handleDeleteTask(taskId) {
        this.setState({ 
            tasks: this.state.tasks.filterNot(task => task._id === taskId)
        })
    }

    createTask() {
        this.setState({ creatingTask: true });
    }

    afterCreateTask(task) {
        if (task) {
            // TODO
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
                    onDelete={ this.onDelete.bind(this, task) }
                />
            );
        });

        return (
            <List className="login-form">
                <TaskEditDialog 
                    open={ this.state.creatingTask }
                    onCloseDialog={ this.afterCreateTask }
                />
                <Subheader>Tasks</Subheader>
                { tasks }
                <RaisedButton 
                    className="login-button"
                    label="New task"
                    secondary={ true }
                    onTouchTap={ this.createTask }
                />
            </List>
        );
    }
}

export default Connector(props => {
    return {
        deleteTask: taskId => ({
            deleteTaskResponse: {
                url: 'api/tasks/'.concat(taskId),
                method: 'DELETE',
            }
        }) 
    }
})(TaskList);