import { ShiftEnum } from "../models";

export interface ShiftInput {
  selectedShift: ShiftEnum;
  shiftStartTime: number;
  shiftEndTime: number;
  shiftDay: Date;
}
