"use client";

import React, { useState } from "react";
import AlertBox from "./components/alert/signUpAlert";
import TextInput from "./components/input";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [alert, setAlert] = useState(false);
  const [value, setValue] = useState<{
    firstName: string;
    lastName: string;
  }>({
    firstName: "",
    lastName: "",
  });
  const [alertValue, setAlertValue] = useState<{
    status: string;
    title: string;
    message: string;
  }>({
    status: "",
    title: "",
    message: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({ ...prev, [name]: inputValue }));
  };

  const SignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.firstName === "" || value.lastName === "") {
      setAlertValue({
        status: "error",
        title: "Error",
        message: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      setAlert(true);
    } else {
      setAlertValue({
        status: "success",
        title: "Success",
        message: "Sign up successfully!",
      });
      setAlert(true);
      router.push("/csi402");
    }
  };

  return (
    <>
      <div className="w-[50dvh] absolute top-20">
        <AlertBox
          status={alertValue.status}
          title={alertValue.title}
          message={alertValue.message}
          confirm={() => setAlert(false)}
          show={alert}
        />
      </div>
      <div className="w-[25dvw] h-auto my-auto px-10 py-6 bg-white rounded-lg shadow-xl flex flex-col justify-center items-center gap-6">
        <div className="text-3xl font-bold text-black border-b-2 w-full pb-2 mb-5 text-center">
          ลงทะเบียน
        </div>
        <form className="w-full" onSubmit={SignUp}>
          <TextInput label="ชื่อ" id="firstName" onChange={handleChange} />
          <TextInput label="นามสกุล" id="lastName" onChange={handleChange} />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ลงทะเบียน
          </button>
        </form>
      </div>
    </>
  );
}
