"use strict";

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const createScore = () => {
  const setData = async () => {
    const result = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/XcndOEVAK91fzDURy1fY/scores', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
        user: 'Chuck Norris',
        score: 42
      })
    });
    return result.json();
  };

  return setData();
};

var _default = createScore;
exports.default = _default;