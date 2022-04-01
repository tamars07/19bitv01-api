//handle all login, logout, register request
const registerView = (req, res) => {
    res.render("register", {

    })
}

const loginView = (req, res) => {
    res.render("login", {

    })
}

module.exports = {
    registerView,
    loginView
}