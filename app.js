a = new Date("2023-05-14 09:45:20").getTime();
b = new Date("2023-05-14T22:23:52.851Z").getTime();

z = new Date(1684103032851);
const c = a > b;
console.log(a, b, c);
console.log(z);

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
