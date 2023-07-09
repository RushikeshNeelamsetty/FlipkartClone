
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
//import {v4 as uuid} from "uuid";

import Connection from "./database/db.js";
import DefaultData from './default.js';
import router from "./routes/route.js";

import Stripe from "stripe";

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',router);

const PORT = 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

app.listen(PORT,() => console.log("Server is running on PORT:"+PORT));

DefaultData();

const stripe = new Stripe(process.env.SECRET_KEY);

app.post('/payment',async(req,res)=>{
    let status, error;
    const {token,amount} = req.body;
    try {
        await Stripe.charges.create({
            source:token.id,
            amount,
            currency:"INR"
        });
        status = "success";
    } catch (error) {
        console.log(error.message);
        status ="failure";
    }
    res.json({error,status});
})

/*export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams["MID"] = process.env.PAYTM_MID;
paytmParams["WEBSITE"] = process.env.PAYTM_WEBSITE;
paytmParams["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
paytmParams["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams["ORDER_ID"] = uuid();
paytmParams["CUST_ID"] = process.env.PAYTM_CUST_ID;
paytmParams["TXN_AMOUNT"] = "100";
paytmParams["CALLBACK_URL"] = "http://localhost:8000/callback";
paytmParams["EMAIL"] = "nsaivenkatarushikesh.20.csm@anits.edu.in";
paytmParams["MOBILE_NO"] = "0123456789";*/