import { useState } from "react";
import { Table, Button, Switch, Image, message } from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const initialProperties = [
  {
    id: 1,
    name: "Luxury Villa",
    owner: "John Doe",
    status: "Disapproved",
    enabled: true,
    highlighted: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xkKKotJCQl9xrAZ2I3w5FXzu7IFBPA7hRw&s",
  },
  {
    id: 2,
    name: "Downtown Apartment",
    owner: "Jane Smith",
    status: "Approved",
    enabled: false,
    highlighted: false,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Beach House",
    owner: "Michael Johnson",
    status: "Disapproved",
    enabled: true,
    highlighted: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRow6C28QNwYhJEb3MZnU-VcSyB2qoPuoDy8WkC_0GLwkTbpo2wlHqBTHQmA7Ske1SMJIg&usqp=CAU",
  },
];

const Property = () => {
  const [properties, setProperties] = useState(initialProperties);

  const toggleEnable = (id: number) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.id === id ? { ...prop, enabled: !prop.enabled } : prop
      )
    );
    message.success("Property enable status changed");
  };

  const toggleHighlighted = (id: number) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.id === id ? { ...prop, highlighted: !prop.highlighted } : prop
      )
    );
    message.success("Property highlighted status changed");
  };

  const changeStatus = (id: any, newStatus: string) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.id === id ? { ...prop, status: newStatus } : prop
      )
    );
    message.success(`Property status changed to ${newStatus}`);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) => <Image width={80} src={url} alt="Property" />,
    },
    {
      title: "Property Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          style={{
            color: status === "Approved" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      render: (enabled: any, record: any) => (
        <Switch
          checked={enabled}
          onChange={() => toggleEnable(record.id)}
          checkedChildren="Enabled"
          unCheckedChildren="Disabled"
        />
      ),
    },
    {
      title: "Highligthed",
      dataIndex: "highlighted",
      key: "highlighted",
      render: (highligthed: any, record: any) => (
        <Switch
          checked={highligthed}
          onChange={() => toggleHighlighted(record.id)}
          checkedChildren="Enabled"
          unCheckedChildren="Disabled"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <>
          {record.status === "Approved" ? (
            <Button
              type="default"
              onClick={() => changeStatus(record.id, "Disapproved")}
              style={{ marginRight: 8 }}
            >
              Disapprove
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => changeStatus(record.id, "Approved")}
              style={{ marginRight: 8 }}
            >
              Approve
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Property" />
      <Table
        columns={columns}
        dataSource={properties}
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

export default Property;
