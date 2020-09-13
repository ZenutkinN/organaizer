import React, { Component } from "react";

export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowAddField: false,
            addTimeFrom: '',
            addTimeTo: '',
            addText: '',
        };

        this.toggleShowAddField = this.toggleShowAddField.bind(this);
        this.handleInputsAddField = this.handleInputsAddField.bind(this);
        this.cleanState = this.cleanState.bind(this);
        this.handleAddButton = this.handleAddButton.bind(this);
    };

    toggleShowAddField() {
        this.setState({
            isShowAddField: !this.state.isShowAddField,
        });
    };

    handleInputsAddField(nameInput, event) {
        this._emptyTextError.classList.remove('show');
    
        this.setState({
            [nameInput]: event.target.value,
        });
    };

    handleAddButton() {
        if (this.state.addText === '') {
            this._emptyTextError.classList.add('show');
            return;
        };
        this.props.addTask(this.props.selectedDate, this.state);
        this.toggleShowAddField();
        this.cleanState();
    };

    cleanState() {
        this.setState({
            isShowAddField: !this.state.isShowAddField,
            addTimeFrom: '',
            addTimeTo: '',
            addText: '',
        });
    };

    render() {
        return <div id="addTask">
            <div id="showTaskField">
                <button onClick={this.toggleShowAddField}>Добавить задачу <span>+</span></button>
            </div>
            <div id="addTaskField" style={{maxHeight: this.state.isShowAddField ? '200px' : '0'}}>
                <div id="taskTime">
                    Время: c <input 
                            type="text" 
                            value={this.state.addTimeFrom} 
                            onChange={this.handleInputsAddField.bind(null, 'addTimeFrom')}
                        /> 
                    до <input 
                            type="text" 
                            value={this.state.addTimeTo}
                            onChange={this.handleInputsAddField.bind(null, 'addTimeTo')} 
                        />
                </div>
                <div id="taskText">
                    Задача: <input 
                        type="text"
                        value={this.state.addText}
                        onChange={this.handleInputsAddField.bind(null, 'addText')}
                    />
                </div>
                <div id="errorEmptyText" className="hidden">
                    <p ref={(dom) => this._emptyTextError = dom}>Введите название задачи</p>
                </div>
                <div id="taskControlButton">
                    <button onClick={this.handleAddButton}>Добавить</button>
                    <button onClick={this.cleanState}>Отмена</button>
                </div>
            </div>
        </div>
    };
};