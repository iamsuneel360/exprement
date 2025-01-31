import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <div className=" container mx-auto flex items-center justify-center flex-col">
        <h2 className=" text-4xl font-bold text-white mb-4">
          Brows our blog collection
        </h2>
        <Link className=" bg-white text-black p-3 rounded-lg" href={"/blogs"}>
          Explore Blogs
        </Link>
      </div>
    </div>
  );
}
