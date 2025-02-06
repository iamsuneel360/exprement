"use server";

import { connect } from "@/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

//////////// yo app ko theory ko client page and server page ko sikna ko lagi ho ////////////////
// import axios from "axios";

// export async function fetchListOfProducts() {
//   const response = await axios.get("https://dummyjson.com/products");
//   return response.data.products;
// }
////////////////////////////////////////////////////////////////////////////////////////////////

// Add new user action
export async function addNewUserAction(formData, pathToRevalidate) {
  await connect();

  try {
    const newlyCreatedUser = await User.create(formData);
    if (newlyCreatedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User created successfully",
      };
    } else {
      return {
        success: false,
        message: "Some error while adding user ! Please try again ",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error in add new user action ! Please try again ",
    };
  }
}

// Fetch users actions

export async function fetchUserAction() {
  await connect();
  try {
    const listOfUser = await User.find({});
    if (listOfUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(listOfUser)),
      };
    } else {
      return {
        status: false,
        message: "Error while fetch list user ! Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error in fetch user action ! Please try again",
    };
  }
}

// Edit a user action
export async function editUserAction(
  currentUserId,
  formData,
  pathToRevalidate
) {
  await connect();

  try {
    const { firstName, lastName, email, address } = formData;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: currentUserId,
      },
      { firstName, lastName, email, address },
      { new: true }
    );
    if (updatedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User updated successfully",
      };
    } else {
      return {
        status: false,
        message: "Something went wrong in Updated action ! Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Something went wrong in delete action ! Please try again",
    };
  }
}

// Delete a user action
export async function deleteUserAction(currentUserId, pathToRevalidate) {
  await connect();
  try {
    const deleteUser = await User.findByIdAndDelete(currentUserId);
    if (deleteUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "Deleted user successfully",
      };
    } else {
      return {
        status: false,
        message: "Not able to perform delete operation ! Please try again",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Something went wrong in delete action ! Please try again",
    };
  }
}
