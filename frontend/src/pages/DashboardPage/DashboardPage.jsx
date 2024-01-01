import { useState, useContext, useEffect } from "react";
import moment from "moment";
import UserContext from "../../contexts/UserContext";
import TodoItem from "./../../components/Todo/TodoItem";
import AddTodoDialog from "../../components/Todo/AddTodoDialog";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";



const DashboardPage = () => {
    const { user, todos } = useContext(UserContext);
    const [todoList, setTodoList] = useState(todos);
    const [addTodoOpen, setAddTodoOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [searchByEmail, setSearchByEmail] = useState("");
    const [searchByMobile, setSearchByMobile] = useState("");

    const filterOptions = [
        { label: 'A-Z'},
        { label: 'Z-A'},
        { label: 'last_modified'},
        { label: 'last_inserted'},
    ]

    useEffect(() => {
     setTodoList(todos);
    }, [todos])


    useEffect(() => {
        const filterSelected = localStorage.getItem("Filter"); 
        if(filterSelected)
        sortItemsBasedOnFilter(filterSelected);
    }, [])
    
    const sortItemsBasedOnFilter = (data)=>{
        if(data==="A-Z")
        {
            const sortedArray= [...todoList].sort((a, b) =>  a.user_name.localeCompare(b.user_name));
            setTodoList(sortedArray);
        }
        if(data==="Z-A")
        {
            setTodoList([...todoList].sort((a, b) => b.user_name.localeCompare(a.user_name)))
        }
        if(data==="last_modified")
        {
            setTodoList([...todoList].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)))
        }
        if(data==="last_inserted")
        {
            setTodoList([...todoList].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
        }
        localStorage.setItem("Filter",data);
    }

    const handleFilter = (e)=>{
        console.log(e.target.value);
        sortItemsBasedOnFilter(e.target.value)
    }
    

    return (
        <div className="flex-1 bg-neutral-50">
            <AddTodoDialog
                isOpen={addTodoOpen}
                setIsOpen={setAddTodoOpen}
                setShowSuccesDialog={() => { }}
            />
            {/* Max width wrapper */}
            <div className="mx-auto min-h-[30rem] w-full max-w-7xl px-2 pb-8 pt-4 sm:px-4">
                <main className="w-full space-y-4">
                    {/* Hello section */}
                    <div className="overflow-hidden rounded-lg bg-gradient-to-l from-green-200 via-white to-white shadow">
                        <div className="flex items-center justify-between px-4 py-5 sm:p-6">
                            <h1 className="text-4xl font-bold">
                                Hello, {user.username}.
                            </h1>
                        </div>
                    </div>
                    <div style={{display : "flex", justifyContent : "center", alignItems : "center",}}>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search By User Name"
                            value={search}
                            style={{border : "1.5px solid black", margin : "1rem"}}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-40 py-2.5 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50"
                        />
                        <input
                            type="search"
                            name="Search"
                            style={{border : "1.5px solid black", margin : "1rem"}}
                            placeholder="Search By Email"
                            value={searchByEmail}
                            onChange={(e) => setSearchByEmail(e.target.value)}
                            className="w-40 py-2.5 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50"
                        />
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search By Phone"
                            style={{border : "1.5px solid black", margin : "1rem"}}
                            value={searchByMobile}
                            onChange={(e) => setSearchByMobile(e.target.value)}
                            className="w-40 py-2.5 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50"
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={filterOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Choose a Filer"  onSelect={handleFilter} />}
                        />
                    </div>

                    {/* Todos section */}
                    <section className="bg-white px-4 py-5 shadow sm:p-6 lg:flex-row lg:space-y-2 lg:space-x-4">
                        <div className="flex w-full flex-col">
                            <div className="flex justify-between">
                                <h2 className="text-2xl font-semibold">
                                    USERS
                                </h2>
                                <button
                                    className="h-8 w-32 rounded border border-transparent bg-green-600 px-2 py-1 text-sm text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    onClick={() => setAddTodoOpen(true)}
                                >
                                    Add User
                                </button>
                            </div>

                            <div className="mt-4 flex flex-col gap-5">
                                {/* Todo item */}
                                {todoList.length == 0 && (
                                    <p className="text-gray-600">No Data Found</p>
                                )}
                                {todoList.map((todo) => {
                                    if ((search === "" || todo.user_name.includes(search)) && (searchByEmail === "" || todo.email.includes(searchByEmail)) && (searchByMobile === "" || todo.mobile.toString().includes(searchByMobile)))
                                        return (
                                            <TodoItem todo={todo} key={todo._id} />
                                        );
                                    else
                                        return null;
                                })}

                                {/* {todos
                                    ? todos.filter((data) => {
                                        if (data === "" || search ==="") {
                                            return data
                                        } else if (data.user_name.toLowerCase().includes(search.toLowerCase())) {
                                            return data
                                        }
                                    }).map((todo) => {
                                        return (
                                            <TodoItem todo={todo} key={todo._id} />
                                        );
                                    })
                                    : ""} */}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
