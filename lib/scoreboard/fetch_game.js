"use strict";

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const fetchGame = async () => {
  const result = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/XcndOEVAK91fzDURy1fY/scores').then(response => response.json());
  return result.result;
};

var _default = fetchGame;
exports.default = _default;