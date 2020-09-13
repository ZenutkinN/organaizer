import React, { Component } from "react";


export default class TaskTablet extends Component {
    render() {
        const {text, timeFrom, timeTo} = this.props;
        
        return <li className="taskTablet">
            <div className="taskData">
                {timeFrom ? <p className="taskTime">{`${timeFrom}-${timeTo}`}</p> : ''}
                <p className="taskText">{text}</p>
            </div>
            <div 
                className="taskDelete"
                onClick={this.props.removeTask.bind(null, this.props.selectedDate, this.props.idx)}
            >
                х
            </div>
        </li>
    };
};
