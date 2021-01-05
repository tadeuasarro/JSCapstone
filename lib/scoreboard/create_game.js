"use strict";

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const createGame = () => {
  const gatherData = async () => {
    const result = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
        name: 'TadeuJSCapstone'
      })
    });
    return result.json();
  };

  return gatherData();
};

var _default = createGame;
exports.default = _default;