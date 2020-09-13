import React, { Component } from "react";
import AddTask from "./addTask.js";
import TaskTablet from "./taskTablet.js";

export default class Tasks extends Component {
    constructor(props) {
        super(props);

        this.getDate = this.getDate.bind(this);
        this.getTaskTablets = this.getTaskTablets.bind(this);
    };

    getDate() {
        const {year, month, day} = this.props.selectedDate;
        return `${day}.${month > 9 ? month + 1 : '0' + (month + 1)}.${year}`;
    };

    getTaskTablets() {
        const tasks = this.props.tasks;
        const {year, month, day} = this.props.selectedDate;

        if (!tasks[year] || !tasks[year][month] || !tasks[year][month][day]) {
            return <li className="taskTablet">
                <div className="taskData">
                    <p className="taskText">На <span>{this.getDate()}</span> нет задач</p>
                </div>
            </li>
        } else {
            return tasks[year][month][day].map((task, idx) => {
                const {text, timeFrom, timeTo} = task
                return <TaskTablet 
                    key={idx}
                    idx={idx}
                    text={text}
                    timeFrom={timeFrom}
                    timeTo={timeTo}
                    removeTask = {this.props.removeTask}
                    selectedDate = {this.props.selectedDate}
                />
            });
        };
    };

    render() {
        return <section id="tasks">
            <div id="hiddenTasks">
                <div id="taskHeader">
                    <p>Задачи</p>
                    <p>{this.getDate()}</p>
                </div>
                <AddTask 
                    selectedDate = {this.props.selectedDate}
                    addTask = {this.props.addTask}
                />
                <ul id="taskTablets">
                    {this.getTaskTablets()}
                </ul>
            </div>
        </section>
    };
};