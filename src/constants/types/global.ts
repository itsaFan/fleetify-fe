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
