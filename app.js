const express = require("express");
const https = require("https");
const { parse } = require("path");
const bodyParser=require("body-parser");

const app = express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
res.sendFile(__dirname + "/index.html");    
})

app.post("/",function(req,res){

    const query= req.body.cityName;
    const appKey= "XYZ";/*Put API key  */
    const units="metric";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appKey +"&units="+ units +"#";
https.get(url,function(response){
    console.log(response);

    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const weatherDescription=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const iconURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";

        res.write("<p>The Weather Description"+ weatherDescription +"</p>");
        res.write("<h1>The Temperature of "+query+" is "+temp +" Degree Celcius</h1>");
        res.write("<img src="+iconURL+">");
        res.send();
    })
})
})
app.listen(port,function(){
    console.log("Example")
})
