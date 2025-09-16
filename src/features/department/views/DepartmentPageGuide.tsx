import { CircleAlert } from "lucide-react";

export default function DepartmentPageGuide() {
  return (
    <div className="flex flex-col gap-2 bg-app-blue/10 shadow-md rounded-lg p-4">
      <span className="text-sm font-medium flex items-center gap-1">
        <CircleAlert size={16} className="text-app-blue" />
        Guides:
      </span>
      <span className="text-xs">
        Below is the table of Department List, its sorted by id - desc, and you can search the department based on its name. You can also create a department by
        clicking on "+Add Department Button"
        <br />
        <br />
        <strong>On Actions:</strong> there are 2 buttons
        <br />
        1. Pencil Icon Button is for editing the department data
        <br />
        2. Trash Icon Button is for deleting that department
      </span>
    </div>
  );
}
