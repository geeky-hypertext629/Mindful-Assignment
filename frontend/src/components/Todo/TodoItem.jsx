import moment from "moment";
import { useContext, useState, useEffect } from "react";
import axios from "../../config/axios";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-hot-toast";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const TodoItem = ({ todo: { _id, user_name, done, email, mobile, createdAt, updatedAt } }) => {
    const { todos, setTodos } = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [editingMobile, setEditingMobile] = useState(false);
    const [, setUpdateTime] = useState(0);
    const [editedName, setEditedName] = useState(user_name);
    const [editedEmail, setEditedEmail] = useState(email);
    const [editedMobile, setEditedMobile] = useState(mobile.toString());

    const [open, setOpen] = useState(false);

    const createdAtFromNow = moment(createdAt).fromNow();
    const updatedAtFromNow = moment(updatedAt).fromNow();


    const onDeleteClick = () => {
        axios
            .delete(`/todos/${_id}`)
            .then((res) => {
                setTodos(todos.filter((todo) => todo._id !== _id));
                setOpen(false);
                toast.success("Deleted Successfully");
            })
            .catch((err) => {
                console.log("Unable to delete todo: ", err);
                toast.error("Unable to delete todo");
            });
        
    };

    const onToggleEditClick = () => {
        if (editing === true) {
            toast.success("SuccessFully Edited")
        }
        setEditing(!editing);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setUpdateTime(+new Date());
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (editing) return;
        if (user_name !== editedName) {
            axios
                .patch(`/todos/${_id}`, {
                    user_name: editedName,
                    email: editedEmail,
                    mobile: editedMobile,
                })
                .then((res) => {
                    if (res.todo) {
                        setTodos(
                            todos.map((todo) =>
                                todo._id === res.todo._id ? res.todo : todo
                            )
                        );
                    }
                })
                .catch((err) => {
                    console.log("Unable to edit todo: ", err);
                    toast.error("Unable to edit todo");
                });
        }
    }, [editing]);

    return (
        <div className="rounded-lg bg-white">
            <div className="flex items-start gap-2">
                {/* <button
                    type="button"
                    className={
                        `flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border-[1px] bg-white` +
                        (done ? " border-green-400" : " border-gray-400")
                    }
                    onClick={onToggleDoneClick}
                >
                    {done && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </button> */}
                <div>
                    <div className="flex items-start gap-2">
                        <p
                            className={
                                `-mt-2 border-2 text-lg font-normal text-gray-700` +
                                (done ? " line-through" : "") +
                                (editing
                                    ? " rounded border-gray-600"
                                    : " border-transparent")
                            }
                            contentEditable={editing}
                            suppressContentEditableWarning
                            onInput={(e) => {
                                setEditedName(e.currentTarget.textContent);
                            }}
                        >
                            {user_name}
                        </p>
                        <button
                            type="button"
                            className={
                                editing ? "text-green-500" : "text-gray-500"
                            }
                            onClick={onToggleEditClick}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="text-red-500"
                            onClick={()=>setOpen(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>

                        <Dialog
                            open={open}
                            // TransitionComponent={Transition}
                            keepMounted
                            onClose={()=>setOpen(false)}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>Are You Sure You Want to Delete</DialogTitle>
                            <DialogActions>
                                <Button onClick={onDeleteClick}>Delete</Button>
                                <Button onClick={()=>setOpen(false)}>Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </div>


                    <div className="flex items-start gap-2">
                        <p
                            className={
                                `-mt-2 border-2 text-lg font-normal text-gray-700` +
                                (done ? " line-through" : "") +
                                (editingEmail
                                    ? " rounded border-gray-600"
                                    : " border-transparent")
                            }
                            contentEditable={editingEmail}
                            suppressContentEditableWarning
                            onInput={(e) => {
                                setEditedEmail(e.currentTarget.textContent);
                            }}
                        >
                            {email}
                        </p>
                        <button
                            type="button"
                            className={
                                editingEmail ? "text-green-500" : "text-gray-500"
                            }
                            onClick={() => { if (editingEmail === true) toast.success("SuccessFully Edited"); setEditingEmail(!editingEmail) }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>

                    </div>


                    <div className="flex items-start gap-2">
                        <p
                            className={
                                `-mt-2 border-2 text-lg font-normal text-gray-700` +
                                (done ? " line-through" : "") +
                                (editingMobile
                                    ? " rounded border-gray-600"
                                    : " border-transparent")
                            }
                            contentEditable={editingMobile}
                            suppressContentEditableWarning
                            onInput={(e) => {
                                setEditedMobile(e.currentTarget.textContent);
                            }}
                        >
                            {mobile}
                        </p>
                        <button
                            type="button"
                            className={
                                editingMobile ? "text-green-500" : "text-gray-500"
                            }
                            onClick={() => { if (editingMobile === true) toast.success("SuccessFully Edited"); setEditingMobile(!editingMobile) }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>
                    </div>


                    <div className="flex gap-2 text-xs font-normal text-gray-500">
                        <p>Created {createdAtFromNow}</p>
                        <p>•</p>
                        <p>Updated {updatedAtFromNow}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;