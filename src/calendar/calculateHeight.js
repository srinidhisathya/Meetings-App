function calculateEventHeight(timeObj) {
  /**
       * one blue bar on the page represents 1 hr, which is of height 40px.
       * let barHeight = 40px.
       * one minute represents 40/60 => 2/3.
       * space between each bars is 5px.
       * let space = 5px.
       * start with the startHour iterate through endHour-1, add 45 (barHeight + space).
       * if endMin is zero subtract space(5 px).
       * else add that much height(2/3 * endMin).
       * */
  let height = (40 - (2 * (timeObj.startMinute / 3))) + 5;
  for (let start = timeObj.startHour, end = timeObj.endHour - 1; start < end; (++start)) {
    height += 40 + 5;
  }
  height += 2 * (timeObj.endMinute / 3);
  if (timeObj.endMinute === 0) {
    height -= 5;
  }
  return height;
}

export default calculateEventHeight;
