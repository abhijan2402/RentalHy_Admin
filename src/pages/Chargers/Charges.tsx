import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, message, Spin } from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const Charges = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commissionCharge, setCommissionCharge] = useState(null);
  const [farmHouseCharge, setFarmHouseCharge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  // Simulate fetching data from API on mount
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCommissionCharge(100);
      setFarmHouseCharge(2500);
      setLoading(false);
    }, 1000);
  }, []);

  const showModal = () => {
    form.setFieldsValue({
      commissionCharge,
      farmHouseCharge,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setCommissionCharge(values.commissionCharge);
        setFarmHouseCharge(values.farmHouseCharge);
        setIsModalOpen(false);
        message.success("Charges updated successfully");
      })
      .catch(() => {
        // Validation failed
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <PageBreadcrumb pageTitle="Set Charges" />
      <h1 className="text-xl sm:text-2xl font-semibold my-6">
        Daily Charges Overview
      </h1>

      {loading ? (
        <div className="flex justify-center my-20">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:space-x-8 bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <div className="flex flex-col mb-4 sm:mb-0">
            <span className="text-sm font-medium text-gray-600">
              Commission Charge
            </span>
            <span className="mt-1 text-xl sm:text-2xl font-bold text-blue-600">
              ₹ {commissionCharge}{" "}
              <span className="text-sm sm:text-base font-normal text-gray-500">
                / day
              </span>
            </span>
          </div>
          <div className="flex flex-col mb-4 sm:mb-0">
            <span className="text-sm font-medium text-gray-600">
              Farm House Charge
            </span>
            <span className="mt-1 text-xl sm:text-2xl font-bold text-blue-600">
              ₹ {farmHouseCharge}{" "}
              <span className="text-sm sm:text-base font-normal text-gray-500">
                / day
              </span>
            </span>
          </div>
          <div className="sm:ml-auto self-center">
            <Button
              type="primary"
              size="middle"
              onClick={showModal}
              className="w-full sm:w-auto"
            >
              Edit Charges
            </Button>
          </div>
        </div>
      )}

      <Modal
        title="Set Charges"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
        centered
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            commissionCharge,
            farmHouseCharge,
          }}
        >
          <Form.Item
            label="Set Commission Charges (₹/day)"
            name="commissionCharge"
            rules={[
              { required: true, message: "Please enter commission charge" },
              {
                type: "number",
                min: 0,
                message: "Charge must be a positive number",
                transform: (value) => Number(value),
              },
            ]}
          >
            <Input type="number" placeholder="Enter commission charge" />
          </Form.Item>
          <Form.Item
            label="Set Farm House Charge (₹/day)"
            name="farmHouseCharge"
            rules={[
              { required: true, message: "Please enter farm house charge" },
              {
                type: "number",
                min: 0,
                message: "Charge must be a positive number",
                transform: (value) => Number(value),
              },
            ]}
          >
            <Input type="number" placeholder="Enter farm house charge" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Charges;
