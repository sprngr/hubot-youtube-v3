expect = require('chai').expect
path   = require 'path'

Robot       = require 'hubot/src/robot'
TextMessage = require('hubot/src/message').TextMessage

describe 'youtube-v3', ->
  robot = {}
  adapter = {}
  user = {}

  beforeEach (done) ->
    # API Key used for testing to function, need to keep that secret
    process.env.HUBOT_GOOGLE_API = "xXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx"

    # Create new robot, without http, using mock adapter
    robot = new Robot null, "mock-adapter", false

    robot.adapter.on "connected", ->

      # load the module under test and configure it for the
      # robot. This is in place of external-scripts
      require('../src/youtube-v3')(@robot)

      user = robot.brain.userForId "1", {
        name: "user"
        room: "#test"
      }

      adapter = robot.adapter

    robot.run()

    done()

  afterEach ->
    robot.shutdown()

  it 'connects to the API to get a response', (done) ->
    adapter.on "reply", (envelope, strings) ->
      expect(strings[0]).to.match /No video results for/i
      
      done()

    adapter.receive(new TextMessage user, "hubot: youtube me test")
