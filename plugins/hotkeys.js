import hotkeys from 'hotkeys-js';

hotkeys.filter = function (event) {
  // By default hotkeys are not enabled for INPUT SELECT TEXTAREA elements
  return true;
}