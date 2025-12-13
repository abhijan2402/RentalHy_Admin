import { Modal, Image, Tag, Divider } from "antd";

const ViewFarmModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedFarm,
  setSelectedFarm,
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedFarm(null);
  };

  const formatBoolean = (value) => (value ? "Yes" : "No");

  const imagesGrouped = selectedFarm?.images_grouped || {};
  const firstImage =
    imagesGrouped?.hall?.[0]?.image_path ||
    imagesGrouped?.kitchen?.[0]?.image_path ||
    imagesGrouped?.parking?.[0]?.image_path ||
    selectedFarm?.type_images?.[0]?.image_path;

  const occasionPrices = Object.keys(selectedFarm || {})
    .filter((key) => key.endsWith("_price") && selectedFarm?.[key])
    .map((key) => ({
      name: key.replace(/_/g, " ").replace("price", "").trim(),
      value: selectedFarm?.[key],
    }));

  return (
    <Modal
      title={selectedFarm?.title || "Convention Details"}
      open={isModalOpen && !!selectedFarm}
      onCancel={handleClose}
      footer={null}
      width={750}
    >
      {selectedFarm ? (
        <div className="space-y-3">
          {/* ======= Main Image ======= */}
          {firstImage && (
            <Image
              width={"100%"}
              height={300}
              src={firstImage}
              alt={selectedFarm.title}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          )}

          <Divider orientation="left">Basic Details</Divider>
          <p>
            <strong>Title:</strong> {selectedFarm.title}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {selectedFarm.description || "N/A"}
          </p>
          <p>
            <strong>Type:</strong> {selectedFarm.type}
          </p>
          <p>
            <strong>Seating Capacity:</strong>{" "}
            {selectedFarm.seating_capacity || "N/A"}
          </p>
          <p>
            <strong>AC Available:</strong>{" "}
            {formatBoolean(selectedFarm.ac_available)}
          </p>
          <p>
            <strong>Generator Available:</strong>{" "}
            {formatBoolean(selectedFarm.generator_available)}
          </p>
          <p>
            <strong>Parking Available:</strong>{" "}
            {formatBoolean(selectedFarm.parking_available)}
          </p>
          <p>
            <strong>Address:</strong> {selectedFarm.address || "N/A"}
          </p>

          <Divider orientation="left">Facilities</Divider>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "CCTV", value: selectedFarm.cctv_available },
              { label: "Free Wi-Fi", value: selectedFarm.free_wifi },
              { label: "TV", value: selectedFarm.tv_available },
              { label: "Restaurant", value: selectedFarm.restaurant },
              { label: "Gym", value: selectedFarm.gym_available },
              {
                label: "Sound System",
                value: selectedFarm.sound_system_available,
              },
              {
                label: "Outside Food Allowed",
                value: selectedFarm.outside_food_allowed,
              },
              { label: "Pet Friendly", value: selectedFarm.pet_friendly },
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

export default ViewFarmModal;
