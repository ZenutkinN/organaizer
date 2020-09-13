import React, { Component } from 'react';
import Tasks from './tasks/tasks';
import Calendar from './calendar/calendar';

export default class Organaizer extends Component {
  constructor() {
    super();
    this.date = new Date();
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth();
    this.currentDay = this.date.getDate();
    this.currentDayOfWeek = this.date.getDay();

    this.state = {
      selectedYear: this.currentYear,
      selectedMonth: this.currentMonth,
      prevMonth: this.getPrevMonth(this.currentMonth),
      nextMonth: this.getNextMonth(this.currentMonth),
      selectedDate: {
        year: this.currentYear,
        month: this.currentMonth,
        day: this.currentDay,
      },
      tasks:
        JSON.parse(localStorage.getItem('tasks')) === null
          ? {}
          : JSON.parse(localStorage.getItem('tasks')),
    };

    this.handleNextUpdate = this.handleNextUpdate.bind(this);
    this.handlePrevUpdate = this.handlePrevUpdate.bind(this);
    this.updateDateNext = this.updateDateNext.bind(this);
    this.updateDatePrev = this.updateDatePrev.bind(this);
    this.isSelectedDate = this.isSelectedDate.bind(this);
    this.setNewSelectedDate = this.setNewSelectedDate.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);

