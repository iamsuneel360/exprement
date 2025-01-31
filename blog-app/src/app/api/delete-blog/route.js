import { connect } from "@/database/dbconnection";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const getCurrentBlogID = searchParams.get("id");
    // console.log(getCurrentBlogID);

    if (!getCurrentBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog id is required",
      });
    }

    const deleteCurrentBlogByID = await Blog.findByIdAndDelete(
      getCurrentBlogID
    );
    if (deleteCurrentBlogByID) {
      return NextResponse.json({
        success: true,
        message: "Blog is deleted successfully",
      });
    }
    return NextResponse.json({
      success: false,
      message: "Something went wrong while deleting ! please try again",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Somethign went wrong while deleting ! please try again",
    });
  }
}
