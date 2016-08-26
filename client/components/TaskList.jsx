import React, { Component } from 'react';
import { List } from 'material-ui/List';
import { connect, PromiseState } from 'react-refetch';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import dateFormat from 'dateformat';
import { Map } from 'immutable';
import Task from './Task';

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: Map()
        }
    }

    onDelete(task) {

    }    

    onEdit(task) {
        console.log('onEdit: ' + taskId);
    }

    onToggleDone(task, key) {
        const updatedTask = Map(task).set('isDone', !task.isDone).toObject();
        this.setState({ awaitingResponse: { updatedTask, key } });
        this.props.updateTask(updatedTask);
    }

    handleToggleDone(response) {
        console.log(response);
        if (response.fulfilled) {
            this.setState({
                tasks: this.state.tasks.set(
                    this.state.awaitingResponse.key,
                    this.state.awaitingResponse.updatedTask
                )
            });
        } else if (response.rejected) {

        }
    }

    handleDeleteTask(taskId) {
        this.setState({ 
            tasks: this.state.tasks.filterNot(task => task._id === taskId)
        })
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
            const dueDate = Date.parse(task.due);
            return (
                <Task
                    key={ key }
                    summary={ task.summary }
                    description={ task.description }
                    isDone={ task.isDone }
                    isLate={ dueDate < Date.now() }
                    onDelete={ this.onDelete.bind(this, task) }
                    onEdit={ this.onEdit.bind(this, task) }
                    onToggleDone={ this.onToggleDone.bind(this, task, key) }
                    due={ dateFormat(dueDate, 'dddd, dd/mm/yy HH:MM') }
                />
            );
        });

        return (
            <List className="login-form">
                <Subheader>Tasks</Subheader>
                { tasks }
                <RaisedButton 
                    className="login-button"
                    label="New task"
                    secondary={ true }
                />
            </List>
        );
    }
}

const TaskConnector = connect.defaults({
    handleResponse: response => {
        const message = response.text();
        if (response.status >= 200 && response.status < 300) {
            return '';
        } else {
            return Promise.reject('Invalid request!');
        }
    }
});

export default TaskConnector(props => {
    return {
        deleteTask: taskId => ({
            deleteTaskResponse: {
                url: 'api/tasks/'.concat(taskId),
                method: 'DELETE',
            }
        }),
        updateTask: task => ({
            updateTaskResponse: {
                url: 'api/tasks',
                method: 'PUT',
                body: JSON.stringify(task)
            }
        }
)    }
})(TaskList);