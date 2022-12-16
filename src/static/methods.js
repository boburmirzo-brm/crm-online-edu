// @ts-nocheck
/* eslint-disable no-extend-native */
module.exports = String.prototype.capitalLetter = function(){
    return this[0].toUpperCase() + this.slice(1).toLowerCase();
}

