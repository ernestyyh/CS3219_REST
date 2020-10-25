// Import Trap Setup model
TrapSetup = require('./trapSetupModel');

// Handle index actions
// GET /api/trapsetups
exports.index = function (request, response) {
  TrapSetup.get(function (error, trapSetups) {
    if (error) {
      response.json({
        status: "error",
        message: error,
      });
    }
    if (trapSetups.length == 0) {
      response.json({
        message: "No Trap Setups to retrieve",
      });
    } else {
      response.json({
        status: "success",
        message: "Trap Setups retrieved successfully",
        data: trapSetups
      });
    }
  });
};

// Handle create Trap Setup actions
// POST /api/trapsetups
exports.new = function (request, response) {
  var trapSetup = new TrapSetup();
  trapSetup.island = request.body.island;
  trapSetup.weapon = request.body.weapon;
  trapSetup.base = request.body.base;
  trapSetup.bait = request.body.bait;
  trapSetup.charm = request.body.charm;

  // save the Trap Setup and check for errors
  trapSetup.save(function (error) {
    if (error) {
      response.json(error);
    } else {
      response.json({
        message: "New Trap Setup added",
        data: trapSetup,
      });
    }
  });
};

// Handle view Trap Setup info
// GET /api/trapsetups/{island}
exports.view = function (request, response) {
  TrapSetup.findOne({ island: request.params.island }, function (error, trapSetup) {
    if (error) {
      response.json(error);
    } else {
      if (trapSetup === null) {
        response.json({
          message: 'There is no Trap Setup for ' + request.params.island + ' Island to retrieve'
        });
      } else {
        response.json({
          message: 'Trap Setup for ' + request.params.island + ' Island has been successfully retrieved',
          data: trapSetup
        });
      }
    }
  });
};

// Handle update Trap Setup info
// PUT /api/trapsetups/{island}
exports.update = function (request, response) {
  TrapSetup.findOne({ island: request.params.island }, function (error, trapSetup) {
    if (error) {
      response.json(error);
    } else {
      if (trapSetup === null) {
        response.json({
          message: 'There is no Trap Setup for ' + request.params.island + ' Island to reassign'
        });
      } else {
        trapSetup.island = request.body.island;
        trapSetup.weapon = request.body.weapon;
        trapSetup.base = request.body.base;
        trapSetup.bait = request.body.bait;
        trapSetup.charm = request.body.charm;

        // save the Trap Setup and check for errors
        trapSetup.save(function (error) {
          if (error) {
            response.json(error);
          } else {
            response.json({
              message: 'Trap Setup for ' + request.params.island + ' Island has been reassigned for ' + request.body.island + ' Island',
              data: trapSetup
            });
          }
        });
      }
    }
  });
};

// Handle delete Trap Setup
// DELETE /api/trapsetups/{island}
exports.delete = function (request, response) {
  TrapSetup.findOne({ island: request.params.island }, function (error, trapSetup) {
    if (error) {
      response.json(error);
    } else {
      if (trapSetup === null) {
        response.json({
          message: 'There is no Trap Setup for ' + request.params.island + ' Island to delete'
        });
      } else {
        trapSetup.remove(function (error) {
          if (error) {
            response.json(error);
          } else {
            response.json({
              status: "success",
              message: 'Trap Setup for ' + request.params.island + ' Island has been deleted'
            });
          }
        });
      }
    }
  });
};
