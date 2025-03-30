"use client";

import React, { useState, useEffect } from "react";
import { Table, Tag, Select, Input } from "antd";
import { useRouter } from "next/navigation";

const { Option } = Select;

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  status: string;
  registrationTime: string;
  expiryTime: string;
}

export default function Page() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const tempUsers: User[] = [
      {
        id: 1,
        firstName: "นริศรา",
        lastName: "จ่างสะเดา",
        username: "65039089",
        status: "Active",
        registrationTime: now.toLocaleTimeString(),
        expiryTime: new Date(
          now.getTime() + 30 * 60 * 1000
        ).toLocaleTimeString(),
      },
      {
        id: 2,
        firstName: "Kusunoki",
        lastName: "Muu",
        username: "muu004",
        status: "Active",
        registrationTime: now.toLocaleTimeString(),
        expiryTime: new Date(
          now.getTime() + 30 * 60 * 1000
        ).toLocaleTimeString(),
      },
      {
        id: 3,
        firstName: "Amane",
        lastName: "Kanata",
        username: "amane002",
        status: "Inactive",
        registrationTime: new Date(
          now.getTime() - 120 * 60 * 1000
        ).toLocaleTimeString(),
        expiryTime: new Date(
          now.getTime() - 90 * 60 * 1000
        ).toLocaleTimeString(),
      },
    ];
    setUsers(tempUsers);
    setFilteredUsers(tempUsers);
  }, []);

  const handleStatusFilter = (value: string | null) => {
    setStatusFilter(value);
    filterUsers(searchQuery, value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterUsers(value, statusFilter);
  };

  const filterUsers = (query: string, status: string | null) => {
    let filtered = users;

    if (status && status !== "All") {
      filtered = filtered.filter((user) => user.status === status);
    }

    if (query) {
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          user.username.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  return (
    <div className="text-black p-4">
      <div className="w-[60dvw] flex mb-5">
        <h1 className="text-2xl font-bold mb-4">รายชื่อผู้ใช้งาน</h1>
        <button
          className="ml-auto bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => router.push("/")}
        >
          ออกจากระบบ
        </button>
      </div>

      <div className="bg-white w-[60dvw] h-[90dvh] p-10 rounded-lg">
        <div className="mb-4 flex gap-4 items-center">
          <Input
            placeholder="ค้นหาชื่อผู้ใช้งาน"
            allowClear
            onChange={handleSearch}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Filter by Status"
            style={{ width: 200 }}
            onChange={handleStatusFilter}
            allowClear
          >
            <Option value="All">ทั้งหมด</Option>
            <Option value="Active">เปิดใช้งาน</Option>
            <Option value="Inactive">หมดอายุการใช้งาน</Option>
          </Select>
        </div>

        <Table
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50],
          }}
          columns={[
            {
              title: "First Name",
              dataIndex: "firstName",
              key: "firstName",
            },
            {
              title: "Last Name",
              dataIndex: "lastName",
              key: "lastName",
            },
            {
              title: "Username",
              dataIndex: "username",
              key: "username",
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              width: 100,
              render: (status: string) => (
                <Tag
                  className="w-full text-center"
                  color={status === "Active" ? "green" : "red"}
                >
                  {status === "Active" ? "เปิดใช้งาน" : "หมดอายุการใช้งาน"}
                </Tag>
              ),
            },
            {
              title: "Registration Time",
              dataIndex: "registrationTime",
              key: "registrationTime",
              width: 150,
              sorter: (a: User, b: User) =>
                new Date(`1970/01/01 ${a.registrationTime}`).getTime() -
                new Date(`1970/01/01 ${b.registrationTime}`).getTime(),
            },
            {
              title: "Expiry Time",
              dataIndex: "expiryTime",
              key: "expiryTime",
              width: 150,
              sorter: (a: User, b: User) =>
                new Date(`1970/01/01 ${a.expiryTime}`).getTime() -
                new Date(`1970/01/01 ${b.expiryTime}`).getTime(),
            },
          ]}
        />
      </div>
    </div>
  );
}
