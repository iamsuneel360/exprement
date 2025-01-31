import { connect } from "@/database/dbconnection";
import Blog from "@/models/blogModel";
import Joi from "joi";
import { BaseNextResponse } from "next/dist/server/base-http";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const getCurrentBlogID = searchParams.get("id");

    if (!getCurrentBlogID) {
      return NextResponse.json({
        message: "Blog id is required",
        success: false,
      });
    }

    const { title, description } = await request.json();
    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        message: error.details[0].message,
        success: false,
      });
    }

    const updateBlogByBlogID = await Blog.findOneAndUpdate(
      { _id: getCurrentBlogID },
      { title, description },
      { new: true }
    );

    if (updateBlogByBlogID) {
      return NextResponse.json({
        success: true,
        message: "Blog is updated successfully",
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Something went wrong while updating ! Please try again",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Something went wrong while updating ! Please try again",
    });
  }
}
