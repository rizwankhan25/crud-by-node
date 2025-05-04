const express = require('express');

const app = express();

app.use(express.json()); // To parse JSON bodies

const userModel = require('./models/user');

app.get('/', (req, res, next) => {
    res.send("slash router");
})

app.get('/read', async(req, res, next) => {
   try{
    const allUser = await userModel.find();
    if (allUser.length === 0) {
        return res.status(200).send({ message: "No users found" });
     }
    res.send(allUser);
   } catch(err) {
    res.send({error: err.message});
   }
})

app.post('/create', async (req, res, next) => {
    const {name, email, image} = req.body;
    try{
        const createdUser = await userModel.create({
            name,
            email,
            image
         })
         res.send(createdUser);
    } catch(err) {
        res.send({error: err.message});
    }
})

app.get('/delete/:userid', async(req, res, next) => {
   try{
    const deletedUser = await userModel.findOneAndDelete({_id: req.params.userid});
    if (!deletedUser) {
        return res.status(404).send({ error: "User not found" });
     }
    res.send({
        success: true,
        message: "User Deleted Successfuly",
        deletedUser,
    });
   } catch(err) {
    res.send({error: err.message});
   }
})

app.put('/update/:userid', async (req, res) => {
    try {
       const { userid } = req.params;
       const updateData = req.body; // Data to update
 
       if (!updateData || Object.keys(updateData).length === 0) {
          return res.status(400).send({ error: "No update data provided" });
       }
 
       const updatedUser = await userModel.findOneAndUpdate(
          { _id: userid },
          updateData,
          { new: true } // Returns updated document
       );
 
       if (!updatedUser) {
          return res.status(404).send({ error: "User not found" });
       }
 
       res.status(200).send({
          success: true,
          message: "User updated successfully",
          updatedUser
       });
    } catch (err) {
       res.status(500).send({ error: err.message });
    }
 });


app.listen(3000, () => {
    console.log("server on");
})