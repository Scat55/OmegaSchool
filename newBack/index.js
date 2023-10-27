const express = require('express')
const session = require('express-session');
// const cors = require('cors');

const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')

const {secret} = require('./config')

const PORT = process.env.PORT || 8070
// const IP = '0.0.0.0'


const app = express();
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json())

app.use('/api', userRouter)
app.use('/auth', authRouter)


app.listen(PORT, ()=>console.log(`server started on port ${PORT} and listen ip`))


