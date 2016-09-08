import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List as MList } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { List } from 'immutable';
import { removeTaskRequest, addTaskRequest } from '../actions';
import Task from './Task';
import TaskEditDialog from './TaskEditDialog';

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.handleCreationDialog = this.handleCreationDialog.bind(this);
        this.handleCreation = this.handleCreation.bind(this);
    }

    componentWillMount() {
        this.setState({ creationDialogIsOpen: false });
    }

    handleRemoval(task) {
        this.props.dispatch(removeTaskRequest(task._id));
    }

    handleCreationDialog() {
        this.setState({ creationDialogIsOpen: true });
    }

    handleCreation(task) {
        if (task) {
            this.props.dispatch(addTaskRequest(task));
        }
        this.setState({ creationDialogIsOpen: false });
    }

    render() {
        const tasks = this.props.tasks.map(task => {
            return (
                <Task
                    task={ task }
                    key={ task._id }
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
    dispatch: React.PropTypes.func.isRequired
};

export default connect()(TaskList);
