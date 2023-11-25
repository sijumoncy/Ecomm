// db connection module

import mongoose, {ConnectOptions} from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            dbName:process.env.MONGO_DB_NAME
        } as ConnectOptions );

    }catch (err) {
        console.error(err);
    }

    const connection = mongoose.connection;

    if(connection.readyState >=1) {
        console.log("connected to database");
        return;
    }

    connection.on("error", () => {
        console.error("connection failed");
        
    })
}

export default connectDB;