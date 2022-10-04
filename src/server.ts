import app from "./app"

import {AppDataSource} from "./data-source"


AppDataSource.initialize()
.then(() => {
    console.log("Data Source initialized")

    const PORT = 3001

    app.listen(PORT, () => {
        console.log(`Listening at localhost:${PORT}`)
    })
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})
