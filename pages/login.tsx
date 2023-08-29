import axios from "axios";
import { ToggleSwitch } from "flowbite-react";
import React, { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";

export async function getServerSideProps(ctx: any) {
  const cookies = nookies.get(ctx);

  if (cookies.token && cookies.user)
    return {
      redirect: {
        destination: "/",
      },
    };

  return { props: {} };
}

const login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [field, setField] = useState<any>({});

  const setValue = (e: any) => {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(field);
  }, [field]);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
  };
  const router = useRouter();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/v1/users/login", {
        ...field,
      });
      console.log(data);
      nookies.set(null, "token", data.token);
      nookies.set(null, "user", data);
      router.push("/");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <div className="bg-neutral-700">
      <div className="container mx-auto flex items-center justify-center min-h-screen">
        <div className="bg-gray-200 rounded-xl w-[1080px] h-[400px] mb-64 flex">
          <div className="flex-col w-1/2">
            <h1 className="text-4xl font-black text-center mt-8">Login</h1>
          </div>
          <div className="flex justify-end">
            <div className="bg-gray-100 rounded-xl rounded-s-none w-[640px] h-[400px]">
              <form
                className="container w-[340px] h-full mx-auto flex-col"
                onSubmit={submitHandler}
              >
                <p className="mt-12 border-b-2 border-b-neutral-800">
                  <span className="inline-block me-2">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_4_49)">
                        <path
                          d="M6.07148 6.67858C7.74806 6.67858 9.1072 5.31944 9.1072 3.64286C9.1072 1.96629 7.74806 0.607147 6.07148 0.607147C4.3949 0.607147 3.03577 1.96629 3.03577 3.64286C3.03577 5.31944 4.3949 6.67858 6.07148 6.67858Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.67861 15.1786H0.607178V14.5203C0.616845 13.5946 0.860936 12.6867 1.31665 11.8811C1.77237 11.0755 2.42484 10.3985 3.21312 9.91339C4.00141 9.42829 4.89979 9.15091 5.82433 9.10713C5.90676 9.10324 5.98916 9.1012 6.07146 9.10101C6.15377 9.1012 6.23618 9.10324 6.31861 9.10713C6.64549 9.1226 6.96911 9.16729 7.28575 9.24002"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.7857 10.9286H9.71432C9.37901 10.9286 9.10718 11.2004 9.10718 11.5357V15.7857C9.10718 16.121 9.37901 16.3928 9.71432 16.3928H15.7857C16.121 16.3928 16.3929 16.121 16.3929 15.7857V11.5357C16.3929 11.2004 16.121 10.9286 15.7857 10.9286Z"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.3214 10.9286V9.71428C10.3214 9.07018 10.5773 8.45246 11.0327 7.99702C11.4882 7.54157 12.1059 7.28571 12.75 7.28571C13.394 7.28571 14.0117 7.54157 14.4672 7.99702C14.9227 8.45246 15.1786 9.07018 15.1786 9.71428V10.9286"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4_49">
                          <rect width="17" height="17" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Akun Pengguna
                </p>
                <label htmlFor="nis" className="relative">
                  <input
                    type="text"
                    name="nis"
                    id="nis"
                    placeholder="No Induk Siswa"
                    onChange={setValue}
                    className="w-full h-10 rounded-md border-[1px] border-neutral-800 mt-6 px-2 bg-transparent"
                  />
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-[305px]"
                  >
                    <path
                      d="M18.1125 6.70834C18.9793 8.14697 19.3496 9.83043 19.1667 11.5V12.4583C19.1655 13.4673 19.4299 14.4589 19.9333 15.3333M7.66663 10.5417C7.66663 9.52501 8.0705 8.54999 8.78939 7.8311C9.50828 7.11221 10.4833 6.70834 11.5 6.70834C12.5166 6.70834 13.4916 7.11221 14.2105 7.8311C14.9294 8.54999 15.3333 9.52501 15.3333 10.5417V11.5C15.3333 13.5736 16.0058 15.5912 17.25 17.25M11.5 10.5417V12.4583C11.4969 15.1986 12.333 17.8741 13.8958 20.125M7.66663 14.375C7.90114 16.3778 8.48498 18.3239 9.39163 20.125M4.69579 18.2083C4.04916 16.0332 3.75791 13.768 3.83329 11.5V10.5417C3.82962 9.19412 4.18119 7.8694 4.85258 6.70101C5.52397 5.53261 6.49146 4.56182 7.65756 3.88646C8.82366 3.21109 10.1472 2.85501 11.4947 2.8541C12.8423 2.85318 14.1663 3.20747 15.3333 3.88125"
                      stroke="#354052"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
                <label htmlFor="password" className="relative">
                  <input
                    type={isChecked ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={setValue}
                    className="w-full h-10 rounded-md border-[1px] border-neutral-800 mt-8 px-2 bg-transparent"
                  />
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-[305px]"
                  >
                    <path
                      d="M9.58333 11.5C9.58333 12.0083 9.78527 12.4958 10.1447 12.8553C10.5042 13.2147 10.9917 13.4167 11.5 13.4167C12.0083 13.4167 12.4958 13.2147 12.8553 12.8553C13.2147 12.4958 13.4167 12.0083 13.4167 11.5C13.4167 10.9917 13.2147 10.5042 12.8553 10.1447C12.4958 9.78527 12.0083 9.58333 11.5 9.58333C10.9917 9.58333 10.5042 9.78527 10.1447 10.1447C9.78527 10.5042 9.58333 10.9917 9.58333 11.5Z"
                      stroke="#354052"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.125 11.5C17.825 15.3333 14.95 17.25 11.5 17.25C8.05 17.25 5.175 15.3333 2.875 11.5C5.175 7.66667 8.05 5.75 11.5 5.75C14.95 5.75 17.825 7.66667 20.125 11.5Z"
                      stroke="#354052"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
                <ToggleSwitch
                  label="show password"
                  onChange={handleToggle}
                  checked={isChecked}
                  className="mt-2"
                />
                <button
                  className="bg-neutral-700 w-full h-10 text-white rounded-md mt-12 hover:bg-transparent hover:text-black hover:border-[1px] hover:border-neutral-700"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
