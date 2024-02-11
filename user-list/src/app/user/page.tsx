"use server";
import React from "react";
import { UserScreen } from "./user";
import { User } from "../types";

export default async function Page() {
  const usersData: User[] = await fetchUsers();

  return <UserScreen users={usersData} />;
}

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:8080/user", {
    method: "GET",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("ユーザー情報取得", data);
  return data.users;
};
