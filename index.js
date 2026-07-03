const express = require("express")

const GiftCard = require("./model/GiftCardModel")

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

app.get("/",(req,res)=>{
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

app.post("/addGiftCard",async(req,res)=>{
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
    }
}

// list of all gift cards

app.get("/allgiftCards",async(req,res)=>{
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

// get product by id

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

app.get("/giftCard/:id",async(req,res)=>{
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


const PORT = 4426

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`)
})