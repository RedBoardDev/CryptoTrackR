// src/layouts/Layout.tsx
import React, { useState } from 'react';
import AppLayoutTopbar from './AppLayoutTopbar';
import AppLayoutSidebar from './AppLayoutSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {

  return (
    <div>
      <AppLayoutTopbar />
      <AppLayoutSidebar>{children}</AppLayoutSidebar>
    </div>
  );
}

export default AppLayout;