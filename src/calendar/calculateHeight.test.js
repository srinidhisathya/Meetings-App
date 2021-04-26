/* eslint-disable linebreak-style */
import calculateEventHeight from './calculateHeight.js';

describe('calculateEventHeight function', () => {
  it('should calculate event height', () => {
    // arrange
    const timeObj = {
      startHour: 10,
      endHour: 11,
      startMinute: 0,
      endMinute: 0,
    };

    // act
    const result = calculateEventHeight(timeObj);

    // assert
    expect(result).toBe(40);
  });
});
