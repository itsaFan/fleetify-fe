type BaseDepartment = {
  id: number;
  department_name: string;
  max_clock_in_time: string;
  max_clock_out_time: string;
};

export type Department = {
  id: number;
  department_name: string;
  max_clock_in: string;
  max_clock_out: string;
};

export type Employee = {
  id: number;
  employee_id: string;
  name: string;
  address: string;
  department: BaseDepartment;
  created_at: Date | string;
  updated_at?: Date | string;
};

export type Attendance = {
  employee_id: string;
  employee_name: string;
  department_name?: string;
  date_local: string;
  clock_in_local: string;
  clock_in_utc: string;
  status_in: string;
  delta_in_minutes: number;
  clock_out_local: string;
  clock_out_utc: string;
  status_out: string;
  delta_out_minutes: 8;
  attendance_id: string;
};
