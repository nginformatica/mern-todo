import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';
import Paper from 'material-ui/Paper';
import { List } from 'immutable';
import TodoBar from '../components/TodoBar';
import TaskList from '../components/TaskList';

class Tasks extends Component {
    render() {
        let tasks;
        this.props.tasksFetch.then(fetchedTasks => {
            tasks = new List(fetchedTasks);
        });

        if (this.props.tasksFetch.fulfilled) {
            return (
                <Paper zDepth={ 3 } className="tasks-paper">
                    <TodoBar/>
                    <TaskList tasks={ tasks }/>
                </Paper>
            );
        }
        return <h1>Loading...</h1>;
    }
}

Tasks.propTypes = {
    tasksFetch: React.PropTypes.instanceOf(PromiseState).isRequired
};

export default connect(() => {
    return { tasksFetch: '/api/tasks' };
})(Tasks);
