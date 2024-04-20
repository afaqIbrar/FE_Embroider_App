import React from 'react'
import { Outlet } from 'react-router-dom'
import { MyProSidebarProvider } from '../pages/global/sidebar/sidebarContext';

const DashBoardLayout = () => {
  return (
    <>
        <MyProSidebarProvider >
            <Outlet />
        </MyProSidebarProvider>  
    </>
  )
}

export default DashBoardLayout