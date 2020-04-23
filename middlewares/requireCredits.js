//central logic for checking if we have enough credits to send a survey
//stop the middleware process and do NOT proceed to the route handler
module.exports = (req, res, next) => {
    if (!req.user.credits < 1) {
        return res.status(403).send({ error: 'You do not have enough credits' });
    }

    //else: if everything is okay, continue on to the next middleware
    next();
};