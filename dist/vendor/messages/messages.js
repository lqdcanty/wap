(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore'], factory);
    } else {
        // Browser globals (root is window)
        root.subViewHandler = factory(root._);
    }
}(this, function (_) {

    var generalErrorMessage = "An error has occured";

    var create = function(options) {
        return {
            type: options.type,
            message: options.message,
            field: options.field
        };
    };

    var error = function(message, field) {
        return create({ type: 'error', message: message, field: field });
    };

    var info = function(message, field) {
        return create({ type: 'info', message: message, field: field });
    };

    var success = function(message, field) {
        return create({ type: 'success', message: message, field: field });
    };

    var extractFrom = function(response, errorMsg) {
        errorMsg = errorMsg || generalErrorMessage;

        if (!response.hasOwnProperty('responseText')) {
            return response;
        }

        if (response.responseText === '' && response.status >= 300) {
            return [error(errorMsg)];
        }

        if (!isJsonResponse(response)) {
            return extractNonJsonMessages(response);
        }

        return extractJsonMessages(response, errorMsg);
    };

    var isJsonResponse = function(response) {
        var contentType = response.getResponseHeader('Content-Type');
        return contentType && contentType.match(/json/i);
    };

    var extractNonJsonMessages = function(response) {
        return [error(response.responseText)];
    };

    var extractJsonMessages = function(response, errorMessage) {
        try {
            var json = JSON.parse(response.responseText);
            return _.map(json.messages, create);
        } catch (e) {
            return [error(errorMessage)];
        }
    };

    return {
        create: create,
        error: error,
        info: info,
        success: success,
        extractFrom: extractFrom
    };

}));

