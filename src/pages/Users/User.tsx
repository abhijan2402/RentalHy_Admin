import React, { useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "User",
  },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Moderator" },
  { id: 5, name: "William Brown", email: "william@example.com", role: "User" },
  { id: 6, name: "Linda Wilson", email: "linda@example.com", role: "Admin" },
  { id: 7, name: "David Miller", email: "david@example.com", role: "User" },
  { id: 8, name: "Susan Moore", email: "susan@example.com", role: "User" },
  {
    id: 9,
    name: "Robert Taylor",
    email: "robert@example.com",
    role: "Moderator",
  },
  {
    id: 10,
    name: "Patricia Anderson",
    email: "patricia@example.com",
    role: "User",
  },
];

const User = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (id:any) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    message.success("User deleted successfully");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a:any, b:any) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "User", value: "User" },
        { text: "Moderator", value: "Moderator" },
      ],
      onFilter: (value:any, record:any) => record.role === value,
    },
    {
      title: "Action",
      key: "action",
      render: (_:any, record:any) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger type="link">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Users" />
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          pageSizeOptions: ["5", "10", "15"],
          showSizeChanger: true,
          defaultPageSize: 5,
        }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default User;
