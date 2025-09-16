import { CircleAlert } from "lucide-react";

export default function EmpPageGuide() {
  return (
    <div className="flex flex-col gap-2 bg-app-blue/10 shadow-md rounded-lg p-4">
      <span className="text-sm font-medium flex items-center gap-1">
        <CircleAlert size={16} className="text-app-blue" />
        Guides:
      </span>
      <span className="text-xs">
        Below is the table of Employee List, its sorted by alphabetical name, and you can search the employee based on its name or department. You can try
        creating employee by clicking "+ Add Employee" button.
        <br />
        <br />
        <strong>On Actions:</strong> there are 3 buttons
        <br />
        1. Book Icon Button is for employee checkin and checkout scenario
        <br />
        2. Pencil Icon Button is for editing the employee data
        <br />
        3. Trash Icon Button is for deleting that employee
      </span>
    </div>
  );
}
