import { JSX } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

function MainLayout({ children }: Props) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-screen h-full aspect-[16/9] overflow-hidden bg-gray-900 flex">
        {children}
      </div>
    </div>
  );
}
export { MainLayout };
