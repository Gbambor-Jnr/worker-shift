// a = new Date("2023-05-14").getTime();
// b = new Date("2023-05-14").getTime();

// z = new Date(1684103032851);
// const c = a === b;
// console.log(c);

// {
//    "selectedShift":["first", "second"],
//    "shiftStartTime":[5.45,13.45],
//    "shiftEndTime":[13.45, 21.45],
//    "shiftDay":["2023-05-14T09:45:20.878Z", "2023-02-14T09:45:20.878Z"]
// }

//         {
//    "selectedShift": "second",
//    "shiftStartTime":5.45,
//    "shiftEndTime":13.45,
//    "shiftDay": "2023-02-14T09:45:20.878Z"
// }

//       type: DataTypes.ENUM(Shift.first, Shift.second, Shift.third),

const allShift = [
  { shiftDay: "2023-05-14" },
  { shiftDay: "2023-04-14" },
  { shiftDay: "2023-06-14" },
  { shiftDay: "2023-07-14" },
  { shiftDay: "2023-08-14" },
];
const shiftDay = "2023-05-14T21:23:52.851Z";
const oneDayMilliseconds = 86400000;
const ShiftLessThanOneDay = allShift
  .map((day) =>
    Math.abs(new Date(shiftDay).getTime() - new Date(day.shiftDay).getTime())
  )
  .filter((val) => val > oneDayMilliseconds);

console.log(ShiftLessThanOneDay);
// const mu = allShift.find(
//   (day) =>
//     Math.abs(new Date(shiftDay).getTime() - new Date(day.shiftDay).getTime()) >
//     oneDayMilliseconds
// );

// console.log(mu);
