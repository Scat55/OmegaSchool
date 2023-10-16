const express = require('express')
const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')


const PORT = process.env.PORT || 8070

const app = express()

app.use(express.json())

app.use('/api', userRouter)
app.use('/auth', authRouter)


app.listen(PORT, ()=>console.log(`server started on port ${PORT}`))

