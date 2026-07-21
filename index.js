const express = require("express")

const GiftCard = require("./model/GiftCardModel")

const UserSchema = require("./model/UserModel")

const OrderSchema = require("./model/OrderModel.js")

const {initializeDatabase} = require("./db/db.connection.js")

const app = express()

initializeDatabase()

app.use(express.json())

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/card/",(req,res)=>{
    res.json("welcome to the gift card express app")
})

async function addGiftCard(giftCardToAdd) {
    try {
        const newGiftCard = await GiftCard.create(giftCardToAdd)
        return newGiftCard
    } catch(err) {
        console.log("unable to add new gift card")
    } 
}

// add a new gift card

app.post("/card/addGiftCard",async(req,res)=>{
    try {
        const addedGiftCard = await addGiftCard(req.body)
            return res.status(201).json({message:"new gift card added successfully",newlyAddedGiftCard:addedGiftCard})
    } catch(err) {
        return res.status(500).json({error:"an error occured while adding new gift card",errorDetails:err.message})
    }
})

// get all gift card

async function getGiftCard(){
    try {
        const allGiftCards = await GiftCard.find()
        return allGiftCards
    } catch(err){
        console.log("an error occured while getting gift cards")
        throw err
    }
}

// list of all gift cards

app.get("/card/allgiftCards",async(req,res)=>{
    try {
        const allCards = await getGiftCard()
        if (allCards) {
            return res.status(200).json({message:"list of all giftcards found successfully",giftCards:allCards})
        } else {
            return res.status(404).json({error:"all gift cards not found"})
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json({error:"an error occured while gfetting all gift cards",errorDetails:err.message})
    }
})

// get gift card by id

async function getGiftCardById(giftCardId) {
    try {
        const foundGiftCard = await GiftCard.findById(giftCardId)
        if (foundGiftCard) {
            return foundGiftCard
        } else {
            console.log("no gift card found for given id")
        }
    } catch(err) {
        console.log("an error occured while getting gift cards by id",err.message)
    }
}

app.get("/card/giftCard/:id",async(req,res)=>{
    const id = req.params.id
    try {
        const giftcard = await getGiftCardById(id)
        if (giftcard) {
            return res.status(200).json({message:`gift card with id ${id} found successfully`,foundGiftCard:giftcard})
        } else {
            return res.status(404).json({error:"gift card not found"})
        }
    } catch(err){
        return res.status(500).json({error:"an error ocured while getting gift card by id",errorDetails:err.message})
    }
})


// get gift card by category

async function GiftCardBy(getBy) {
    try {
        const foundGiftCards = await GiftCard.find(getBy)
        return foundGiftCards
    } catch(err) {
        console.log(`an error occured while getting gift cards by ${getBy}`)
        throw err
    }
}

app.get("/card/category/:categoryType",async(req,res)=>{
    try {
        const {categoryType} = req.params
        const foundCategory = await GiftCardBy({giftCardCategory:categoryType})
        if (foundCategory.length !==0) {
            return res.status(200).json({message:"gift card with category found successfully",listOfGiftCards:foundCategory})
        } else {
            return res.status(404).json({error:"gift card with category not found"})  
        }
    } catch (e) {
        return res.status(500).json({error:`unable to find caegory`,errorDetail:e.message})
    } 
})

app.get("/card/title/:giftCardTitle",async(req,res)=>{
    try {
        const title = req.params.giftCardTitle
        const foundTitle = await GiftCardBy({giftCardTitle:title})

        if (foundTitle.length !==0) {
            return res.status(200).json({message:"gift card with title found successfully",foundGiftCard:foundTitle})
        } else {
            return res.status(404).json({error:`gift card with title ${title} not found`})
        }

    } catch(err) {
        return res.status(500).json({error:"unable to find title",errorDetails:err.message})
    }
})

app.get("/user/",(req,res)=>{
    try{
        return res.json("welcome to user express app")
    } catch(err) {
        return res.status(500).json({message:"an error occured while getting user",errorDetails:err.message})
        throw err
    }
})

app.post("/user/login",async(req,res)=>{
    try {
        const {email,password} =  req.body

        if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

        const addedData = await UserSchema.create(req.body)
        if (addedData){
            return res.status(201).json({message:"user logged in successfully",loginnedUser:addedData})
        } else {
            return res.status(400).json({error:"unable to save data"})
        }

    } catch(err) {
        return res.status(500).json({message:"unable to login user",errorDetails:err.message})
    }
})

app.get("/order/",(req,res)=>{
    try {
        return res.json("welocme to my orders express app")

    } catch(err) {
        throw err
    }
})

async function createOrder(orderData) {
    try {
        const order = new OrderSchema(orderData);
        const savedOrder = await order.save();
        return savedOrder;
    } catch (err) {
        throw err;
    }
}

app.post("/order/UserOrder",async(req,res)=>{
    try {
        const {cart,totalAmount} = req.body

        if (!cart || cart.length === 0) {
            return res.status(400).json({ err: "Cart is empty" });
        }

        const savedOrder = await createOrder({items:cart,totalAmount})
        if (savedOrder) {
            return res.status(201).json({message:"order saved successfuly",addedorder:savedOrder})
        } else {
            return res.status(404).json({error:"saved order not found"})
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({error:"an error occured while posting orders",})
    }
})

app.post("/user/:id/newAdress",async(req,res)=>{
    try {
        const {id} = req.params
        const {fullName,mobileNumber,pincode,locality,houseNo,flatOrBuilding,landmark,district,state,addressType,isDefault} = req.body
        if (!fullName || !mobileNumber || !pincode || !locality || !houseNo || !district || !state || !addressType) {
            return res.status(400).json({error:"all required field are needed"})
        }

        const newAdress = { fullName, mobileNumber, pincode, locality, houseNo, flatOrBuilding, landmark, district, state, addressType, isDefault }


        const addedData = await UserSchema.findByIdAndUpdate(id,{$push:{addresses: newAdress}},{new:true})
        if (addedData) {
            return res.status(201).json({message:"new adress added successfully",addedAdress:addedData})
        } else {
            return res.status(400).json({error:"unable to add new adress"})
        }

    } catch(err) {
        return res.status(500).json({message:"unable to add adress"})
    }
})

async function getUser(userId){
    try {
        const foundUser = await UserSchema.findById(userId)
        return foundUser
    } catch(err){
        console.log("an error occured while find user")
        throw err
    }
}

app.get("/user/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const foundUser = await getUser(id)
        if(foundUser) {
            return res.status(200).json({message:"user found successfully",User:foundUser})
        } else {
            return res.status(500).json
        }
    } catch(err) {
        return res.status(500).json({message:"unable to get user by id"})
    }
})

