"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  // console.log(router);

  const handleClick = (name) => {
    router.push(name);
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen  ">
      <h1>Welcome to nextjs</h1>
      <Link href={"/products"}>Products</Link>
      <Link href="/account">Accounts</Link>

      <div>Navigation </div>
      <button onClick={() => handleClick("/account")}>
        Navigate to account page
      </button>
      <button onClick={() => handleClick("/products")}>
        Navigate to Product page
      </button>
    </div>
  );
}
