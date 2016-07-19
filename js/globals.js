"use strict";

// Math
// returns a random number between min and max
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function randomFloadFromInterval(min,max) {
    return Math.random()*(max-min+1)+min;
}

function isNumber(n) {
  if (!isNaN(parseFloat(n)) && isFinite(n)) {
    return true;
  };

  return false;
}
// debug and testing
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

function precondition(condition, message) {
  assert(condition, message);
}

function postcondition(condition, message) {
  assert(condition, message);
}

function listAllProperties(o) {
	var objectToInspect;
	var result = [];

	for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){
      result = result.concat(Object.getOwnPropertyNames(objectToInspect));
	}

	return result;
}

function debub_stop(message) {
  alert("Stopped: " + message);
}
