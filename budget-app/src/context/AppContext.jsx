import React from 'react'

const AppReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            }
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.payload
                )
            }
        default:
            return state
    }
}

const initialState = {
    budget: 4000,
    expenses: [
        {id: 12, name: 'hello', cost: 40},
        {id: 13, name: 'holiday', cost: 400},
        {id: 14, name: 'car service', cost: 50}
    ]
}

export const AppContext = React.createContext()

export const AppProvider = (props) => {
    // useReducer hook will hold the state, and allow updates to the state via dispatch
    const [state, dispatch] = React.useReducer(AppReducer, initialState)

    return (
        <AppContext.Provider
            value={{
                budget: state.budget,
                expenses: state.expenses,
                dispatch
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}