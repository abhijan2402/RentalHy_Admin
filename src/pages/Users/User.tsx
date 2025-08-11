import React, { useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const { Option } = Select;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    message.success("User deleted successfully");
  };

  const handleAddUser = () => {
    form.validateFields().then((values) => {
      const newUser = {
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        ...values,
      };
      setUsers((prev) => [...prev, newUser]);
      message.success("User added successfully");
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "User", value: "User" },
        { text: "Moderator", value: "Moderator" },
      ],
      onFilter: (value: any, record: any) => record.role === value,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
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

      {/* Add Button */}
      <div className="flex justify-end mb-4">
        {" "}
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          + Add User
        </Button>
      </div>

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

      {/* Add User Modal */}
      <Modal
        title="Add New User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddUser}
        okText="Add"
        zIndex={10000} // stays above topbar
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select role">
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
              <Option value="Moderator">Moderator</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
