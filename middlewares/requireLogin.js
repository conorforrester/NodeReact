//central logic for checking if we have a user logged in (req.user)
//stop the middleware process and do NOT proceed to the route handler
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in' });
    }

    //else: if everything is okay, continue on to the next middleware
    next();
};