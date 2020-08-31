const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res) {
    
res.sendFile(__dirname+"/index.html");   
    
});

app.post("/",function(req,res) {

const query = req.body.city;
const units = "metric";
const apiKey = "6222d271b9a2956dae2d83cf31ed238e";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&units=" + units +"&appid="+apiKey+"";

https.get(url,function(response) {
    
    response.on("data" , function(data) {
       
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const description = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
       
       res.write("<h1>Temperature in " +query+ " is "  +temp+ " degrees celcius </h1>");
       res.write("<p>The weather is currently "+description+"</p>");
       res.write("<img src="+imageUrl+">");
      
               
    });
    
});

});


app.listen(3000,function() {
    console.log("Server started at port 3000");
    
});