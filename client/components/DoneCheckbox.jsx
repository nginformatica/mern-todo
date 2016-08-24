import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Checked from 'material-ui/svg-icons/action/check-circle';
import Unchecked from 'material-ui/svg-icons/navigation/check';

export default class DoneCheckbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Checkbox
                defaultChecked={ this.props.checked }
                checkedIcon={ <Checked/> }
                uncheckedIcon={ <Unchecked/> }
            />
        )
    }
}