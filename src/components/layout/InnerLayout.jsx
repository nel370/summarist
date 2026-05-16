import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

export default function InnerLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      {/* Top bar with search */}
      <div className="md:ml-[200px]">
        <div className="flex justify-end items-center px-6 py-4 border-b border-gray-100">
          <SearchBar />
        </div>
        <main className="p-6 md:p-8 max-w-[1070px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}