import React, { Component } from 'react';
import { List } from 'material-ui/List';
import update from 'react-addons-update';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import dateFormat from 'dateformat';
import Task from './Task';

export default class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        }
    }

    onDelete(taskId) {
        console.log('onDelete: ' + taskId);
    }

    onEdit(taskId) {
        console.log('onEdit: ' + taskId);
    }

    onDone(taskId) {
        console.log('onDone: ' + taskId);
    }

    componentWillMount() {
        this.setState(update(this.state, {
            tasks: { $push: this.props.tasks }
        }));
    }

    render() {
        let tasks = [];
        this.state.tasks.map(task => {
            const dueDate = Date.parse(task.due);
            tasks.push(
                <Task
                    key={ task._id }
                    summary={ task.summary }
                    description={ task.description }
                    isDone={ task.isDone }
                    isLate={ dueDate < Date.now() }
                    onDelete={ this.onDelete.bind(this, task._id) }
                    onEdit={ this.onEdit.bind(this, task._id) }
                    onDone={ this.onDone.bind(this, task._id) }
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