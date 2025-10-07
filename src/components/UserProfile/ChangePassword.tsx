import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Button } from "antd";
import { toast } from "react-toastify";
import {
  useForgotPasswordMutation,
  useVerifyPasswordMutation,
  useSetPasswordMutation,
} from "../../redux/api/profilApi";
import { useAuth } from "../../context/AuthContext";

const ChangePassword = ({
  setIsPasswordModalVisible,
  isPasswordModalVisible,
}) => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [forgotPassword, { isLoading: forgotLoading }] =
    useForgotPasswordMutation();
  const [verifyPassword, { isLoading: verifyLoading }] =
    useVerifyPasswordMutation();

  const [setPassword, { isLoading: resetLoading }] = useSetPasswordMutation();

  // ✅ Prefill email when modal opens or user changes
  useEffect(() => {
    if (user?.email) {
      form.setFieldsValue({ email: user.email });
      setEmail(user.email);
    }
  }, [user, form, isPasswordModalVisible]);

  // Step 1: Forgot Password
  const handleForgotPassword = async () => {
    try {
      const values = await form.validateFields();

      // 🧾 Create FormData
      const formData = new FormData();
      formData.append("email", values.email);

      setEmail(values.email);
      await forgotPassword(formData).unwrap();

      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset email");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const values = await form.validateFields();

      // 🧾 Create FormData
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", values.otp);

      await verifyPassword(formData).unwrap();
      setOtp(values.otp);

      toast.success("OTP verified successfully");
      setStep(3);
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    try {
      const values = await form.validateFields();

      // 🧾 Create FormData
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp);
      formData.append("new_password", values.newPassword);

      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      await setPassword(formData).unwrap();

      toast.success("Password reset successful");
      setIsPasswordModalVisible(false);
      setStep(1);
      form.resetFields();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  const handleCancel = () => {
    setIsPasswordModalVisible(false);
    setStep(1);
    form.resetFields();
  };

  return (
    <Modal
      title="Change Password"
      open={isPasswordModalVisible}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        {step === 1 && (
          <>
            <Form.Item
              label="Email"
              name="email"
              initialValue={localStorage.getItem("email") || ""}
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="Enter your email" disabled />
            </Form.Item>

            <Button
              type="primary"
              block
              onClick={handleForgotPassword}
              loading={forgotLoading}
            >
              Send Otp
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Form.Item
              label="Enter OTP"
              name="otp"
              rules={[{ required: true, message: "Please enter OTP" }]}
            >
              <Input placeholder="Enter the OTP sent to your email" />
            </Form.Item>

            <div className="flex justify-between">
              <Button onClick={() => setStep(1)}>Back</Button>
              <Button
                type="primary"
                onClick={handleVerifyOtp}
                loading={verifyLoading}
              >
                Verify OTP
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter a new password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm New Password" />
            </Form.Item>

            <div className="flex justify-between">
              <Button onClick={() => setStep(2)}>Back</Button>
              <Button
                type="primary"
                onClick={handleResetPassword}
                loading={resetLoading}
              >
                Reset Password
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default ChangePassword;
