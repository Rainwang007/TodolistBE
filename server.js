require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;
const toDoItemRouter = require('./routers/to_do_items_router');
const userRouter = require('./routers/user_router');
// const userRouter = require('./routers/user_router');


app.use(express.urlencoded({ extended: true })); // to catch data
app.use(express.json());


app.use(methodOverride('_method'));

app.use(cors({
    origin: '*'
}));

// handle cors pre-flight requests
app.options('*', cors());

app.use('/api/toDoItems', toDoItemRouter);
app.use('/api/users', userRouter);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(() => {

        console.log('DB connected');

        // boot up app
        app.listen(port, () => {
            console.log('ToDoItemBE running on port: ', port);
        });

    })
    .catch(err => {
        console.log('err when connecting: ' + err);
    });