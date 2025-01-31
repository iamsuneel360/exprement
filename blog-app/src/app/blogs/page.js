import BlogOverview from "@/components/blog-overview";
import axios from "axios";

async function fetchListOfBlogs() {
  try {
    const apiResponse = await axios.get("http://localhost:3000/api/get-blog", {
      headers: {
        "cache-control": "no-store",
      },
    });
    return apiResponse.data?.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function Blogs() {
  const blogList = await fetchListOfBlogs();
  // console.log(blogList, "blogList");
  return (
    <div>
      <BlogOverview blogList={blogList} />
    </div>
  );
}

export default Blogs;
