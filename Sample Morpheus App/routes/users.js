const express = require('express')
const router = express.Router()
const User = require('../models/user')
// const user = require('../models/user')

//Getting all
router.get('/',async (req,res) => {
    try{
        const user = await User.find()
        res.send(user)
    } catch (err) {
        res.status(500).json({message : err.message})

    }
})

//Getting one
router.get('/:id', getUser, (req,res) => {
    res.send(res.user)
})

//Creating one
router.post('/', async (req,res) => {
    const user = new User({
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({message : err.message})
    }
})

//Updating one
router.patch('/:id', getUser , async (req,res) => {
    if (req.body.firstname != null){
        res.user.firstname = req.body.firstname
    }
    if (req.body.surname != null){
        res.user.surname = req.body.surname
    }
    if (req.body.email != null){
        res.user.email = req.body.email
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err){
        res.status(400).json({message : err.message})

    }
})


//Deleting one
router.delete('/:id', getUser, async (req,res)=>{
    try{
        await res.user.remove()
        res.json({message : 'deleted the user'})
    } catch (err){
        res.status(500).json({message: err.message})
    }

})

//Middle ware function
async function getUser(req,res,next){
    let user 
    try{
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({message : 'Cannot find the user'})
        }
    } catch(err){
        return res.status(500).json({message : 'Cannot find the user'})
    }
    res.user = user
    next()
}

module.exports = router