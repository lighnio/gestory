const mainController = {}


mainController.notFound = (req, res) => {
    res.redirect('/')
};

module.exports = mainController;