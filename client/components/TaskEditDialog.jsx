import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

export default class TaskEditDialog extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({ task: this.props.task });
    }

    render() {
        const task = this.state.task;
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
                onTouchTap={ () => this.props.onCloseDialog('test') }
            />
        );

        const cancel = (
            <FlatButton
                label={ 'Cancel' }
                secondary={ true }
                onTouchTap={ this.props.onCloseDialog }
            />
        );

        return (
            <Dialog
                actions={ [ cancel, confirm ] }
                open={ this.props.open }
                title={ options.dialogTitle }
                modal={ true }
                onRequestClose={ this.props.onCloseDialog }
                autoScrollBodyContent={ true }>
                <TextField
                    floatingLabelText="Summary"
                    onChange={ this.onMailChange }
                    fullWidth={ true }
                    defaultValue={ task ? task.summary : '' }
                />
                <TextField
                    floatingLabelText="Description"
                    multiLine={ true }
                    rowsMax={ 4 }
                    onChange={ this.onPasswordChange }
                    fullWidth={ true }
                    defaultValue={ task ? task.description : '' }

                />
                <DatePicker
                    floatingLabelText={ 'Due date' }
                    mode={ 'landscape' }
                    shouldDisableDate={
                        date => new Date().setHours(0,0,0,0) > date
                    }
                    formatDate={
                        new Intl.DateTimeFormat('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }).format
                    }
                    defaultDate={ task ? new Date(task.due) : new Date() }
                />
                <TimePicker
                    mode={ 'landscape' }
                    floatingLabelText={ 'Due hour' }
                    format={ '24hr' }
                    defaultTime={ task ? new Date(task.due) : new Date() }
                />
            </Dialog>
        );
    }
}