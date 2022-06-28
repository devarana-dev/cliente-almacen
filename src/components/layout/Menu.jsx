import { Menu } from "antd";
import { MailOutlined, SettingOutlined, AppstoreOutlined  } from '@ant-design/icons';

export default function LayoutMenu () {

    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
    }


    const items = [
        getItem('Dashboard', 'sub1', <AppstoreOutlined />),
        getItem('Navigation', 'sub2', <MailOutlined />, [
            getItem('Option 9', '1'),
            getItem('Option 10', '2'),
            getItem('Option 11', '3'),
            getItem('Option 12', '4'),
          ]),
        getItem('Navigation', 'sub4', <SettingOutlined />, [
          getItem('Option 9', '9'),
          getItem('Option 10', '10'),
          getItem('Option 11', '11'),
          getItem('Option 12', '12'),
        ]),
      ];

    return (
        <Menu
                className="layout__menu"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
        />
    )
    
};
