// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API Works',
    message: 'This is MouseHunt Floating Islands Trap Setups'
  });
});

// Import Trap Setup controller
var trapSetupController = require('./trap_setups/trapSetupController');

// Trap Setup routes
router.route('/trapsetups')
  .get(trapSetupController.index)
  .post(trapSetupController.new);

router.route('/trapsetups/:island')
  .get(trapSetupController.view)
  .patch(trapSetupController.update)
  .put(trapSetupController.update)
  .delete(trapSetupController.delete);

// Export API routes
module.exports = router;