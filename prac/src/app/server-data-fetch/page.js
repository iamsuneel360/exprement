import Link from "next/link";

async function fetchListOfUsers() {
  try {
    const apiResponse = await fetch("https://dummyjson.com/users");
    const result = await apiResponse.json();
    return result.users;
  } catch (error) {
    throw new Error(error);
  }
}

export default async function ServerDataFetching() {
  const listOfUser = await fetchListOfUsers();

  // console.log(listOfUser);

  return (
    <div>
      <h1>Server side data fetching : User List Page</h1>
      <ul>
        {listOfUser && listOfUser.length > 0
          ? listOfUser.map((user) => {
              return (
                <li className=" mt-5 cursor-pointer">
                  <Link href={`/server-data-fetch/${user.id}`}>
                    {user.firstName}
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
