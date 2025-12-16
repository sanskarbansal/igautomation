import React from 'react';
import { Outlet } from 'react-router-dom';

// DashboardLayout is intentionally minimal. FullLayout provides the
// sidebar and header now; dashboard routes render as children under FullLayout.
export default function DashboardLayout() {
  return <Outlet />;
}
