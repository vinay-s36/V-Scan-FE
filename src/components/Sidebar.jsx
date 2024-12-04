import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold text-center">V-Scan</div>
      <nav className="flex-grow">
        <ul>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Scans</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Reports</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
