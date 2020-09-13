import React, { Component } from "react";

export default class MonthSwitcher extends Component {
    constructor(props) {
        super(props);
        this.nameOfMounth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    };

    render() {
        return <div id="mounthSwithcer">
            <div className="switcher" onClick={this.props.handlePrevUpdate}>
                <span>&lt;</span>&ensp; 
                {this.nameOfMounth[this.props.prevMonth]}&ensp;
                {this.props.selectedMonth === 0 ? this.props.selectedYear - 1 : ''}
            </div>
            <div id="selectedDate">
                <div>{this.nameOfMounth[this.props.selectedMonth]}</div>
                <div>{this.props.selectedYear}</div>
            </div>
            <div className="switcher" onClick={this.props.handleNextUpdate}>
                {this.props.selectedMonth === 11 ? this.props.selectedYear + 1 : ''}&ensp;
                {this.nameOfMounth[this.props.nextMonth]}&ensp; 
                <span>&gt;</span> 
            </div>
        </div>
    };
};