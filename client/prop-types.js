import React from 'react';

export const task = React.PropTypes.shape({
    summary: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    due: React.PropTypes.string.isRequired
});