    window.addEventListener('unload', () => {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    });
  }

  handleNextUpdate() {
    const hiddenCalendar = document.querySelector('#hiddenCalendar');
    hiddenCalendar.style.opacity = 0;
    setTimeout(() => {
      this.updateDateNext();
      setTimeout(() => {
        hiddenCalendar.style.opacity = 1;
      }, 300);
    }, 300);
  }

  handlePrevUpdate() {
    const hiddenCalendar = document.querySelector('#hiddenCalendar');
    hiddenCalendar.style.opacity = 0;
    setTimeout(() => {
      this.updateDatePrev();
      setTimeout(() => {
        hiddenCalendar.style.opacity = 1;
      }, 300);
    }, 300);
  }

  updateDateNext() {
    const selectedYear = this.getNextYear(this.state.selectedYear, this.state.selectedMonth);
    const selectedMonth = this.getNextMonth(this.state.selectedMonth);

    this.setState({
      selectedYear: selectedYear,
      selectedMonth: selectedMonth,
      prevMonth: this.getPrevMonth(selectedMonth),
      nextMonth: this.getNextMonth(selectedMonth),
      daysArr: this.getDaysArr(selectedYear, selectedMonth),
    });
  }

  updateDatePrev() {
    const selectedYear = this.getPrevYear(this.state.selectedYear, this.state.selectedMonth);
    const selectedMonth = this.getPrevMonth(this.state.selectedMonth);

    this.setState({
      selectedYear: selectedYear,
      selectedMonth: selectedMonth,
      prevMonth: this.getPrevMonth(selectedMonth),
      nextMonth: this.getNextMonth(selectedMonth),
      daysArr: this.getDaysArr(selectedYear, selectedMonth),
    });
  }

  getPrevYear(selectedYear, selectedMonth) {
    return selectedMonth === 0 ? selectedYear - 1 : selectedYear;
  }

  getNextYear(selectedYear, selectedMonth) {
    return selectedMonth === 11 ? selectedYear + 1 : selectedYear;
  }

  getPrevMonth(selectedMonth) {
    return selectedMonth === 0 ? 11 : selectedMonth - 1;
  }

  getNextMonth(selectedMonth) {
    return selectedMonth === 11 ? 0 : selectedMonth + 1;
  }

  getDaysArr(selectedYear, selectedMonth) {
    const numOfDays = this.getNumOfDays(selectedYear, selectedMonth);

    return [
      ...this.getDatePrevMonth(selectedYear, selectedMonth),
      ...this.getDateSelectedMonth(selectedYear, selectedMonth, numOfDays),
      ...this.getDateNextMonth(selectedYear, selectedMonth, numOfDays),
    ];
  }

  getNumOfDays(selectedYear, selectedMonth) {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }

  getDayOfWeek(selectedYear, selectedMonth, selectedDate) {
    return new Date(selectedYear, selectedMonth, selectedDate).getDay();
  }

  getDateSelectedMonth(selectedYear, selectedMonth, numOfDays) {
    let arr = [];

    for (let date = 1; date <= numOfDays; date++) {
      arr.push({
        day: date,
        dayOfWeek: this.getDayOfWeek(selectedYear, selectedMonth, date),
        isActive: true,
        isSelectedDate: this.isSelectedDate(selectedYear, selectedMonth, date),
        numberOfTasks: this.getNumberOfTasks(selectedYear, selectedMonth, date),
      });
    }

    return arr;
  }

  getDatePrevMonth(selectedYear, selectedMonth) {
    const numFirstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const lastDayOfPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();

    //Если первый день воскресенье, то принудително, в разницу между днями недели, пишем семь дней
    const deltaDays = lastDayOfPrevMonth - (numFirstDay === 0 ? 7 : numFirstDay) + 1;
    let arr = [];

    for (let date = lastDayOfPrevMonth; date > deltaDays; date--) {
      arr.push({
        day: date,
        dayOfWeek: this.getDayOfWeek(
          this.getPrevYear(selectedYear, selectedMonth),
          this.getPrevMonth(selectedMonth),
          date
        ),
        isActive: false,
        isSelectedDate: false,
        numberOfTasks: this.getNumberOfTasks(
          this.getPrevYear(selectedYear, selectedMonth),
          this.getPrevMonth(selectedMonth),
          date
        ),
      });
    }

    return arr.reverse();
  }

  getDateNextMonth(selectedYear, selectedMonth, numOfDays) {
    const numLastDay = new Date(selectedYear, selectedMonth, numOfDays).getDay();

    //Если последний день воскресенье, то принудително, в разницу между днями недели, пишем ноль дней
    const deltaDays = numLastDay === 0 ? 0 : 7 - numLastDay;
    let arr = [];

    for (let date = 1; date <= deltaDays; date++) {
      arr.push({
        day: date,
        dayOfWeek: this.getDayOfWeek(
          this.getNextYear(selectedYear, selectedMonth),
          this.getNextMonth(selectedMonth),
          date
        ),
        isActive: false,
        isSelectedDate: false,
        numberOfTasks: this.getNumberOfTasks(
          this.getNextYear(selectedYear, selectedMonth),
          this.getNextMonth(selectedMonth),
          date
        ),
      });
    }

    return arr;
  }

  isSelectedDate(year, month, day) {
    const { year: y, month: m, day: d } = this.state.selectedDate;
    return year === y && month === m && day === d;
  }

  setNewSelectedDate(year, month, day) {
    const hiddenTasks = document.querySelector('#hiddenTasks');
    hiddenTasks.style.opacity = 0;

    setTimeout(() => {
      this.setState({
        selectedDate: { year, month, day },
      });

      setTimeout(() => {
        hiddenTasks.style.opacity = 1;
      }, 300);
    }, 300);
  }

  getNumberOfTasks(year, month, day) {
    const tasks = this.state.tasks;

    if (!tasks[year] || !tasks[year][month] || !tasks[year][month][day]) return null;

    return tasks[year][month][day].length;
  }

  addTask({ year, month, day }, { addText, addTimeFrom, addTimeTo }) {
    let newTasks = JSON.parse(JSON.stringify(this.state.tasks));

    let data = this.returnDateExist(newTasks, year, month, day);
    const taskData = {
      text: addText,
      timeFrom: addTimeFrom,
      timeTo: addTimeTo,
    };

    data.push(taskData);
    data.sort(this.sortOnTimeFrom);

    this.setState({
      tasks: newTasks,
    });
  }

  returnDateExist(tasksObj, year, month, day) {
    if (tasksObj[year] === undefined) {
      tasksObj[year] = {
        [month]: {
          [day]: [],
        },
      };
    } else if (tasksObj[year][month] === undefined) {
      tasksObj[year][month] = {
        [day]: [],
      };
    } else if (tasksObj[year][month][day] === undefined) {
      tasksObj[year][month][day] = [];
    }

    return tasksObj[year][month][day];
  }

  sortOnTimeFrom(a, b) {
    const [aHours, aMinutes] = a.timeFrom.split(':');
    const [bHours, bMinutes] = b.timeFrom.split(':');

    if (+aHours === +bHours) {
      return aMinutes - bMinutes;
    } else {
      return aHours - bHours;
    }
  }

  removeTask({ year, month, day }, idx) {
    let newTasks = JSON.parse(JSON.stringify(this.state.tasks));

    newTasks[year][month][day].splice(idx, 1);
    this.deleteEmptyTasks(newTasks, year, month, day);

    this.setState({
      tasks: newTasks,
    });
  }

  deleteEmptyTasks(objTasks, year, month, day) {
    if (objTasks[year][month][day].length === 0) {
      delete objTasks[year][month][day];

      if (Object.keys(objTasks[year][month]).length === 0) {
        delete objTasks[year][month];

        if (Object.keys(objTasks[year]).length === 0) {
          delete objTasks[year];
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  }

  render() {
    const { selectedYear, selectedMonth, prevMonth, nextMonth, selectedDate, tasks } = this.state;

    const daysArr = this.getDaysArr(selectedYear, selectedMonth);

    return (
      <div id='organaizer'>
        <Tasks
          selectedDate={selectedDate}
          tasks={tasks}
          addTask={this.addTask}
          removeTask={this.removeTask}
        />
        <Calendar
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          daysArr={daysArr}
          handleNextUpdate={this.handleNextUpdate}
          handlePrevUpdate={this.handlePrevUpdate}
          setNewSelectedDate={this.setNewSelectedDate}
        />
      </div>
    );
  }
}
