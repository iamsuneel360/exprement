async function fetchUserDetails(currentUserId) {
  try {
    const apiResponse = await fetch(
      `https://dummyjson.com/users/${currentUserId}`
    );
    const result = await apiResponse.json();
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export default async function userDetails({ params }) {
  const userDetails = await fetchUserDetails((await params).details);
  return (
    <div>
      <h1>This is user details page </h1>
      <p>
        fullName: {userDetails?.firstName} {userDetails?.lastName}
      </p>
      <p>Age: {userDetails?.age}</p>
      <p>Email: {userDetails?.email}</p>
      <p>Phone: {userDetails?.phone}</p>
    </div>
  );
}
