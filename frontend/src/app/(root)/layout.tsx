// layout.js
import React from "react";
import Sidebar from "../components/Sidebar";
import ModileNav from "../components/ModileNav";
import NavBar from "../components/NavBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <ModileNav />
      <div className="overflow-y-auto w-full ">
        <NavBar />

        <div className="p-2 xl:px-16 my-8">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
