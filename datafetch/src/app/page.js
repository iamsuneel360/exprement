import Link from "next/link";
import "./globals.css";
export default function Home() {
  return (
    <div>
      <h1>Welcome to Recipe App</h1>
      <Link href={"/recipe-list"}>Explore to Recipe</Link>
    </div>
  );
}
