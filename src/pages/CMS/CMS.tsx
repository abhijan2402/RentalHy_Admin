import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Spin, Tabs } from "antd";
import { useGetCmsQuery, useEditCmsMutation } from "../../redux/api/cmsApi.js";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const CMSEditor = () => {
  const [selectedTab, setSelectedTab] = useState("terms-conditions");
  const [serverContent, setServerContent] = useState(""); // always store latest API content

  const {
    data: cmsData,
    isLoading,
    refetch,
  } = useGetCmsQuery({ page: selectedTab });

  const [editCms, { isLoading: isSaving }] = useEditCmsMutation();

  const editor = useEditor({
    extensions: [StarterKit],
    content: "", // start empty, we'll set content after API load
  });

  // When cmsData changes, update state + editor
  useEffect(() => {
    if (cmsData?.data?.content !== undefined && editor) {
      setServerContent(cmsData.data.content); // keep API content
      editor.commands.setContent(cmsData.data.content);
    }
  }, [cmsData, editor]);

  // Handle tab change
  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  // Save content
  const handleSave = async () => {
    if (!editor) return;
    const htmlContent = editor.getHTML();

    const formdata = new FormData();
    formdata.append("content", htmlContent);

    try {
      await editCms({ page: selectedTab, formdata }).unwrap();
      toast.success(`Content for ${selectedTab} saved successfully!`);
      refetch();
    } catch {
      toast.error("Failed to save content.");
      if (editor) {
        editor.commands.setContent(serverContent);
      }
    }
  };

  const isWaiting = isLoading || !editor;

  return (
    <>
      <Tabs
        activeKey={selectedTab}
        onChange={handleTabChange}
        size="large"
        className="mb-4"
      >
        <TabPane tab="Terms & Conditions" key="terms-conditions" />
        <TabPane tab="Privacy" key="privacy-policy" />
      </Tabs>

      <div className="border rounded shadow-md bg-white min-h-[300px]">
        {isWaiting ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              marginBottom: "10px",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <EditorContent
            editor={editor}
            className="p-6 min-h-[300px] w-full prose prose-sm sm:prose lg:prose-lg dark:prose-invert dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900"
          />
        )}
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-[#FE4C8A] transition-colors text-sm"
        style={{ width: "14%" }}
        disabled={!editor || isSaving || isWaiting}
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </>
  );
};

export default CMSEditor;
