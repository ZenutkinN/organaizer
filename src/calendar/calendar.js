import React, { Component } from "react";
import MonthSwitcher from "./monthSwithcer";
import MonthDaysTablets from "./monthDaysTablets";

export default class Calendar extends Component {
    render() {
        return <section id="calendar">
            <div id="hiddenCalendar">
                <MonthSwitcher 
                    selectedYear = {this.props.selectedYear}
                    selectedMonth = {this.props.selectedMonth}
                    prevMonth = {this.props.prevMonth}
                    nextMonth = {this.props.nextMonth}
                    handleNextUpdate = {this.props.handleNextUpdate}
                    handlePrevUpdate = {this.props.handlePrevUpdate}
                />
                <MonthDaysTablets 
                    daysArr = {this.props.daysArr}
                    selectedYear = {this.props.selectedYear}
                    selectedMonth = {this.props.selectedMonth}
                    setNewSelectedDate = {this.props.setNewSelectedDate}
                />
            </div>
        </section>
    };
};