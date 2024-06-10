import React from 'react';

class NumberRow extends React.Component{



    render() {
        const { number, isSelected, onSelectedClick, isLocked } = this.props;
        return (
            <tr >
                <td>{number}</td>
                <td>
                    {isSelected ? <button disabled={isLocked} className="btn btn-danger" onClick={onSelectedClick}>Unselect</button> :
                        <button className="btn btn-success" onClick={onSelectedClick}>Select</button>}
                </td>
            </tr>
        
        )
    }
}

export default NumberRow;