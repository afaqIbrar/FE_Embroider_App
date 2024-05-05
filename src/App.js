import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './index.css';
// import { Routes, Route } from "react-router-dom";
// import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

// import Topbar from "./pages/global/Topbar";

// import Dashboard from "./pages/dashboard";
// import Team from "./pages/team";
// import Invoices from "./pages/invoices";
// import Contacts from "./pages/contacts";
// import Form from "./pages/form";
// import Calendar from "./pages/calendar";
// import Bar from "./pages/bar";
// import Line from "./pages/line";
// import Pie from "./pages/pie";
// import FAQ from "./pages/faq";
// import Geography from "./pages/geography";
import { useState } from 'react';
import routes from './routes';
import { useRoutes } from 'react-router-dom';
import { SharedContext, getUser, getUserToken } from './utils/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [authToken, setAuthToken] = useState(getUserToken());
  const [currentUser, setCurrentUser] = useState(getUser());
  const [theme, colorMode] = useMode();
  const routing = useRoutes(routes(currentUser));
  return (
    <SharedContext.Provider
      value={{
        authToken,
        currentUser,
        setAuthToken,
        setCurrentUser
      }}
    >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <MyProSidebarProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
        </MyProSidebarProvider> */}
          <ToastContainer />
          {routing}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SharedContext.Provider>
  );
};

export default App;
