import { useState } from "react";
import { Table, Button, Image } from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useGetFarmQuery } from "../../redux/api/propertyApi";
import ViewFarmModal from "./ViewFarmModal";

const Farm = () => {
  // pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // API call with pagination params
  const { data, error, isLoading } = useGetFarmQuery({
    page,
    per_page: pageSize,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<any>(null);

  const handleView = (record: any) => {
    setSelectedFarm(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string, record: any) => (
        <Image
          width={60}
          height={40}
          src={record.images_grouped?.hall?.[0]?.image_path || url}
          alt="Farm"
        />
      ),
    },
    { title: "Farm Name", dataIndex: "title", key: "title" },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (value: string) => <div>{value || "Hyderabad"}</div>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (value: string) => (
        <div className="max-w-[200px]">{value || "No address"}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button type="default" onClick={() => handleView(record)}>
            View
          </Button>
        </div>
      ),
    },
  ];

  // Extract pagination data from API response
  const paginationData = data?.data || {};

  return (
    <div>
      <PageBreadcrumb pageTitle="Resort/Farm" />

      <Table
        columns={columns}
        dataSource={paginationData?.data || []}
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

      <ViewFarmModal
        isModalOpen={isModalOpen}
        selectedFarm={selectedFarm}
        setIsModalOpen={setIsModalOpen}
        setSelectedFarm={setSelectedFarm}
      />
    </div>
  );
};

export default Farm;
