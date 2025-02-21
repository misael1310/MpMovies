import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-screen h-full aspect-[16/9] overflow-hidden bg-gray-900 flex">
        <Outlet />
      </div>
    </div>
  );
}
export { MainLayout };
