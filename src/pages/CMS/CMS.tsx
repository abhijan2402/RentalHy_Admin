import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { Spin, Tabs } from "antd";
import { toast } from "react-toastify";
import { useGetCmsQuery, useEditCmsMutation } from "../../redux/api/cmsApi.js";

const { TabPane } = Tabs;

const CMSEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("terms-conditions");
  const [serverContent, setServerContent] = useState("");

  const {
    data: cmsData,
    isLoading,
    refetch,
  } = useGetCmsQuery({ page: selectedTab });

  const [editCms, { isLoading: isSaving }] = useEditCmsMutation();

  // Load CMS content when API data changes
  useEffect(() => {
    if (cmsData?.data?.content !== undefined) {
      setContent(cmsData.data.content);
      setServerContent(cmsData.data.content);
    }
  }, [cmsData]);

  // Handle tab change
  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  // Save edited content
  const handleSave = async () => {
    const formdata = new FormData();
    formdata.append("content", content);

    try {
      await editCms({ page: selectedTab, formdata }).unwrap();
      toast.success(`Content for ${selectedTab} saved successfully!`);
      refetch();
    } catch (err) {
      toast.error("Failed to save content.");
      setContent(serverContent);
    }
  };

  const isWaiting = isLoading;

  // Jodit editor config
  const config = {
    readonly: false,
    height: 400,
    toolbarSticky: false,
    uploader: { insertImageAsBase64URI: true },
    removeButtons: ["about"],
    placeholder: "Start editing content here...",
  };

  return (
    <>
      {/* Tabs */}
      <Tabs
        activeKey={selectedTab}
        onChange={handleTabChange}
        size="large"
        className="mb-4"
      >
        <TabPane tab="Terms & Conditions" key="terms-conditions" />
        <TabPane tab="Privacy Policy" key="privacy-policy" />
        <TabPane tab="About" key="about" />
      </Tabs>

      {/* Editor */}
      <div className="border rounded shadow-md bg-white min-h-[300px] p-4">
        {isWaiting ? (
          <div className="flex justify-center items-center h-[300px]">
            <Spin size="large" />
          </div>
        ) : (
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)} // update on blur
          />
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-[#FE4C8A] transition-colors text-sm"
        style={{ width: "14%" }}
        disabled={isSaving || isWaiting}
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </>
  );
};

export default CMSEditor;
