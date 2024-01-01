const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 2048,
        },
        done: {
            type: Boolean,
            default: false,
        },
        mobile: {
            type: Number,
            default: false,
        },
        email: {
            type: String,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
