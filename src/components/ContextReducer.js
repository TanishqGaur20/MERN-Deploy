import React, { createContext, useContext, useReducer } from "react";

const useStateContext = createContext();
const useDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, size: action.size, quantity: action.qty, img: action.img }];
            console.log('stat', state.img);
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, quantity: parseInt(action.qty) + parseInt(food.quantity), price: action.price + food.price }
                }
                return arr
            })
            return arr
        case "DROP":
            let empArray = []
            return empArray
        default:

    }
}

export const ContextReducer = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <useDispatchContext.Provider value={dispatch}>
            <useStateContext.Provider value={state}>
                {children}
            </useStateContext.Provider>
        </useDispatchContext.Provider>
    )
}

export const useCart = () => useContext(useStateContext);
export const useDispatch = () => useContext(useDispatchContext);