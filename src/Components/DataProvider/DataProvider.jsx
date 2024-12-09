import React, {createContext,useReducer} from 'react'

export const DataContext = createContext()

export const DataProvider = ({children,reducer,intialState})=> {
    return(
        <DataContext.Provider value= {useReducer(reducer,intialState)}>
            {children}
        </DataContext.Provider>
    )
}
