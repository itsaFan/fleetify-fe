import { Outlet } from "react-router-dom";

export function BasicLayout() {
  return (
    <div className="min-h-dvh w-full flex flex-col gap-6 items-center justify-start pt-[10%] sm:pt-[6%] px-4 pb-6">
      <Outlet />
    </div>
  );
}
