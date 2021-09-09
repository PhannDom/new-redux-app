import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

//Reducer Thunk
export const getTodos = createAsyncThunk('todos/todosFetched', async() => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    return response.data
})

export const addTodo = createAsyncThunk('todos/todoAdded', async(title) => {
    const newTodo = {
        id: nanoid(),
        title,
        completed: false
    }
    await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo)
    return newTodo
})

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        allTodos: []
    },
    reducers: {
        // addTodo: {
        //     reducer(state, action) {
        //         state.allTodos.unshift(action.payload)
        //     },
        //     prepare(title) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 completed: false
        //             }
        //         }
        //     }
        // },
        markComplete(state, action) {
            const todoId = action.payload
            state.allTodos = state.allTodos.map(todo => {
                if(todo.id === todoId) todo.completed = !todo.completed
                return todo
            })
        },
        deleteTodo(state, action) {
            const todoId = action.payload
            state.allTodos = state.allTodos.filter(todo => todo.id !== todoId)
        },
        // todosFetched(state, action) {
        //     state.allTodos = action.payload
        // }
    },
    extraReducers: {
        //Get todo
        [getTodos.pending]: (state, action) => {
            console.log('Fetching todos from BE')
        },
        [getTodos.fulfilled]: (state, action) => {
            console.log('Done')
            state.allTodos = action.payload
        },
        [getTodos.rejected]: (state, action) => {
            console.log('Failed to get todos')
        },

        //Add todo
        [addTodo.fulfilled]: (state, action) => {
            console.log('Done')
            state.allTodos.unshift(action.payload)
        },
        [addTodo.rejected]: (state, action) => {
            console.log('Failed to add todo')
        }
    }
})
//Async action creator, action and reducer dispatch
// export const getTodos = () => async dispatch => {
//     try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
//         dispatch(todosFetched(response.data))
//     } catch (error) {
//         console.log(error)
//     }
// }

//Reducer
const todosReducer = todoSlice.reducer

//Selector
export const todosSelector = state => state.todosReducer.allTodos

//Action export
export const { markComplete, deleteTodo } = todoSlice.actions

//Export
export default todosReducer