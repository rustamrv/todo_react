import React, { Component } from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100

    state = {
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have a lunch")
        ],
        term: ''
    };

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newTodo = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newTodo
            }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData }) => {
            return {
                todoData: [...todoData, newItem]
            }
        })
    }

    onSearchChange = (term) => {
        this.setState({ term })
    }

    search(items, text) {
        if (text.length === 0) {
            return items
        }
        return items.filter((el) => el.label.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx]

        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];

    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    render() {
        const { todoData, term } = this.state;
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;
        const visiableItems = this.search(todoData, term)
        return (
            <div className="todo-app" >
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={visiableItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm addItem={this.addItem} />
            </div>
        )
    }
} 