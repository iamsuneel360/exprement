import { connect } from "@/database/dbconnection";
import Blog from "@/models/blogModel";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(request) {
  try {
    await connect();

    const extractBlogData = await request.json();
    const { title, description } = extractBlogData;

    const { error } = AddNewBlog.validate({
      title,
      description, 
    });

    if (error) {
      return NextResponse.json({
        message: error.details[0].message,
        success: false,
      });
    }
    // console.log(extractBlogData);
    const newlyCreatedBlogItem = await Blog.create(extractBlogData);

    if (newlyCreatedBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog added successfully",
        newlyCreatedBlogItem,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Blog is not added ! please try again",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong in add-blog ! please try again",
    });
  }
}
