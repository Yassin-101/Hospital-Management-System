import { createContext } from "react";

export const AdminContext = createContext()

const AdminContextProvider = (props)=>{
     const value = {

     }

     return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
     )
}

export default AdminContextProvider