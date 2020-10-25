// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index.js');
const { expect } = require('chai');

// Configure chai
chai.use(chaiHttp);
chai.should();

var arcaneSandstorm = {
  'island': "Arcane",
  'weapon': "Sandstorm Monstrobot",
  'base': "Minotaur Base",
  'bait': "Gouda Cheese",
  'charm': "Power Charm",
}

var forgottenInfinite = {
  'island': "Forgotten",
  'weapon': "Infinite Labyrinth",
  'base': "Labyrinth Base",
  'bait': "Gouda Cheese",
  'charm': "Snowball Charm",
}

var arcaneChromeSandstorm = {
  'island': "Arcane",
  'weapon': "Chrome Sandstorm Monstrobot",
  'base': "Minotaur Base",
  'bait': "Gouda Cheese",
  'charm': "Power Charm",
}

var physicalChromeSandstorm = {
  'island': "Physical",
  'weapon': "Chrome Sandstorm Monstrobot",
  'base': "Minotaur Base",
  'bait': "Gouda Cheese",
  'charm': "Power Charm",
}

describe('TrapSetups', () => {
  // Test GET call
  describe('GET', () => {
    // Test to retrieve all trap setups
    // Initially, there are no trap setups
    it('should not have any trap setup to retrieve', function (done) {
      chai.request(app)
        .get('/api/trapsetups')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal("No Trap Setups to retrieve");
          done();
        });
    });
  });

  // Test POST call
  describe('POST', () => {
    // Test to add Sandstorm Monstrobot setup for Arcane Island
    it('should add Sandstorm Monstrobot setup for Arcane Island', function (done) {
      chai.request(app)
        .post('/api/trapsetups')
        .set('content-type', 'application/json')
        .send(arcaneSandstorm)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal("New Trap Setup added");
          result.body.data.should.have.property('island');
          result.body.data.should.have.property('weapon');
          result.body.data.should.have.property('base');
          result.body.data.should.have.property('bait');
          result.body.data.should.have.property('charm');
          result.body.data.island.should.equal(arcaneSandstorm.island);
          result.body.data.weapon.should.equal(arcaneSandstorm.weapon);
          result.body.data.base.should.equal(arcaneSandstorm.base);
          result.body.data.bait.should.equal(arcaneSandstorm.bait);
          result.body.data.charm.should.equal(arcaneSandstorm.charm);
          done();
        });
    });

    // Test to add Infinite Labyrinth setup for Forgotten Island
    it('should add Infinite Labyrinth setup for Forgotten Island', function (done) {
      chai.request(app)
        .post('/api/trapsetups')
        .set('content-type', 'application/json')
        .send(forgottenInfinite)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal("New Trap Setup added");
          result.body.data.should.have.property('island');
          result.body.data.should.have.property('weapon');
          result.body.data.should.have.property('base');
          result.body.data.should.have.property('bait');
          result.body.data.should.have.property('charm');
          result.body.data.island.should.equal(forgottenInfinite.island);
          result.body.data.weapon.should.equal(forgottenInfinite.weapon);
          result.body.data.base.should.equal(forgottenInfinite.base);
          result.body.data.bait.should.equal(forgottenInfinite.bait);
          result.body.data.charm.should.equal(forgottenInfinite.charm);
          done();
        });
    });
  });

  // Test GET call
  describe('GET', () => {
    // Test to retrieve all trap setups
    // There should be two trap setups
    it('should get all trap setups', function (done) {
      chai.request(app)
        .get('/api/trapsetups')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal("Trap Setups retrieved successfully");
          result.body.data.length.should.equal(2);
          done();
        });
    });

    // Test to retrieve Sandstorm Monstrobot setup for Arcane Island
    it('should get Sandstorm Monstrobot setup for Arcane Island', function (done) {
      chai.request(app)
        .get('/api/trapsetups/Arcane')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal("Trap Setup for Arcane Island has been successfully retrieved");
          result.body.data.should.have.property('island');
          result.body.data.should.have.property('weapon');
          result.body.data.should.have.property('base');
          result.body.data.should.have.property('bait');
          result.body.data.should.have.property('charm');
          result.body.data.island.should.equal(arcaneSandstorm.island);
          result.body.data.weapon.should.equal(arcaneSandstorm.weapon);
          result.body.data.base.should.equal(arcaneSandstorm.base);
          result.body.data.bait.should.equal(arcaneSandstorm.bait);
          result.body.data.charm.should.equal(arcaneSandstorm.charm);
          done();
        });
    });

    // Test to retrieve Infinite Labyrinth setup for Forgotten Island
    it('should get Infinite Labyrinth setup for Forgotten Island', function (done) {
      chai.request(app)
        .get('/api/trapsetups/Forgotten')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal("Trap Setup for Forgotten Island has been successfully retrieved");
          result.body.data.should.have.property('island');
          result.body.data.should.have.property('weapon');
          result.body.data.should.have.property('base');
          result.body.data.should.have.property('bait');
          result.body.data.should.have.property('charm');
          result.body.data.island.should.equal(forgottenInfinite.island);
          result.body.data.weapon.should.equal(forgottenInfinite.weapon);
          result.body.data.base.should.equal(forgottenInfinite.base);
          result.body.data.bait.should.equal(forgottenInfinite.bait);
          result.body.data.charm.should.equal(forgottenInfinite.charm);
          done();
        });
    });

    // Test to retrieve trap setup for Singapore Island
    it('should not get any trap setup for Singapore Island', function (done) {
      chai.request(app)
        .get('/api/trapsetups/Singapore')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal("There is no Trap Setup for Singapore Island to retrieve");
          done();
        });
    });
  });

  // Test PUT call
  describe('PUT', () => {
    // Test to update the trap setup for Arcane Island
    it('should update the trap setup for Arcane Island', function(done) {
      chai.request(app)
        .put('/api/trapsetups/Arcane')
        .set('content-type', 'application/json')
        .send(arcaneChromeSandstorm)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal("Trap Setup for Arcane Island has been updated");
          result.body.data.should.have.property('island');
          result.body.data.should.have.property('weapon');
          result.body.data.should.have.property('base');
          result.body.data.should.have.property('bait');
          result.body.data.should.have.property('charm');
          result.body.data.island.should.equal(arcaneChromeSandstorm.island);
          result.body.data.weapon.should.equal(arcaneChromeSandstorm.weapon);
          result.body.data.base.should.equal(arcaneChromeSandstorm.base);
          result.body.data.bait.should.equal(arcaneChromeSandstorm.bait);
          result.body.data.charm.should.equal(arcaneChromeSandstorm.charm);
          done();
        });
    });

    // Test to reassign the Chrome Sandstorm Monstrobot trap setup for Arcane Island to Physical Island
    it('should reassign the Chrome Sandstorm Monstrobot trap setup for Arcane Island to Physical Island', function(done) {
      chai.request(app)
        .put('/api/trapsetups/Arcane')
        .set('content-type', 'application/json')
        .send(physicalChromeSandstorm)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal("Trap Setup for Arcane Island has been reassigned for Physical Island");
          result.body.data.should.have.property('island');
          result.body.data.should.have.property('weapon');
          result.body.data.should.have.property('base');
          result.body.data.should.have.property('bait');
          result.body.data.should.have.property('charm');
          result.body.data.island.should.equal(physicalChromeSandstorm.island);
          result.body.data.weapon.should.equal(physicalChromeSandstorm.weapon);
          result.body.data.base.should.equal(physicalChromeSandstorm.base);
          result.body.data.bait.should.equal(physicalChromeSandstorm.bait);
          result.body.data.charm.should.equal(physicalChromeSandstorm.charm);
          done();
        });
    });

    // Test to update trap setup for Singapore Island
    it('should not have any trap setup to update for Singapore Island', function(done) {
      chai.request(app)
        .put('/api/trapsetups/Singapore')
        .set('content-type', 'application/json')
        .send(physicalChromeSandstorm)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal("There is no Trap Setup for Singapore Island to update");
          done();
        });
    });
  });

  // Test DELETE call
  describe('DELETE', () => {
    // Test to delete the Chrome Sandstorm Monstrobot setup for Physical Island
    it('should delete the Chrome Sandstorm Monstrobot setup for Physical Island', function(done) {
      chai.request(app)
      .delete('/api/trapsetups/Physical')
      .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Trap Setup for Physical Island has been deleted');
          done();
      });
    });

    // Test to delete the Infinite Labyrinth setup for Forgotten Island
    it('should delete the Infinite Labyrinth setup for Forgotten Island', function(done) {
      chai.request(app)
      .delete('/api/trapsetups/Forgotten')
      .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Trap Setup for Forgotten Island has been deleted');
          done();
      });
    });

    // Test to delete trap setup for Singapore Island
    it('should not have any trap setup to delete for Singapore Island', function(done) {
      chai.request(app)
      .delete('/api/trapsetups/Singapore')
      .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('There is no Trap Setup for Singapore Island to delete');
          done();
      });
    });
  });  
});