import React from 'react';
import './Square.css';

class Squera extends React.Component {


    render() {
        return (
            <div className='squera' onClick={this.props.onClick}>
                {this.props.value}
            </div>
        )
    }
}

export default Squera;