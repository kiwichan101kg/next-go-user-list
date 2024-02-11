import React from "react";
import { User } from "../types";

type UserListProps = {
  users: User[];
  handleDelete: (ID: number) => Promise<void>;
};
export const UserList = ({ users, handleDelete }: UserListProps) => {
  return (
    <div className="mt-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">ユーザー一覧</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">名前</th>
              <th className="py-3 px-6 text-left">部署</th>
              <th className="py-3 px-6 text-center">メールアドレス</th>
              <th className="py-3 px-6 text-center">電話番号</th>
              <th className="py-3 px-6 text-center">操作</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user) => (
              <tr
                key={user.ID}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {user.name}
                </td>
                <td className="py-3 px-6 text-left">{user.department}</td>
                <td className="py-3 px-6 text-center">{user.email}</td>
                <td className="py-3 px-6 text-center">{user.phone}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => {
                      handleDelete(user.ID);
                    }}
                    className="text-white bg-red-500 hover:bg-red-700 font-medium py-2 px-4 rounded-full"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
