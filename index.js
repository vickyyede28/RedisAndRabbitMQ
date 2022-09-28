const express = require('express');

const app = express();

const connect = require('./config/db')

const controller = require('./controller/usercontroller')

app.use(express.json());


const redis = require("redis");
const axios = require("axios")
const { json } = require('express');
const client = redis.createClient();
client.connect();
console.log('Redis connected!!');

// client.set("foo","bar",(err,reply)=>{
//     if(err) throw err;
//     console.log(reply);

//     client.get("foo",(err,reply)=>{
//         if(err) throw err
//         console.log(reply);
//     })
// })


// app.get("/",controller);
app.get("/home",async(req,res)=>{
    try {
        let value = "fulldata"
        const result = {
            id:1,
            name:"Germany",
            capital:"Berlin",
            continent:"Europe"
        }
        const getdata = await client.get(value)
        if(!getdata){
            console.log(":::::::::: Set cache data:::::::::");
            const data =  await client.set(value, JSON.stringify(result))
            return res.status(200).json(data)
        }
        else{
            console.log("::::::: GET Cache Data::::::::");
            const data = JSON.parse(getdata)
            return res.status(200).json({ data });
        }
    } catch (error) {
        console.log(error);
    }
})

app.get('/data', async(req, res)=>{
    try {
        const apiresponse =  await axios.get("https://data.covid19india.org/v4/min/data.min.json")
        const apiData = (apiresponse.data.MH.districts.Pune.delta);
        console.log(apiData);
        return res.status(200).send(apiData)
    } catch (error) {
        console.log(error);
    }
})


app.get("/api",async(req,res)=>{
    let result;
    let iscached = false
    try {
        await client.flushAll()
         const api = "covid19api"
         const cacheresult = await client.get(api)
        // console.log(cacheresult);
         if(cacheresult){
            iscached = true;
            result = JSON.parse(cacheresult)
         } else{
            const apiresponse =  await axios.get("https://api.covid19api.com/summary")
            result = apiresponse.data.Countries[196];
            const length = Object.keys(result).length;
            if (length === 0) throw "API returned an empty array";
            await client.set(api, JSON.stringify(result));
         }
         res.send({
            fromCache: iscached,
            data: result,
          });

    } catch (error) {
        console.log(error);
    }
})

// app.post("/register",usercontroller);
// app.patch("/user/:id",usercontroller);
// app.delete("/user/:id",usercontroller)


app.listen(3000, async()=>{
    await connect()
    console.log(`Server is Running at port : 3000`);
})

