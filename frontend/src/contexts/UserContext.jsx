import { createContext } from "react";

export default createContext({
    user: null,
    todos: [],
    setUser: () => {},
    setTodos: () => {},
});

// UserContext.js

// import React, { createContext, useState } from 'react';

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [todos, setTodos] = useState([]);
//   const [search, setSearch] = useState(null);



//   const contextValue = {
//     user,
//     todos,
//     search,
//     setUser,
//     setTodos,
//     setSearch,
//   };

//   return (
//     <UserContext.Provider value={contextValue}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUserContext must be used within a UserProvider');
//   }
//   return context;
// };
