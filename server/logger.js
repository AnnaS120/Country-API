const logger = (req, res, next) => {
    console.log(req.method, req.originalURL) // this comes from the client, when they click submit the server gets req.method (post), it's to show us what the client is doing (or rather from where)
    next()
}

module.exports = logger