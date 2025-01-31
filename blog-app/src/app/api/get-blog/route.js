import { connect } from "@/database/dbconnection";
import Blog from "@/models/blogModel";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const extractAllBlogsDataFromDatabase = await Blog.find({});

    if (extractAllBlogsDataFromDatabase) {
      return NextResponse.json({
        success: true,
        data: extractAllBlogsDataFromDatabase,
        message: "blog found successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "something went wrong while get data",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong while get data",
    });
  }
}
