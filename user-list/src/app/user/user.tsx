"use client";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { UserForm } from "../composents/userForm";
import { UserList } from "../composents/userList";
import { User } from "../types";

export type FormValues = {
  name: string;
  department: string;
  email: string;
  phone: string;
};

type UserProps = {
  users: User[];
};

export const UserScreen = ({ users }: UserProps) => {
  const methods = useForm();
  const _onSubmit: SubmitHandler<FormValues> = async (formValue) => {
    console.log("フォーム送信中...", formValue);
    const res = await postUsers(formValue);
  };

  const handleDelete = async (ID: number) => {
    const res = await deleteUsers(ID);
  };

  return (
    <>
      <FormProvider {...methods}>
        <UserForm onSubmit={_onSubmit} />
        <UserList users={users} handleDelete={handleDelete} />
      </FormProvider>
    </>
  );
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
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  console.log("ユーザー情報登録", data);
  return data.user;
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
  console.log("ユーザー情報削除", data);
  return data.user;
};
