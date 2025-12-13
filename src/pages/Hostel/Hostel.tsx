import { useState } from "react";
import { Table, Button, Image, Modal } from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AddHostelModal from "./AddHostelModal";
import { useGetHostelsQuery } from "../../redux/api/propertyApi";

const Hostel = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading } = useGetHostelsQuery({
    page,
    per_page: pageSize,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<any>(null);

  const handleView = (record: any) => {
    setSelectedHostel(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      render: (images: any[]) => (
        <Image
          width={60}
          height={50}
          src={images?.[0]?.image_url || ""}
          alt="Hostel"
        />
      ),
    },
    { title: "Hostel Name", dataIndex: "title", key: "title" },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
    },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Min Price", dataIndex: "min_price", key: "min_price" },
    { title: "Max Price", dataIndex: "max_price", key: "max_price" },
    {
      title: "View",
      key: "view",
      render: (_: any, record: any) => (
        <Button type="default" onClick={() => handleView(record)}>
          View
        </Button>
      ),
    },
  ];

  // Extract pagination data from API response
  const paginationData = data?.pagination || {};

  return (
    <div>
      <PageBreadcrumb pageTitle="To-Let Hostels" />

      <Table
        columns={columns}
        dataSource={data?.data}
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

      {/* View Hostel Modal */}
      <Modal
        title={selectedHostel?.title || "Hostel Details"}
        open={isModalOpen && !!selectedHostel}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedHostel(null);
        }}
        footer={null}
        width={700}
      >
        {selectedHostel ? (
          <div className="space-y-3">
            {/* Images */}
            {selectedHostel.images?.map((img: any) => (
              <Image
                key={img.id}
                width={120}
                src={img.image_url}
                alt="Hostel"
              />
            ))}

            <p>
              <strong>Contact Number:</strong> {selectedHostel.contact_number}
            </p>
            <p>
              <strong>Alternate Contact:</strong>{" "}
              {selectedHostel.alternate_contact_number || "N/A"}
            </p>
            <p>
              <strong>Description:</strong> {selectedHostel.description}
            </p>
            <p>
              <strong>Location:</strong> {selectedHostel.location}
            </p>
            <p>
              <strong>Landmark:</strong> {selectedHostel.landmark || "N/A"}
            </p>
            <p>
              <strong>Room Size:</strong> {selectedHostel.room_size_min} -{" "}
              {selectedHostel.room_size_max} sqft
            </p>
            <p>
              <strong>Hostel Type:</strong>{" "}
              {Array.isArray(selectedHostel.hostel_type)
                ? selectedHostel.hostel_type.join(", ")
                : selectedHostel.hostel_type
                ? JSON.parse(selectedHostel.hostel_type).join(", ")
                : "N/A"}
            </p>

            <p>
              <strong>Bathroom Type:</strong>{" "}
              {Array.isArray(selectedHostel.bathroom_type)
                ? selectedHostel.bathroom_type.join(", ")
                : selectedHostel.bathroom_type
                ? JSON.parse(selectedHostel.bathroom_type).join(", ")
                : "N/A"}
            </p>
            <p>
              <strong>Furnishing Status:</strong>{" "}
              {selectedHostel.furnishing_status || "N/A"}
            </p>
            <p>
              <strong>Single Room Price:</strong> ₹
              {selectedHostel.single_room_price}
            </p>
            <p>
              <strong>Double Sharing Price:</strong> ₹
              {selectedHostel.double_sharing_price}
            </p>
            <p>
              <strong>Triple Sharing Price:</strong> ₹
              {selectedHostel.triple_sharing_price}
            </p>
            <p>
              <strong>Four Sharing Price:</strong> ₹
              {selectedHostel.four_sharing_price}
            </p>
            <p>
              <strong>Security Deposit:</strong> ₹
              {selectedHostel.security_deposit}
            </p>
            <p>
              <strong>One Day Stay:</strong> ₹{selectedHostel.one_day_stay}
            </p>
            <p>
              <strong>One Week Stay:</strong> ₹{selectedHostel.one_week_stay}
            </p>
            <p>
              <strong>One Month Stay:</strong> ₹{selectedHostel.one_month_stay}
            </p>

            <p>
              <strong>Facilities:</strong>{" "}
              {[
                selectedHostel.kitchen && "Kitchen",
                selectedHostel.wifi && "WiFi",
                selectedHostel.ac && "AC",
                selectedHostel.laundry_service && "Laundry",
                selectedHostel.housekeeping && "Housekeeping",
                selectedHostel.hot_water && "Hot Water",
                selectedHostel.power_backup && "Power Backup",
                selectedHostel.parking && "Parking",
                selectedHostel.gym && "Gym",
                selectedHostel.play_area && "Play Area",
                selectedHostel.tv && "TV",
                selectedHostel.dining_table && "Dining Table",
                selectedHostel.security && "Security",
                selectedHostel.ro_water && "RO Water",
                selectedHostel.study_area && "Study Area",
                selectedHostel.mess && "Mess",
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
            <p>
              <strong>Food Provided:</strong>{" "}
              {[
                selectedHostel.breakfast &&
                  `Breakfast (${selectedHostel.breakfast_timing || "N/A"})`,
                selectedHostel.tea_coffee &&
                  `Tea/Coffee (${selectedHostel.tea_coffee_timing || "N/A"})`,
                selectedHostel.lunch &&
                  `Lunch (${selectedHostel.lunch_timing || "N/A"})`,
                selectedHostel.snacks &&
                  `Snacks (${selectedHostel.snacks_timing || "N/A"})`,
                selectedHostel.dinner &&
                  `Dinner (${selectedHostel.dinner_timing || "N/A"})`,
              ]
                .filter(Boolean)
                .join(", ") || "None"}
            </p>
            <p>
              <strong>Documents Required:</strong>{" "}
              {selectedHostel.documents_required}
            </p>
            <p>
              <strong>Rules & Policies:</strong>{" "}
              {selectedHostel.rules_policies || "N/A"}
            </p>
            <p>
              <strong>Smoking/Alcohol Policy:</strong>{" "}
              {selectedHostel.smoking_alcohol_policy}
            </p>
            <p>
              <strong>Pet Allowed:</strong> {selectedHostel.pet_allowed}
            </p>
            <p>
              <strong>Seating Capacity:</strong>{" "}
              {selectedHostel.seating_capacity || "N/A"}
            </p>
            <p>
              <strong>Alcohol Policy:</strong> {selectedHostel.alcohol}
            </p>
          </div>
        ) : (
          <p>No Hostel details found.</p>
        )}
      </Modal>
    </div>
  );
};

export default Hostel;
