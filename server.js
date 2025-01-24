const app =require("./app");
const connectDB =require("./src/config/db");


connectDB()


app.listen(8080 || 8000 , () => {
    console.log(`App running on port ${8080}`);
})