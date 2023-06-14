
// register a new user
// this is a public access file
const registerUser = (req, res) => {
  
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }
    res.send('Register Route')
}


//this is to login a user
// this also public
const loginUser = (req, res) => {
    res.send('Login Route')
}

module.exports = {
    registerUser, 
    loginUser,
}