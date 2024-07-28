import React from "react";

const SideMenu: React.FC = () => {
  return (
    <aside className="hidden md:block relative md:h-screen px-6 py-4 border-r border-slate-400 drop-shadow-md">
      <div className="">
        <h2>Filter me</h2>
      </div>
    </aside>
  );
};

export default SideMenu;
