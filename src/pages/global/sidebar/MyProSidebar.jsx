// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useState } from 'react';
import { Menu, Sidebar, MenuItem } from 'react-pro-sidebar';
import { useProSidebar } from 'react-pro-sidebar';

import { useSidebarContext } from './sidebarContext';

import { Link } from 'react-router-dom';
import { tokens } from '../../../theme';
import { useTheme, Box, Typography, IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ArticleIcon from '@mui/icons-material/Article';
import MemoryIcon from '@mui/icons-material/Memory';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Dehaze from '@mui/icons-material/Dehaze';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SwitchRightOutlinedIcon from '@mui/icons-material/SwitchRightOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
const Item = ({ title, to, icon, selected, setSelected, disabled }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
      disabled={disabled}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState('Dashboard');
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  return (
    <Box
      sx={{
        position: 'sticky',
        display: 'flex',
        height: '100vh',
        top: 0,
        bottom: 0,
        zIndex: 10000,
        '& .sidebar': {
          border: 'none'
        },
        '& .menu-icon': {
          backgroundColor: 'transparent !important'
        },
        '& .menu-item': {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: 'transparent !important'
        },
        '& .menu-anchor': {
          color: 'inherit !important',
          backgroundColor: 'transparent !important'
        },
        '& .menu-item:hover': {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: 'transparent !important'
        },
        '& .menu-item.active': {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: 'transparent !important'
        }
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : sidebarRTL ? (
                <SwitchLeftOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              ) : (
                <SwitchRightOutlinedIcon
                  onClick={() => setSidebarRTL(!sidebarRTL)}
                />
              )
            }
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100]
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  Taha Collection
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <Dehaze />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={collapsed ? undefined : '10%'}>
            <Item
              title="Dashboard"
              to="/routing/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: '15px 20px 5px 20px' }}
            >
              Processing
            </Typography>
            <Item
              disabled
              title="Articles"
              to="/routing/team"
              icon={<ArticleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Process Lot"
              to="/routing/processLot"
              icon={<MemoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Work In Progress"
              to="/routing/work"
              icon={<AutorenewIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: '15px 20px 5px 20px' }}
            >
              Management
            </Typography>
            <Item
              title="Workers"
              to="/routing/workers"
              icon={<EngineeringIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users"
              to="/routing/users"
              icon={<GroupRemoveIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
