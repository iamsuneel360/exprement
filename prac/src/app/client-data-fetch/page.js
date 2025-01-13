"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ClientSideDataFetching() {
  // const [loading, setLoading] = useState(false);
  // const [userho, setUserHo] = useState([]); // Renamed state

  // async function fetchListOfUsers() {
  //   try {
  //     setLoading(true);
  //     const apiResponse = await fetch("https://dummyjson.com/users");
  //     const result = await apiResponse.json();

  //     if (result?.users) {
  //       setUserHo(result.users); // Renamed setter
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setUserHo([]); // Renamed setter
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchListOfUsers();
  // }, []);

  const { data, error, isLoading } = useSWR(
    "https://dummyjson.com/users",
    fetcher
  );

  if (error) {
    return <div>failed to load</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-blue-500">Loading, please wait...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className=" ml-5">Client </h1>
      <section>
        <ul>
          {data && data.users?.length > 0
            ? data.users.map((user) => {
                return (
                  <li key={user?.id} className=" mt-5 ml-4 cursor-pointer">
                    {user?.firstName}
                  </li>
                );
              })
            : null}
        </ul>
      </section>
    </div>
  );
}
