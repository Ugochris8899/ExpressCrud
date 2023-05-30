const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 4444;
app.use(express.json())




const studentInfoSchema = new mongoose.Schema(
    {
        name: String,
        course: String,
        designation: String,
       "score": {
        html: Number,
        css: Number,
        react: Number,
        node: Number
       }
    }
    )
    
    const user = mongoose.model("studentInfo", studentInfoSchema)
    
    app.get("/", (req, res)=>{
        res.status(200).json("Welcome to my home page")
    })
    
    //creating data in our database
    app.post("/createUser", async(req, res) =>{
        const newUser = await new user(req.body)
        newUser.save()
        res.status(200).json(newUser)
    });
    
    //getting all data
    app.get("/getall", async(req, res)=>{
        const allUser = await user.find()
        res.status(200).json(
            {message: "The available Users are" + allUser.length, data:allUser}
        )
    });
    
    //Retrieving a single data
    app.get("/getOne/:id", async(req, res)=>{
        const id = req.params.id
        const oneUser = await user.findById(id)
        res.status(200).json(
            {message: `Kindly find below the information of the id ${id}`, data: oneUser}
        )
    })
    
    //To update a data in our database
    app.put("/update/:id", async(req, res)=>{
        try {
            const userId = req.params.id
            const newUser = req.body
            const updatedUser = await user.findByIdAndUpdate(userId, newUser)
            res.status(200).json(
                {message: "user updated successfully", data: updatedUser}
            )
    
        } catch (error) {
            res.status(500).json(
                {message: "failed to update user"}
            )
        }
    });

      //deletinga single user
  app.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id
    const deleteUser = await user.findByIdAndDelete((id))

    res.status(200).json(
        {message:`the information of the user with the id of ${id}, has been deleted`,
    data: deleteUser}
    )
 })


 // // Connect to MongoDB

mongoose.connect("mongodb+srv://amagbaugochukwu:tNGFBoZKclidj2J1@cluster0.jyrip2b.mongodb.net/")
.then( () =>{
    console.log("connection to the database is successful");
})

 app.listen(PORT, (req, res) =>{
    console.log(`Listening to server on port: ${PORT}`);
});
    
    