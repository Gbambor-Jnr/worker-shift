import { Shift } from "../models";

export interface ShiftInput {
  selectedShift: Shift;
  shiftStartTime: number;
  shiftEndTime: number;
  shiftDay: Date;
}
