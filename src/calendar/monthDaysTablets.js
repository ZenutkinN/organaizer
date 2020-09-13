import React, { Component } from "react";

export default class MonthDaysTablets extends Component {
    constructor() {
        super();
        this.nameDaysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    };

    getDaysTablets() {
        return this.props.daysArr.map((elem, idx) => {
            const {day, dayOfWeek, isActive, isSelectedDate, numberOfTasks} = elem;
            
            return <div 
                key={idx} 
                className={isActive ? (isSelectedDate ? 'selectedDate' : 'active') : 'notActive'}
                onClick={isActive ?
                    this.props.setNewSelectedDate.bind(null, this.props.selectedYear, this.props.selectedMonth, day) :
                    (e) => e.preventDefault()
                }
            >
                <p>{this.nameDaysOfWeek[dayOfWeek]}</p>
                <p>{day}</p>
                <p>{numberOfTasks ? `Задач: ${numberOfTasks}` : ''}</p>
            </div> 
        });
    };

    render() {
        return <div id="mounthDays">
            {this.getDaysTablets()}
        </div>
    };
};