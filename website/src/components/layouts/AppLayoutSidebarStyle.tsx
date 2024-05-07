const sidebarLayoutStyle = {
  height: 'calc(100vh - 45px)',
  marginTop: '45px',
};

const sidebarSiderStyle = {
  overflow: 'auto',
  height: 'calc(100% - 45px)',
  position: 'fixed' as 'fixed',
  left: 0,
  top: '45px',
  borderRight: '2px solid #f0f0f0',
};

const menusContainer = {
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column' as 'column',
  justifyContent: 'space-between',
};

const childrenLayout = {
  height: 'calc(100vh - 45px)',
  overflow: 'hidden',
  backgroundColor: 'white',
};

const contentChildrenLayout = {
  height: '100%',
  width: '100%',
  overflow: 'auto',
};

const iconStyle = {
  width: '16px',
  height: '16px',
};

const style = {
  sidebarLayout: sidebarLayoutStyle,
  sidebarSider: sidebarSiderStyle,
  menusContainer,
  childrenLayout,
  contentChildrenLayout,
  iconStyle,
};

export default style;