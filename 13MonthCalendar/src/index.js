/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a sloth fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

function mapDates(datestring) {
    console.log('mapping date with date ' + datestring);
    if (datestring == "12.31") {
        return "Happy Year Day!";
    }
    var datemap = new Map();
    day = 1;
    month = 1;
    ifcday = 1;
    ifcmonth = 1;
    for (loop = 1; loop < 366; loop++) {
        datemap.set("" + month + "." + day, "" + ifcmonth + "." + ifcday);
        day++;
        ifcday++;
        if (day == 32 || (day == 31 && (month == 4 || month == 6 || month == 9 || month == 11)) || (day == 29 && month == 2)) {
            month++;
            day = 1;
        }
        if (ifcday == 29) {
            ifcmonth++;
            ifcday = 1;
        }
    }
    console.log(datemap);
    var ifcdatestring = datemap.get(datestring);
    console.log('ifcdatestring of ' + ifcdatestring);
    var splitdate = ifcdatestring.split(".");
    var ifcmonth = splitdate[0];
    var ifcday = splitdate[1];
    var monthmap = new Map();
    monthmap.set("1", "January");
    monthmap.set("2", "February");
    monthmap.set("3", "March");
    monthmap.set("4", "April");
    monthmap.set("5", "May");
    monthmap.set("6", "June");
    monthmap.set("7", "Sol");
    monthmap.set("8", "July");
    monthmap.set("9", "August");
    monthmap.set("10", "September");
    monthmap.set("11", "October");
    monthmap.set("12", "November");
    monthmap.set("13", "December");
    var ifcmonthstr = monthmap.get(ifcmonth);
    return "" + ifcmonthstr + " " + ifcday;
}


/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // TODO determine the 13mo date here
    // TODO next leap year is 2020
    // TODO year day is not in the month, dec 31
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var datestring = "" + month + "." + day;
    console.log('todays date is ' + datestring);
    var ifcdatestr = mapDates(datestring);
    // Create speech output
    var speechOutput = "Today's date: " + ifcdatestr;
    var cardTitle = "Today's (IFC) date:";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

