import { useState } from "react";
import { Table, Button, Switch, Image, Modal } from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AddPropertyModal from "./AddPropertyModal";
import { useGetPropertiesQuery } from "../../redux/api/propertyApi";
import { toast } from "react-toastify";
import { useSetPropertyHighlightMutation } from "../../redux/api/profilApi";

const Property = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, error, isLoading, refetch } = useGetPropertiesQuery({
    page,
    per_page: pageSize,
  });
  const [setPropertyHighlight, { isLoading: isHighlightLoading }] =
    useSetPropertyHighlightMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const toggleHighlighted = async (record: any) => {
    try {
      const newValue = record.is_highlighted ? "0" : "1";

      const formData = new FormData();
      formData.append("is_highlighted", newValue);

      await setPropertyHighlight({ id: record.id, formData }).unwrap();
      refetch();

      toast.success("Property highlighted status changed");
    } catch (err) {
      console.log(err);
      toast.error("Failed to change highlighted status");
    }
  };

  const handleView = (record: any) => {
    setSelectedProperty(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string, record: any) => (
        <Image
          width={80}
          height={40}
          src={record.images?.[0]?.image_url || url}
          alt="Property"
        />
      ),
    },
    { title: "Property Name", dataIndex: "title", key: "title" },
    {
      title: "Owner",
      dataIndex: ["user", "name"],
      key: "owner",
      render: (name: string) => name || "N/A",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (value: string) => <div>{value || "Hyderabad"}</div>,
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    //   render: (value: string) => (
    //     <div className="max-w-[200px]">{value || "No address"}</div>
    //   ),
    // },
    {
      title: "Highlighted",
      dataIndex: "is_highlighted",
      key: "highlighted",
      render: (highlighted: number, record: any) => (
        <Switch
          checked={!!highlighted}
          onChange={() => toggleHighlighted(record.id)}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button type="default" onClick={() => toggleHighlighted(record)}>
            {record.is_highlighted ? "Unhighlight" : "Highlight"}
          </Button>

          <Button type="default" onClick={() => handleView(record)}>
            View
          </Button>
        </div>
      ),
    },
  ];

  const paginationData = data?.data || {};

  return (
    <div>
      <PageBreadcrumb pageTitle="To-Let India Properties" />

      {/* Add Property Button */}
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Property
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data?.data?.data}
        rowKey="id"
        loading={isLoading}
        pagination={{
          current: paginationData?.current_page || page,
          pageSize: paginationData?.per_page || pageSize,
          total: paginationData?.total || 0,
          showSizeChanger: true,
          pageSizeOptions: ["10", "25", "50", "100"],
          // showTotal: (total, range) => `${range[0]}–${range[1]} of ${total}`,
          onChange: (newPage, newPageSize) => {
            setPage(newPage);
            setPageSize(newPageSize);
          },
        }}
        scroll={{ x: 1000 }}
      />

      {/* View Property Modal */}
      <Modal
        title={selectedProperty?.title || "Property Details"}
        open={isModalOpen && !!selectedProperty}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedProperty(null);
        }}
        footer={null}
        width={600}
      >
        {selectedProperty ? (
          <div className="space-y-3">
            <Image
              width={120}
              src={selectedProperty.images?.[0]?.image_url}
              alt="Property"
            />
            <p>
              <strong>Owner:</strong> {selectedProperty.user?.name || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {selectedProperty.location}
            </p>
            <p>
              <strong>BHK:</strong> {selectedProperty.bhk}
            </p>
            <p>
              <strong>Price:</strong> ₹{selectedProperty.price}
            </p>
            <p>
              <strong>Furnishing:</strong> {selectedProperty.furnishing_status}
            </p>
            <p>
              <strong>Availability:</strong> {selectedProperty.availability}
            </p>
            <p>
              <strong>Preferred Tenant:</strong>{" "}
              {selectedProperty.preferred_tenant_type}
            </p>
            <p>
              <strong>Bathrooms:</strong> {selectedProperty.bathrooms}
            </p>
            <p>
              <strong>Parking:</strong> {selectedProperty.parking_available}
            </p>
            <p>
              <strong>Advance:</strong> {selectedProperty.advance}
            </p>
            <p>
              <strong>Facing:</strong> {selectedProperty.facing_direction}
            </p>
          </div>
        ) : (
          <p>No property details found.</p>
        )}
      </Modal>
    </div>
  );
};

export default Property;
