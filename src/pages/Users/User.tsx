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
  Tag,
  Avatar,
  Tooltip,
  Image,
} from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
} from "../../redux/api/UserApi.js";
import { toast } from "react-toastify";
import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import Loader from "../../components/Loader";

const { Option } = Select;

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Moderator",
    status: "Active",
  },
  {
    id: 5,
    name: "William Brown",
    email: "william@example.com",
    role: "User",
    status: "Inactive",
  },
];

const User = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { data, error, isLoading, isFetching, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  console.log(error);

  // Deletuser Handler
  const handleDelete = (id: String) => {
    deleteUser(id)
      .unwrap()
      .then(() => {
        toast.success("User Deleted Successfully!");
      })
      .catch(() => {
        toast.error("Failed to Delete the User.");
      });
  };
  // ToggleStatus Handler
  const handleToggleStatus = (id: string, statusId: string) => {
    const stId = Number(statusId) === 1 ? "0" : "1";
    const formdata = new FormData();
    formdata.append("status", stId);

    updateUserStatus({ id, formdata })
      .unwrap()
      .then(() => {
        toast.success("Status changed successfully!");
      })
      .catch(() => {
        toast.error("Failed to change the status.");
      });
  };

  // Add User Handler
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
      title: "Avatar",
      dataIndex: "image",
      key: "avatar",
      render: (imageUrl: string) => <Avatar src={imageUrl} size={40} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
    },

    {
      title: "Status",
      dataIndex: "is_active",
      filters: [
        { text: "Active", value: 1 },
        { text: "Inactive", value: 0 },
      ],
      onFilter: (value: any, record: any) => record.is_active === value,
      render: (isActive: number) => (
        <Tag color={isActive === 1 ? "green" : "volcano"}>
          {isActive === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="default"
            style={{
              backgroundColor: record.is_active === 0 ? "#00A86B" : "#E23D28",
              color: "white",
              width: "100px",
            }}
            onClick={() => handleToggleStatus(record.id, record?.is_active)}
          >
            {record.is_active === 1 ? "Deactivate" : "Activate"}
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(String(record.id))}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{ backgroundColor: "red", color: "white", width: "100px" }}
              type="link"
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          // className="main-content"
          style={{
            // overflowX: "auto",
            // transition: "margin-left 0.3s",
            marginLeft: isExpanded || isHovered ? 0 : 0,
            // width: `calc(100vw - ${isExpanded || isHovered ? 290 : 90}px)`,
            // width: `${isExpanded}`,
            width: isExpanded || isHovered ? "1180px" : "",
          }}
        >
          <PageBreadcrumb pageTitle="Users" />

          {/* Add Button */}
          {/* <div className="flex justify-end mb-4">
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          + Add User
        </Button>
      </div> */}

          <div>
            <Table
              columns={columns}
              dataSource={data?.data}
              rowKey="id"
              pagination={{
                pageSizeOptions: ["5", "10", "15"],
                showSizeChanger: true,
                defaultPageSize: 5,
              }}
              scroll={{ x: 1000 }}
            />
          </div>

          {/* Add User Modal */}
          <Modal
            title="Add New User"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={handleAddUser}
            okText="Add"
            zIndex={10000}
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

              <Form.Item
                name="status"
                label="Status"
                initialValue="Active"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default User;
