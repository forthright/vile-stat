path = require "path"
mimus = require "mimus"
os = require "os"
stat = mimus.require "./../../lib", __dirname, []
chai = require "./../helpers/sinon_chai"
util = require "./../helpers/util"
vile = mimus.get stat, "vile"
log = mimus.get stat, "log"
expect = chai.expect

FIXTURES = path.join __dirname, "..", "fixtures"
CWD = process.cwd()

describe "vile-stat", ->
  before ->
    vile.logger.disable()
    mimus.stub(log, "warn")

  beforeEach ->
    process.chdir(FIXTURES)

  after ->
    mimus.restore()

  afterEach ->
    process.chdir CWD
    mimus.reset()

  describe "system testing", ->
    it "generates the expected stat issues", ->
      stat
        .punish()
        .should.become util.issues

    it "can ignore some paths", ->
      stat
        .punish(ignore: [ "file.txt", "src/foo.rb" ])
        .should.become util.ignore_issues

    it "can allow some paths", ->
      stat
        .punish(allow: [ "src/*.rb", "src/*.ts" ])
        .should.become util.allow_issues

    it "rethrows any errors throw from sloc", ->
      old_sloc = mimus.get stat, "sloc"
      err = new Error("foo")
      sloc_stub = mimus.stub().throws(err)
      mimus.set stat, "sloc", sloc_stub
      stat.punish().should.be.rejectedWith(err).notify ->
        mimus.set stat, "sloc", old_sloc

    it "logs to stderr if a file ext is not supported", (done) ->
      stat.punish().then ->
        process.nextTick ->
          expect(log.warn).to.have.been.calledWith "File extension
            'txt' is not supported (file.txt)"
          expect(log.warn).to.have.been.calledWith "File extension 'slim'
            is not supported (src" +
            (if os.platform() == "win32" then "\\" else "/") +
            "foo.slim)"
          done()
      return
