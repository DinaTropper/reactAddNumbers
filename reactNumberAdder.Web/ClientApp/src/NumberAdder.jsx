import React from "react";
import NumberRow from "./NumberRow";
import SelectedRows from "./SelectedRows"
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';


class NumberAdder extends React.Component {
    state = {

        numbers: [],
        selectedNumbers: [],
        lockedNumbers: []
    };

    getRandomNumber = () => {
        const randomnumber = Math.floor(Math.random() * 500) + 1;
        return randomnumber;
    }

    onAddClicked = () => {
        const { numbers } = this.state;
        const newNum = {
            number: this.getRandomNumber(),
            id: uuidv4()
        };
        const nextState = produce(this.state, draft => {
            draft.numbers.push(newNum);
        });
        this.setState(nextState);

    }

    onSelectClicked = (num) => {
        const { selectedNumbers } = this.state;
        if (selectedNumbers.includes(num)) {
            this.setState({ selectedNumbers: selectedNumbers.filter(l => l.id !== num.id) });
        }
        else {
            this.setState({ selectedNumbers: [...selectedNumbers, num] });
        }
        { console.log(selectedNumbers) }
    }
    onLockedClick = (num) => {
        const { lockedNumbers } = this.state;
        if (lockedNumbers.includes(num)) {
            this.setState({ lockedNumbers: lockedNumbers.filter(l => l.id !== num.id) });
        }
        else {
            this.setState({ lockedNumbers: [...lockedNumbers, num] });
        }
    }
    
    render() {

        const { numbers, selectedNumbers, lockedNumbers } = this.state;
        return (<>
            <div className="col-md-8">
                <div className="col-md-12">
                    <button onClick={this.onAddClicked}
                        className="btn btn-success btn lg w-100">Add
                    </button>
                </div>
                <div style={{ maxHeight: 500, overflowY: 'scroll' }}>
                    <table className='table table-hover table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Add/Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {numbers.map(num => <NumberRow
                                key={num.id}
                                number={num.number}
                                onSelectedClick={() => this.onSelectClicked(num)}
                                isSelected={selectedNumbers.includes(num)}
                                isLocked={lockedNumbers.includes(num)}
                            />
                           )}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6 col-md-offset-3">
                    {!selectedNumbers.length && < h3 > Select some numbers to disable:</h3>}
                    {!!selectedNumbers.length && < h3 > Selected numbers:</h3>}
                    <table>
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Lock/Unlock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedNumbers.map(num => <SelectedRows
                                key={num.id}
                                number={num.number}
                                isLocked={lockedNumbers.includes(num)}
                                onLockClicked={() => this.onLockedClick(num)}
                            />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

        )
    }
}
export default NumberAdder;
