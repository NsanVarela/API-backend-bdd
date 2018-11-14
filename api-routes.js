const router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
       status: 'API Youhouh ça marche !',
       message: 'Bienvenue sur myApp !',
    });
});

// Export API routes

module.exports = router;