import React, { Component } from 'react';
import { List } from 'material-ui/List';
import { connect, PromiseState } from 'react-refetch';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import dateFormat from 'dateformat';
import Immutable from 'immutable';
import Task from './Task';

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: Immutable.List()
        }
    }

    onDelete(task) {

    }    

    onEdit(task) {
        console.log('onEdit: ' + taskId);
    }

    onToggleDone(task) {
        this.props.updateTask(
            Immutable.Map(task)
                .set('isDone', !task.isDone)
                .toObject()
        );
    }

    handleToggleDone(response) {
        if (response.isfulfilled) {

        } else if (res) {

        }
    }

    handleDeleteTask(taskId) {
        this.setState({ 
            tasks: this.state.tasks.filter(task => {
                return task._id != taskId;
            }) 
        })
    }

    componentWillMount() {
        this.setState({
            tasks: this.state.tasks.concat(this.props.tasks)
        });
    }

    render() {
        const response = this.props.updateTaskResponse;
        if (response) {
            if (response.rejected) {
                console.log(response.reason);
            } else if (response.fulfilled) {
                console.log('It works!');
            }
        }


        let tasks = [];
        this.state.tasks.map((task, iterator) => {
            console.log(task);
            const dueDate = Date.parse(task.due);
            tasks.push(
                <Task
                    key={ iterator }
                    summary={ task.summary }
                    description={ task.description }
                    isDone={ task.isDone }
                    isLate={ dueDate < Date.now() }
                    onDelete={ this.onDelete.bind(this, task) }
                    onEdit={ this.onEdit.bind(this, task) }
                    onToggleDone={ this.onToggleDone.bind(this, task) }
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

export default connect(props => {
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
        })
    }
})(TaskList);