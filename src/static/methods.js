// @ts-nocheck
/* eslint-disable no-extend-native */
module.exports = String.prototype.capitalLetter = function () {
  return this[0].toUpperCase() + this.slice(1).toLowerCase();
};

module.exports = Date.prototype.getOwnDate = function () {
  let d = new Date(this.valueOf());
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
