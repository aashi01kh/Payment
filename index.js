const express = require('express')

const Insta = require('instamojo-nodejs')

const bodyParser = require('body-parser')

const API_KEY = "test_06678c2f1c1e6e29eaa30dc2528"
const AUTH_KEY = "test_ccb6c7171ee27ac88ba82e8cbae"

Insta.setKeys(API_KEY , AUTH_KEY)

Insta.isSandboxMode(true)

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const PORT = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/pay' ,(req,res) => {
    var name = req.body.name
    var email = req.body.email
    var amount = req.body.amount
    console.log(name)

    var data = new Insta.PaymentData()
    const REDIRECT_URL = "http://localhost:3000/success"
    data.setRedirectUrl(REDIRECT_URL)
    data.send_email = "True"
    data.purpose = "Test  a"
    data.amount = amount;
    data.name=name;
    data.email = email;

    Insta.createPayment(data,function(error,response){
        if(error){

        }
        else{
            console.log(response)
            res.send("Please check your email to make payment")
        }
    })


});

app.get('/success',(req,res) => {
    res.send("payment was successful")
})

app.listen(PORT,() => {
    console.log(`App is listening on ${PORT}`)
})

