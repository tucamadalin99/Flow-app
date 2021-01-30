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

module.exports = { checkAuth, checkNotAuth }