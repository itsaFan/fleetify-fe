import AttendancePageGuide from "@/features/attendance/views/AttendancePageGuide";
import Attendances from "@/features/attendance/views/Attendances";

export default function AttendancePage() {
  return (
    <div className="max-w-3xl w-full flex flex-col gap-3">
      <AttendancePageGuide />
      <Attendances />
    </div>
  );
}
