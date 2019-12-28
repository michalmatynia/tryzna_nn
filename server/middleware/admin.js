let admin = (req, res, next) => {
    if(req.user.role === 0){
        return res.send('You are not allowed to add')
    }
    next()
}

module.exports = { admin }