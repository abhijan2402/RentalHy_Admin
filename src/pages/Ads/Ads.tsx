import React, { useState } from "react";
import { Upload, Button, Image, Popconfirm, message, Row, Col } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  useGetAdsQuery,
  useAddAdMutation,
  useDeleteAdMutation,
} from "../../redux/api/AdsApi";
import { toast } from "react-toastify";
import { Divide } from "lucide-react";
import Loader from "../../components/Loader";

const Ads = () => {
  const { data, error, isLoading, isFetching, refetch } = useGetAdsQuery("");
  const [addAd] = useAddAdMutation();
  const [deleteAd] = useDeleteAdMutation();
  console.log(data?.data);
  const [ads, setAds] = useState([
    // Initial dummy ads with image URLs
    {
      id: 1,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjxpMQrd2k35nY-EuE2lU1Hkmm220Mfpz2QQ&s",
    },
    {
      id: 2,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0LzEvqv7P9axwruY3xNUDmKeIPVJbUu4ZWw&s",
    },
  ]);

  // Formater
  function filtersToFormData(
    files: Record<string, any>,
    useIndexedKeys: boolean = true // 👈 toggle between images[0] or images[]
  ) {
    const formData = new FormData();

    for (const key in files) {
      if (!Object.prototype.hasOwnProperty.call(files, key)) continue;

      const value = files[key];

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (useIndexedKeys) {
            // images[0], images[1] ...
            formData.append(`${key}[${index}]`, item);
          } else {
            // images[], images[] ...
            formData.append(`${key}[]`, item);
          }
        });
      } else if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    }

    return formData;
  }

  // Add image handler from Upload component
  const handleAdd = async (file: any) => {
    if (!file) return;

    const formData = filtersToFormData({ images: [file] }, true);

    await addAd(formData)
      .unwrap()
      .then(() => {
        toast.success("Ads Banner added Successfully!");
      })
      .catch(() => {
        toast.error("Failed to add Ads banner");
      });
  };

  // Delete ad by id
  const handleDelete = (id: any) => {
    deleteAd(id)
      .unwrap()
      .then(() => {
        message.success("Ad deleted!");
      })
      .catch(() => {
        message.error("Failed to delete ad");
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <PageBreadcrumb pageTitle="Ads" />

          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={(file) => {
              // Prevent auto upload, we'll handle manually
              handleAdd(file);
              return false; // prevent upload
            }}
          >
            <Button
              icon={<UploadOutlined />}
              type="primary"
              style={{ marginBottom: 20 }}
            >
              Add Image (Banner)
            </Button>
          </Upload>

          <Row gutter={[16, 16]}>
            {data?.data?.map(({ id, full_path }) => (
              <Col key={id} xs={24} sm={12} md={8} lg={6}>
                <div
                  style={{
                    position: "relative",
                    border: "1px solid #f0f0f0",
                    borderRadius: 4,
                    padding: 8,
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={full_path}
                    alt={`Ad banner ${id}`}
                    style={{ maxWidth: "100%", maxHeight: 150 }}
                  />
                  <Popconfirm
                    title="Are you sure to delete this banner?"
                    onConfirm={() => handleDelete(id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      style={{ position: "absolute", top: 8, right: 8 }}
                    />
                  </Popconfirm>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default Ads;
