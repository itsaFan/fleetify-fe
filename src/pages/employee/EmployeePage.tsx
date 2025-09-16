import { Employees } from "@/features/employee/views/Employees";
import EmpPageGuide from "@/features/employee/views/EmpPageGuide";

export default function EmployeePage() {
  return (
    <div className="max-w-3xl w-full flex flex-col gap-3">
      <EmpPageGuide />
      <Employees />
    </div>
  );
}
