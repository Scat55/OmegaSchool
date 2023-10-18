const express = require('express')
const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')
const {secret} = require('./config')
const session = require('express-session');

const PORT = process.env.PORT || 8070

const app = express()

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json())

app.use('/api', userRouter)
app.use('/auth', authRouter)


app.listen(PORT, ()=>console.log(`server started on port ${PORT}`))


