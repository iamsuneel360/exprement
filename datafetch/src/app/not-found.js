import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link href={"/"}>Go to home page</Link>
    </div>
  );
}
