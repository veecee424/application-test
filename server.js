const app = require('./app')
const dotenv = require('dotenv');
dotenv.config()



app.listen(process.env.PORT || 3000, () => {
    console.log("Running on 3k")
})
