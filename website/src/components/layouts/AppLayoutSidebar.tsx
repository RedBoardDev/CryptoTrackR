import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import RouteName from '@enums/NavigationEnums.tsx';
// import { ReactComponent as WorksIcon } from '@icons/tools.svg';
// import './AppLayoutSidebar.css';
import style from './AppLayoutSidebarStyle.tsx';

const { Content, Sider } = Layout;

interface MenuItem {
  label: string;
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  destination?: string;
}

const getItem = (
  label: string,
  key: string,
  icon?: React.ReactNode,
  menuChildren?: MenuItem[],
  destination?: string,
): MenuItem => ({
  label,
  key,
  icon,
  children: menuChildren,
  destination,
});

interface AppLayoutSidebarProps {
  children: React.ReactNode;
}

function AppLayoutSidebar({ children }: AppLayoutSidebarProps) {
  const [selectedKeys, setSelectedKeys] = useState(['1']);

  const items: MenuItem[] = [
    getItem('dashboard', '1', <AppstoreAddOutlined />, undefined, 't'),
    getItem('dashboard', '2', <AppstoreAddOutlined />, undefined, 't'),
    getItem('dashboard', '3', <AppstoreAddOutlined />, undefined, 't'),
    getItem('dashboard', '4', <AppstoreAddOutlined />, undefined, 't'),
  ];

  const onMenuClick = (e: { key: React.Key }) => {
    setSelectedKeys([e.key.toString()]);
  };

  return (
    <Layout style={style.sidebarLayout}>
      <Sider
        width={190}
        style={style.sidebarSider}
      >
        <div style={style.menusContainer}>
          <Menu
            selectedKeys={selectedKeys}
            onClick={onMenuClick}
            mode="inline"
            items={items}
            style={{ border: 'none' }}
          />
        </div>
      </Sider>
      <Layout style={{ ...style.childrenLayout, marginLeft: 0 }}>
        <Content style={style.contentChildrenLayout}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayoutSidebar;