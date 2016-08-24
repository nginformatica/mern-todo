import React, { Component } from 'react';
import { connect } from 'react-refetch';
import Paper from 'material-ui/Paper';
import TodoBar from '../components/TodoBar';
import TaskList from '../components/TaskList';

class Tasks extends Component {
    render() {
        let tasks = [];

        this.props.tasksFetch.then(fetchedTasks => {
            tasks = fetchedTasks;
        });

        if (this.props.tasksFetch.fulfilled) {
            return (
                <Paper zDepth={ 3 } className="tasks-paper">
                    <TodoBar/>
                    <TaskList tasks={ tasks } />
                </Paper>
            );
        } else {
            return <h1>Loading...</h1>
        }

       
    }
}

export default connect(props => {
    return { tasksFetch: '/api/tasks' }
})(Tasks);