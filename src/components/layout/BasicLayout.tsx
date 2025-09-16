import { Outlet } from "react-router-dom";
import NavigationTab from "./nav-tab";

export function BasicLayout() {
  return (
    <div className="min-h-dvh w-full flex flex-col gap-6 items-center justify-start pt-8 sm:pt-[3%] px-4 pb-6">
      <NavigationTab />
      <div className="w-full max-w-3xl h-[1px] bg-black/10" />
      <Outlet />
    </div>
  );
}
