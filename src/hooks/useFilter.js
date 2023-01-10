import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, } from 'antd';
import { createRef } from 'react';


// eslint-disable-next-line no-unused-vars
let searchText = null
// eslint-disable-next-line no-unused-vars
let searchedColumn = null
const searchInput = createRef();

const handleSearch = (selectedKeys, confirm, dataIndex) => {
    // confirm();
    searchText = selectedKeys[0];
    searchedColumn = dataIndex;
};
    
const handleReset = (clearFilters, confirm) => {
    clearFilters();
    searchText = '';
    confirm();
};

export const getColumnSearchProps = (dataIndex) => ({
    
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
        style={{
            padding: 8,
        }}
        >
        <Input
            placeholder={`Buscar ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => {setSelectedKeys(e.target.value ? [e.target.value] : []); handleSearch(selectedKeys, confirm({closeDropdown:false}), dataIndex)}  }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
            marginBottom: 8,
            display: 'block',
            }}
            ref={searchInput}
        />
        <Space>
            <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
                width: 90,
            }}
            >
            Limpiar
            </Button>
        </Space>
        </div>
    ),
    filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        /> 
    ),
    onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
        }
    }
    
});