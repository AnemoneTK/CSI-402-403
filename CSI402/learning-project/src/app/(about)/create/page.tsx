"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    idCard: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:10500/registration/tempAccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "เกิดข้อผิดพลาดในการสร้างบัญชี");
      }

      setSuccess(true);
      // รีเซ็ตฟอร์ม
      setFormData({
        firstName: "",
        lastName: "",
        birthDate: "",
        idCard: "",
        email: "",
      });

      // ใช้ setTimeout เพื่อให้ผู้ใช้เห็นข้อความสำเร็จก่อนเปลี่ยนหน้า
      setTimeout(() => {
        router.push("/success"); // หรือหน้าที่ต้องการให้ redirect ไป
      }, 2000);
    } catch (err) {
      console.error("Error creating account:", err);
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการสร้างบัญชี"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen h-full rounded-md flex flex-col items-center justify-start gap-6 bg-white shadow-lg p-6">
        <div className="text-2xl font-extrabold text-blue-600 mb-4">
          Create Account
        </div>

        {/* แบบฟอร์มสร้างบัญชี */}
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              User Information
            </h2>
          </div>

          {success && (
            <div
              className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-sm"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="w-6 h-6 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">บันทึกข้อมูลสำเร็จ</p>
                  <p className="text-sm">
                    บัญชีของคุณถูกสร้างเรียบร้อยแล้ว กำลังนำไปยังหน้าถัดไป...
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div
              className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="w-6 h-6 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">เกิดข้อผิดพลาด</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ชื่อ <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="ชื่อ"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="นามสกุล"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  วันเกิด (วัน-เดือน-ปี) <span className="text-red-500">*</span>
                </label>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="text"
                  required
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="วว-ดด-ปปปป"
                />
                <p className="mt-1 text-xs text-gray-500">รูปแบบ: 01-01-2540</p>
              </div>

              <div>
                <label
                  htmlFor="idCard"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  เลขบัตรประชาชน <span className="text-red-500">*</span>
                </label>
                <input
                  id="idCard"
                  name="idCard"
                  type="text"
                  required
                  value={formData.idCard}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="เลขบัตรประชาชน 13 หลัก"
                  maxLength={13}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  อีเมล <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-md text-white transition-colors ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 shadow-md"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    กำลังดำเนินการ...
                  </div>
                ) : (
                  "สร้างบัญชี"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
