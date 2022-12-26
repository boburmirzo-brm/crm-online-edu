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
  return this?.reduce((a, c) => (a += c.enrolledCourses?.length && !c.isActive ? 1 : 0), 0);
};

module.exports = Array.prototype.unenrolledCourses = function () {
  return this?.reduce((a, c) => (a += !c.enrolledCourses?.length && !c.isEnd ? 1 : 0), 0);
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
  const it = newGroups.filter((el) => el.major === "it");
  const english = newGroups.filter((el) => el.major === "english");
  const english_kids = newGroups.filter((el) => el.major === "english_kids");
  const russia = newGroups.filter((el) => el.major === "russia");
  const russia_kids = newGroups.filter((el) => el.major === "russia_kids");
  const matematika = newGroups.filter((el) => el.major === "matematika");
  const dtm = newGroups.filter((el) => el.major === "dtm");
  const bugalteriya = newGroups.filter((el) => el.major === "bugalteriya");

  return {
    newGroups,
    uzunlik,
    it,
    english,
    english_kids,
    russia,
    russia_kids,
    matematika,
    dtm,
    bugalteriya,
  };
};

module.exports = Array.prototype.allTeachersIsActive = function (bool) {
  return this?.filter( t => t.isActive === bool);
};

module.exports = Array.prototype.allTeachersIsActiveFalse = function () {
  return this?.reduce((a, c) => (a += !c.isActive ? 1 : 0), 0);
};
module.exports = String.prototype.pathnameFormat = function (index=3) {
  return this?.split("/").slice(0, index).join("/");
};
