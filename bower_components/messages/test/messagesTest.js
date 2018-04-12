var chai = require('chai')
var Messages = require('../messages');
var expect = chai.expect;

module.exports = {

    'messages': {

        'creation': {

            'can create error messages': function() {
                var error = Messages.error('test', 'field');
                expect(error.type).to.equal('error');
                expect(error.message).to.equal('test');
                expect(error.field).to.equal('field');
            },

            'can create info messages': function() {
                var error = Messages.info('test', 'field');
                expect(error.type).to.equal('info');
                expect(error.message).to.equal('test');
                expect(error.field).to.equal('field');
            },

            'can create success messages': function() {
                var error = Messages.success('test', 'field');
                expect(error.type).to.equal('success');
                expect(error.message).to.equal('test');
                expect(error.field).to.equal('field');
            },
        },

        'when extracting': {

            'is returned as is when not from a response': function() {
                var messages = ["test"];

                expect(Messages.extractFrom(messages)).to.equal(messages);
            },

            'creates an error with the response text when response is not JSON': function() {
                var error = 'Error occured';

                var response = {
                    responseText: error,
                    getResponseHeader: function() {
                        return '';
                    }
                };

                var messages = Messages.extractFrom(response);

                expect(messages.length).to.equal(1);
                expect(messages[0].type).to.equal('error');
                expect(messages[0].message).to.equal(error);
            },

            'creates a general error if response text is empty and status code is in the error range': function() {
                var response = {
                    responseText: '',
                    getResponseHeader: function() {
                        return 'text/plain';
                    },
                    status: 400
                };

                var errorMsg = "general error";
                var messages = Messages.extractFrom(response, errorMsg);

                expect(messages.length).to.equal(1);
                expect(messages[0].message).to.equal(errorMsg);
            },

            'extracts messages from json when response is in JSON': function() {
                var message = { type: 'error', message: 'Error occured' };

                var response = {
                    responseText: JSON.stringify({ messages: [message] }),
                    getResponseHeader: function() {
                        return 'application/json';
                    }
                };

                var messages = Messages.extractFrom(response);

                expect(messages.length).to.equal(1);
                expect(messages[0]).to.eql(Messages.create(message));
            },

            'creates a general error if json extractions throws an error': function() {
                var faultyJson = "{ asdf }";

                var response = {
                    responseText: faultyJson,
                    getResponseHeader: function() {
                        return 'application/json';
                    }
                };

                var errorMsg = "json extrations failed";
                var messages = Messages.extractFrom(response, errorMsg);

                expect(messages.length).to.equal(1);
                expect(messages[0].message).to.equal(errorMsg);
            }
        }
    }
};

