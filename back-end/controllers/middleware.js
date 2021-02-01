function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/api/user/alreadyAuth')
    }
    return next();
}

function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/user/notAuth');
}

async function checkManager(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).send({ message: "You are not authenticated" })
    }
    const currentUser = await req.user;
    if (currentUser.isManager) {
        return next();
    }
    else
        return res.status(403).send({ message: "You do not meet the required Manager permissions for this route" })
}

async function checkLead(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).send({ message: "You are not authenticated" })
    }
    const currentUser = await req.user;
    if (currentUser.isLead) {
        return next();
    } else
        return res.status(403).send({ message: "You do not meet the required Lead permissions for this route" })
}

async function checkCEO(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).send({ message: "You are not authenticated" })
    }
    const currentUser = await req.user;
    if (currentUser.isCEO) {
        return next();
    } else
        return res.status(403).send({ message: "You do not meet the required CEO permissions for this route" })
}

module.exports = { checkAuth, checkNotAuth, checkLead, checkManager, checkCEO }