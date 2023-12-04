import CustomToast from "@/components/01Utils/CustomToast";
import MyInput from "@/components/01Utils/Formik";
import { useGetLoggedInUserQuery, useSetupProfileMutation } from "@/store/APIs/userApi";
import { Form, Formik } from "formik";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingUICart from "../01Utils/LoadingUICart";

const ProfileSettings = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState({});
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [setupProfile, { isLoading: isProfileSetupLoading }] = useSetupProfileMutation();
  const { currentData: loggedInUserData, isLoading: isLoggedInUserDataLoading } =
    useGetLoggedInUserQuery();

  const submitProfileForm = async (values) => {
    const { first_name, last_name, phone_number } = values;

    if (!loggedInUserData?.data?.first_name && !first_name) {
      return toast.warning("First name field is required!");
    }
    if (!loggedInUserData?.data?.last_name && !last_name) {
      return toast.warning("Last name field is required!");
    }
    if (!loggedInUserData?.data?.phone_number && !phone_number) {
      return toast.warning("Phone number field is required!");
    }
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("phone_number", phone_number);
    formData.append("profile_picture", profilePicture);

    const body = formData;
    const result = await setupProfile(body);
    if (result?.error) {
      return toast.warning("Something went wrong, try again!");
    } else toast.success("Update was successful!");
  };

  useEffect(() => {
    if (profilePicture?.name) setProfilePictureURL(URL.createObjectURL(profilePicture));
  }, [profilePicture]);

  return (
    <>
      {isLoggedInUserDataLoading ? (
        <LoadingUICart />
      ) : (
        <div className="flex flex-col w-full gap-y-6">
          <div>
            <label className="label_style">Add Profile Image</label>
            <div className="relative h-40 w-40 rounded-xl flex">
              {/* Image Tag */}
              {(loggedInUserData?.data?.profile_picture || profilePictureURL) && (
                <Image
                  src={profilePictureURL || loggedInUserData?.data?.profile_picture}
                  alt="store-logo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              )}
              {/* Input tag */}
              <div className="w-full h-full rounded-full bg-black opacity-50"></div>
              <div className="absolute inset-0 flex text-secondary-50 m-auto space-x-5 ">
                {/* Background Color Tag */}
                <div className="flex absolute inset-0 m-auto gap-x-8 flex-row justify-between px-5 h-fit w-fit">
                  {/* camera and cancel button */}
                  <div className="relative h-10  w-10 text-4xl place-content-center rounded-xl ">
                    <input
                      type="file"
                      className="h-10 w-10 absolute rounded-full opacity-0"
                      title=""
                      onChange={(e) => {
                        setProfilePicture(e.target.files[0]);
                      }}
                    />
                    <AiOutlineCamera />
                  </div>
                  <div
                    onClick={() => {
                      setProfilePictureURL("");
                      setProfilePicture({});
                    }}
                    className="relative cursor-pointer  flex transform -top-2 rotate-45 text-5xl h-fit w-fit rounded-full"
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Formik
            initialValues={{
              first_name: loggedInUserData?.data?.first_name || "",
              last_name: loggedInUserData?.data?.last_name || "",
              phone_number: loggedInUserData?.data?.phone_number || "",
            }}
            onSubmit={submitProfileForm}
          >
            {() => (
              <Form className="grid md:grid-cols-2 gap-x-3 gap-y-0 w-full mx-auto">
                <div className="flex flex-col">
                  <MyInput name="first_name" label="First Name" className="input_style" />
                </div>
                <div className="flex flex-col">
                  <MyInput name="last_name" label="Last Name" className="input_style" />
                </div>
                <div className="flex flex-col">
                  <MyInput name="phone_number" label="Phone Number" className="input_style" />
                </div>

                <div className="flex flex-col mb-3">
                  <label className="label_style truncate">Email</label>
                  <div className="flex justify-between border-primary-200 h-10 items-center border-2 rounded-md pl-3 pr-1 py-2">
                    <p className="font-semibold  text-primary-400 inset-0 my-auto">
                      {loggedInUserData?.data?.email}
                    </p>
                    <button className="text-xs bg px-3 py-2 rounded-md underline text-gray-600">
                      Change Email
                    </button>
                  </div>
                </div>

                <div className="flex flex-col mb-3">
                  <label className="label_style">Password</label>
                  <div className="flex justify-between border-primary-200 h-10 items-center border-2 rounded-md pl-3 pr-1 py-2">
                    <p className="text-primary-400 font-bold text-2xl inset-0 my-auto">
                      ********
                    </p>
                    <button className="text-xs bg px-3 py-2 rounded-md underline text-gray-600">
                      Change Password
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 w-full justify-between flex mt-4">
                  <button
                    onClick={() => router.back()}
                    className="border-purple-400 border-2 h-10 px-3 py-2 text-primary-400  font-semibold rounded-md shadow"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-600 text-center px-3 py-2 w-[58px] items-center text-secondary-50 h-10 font-semibold rounded-md shadow"
                  >
                    {isProfileSetupLoading ? (
                      <div className="border-2 rounded-full h-6 flex mx-auto w-6 border-b-0 animate-spin  "></div>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <CustomToast />
        </div>
      )}
    </>
  );
};

export default ProfileSettings;
