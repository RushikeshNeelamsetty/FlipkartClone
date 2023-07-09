import mongoose from "mongoose";

export const Connection = async (username,password) => {
    const URL='mongodb+srv://root:root@flipkartclone.6prcegj.mongodb.net/?retryWrites=true&w=majority';
    try{
        await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
        console.log("Database connection established");
    }
    catch(error){
        console.log("Error while connecting to the database",error.message);
    }
}

export default Connection;