async function deleteUser(userId) {
    try {
        const deletedUser = await UserSchema.findByIdAndDelete(userId)
        return deletedUser
    } catch(err) {
        console.log("an error occured while deleting user")
        throw err
    }
}

// delete adress

app.delete("/user/:id/deleteUser",async(req,res)=>{
    try {
        const {id} = req.params
        const { addressId } = req.body

        if (!addressId) {
            return res.status(400).json({ error: "addressId is required to delete an address" })
        }

        const updatedUser = await UserSchema.findByIdAndUpdate(
            id,
            { $pull: { addresses: { _id: addressId } } },
            { new: true }
        )

        if (updatedUser) {
            return res.status(200).json({message:"User adress deleted successfully",updatedUser})
        } else {
            return res.status(404).json({message:"user not found"})
        }
    } catch(err) {
        return res.status(500).json({message:"unable to delete user adress"})
    }
})

app.patch("/user/:id/editAdress",async(req,res)=>{
    try {
        const {id} = req.params
        const {
            addressId,
            fullName,
            mobileNumber,
            pincode,
            locality,
            houseNo,
            flatOrBuilding,
            landmark,
            district,
            state,
            addressType,
            isDefault
        } = req.body;

        if (!addressId) {
            return res.status(400).json({ error: "addressId is required to edit an address" });
        }

        const updateFields = {};

        if (fullName !== undefined) updateFields["addresses.$.fullName"] = fullName;
        if (mobileNumber !== undefined) updateFields["addresses.$.mobileNumber"] = mobileNumber;
        if (pincode !== undefined) updateFields["addresses.$.pincode"] = pincode;
        if (locality !== undefined) updateFields["addresses.$.locality"] = locality;
        if (houseNo !== undefined) updateFields["addresses.$.houseNo"] = houseNo;
        if (flatOrBuilding !== undefined) updateFields["addresses.$.flatOrBuilding"] = flatOrBuilding;
        if (landmark !== undefined) updateFields["addresses.$.landmark"] = landmark;
        if (district !== undefined) updateFields["addresses.$.district"] = district;
        if (state !== undefined) updateFields["addresses.$.state"] = state;
        if (addressType !== undefined) updateFields["addresses.$.addressType"] = addressType;
        if (isDefault !== undefined) updateFields["addresses.$.isDefault"] = isDefault;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ error: "no fields provided to update" });
        }

        if (isDefault === true) {
            await UserSchema.updateOne(
                { _id: id },
                { $set: { "addresses.$[].isDefault": false } }
            );
        }

         const updatedUser = await UserSchema.findOneAndUpdate(
            { _id: id, "addresses._id": addressId },
            { $set: updateFields },
            { new: true }
        );

        if (updatedUser) {
            return res.status(200).json({ message: "address updated successfully", updatedUser });
        } else {
            return res.status(404).json({ error: "address or user not found" });
        }


    } catch(err){
        return res.status(500).json({message:"unable to edit adress"})
    }
})



const PORT = 4448

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`)
})