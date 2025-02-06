import { fetchUserAction } from "@/actions";
import AddNewUser from "@/components/add-new-user";
import SingleUserCard from "@/components/single-user-card";
import React from "react";

export default async function UserManagement() {
  const getListOfUser = await fetchUserAction();
  console.log(getListOfUser);

  return (
    <div className=" p-20 max-w-6xl">
      <div className=" flex justify-between">
        <h1>User Management</h1>
        <AddNewUser />
      </div>
      <div className=" mt-6 grid grid-cols-3 gap-5">
        {getListOfUser && getListOfUser.data.length > 0 ? (
          getListOfUser.data.map((userItem) => (
            <SingleUserCard key={userItem._id} user={userItem} />
          ))
        ) : (
          <h2>No users found</h2>
        )}
      </div>
    </div>
  );
}
