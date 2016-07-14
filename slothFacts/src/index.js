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
 * Array containing space facts.
 */
var FACTS = [
    "Male sloths fight for the affection of a female by hanging from a branch upside-down and pawing at each other.",
    "Depending on sloth species, he gestation period ranges widely between 5 and 12 months.",
    "Sloths have a four-part stomach which take up to a month to digest one meal.",
    "Sloths are mammals, order of Pilosa, super-family Folivora, family Bradypodidae, genus Bradypus.",
    "Pygmy three-toed sloths, found off the coast of Panama, are among the one hundred species most threatened by extinction.",
    "Sloths are so slow that algae grows on their fur.",
    "Sloths are competent swimmers, and can even breaststroke.",
    "Sloths pee and poo once a week, on the ground, and always in the same place.",
    "Sloths main predators are eagles, snakes, and jaguars.",
    "Three-toed sloths can rotate their head about 270 degrees.",
    "Some sloths are nocturnal, meaning they sleep during the day and are active at night.",
    "Sloths are solitary creatures and only come together to mate.",
    "Sloths can live up to 40 years.",
    "Sloths are unable to fart.",
    "Sloths mate and give birth while hanging in trees.",
    "The world's slowest mammal is the sloth.",
    "On land sloths are slow, they move only 2 meters per minute.",
    "Sloths are tough, and are rarely harmed from falls.",
    "Female sloths emit a loud scream when looking for mates, which can be heard far away.",
    "Sloths are only about 25% muscle. They can't shiver if they get too cold.",
    "Sloths typically remain with their mother until they are about four years old",
    "Sloths can weigh up for 40 pounds, with most of that weight in their belly.",
    "Sloths tend to prefer the leaves of the Cecropia tree, sometimes known as pumpwoods.",
    "All sloths actually have three toes, but the two-toed sloth has only two fingers.",
    "Sloths are related to anteaters and armadillos.",
    "With such a slow metabolism, sloths must sunbathe in order to keep their body temperature up.",
    "The baby sloth spends 5-10 months attached to its mother, using her body like a jungle gym."
];

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

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Sloth Fact:";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

