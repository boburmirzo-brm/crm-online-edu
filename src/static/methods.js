// @ts-nocheck
/* eslint-disable no-extend-native */
module.exports = String.prototype.capitalLetter = function () {
  return this[0].toUpperCase() + this.slice(1).toLowerCase();
};

module.exports = Date.prototype.getOwnDate = function () {
  let d = new Date(this.valueOf());
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

module.exports = Array.prototype.enrolledCourses = function () {
  return this?.reduce((a, c) => (a += c.enrolledCourses?.length ? 1 : 0), 0);
};

module.exports = Array.prototype.unenrolledCourses = function () {
  return this?.reduce((a, c) => (a += !c.enrolledCourses?.length ? 1 : 0), 0);
};

module.exports = Array.prototype.isActiveTrue = function () {
  return this?.reduce((a, c) => (a += c.isActive ? 1 : 0), 0);
};

module.exports = Array.prototype.allStudents = function () {
  return this?.length;
};

module.exports = Array.prototype.yangiGuruhlar = function (bool) {
  const newGroups = this?.filter((el) => el.isActive === bool);
  const uzunlik = newGroups.length;
  const majorIt = newGroups.filter((el) => el.major === "it");
  const majorEnglish = newGroups.filter((el) => el.major === "english");
  const majorRussia = newGroups.filter((el) => el.major === "russia");
  const majorMath = newGroups.filter((el) => el.major === "matematika");
  const majorDTM = newGroups.filter((el) => el.major === "DTM ga tayyorgarlik");
  const majorEconomics = newGroups.filter((el) => el.major === "Bug'alteriya");

  return {
    newGroups,
    uzunlik,
    majorIt,
    majorEnglish,
    majorRussia,
    majorMath,
    majorDTM,
    majorEconomics,
  };
};

module.exports = Array.prototype.allTeachersIsActive = function (bool) {
  return this?.filter( t => t.isActive === bool);
};

module.exports = Array.prototype.allTeachersIsActiveFalse = function () {
  return this?.reduce((a, c) => (a += !c.isActive ? 1 : 0), 0);
};
