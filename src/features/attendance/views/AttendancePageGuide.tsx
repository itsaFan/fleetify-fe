import { CircleAlert } from "lucide-react";

export default function AttendancePageGuide() {
  return (
    <div className="flex flex-col gap-2 bg-app-blue/10 shadow-md rounded-lg p-4">
      <span className="text-sm font-medium flex items-center gap-1">
        <CircleAlert size={16} className="text-app-blue" />
        Guides:
      </span>
      <span className="text-xs">
        Below is the table of Attendance Histories/Logs, its sorted based on earlies filter date (from), and you can filter the attendance logs based on
        department and date range (both can work at the same time)
      </span>

      <span className="text-xs">
        Notes: <br />
        The time calculation for checkin and checkout is based on timezone, since on ERD table attendance/attendance_logs, when user POST/PUT attendance , it
        didnt store the timezone as a field but the challenge required me to make this app multinational. <br />
        My solution is: I store all the attendance activity as a UTC so that when I try to fetch the attendances, I convert it back based on request.query
        Timezone and do calculation with max_checkout * max_checkin. <br />
        <br />I haven't found any other solution to solve this multinational other than storing the timezone value on attendance/attendance_logs table which
        required me to modify and change the table schema
      </span>
    </div>
  );
}
