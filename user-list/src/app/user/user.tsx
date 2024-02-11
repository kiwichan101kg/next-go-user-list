"use client";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { UserForm } from "../composents/userForm";
import { UserList } from "../composents/userList";
import { User } from "../types";
import { useDeleteUsers, useGetUsers, usePostUsers } from "@/hooks/users";
import { useQueryClient } from "@tanstack/react-query";

export type FormValues = {
  name: string;
  department: string;
  email: string;
  phone: string;
};

export const UserScreen = () => {
  const methods = useForm();
  const { data: users } = useGetUsers();
  const { mutate: postMutate } = usePostUsers();
  const { mutate: deleteMutate } = useDeleteUsers();
  const queryClient = useQueryClient();
  const _onSubmit: SubmitHandler<FormValues> = async (formValue) => {
    postMutate(formValue, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getUsers"],
        });
      },
    });
  };

  const handleDelete = async (ID: number) => {
    deleteMutate(ID, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["getUsers"],
        });
      },
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <UserForm onSubmit={_onSubmit} />
        <UserList users={users || []} handleDelete={handleDelete} />
      </FormProvider>
    </>
  );
};
