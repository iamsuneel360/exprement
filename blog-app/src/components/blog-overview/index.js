"use client";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";

const initialBlogFormData = {
  title: "",
  description: "",
};

export default function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedBlogId, setCurrentEditedBlogId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse =
        currentEditedBlogId !== null
          ? await axios.put(
              `/api/update-blog?id=${currentEditedBlogId}`,
              blogFormData
            )
          : await axios.post("/api/add-blog", blogFormData);
      if (apiResponse.data?.success) {
        setBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        setCurrentEditedBlogId(null);
        router.refresh();
      }
      console.log(apiResponse.data);
    } catch (error) {
      console.log("Blog failed to add");
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteBlogByID(getCurrentID) {
    try {
      const apiResponse = await axios.delete(
        `/api/delete-blog?id=${getCurrentID}`
      );
      if (apiResponse.data?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(getCurrentBlog) {
    setCurrentEditedBlogId(getCurrentBlog?._id);
    setBlogFormData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog?.description,
    });
    setOpenBlogDialog(true);
  }

  return (
    <div className=" min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditedBlogId={currentEditedBlogId}
        setCurrentEditedBlogId={setCurrentEditedBlogId}
      />
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList.length > 0 ? (
          blogList.map((blogItem) => (
            <Card className=" p-5" key={blogItem?._id}>
              <CardContent>
                <CardTitle className=" mb-5">{blogItem?.title}</CardTitle>
                <CardDescription>{blogItem?.description}</CardDescription>
                <div className=" mt-5 flex items-center gap-4">
                  <Button
                    onClick={() => {
                      handleEdit(blogItem);
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteBlogByID(blogItem._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label>No blog found please add blog </Label>
        )}
      </div>
    </div>
  );
}
