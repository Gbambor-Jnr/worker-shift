import { ShiftEnum } from "../models";

export interface ShiftInput {
  selectedShift: ShiftEnum;
  shiftStartTime: number;
  shiftEndTime: number;
  shiftDay: Date;
}

export interface ShiftDay {
  shiftDay: string;
}

export interface ShiftDays {
  shiftDays: [ShiftDay];
}
