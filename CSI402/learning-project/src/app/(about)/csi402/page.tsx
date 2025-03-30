"use client";
import React, { useState, useEffect } from "react";
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

// เปลี่ยนการกำหนด state
export default function Page() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก API
  const fetchUserData = async (
    index: number,
    isNext: boolean | null = null
  ) => {
    try {
      setLoading(true);

      const requestBody = isNext !== null ? { index, isNext } : { index };

      console.log("Sending request:", requestBody);

      const response = await fetch(
        "http://localhost:10500/registration/getAccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        setCurrentUser(data.data.user);
        setCurrentIndex(data.data.currentIndex);
        setTotalUsers(data.data.totalUsers);
        setIsFirst(data.data.isFirst);
        setIsLast(data.data.isLast);
      } else {
        setError(data.message || "เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    } catch (err) {
      console.error("Error details:", err);
      setError(
        `ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้: ${(err as Error).message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // ดึงข้อมูลผู้ใช้คนแรกเมื่อโหลดหน้าเว็บ
  useEffect(() => {
    fetchUserData(0);
  }, []);

  // ฟังก์ชันสำหรับเลื่อนไปคนถัดไป
  const nextUser = () => {
    if (!isLast && !loading) {
      fetchUserData(currentIndex, true);
    }
  };

  // ฟังก์ชันสำหรับเลื่อนไปคนก่อนหน้า
  const prevUser = () => {
    if (!isFirst && !loading) {
      fetchUserData(currentIndex, false);
    }
  };

  // ฟังก์ชันสำหรับเลื่อนไปยังผู้ใช้ที่ระบุโดยตรง
  const goToUser = (index: number) => {
    if (!loading) {
      fetchUserData(index);
    }
  };

  // สร้างปุ่มเลขหน้าตามจำนวนผู้ใช้
  const renderPageButtons = () => {
    return Array.from({ length: totalUsers }, (_, i) => (
      <button
        key={i}
        onClick={() => goToUser(i)}
        disabled={loading}
        className={`w-8  flex items-center justify-center ${
          currentIndex === i
            ? "bg-blue-500 text-white"
            : loading
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        {i + 1}
      </button>
    ));
  };

  // แสดง loading หรือ error
  if (loading && !currentUser) {
    return (
      <div className="m-20 w-full h-full rounded-md flex flex-col items-center justify-center gap-6 bg-white shadow-lg p-6">
        <div className="text-xl">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (error && !currentUser) {
    return (
      <div className="m-20 w-full h-full rounded-md flex flex-col items-center justify-center gap-6 bg-white shadow-lg p-6">
        <div className="text-xl text-red-500">ข้อผิดพลาด: {error}</div>
        <button
          onClick={() => fetchUserData(0)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <>
      <div className=" w-screen h-full rounded-md flex flex-col items-center justify-start gap-6 bg-white shadow-lg p-6">
        <div className="text-2xl font-extrabold text-blue-600 mb-4">
          Account Detail
        </div>

        {/* แสดงข้อมูลผู้ใช้ */}
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              User Profile
            </h2>
            <span className="text-sm text-gray-500">
              {currentIndex + 1} of {totalUsers}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="text-gray-500">กำลังโหลดข้อมูล...</div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-medium text-black font-bold">
                  {currentUser?.firstName} {currentUser?.lastName}
                </h3>
                <p className="text-gray-500 text-sm">ID: {currentUser._id}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 mb-1">Username</p>
                  <p className="font-medium text-black">
                    {currentUser.username}
                  </p>
                </div>

                <div className="border-b pb-3">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium text-black">{currentUser.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={prevUser}
              disabled={isFirst || loading}
              className={`px-4 py-2 rounded-l-md transition-colors ${
                isFirst || loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Previous
            </button>

            <div className="flex border-t border-b">{renderPageButtons()}</div>

            <button
              onClick={nextUser}
              disabled={isLast || loading}
              className={`px-4 py-2 rounded-r-md transition-colors ${
                isLast || loading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
