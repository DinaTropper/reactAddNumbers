import React from 'react';

class SelectedRows extends React.Component {

    render() {

        const { number, onLockClicked, isLocked } = this.props;
        return (
            <tr>
                <td>{number}</td>
                <td><button className="btn btn-primary w-100" onClick={onLockClicked}>
                    {isLocked ? 'Unlock' : 'Lock'}</button>
                </td>
            </tr>
        )
    }
}
export default SelectedRows;