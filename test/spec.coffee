mimus = require "mimus"
stat = mimus.require "./../lib", __dirname, []
chai = require "./helpers/sinon_chai"
util = require "./helpers/util"
vile = mimus.get stat, "vile"
expect = chai.expect

# TODO
describe "stat", ->
  afterEach mimus.reset
  after mimus.restore
