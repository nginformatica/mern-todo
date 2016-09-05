import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { List } from 'immutable';
import { fetchTasks } from '../actions';
import TodoBar from '../components/TodoBar';
import TaskList from '../components/TaskList';

class Tasks extends Component {
    componentDidMount() {
        this.props.dispatch(fetchTasks());
    }

    render() {
        return (
            <Paper zDepth={ 3 } className="tasks-paper">
                <TodoBar/>
                <TaskList tasks={ this.props.tasks }/>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    };
}

Tasks.propTypes = {
    tasks: React.PropTypes.instanceOf(List).isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Tasks);
