import Department from "@/features/department/views/Department";
import DepartmentPageGuide from "@/features/department/views/DepartmentPageGuide";

export default function DepartmentPage() {
  return (
    <div className="max-w-3xl w-full flex flex-col gap-3">
      <DepartmentPageGuide />
      <Department />
    </div>
  );
}
