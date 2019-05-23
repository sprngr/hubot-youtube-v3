'use strict';

const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const expect = chai.expect;

describe('youtube-v3', () => {
    beforeEach(() => {
        this.robot = {
            respond: sinon.spy()
        };

        // API Key used for testing to function, need to keep that secret
        process.env.HUBOT_GOOGLE_API = 'xXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx';

        return require('../src/youtube-v3')(this.robot);
    });

    return it('registers a respond listener', () => {
        return expect(this.robot.respond).to.have.been.calledWith(/(?:youtube|yt)(?: me)?\s(.*)/i);
    });
});
