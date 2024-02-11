"use client";

import { User } from "@/app/types";
import { FormValues } from "@/app/user/user";
import { useMutation, useQuery } from "@tanstack/react-query";

// ユーザー情報取得
export const useGetUsers = () => {
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["getUsers"], // 配列
    queryFn: fetchUsers, // データ取得の関数
  });

  return { data };
};
const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:8080/user", {
    method: "GET",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.users;
};

// ユーザー情報登録
export const usePostUsers = () => {
  const mutation = useMutation<User & { message: string }, Error, FormValues>({
    mutationKey: ["postUsers"], // 配列
    mutationFn: (arg) => postUsers(arg), // データ取得の関数
  });
  return mutation;
};
const postUsers = async (
  formValue: FormValues
): Promise<User & { message: string }> => {
  const res = await fetch("http://localhost:8080/user", {
    method: "POST",
    cache: "force-cache",
    body: JSON.stringify(formValue),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.user;
};

// ユーザー情報削除
export const useDeleteUsers = () => {
  const mutation = useMutation<User & { message: string }, Error, number>({
    mutationKey: ["deleteUsers"], // 配列
    mutationFn: (arg) => deleteUsers(arg), // データ取得の関数
  });
  return mutation;
};
const deleteUsers = async (ID: number): Promise<User & { message: string }> => {
  const res = await fetch(`http://localhost:8080/user/${ID}`, {
    method: "DELETE",
    cache: "force-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.user;
};
