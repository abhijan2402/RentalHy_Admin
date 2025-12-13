import React, { useState } from "react";
import { Modal, Button, Input, Form } from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  useGetVideoQuery,
  useAddVideoMutation,
} from "../../redux/api/AdVideoApi";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdVideo = () => {
  const { data: apiVideo, isLoading } = useGetVideoQuery("");
  const [addVideo, { isLoading: isSaving }] = useAddVideoMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // your API shape; adjust key if backend uses something else
  const currentVideoUrl = apiVideo?.video_url ?? "";

  const showModal = () => {
    form.setFieldsValue({
      video_url: currentVideoUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("video_url", values.video_url);

      await addVideo(formData).unwrap();
      toast.success("Video updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Update failed! Please check the URL.");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4">
          <PageBreadcrumb pageTitle="Add Demo Video" />
          <h1 className="text-xl sm:text-2xl font-semibold my-6">Demo Video</h1>

          {/* Video Display Card */}
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">
                  Current Demo Video URL
                </span>
                <span className="mt-1 text-sm sm:text-base text-blue-600 break-all">
                  {currentVideoUrl || "No video URL set"}
                </span>
              </div>

              <Button
                type="primary"
                size="middle"
                onClick={showModal}
                className="w-full sm:w-auto"
              >
                Update Video
              </Button>
            </div>

            {/* Video iframe preview */}
            {currentVideoUrl ? (
              <div className="mt-4">
                <div className="aspect-video w-full max-w-3xl">
                  <iframe
                    src={currentVideoUrl}
                    title="Demo Video"
                    className="w-full h-full rounded-md border border-gray-200"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                No video configured yet. Click "Update Video" to add one.
              </p>
            )}
          </div>

          {/* Modal to set/update video URL */}
          <Modal
            title="Set Demo Video URL"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => setIsModalOpen(false)}
            okButtonProps={{ loading: isSaving }}
            okText="Save"
            cancelText="Cancel"
            centered
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                video_url: "",
              }}
            >
              <Form.Item
                label="Video URL"
                name="video_url"
                rules={[
                  { required: true, message: "Please enter video URL" },
                  {
                    type: "url",
                    message: "Please enter a valid URL",
                  },
                ]}
              >
                <Input placeholder="https://example.com/video" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AdVideo;
