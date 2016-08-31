import React, { Component } from 'react';
import { Map } from 'immutable';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import * as propTypes from '../prop-types';

class TaskEditDialog extends Component {
    constructor(props) {
        super(props);

        this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
        this.handleDialogCancel = this.handleDialogCancel.bind(this);
        this.handleSummaryChange = this.handleSummaryChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    handleDialogConfirm() {
        const date = this.state.date.toObject();
        this.props.onCloseDialog({
            summary: this.state.summary,
            description: this.state.description,
            due: new Date(
                date.year,
                date.month,
                date.day,
                date.hours,
                date.minutes
            ).toISOString(),
            isDone: this.props.task ? this.props.task.isDone : false
        });
    }

    handleDialogCancel() {
        this.props.onCloseDialog();
    }

    handleSummaryChange(event) {
        this.setState({ summary: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleDateChange(event, date) {
        this.setState({
            date: this.state.date
                .set('day', date.getDate())
                .set('month', date.getMonth())
                .set('year', date.getFullYear())
        });
    }

    handleTimeChange(event, date) {
        this.setState({
            date: this.state.date
                .set('hours', date.getHours())
                .set('minutes', date.getMinutes())
        });
    }

    componentWillMount() {
        const task = this.props.task;
        const date = task ? new Date(task.due) : new Date();
        this.setState({
            summary: task ? task.summary : '',
            description: task ? task.description : '',
            date: new Map({
                hours: date.getHours(),
                minutes: date.getMinutes(),
                day: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear()
            })
        });
    }

    render() {
        const task = this.props.task;
        const options = task ? {
            buttonLabel: 'Edit',
            dialogTitle: 'Edit Task'
        } : {
            buttonLabel: 'Create',
            dialogTitle: 'New Task'
        };
        const confirm = (
            <FlatButton
                label={ options.buttonLabel }
                primary={ true }
                onTouchTap={ this.handleDialogConfirm }
            />
        );

        const cancel = (
            <FlatButton
                label={ 'Cancel' }
                secondary={ true }
                onTouchTap={ this.handleDialogCancel }
            />
        );

        return (
            <Dialog
                actions={ [cancel, confirm] }
                open={ this.props.open }
                title={ options.dialogTitle }
                modal={ true }
                onRequestClose={ this.props.onCloseDialog }
                autoScrollBodyContent={ true }
            >
                <TextField
                    floatingLabelText="Summary"
                    fullWidth={ true }
                    defaultValue={ task ? task.summary : '' }
                    onChange={ this.handleSummaryChange }
                />
                <TextField
                    floatingLabelText="Description"
                    multiLine={ true }
                    rowsMax={ 4 }
                    fullWidth={ true }
                    defaultValue={ task ? task.description : '' }
                    onChange={ this.handleDescriptionChange }

                />
                <DatePicker
                    floatingLabelText={ 'Due date' }
                    mode={ 'landscape' }
                    shouldDisableDate={
                        date => new Date().setHours(0, 0, 0, 0) > date
                    }
                    formatDate={
                        new Intl.DateTimeFormat('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }).format
                    }
                    defaultDate={ task ? new Date(task.due) : new Date() }
                    onChange={ this.handleDateChange }
                />
                <TimePicker
                    mode={ 'landscape' }
                    floatingLabelText={ 'Due hour' }
                    format={ '24hr' }
                    defaultTime={ task ? new Date(task.due) : new Date() }
                    onChange={ this.handleTimeChange }
                />
            </Dialog>
        );
    }
}

TaskEditDialog.propTypes = {
    task: propTypes.task,
    onCloseDialog: React.PropTypes.func.isRequired,
    open: React.PropTypes.bool.isRequired
};

export default TaskEditDialog;
