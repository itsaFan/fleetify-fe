import { ROUTES } from "@/constants/routes";
import { NavLink } from "react-router-dom";

export default function NavigationTab() {
  const tabs = [
    { to: `/${ROUTES.EMPLOYEE.BASE}`, label: "Employee", aria: "emp-tab" },
    { to: `/${ROUTES.DEPARTMENT.BASE}`, label: "Department", aria: "dept-tab" },
    { to: `/${ROUTES.ATTENDANCES.BASE}`, label: "Attendance", aria: "atd-tab" },
  ];

  const btnStyl = `rounded-md px-4 py-2 hover:opacity-80 transition-opacity duration-200 ease-in-out`;
  return (
    <div className="flex flex-wrap items-center gap-3 justify-start w-full max-w-3xl">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          aria-label={tab.aria}
          className={({ isActive }) => `${btnStyl} ${isActive ? "bg-app-brand text-white" : "bg-muted text-primary/70 hover:opacity-80"}`}>
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
