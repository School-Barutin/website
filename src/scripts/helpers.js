export const calculateTime = (hour, minutes, addUpMinutes) => {
  const mathResult = minutes + addUpMinutes;
  const resultHour = hour + Math.floor(mathResult / 60);
  const resultMinutes = mathResult % 60;

  return { h: resultHour, m: resultMinutes };
};

export const printTime = (hour, minutes) => {
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hour}:${minutes}`;
};

export const generateSchedule = (defaultDuration, lessonCount) => {
  const schedule = [];
  for (let i = 0; i < lessonCount; i++) {
    if (i === 0) schedule.push(0);
    schedule.push(defaultDuration.lesson);
    if (i === 0) {
      schedule.push(defaultDuration.bigBreak);
    } else if (i === lessonCount - 1) {
      /* DO NOT PUSH */
    } else {
      schedule.push(defaultDuration.break);
    }
  }

  return schedule.map((d, i) => {
    let addUpM = 0;
    for (let j = i; j >= 0; j--) {
      addUpM += schedule[j];
    }

    return calculateTime(
      defaultDuration.beginning.h,
      defaultDuration.beginning.m,
      addUpM
    );
  });
};
