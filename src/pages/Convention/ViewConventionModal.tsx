import { Modal, Image, Tag, Divider } from "antd";

const ViewConventionModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedConvention,
  setSelectedConvention,
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedConvention(null);
  };

  const formatBoolean = (value) => (value ? "Yes" : "No");

  const imagesGrouped = selectedConvention?.images_grouped || {};
  const firstImage =
    imagesGrouped?.hall?.[0]?.image_path ||
    imagesGrouped?.kitchen?.[0]?.image_path ||
    imagesGrouped?.parking?.[0]?.image_path ||
    selectedConvention?.type_images?.[0]?.image_path;

  const occasionPrices = Object.keys(selectedConvention || {})
    .filter((key) => key.endsWith("_price") && selectedConvention?.[key])
    .map((key) => ({
      name: key.replace(/_/g, " ").replace("price", "").trim(),
      value: selectedConvention?.[key],
    }));

  return (
    <Modal
      title={selectedConvention?.title || "Convention Details"}
      open={isModalOpen && !!selectedConvention}
      onCancel={handleClose}
      footer={null}
      width={750}
    >
      {selectedConvention ? (
        <div className="space-y-3">
          {/* ======= Main Image ======= */}
          {firstImage && (
            <Image
              width={"100%"}
              height={300}
              src={firstImage}
              alt={selectedConvention.title}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          )}

          <Divider orientation="left">Basic Details</Divider>
          <p>
            <strong>Title:</strong> {selectedConvention.title}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {selectedConvention.description || "N/A"}
          </p>
          <p>
            <strong>Type:</strong> {selectedConvention.type}
          </p>
          <p>
            <strong>Seating Capacity:</strong>{" "}
            {selectedConvention.seating_capacity || "N/A"}
          </p>
          <p>
            <strong>AC Available:</strong>{" "}
            {formatBoolean(selectedConvention.ac_available)}
          </p>
          <p>
            <strong>Generator Available:</strong>{" "}
            {formatBoolean(selectedConvention.generator_available)}
          </p>
          <p>
            <strong>Parking Available:</strong>{" "}
            {formatBoolean(selectedConvention.parking_available)}
          </p>
          <p>
            <strong>Address:</strong> {selectedConvention.address || "N/A"}
          </p>

          <Divider orientation="left">Facilities</Divider>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "CCTV", value: selectedConvention.cctv_available },
              { label: "Free Wi-Fi", value: selectedConvention.free_wifi },
              { label: "TV", value: selectedConvention.tv_available },
              { label: "Restaurant", value: selectedConvention.restaurant },
              { label: "Gym", value: selectedConvention.gym_available },
              {
                label: "Sound System",
                value: selectedConvention.sound_system_available,
              },
              {
                label: "Outside Food Allowed",
                value: selectedConvention.outside_food_allowed,
              },
              { label: "Pet Friendly", value: selectedConvention.pet_friendly },
            ].map((item) => (
              <Tag color={item.value ? "green" : "red"} key={item.label}>
                {item.label}: {item.value ? "Yes" : "No"}
              </Tag>
            ))}
          </div>

          <Divider orientation="left">Event Prices</Divider>
          <div className="grid grid-cols-2 gap-2">
            {occasionPrices.length > 0 ? (
              occasionPrices.map((item) => (
                <p key={item.name}>
                  <strong>
                    {item.name.replace(/\b\w/g, (l) => l.toUpperCase())}:
                  </strong>{" "}
                  ₹{parseFloat(item.value).toLocaleString("en-IN")}
                </p>
              ))
            ) : (
              <p>No event prices available.</p>
            )}
          </div>

          <Divider orientation="left">Images</Divider>
          {Object.keys(imagesGrouped || {}).map((key) => {
            const images = imagesGrouped?.[key] || [];
            return (
              <div key={key}>
                <strong className="capitalize">{key}:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {images.map((img) => (
                    <Image
                      key={img.id}
                      src={img.image_path}
                      width={100}
                      height={80}
                      alt={key}
                      style={{
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Convention details found.</p>
      )}
    </Modal>
  );
};

export default ViewConventionModal;
