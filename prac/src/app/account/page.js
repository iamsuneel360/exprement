import { redirect } from "next/navigation";

export default function Account() {
  const userProfileInfo = null;

  if (userProfileInfo == null) redirect("profile");

  return (
    <div>
      <h1>Account page</h1>
    </div>
  );
}
