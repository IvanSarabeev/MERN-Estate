import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import Input from "components/HTML/Input";
import Button from "components/HTML/Button";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLockOpenOutline } from "react-icons/io5";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../fireStore/firebase";
import { UserUploadData } from "types/user";
import { signOutUser } from "../services/apiAuth";
import { updateUser, deleteUser } from "../services/apiUser";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layouts/Layout";

const Profile = () => {
  const { avatar } = useSelector((state: RootState) => state.user.currentUser)!;

  // const currentUser = store.getState().user.currentUser;
  const { currentUser } = useSelector((state: RootState) => state.user);
  console.log(currentUser);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [filePerc, setFilePerc] = useState<number>(0);
  const [fileError, setFileError] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserUploadData>({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [onSuccess, setOnSuccess] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  useEffect(() => {
    if (file) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshop) => {
        const progress =
          (snapshop.bytesTransferred / snapshop.totalBytes) * 100;
        // round the file
        setFilePerc(Math.round(progress));
      }),
        (error: boolean) => {
          setFileError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({
              ...formData,
              avatar: downloadURL,
            })
          );
        };
    }
  }, [file, formData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (formData) {
        updateUser(formData, dispatch, currentUser);

        setOnSuccess(true);
      }
    } catch (error) {
      throw new Error(`Error occur, cound't sign in ${error}`);
    }
  };

  const handleAccountDelete = () => {
    deleteUser(dispatch, currentUser);
  };

  const handleSignOut = () => {
    signOutUser(dispatch);
    navigation("/sign-up");
  };

  return (
    <Layout>
      <section className="padding-container">
        <h1 className="text-3xl font-semibold text-center my-7 sm:text-5xl">
          Profile
        </h1>
        <form
          action=""
          method="post"
          onSubmit={handleSubmit}
          className="gap-1 sm:gap-2 lg-gap-4 flex flex-col max-w-xl mx-auto"
        >
          <div className="flex flex-col items-center justify-center">
            <Input
              hidden
              type="file"
              ref={fileRef}
              accept="image/*"
              onChange={handleFileChange}
            />
            <img
              src={formData.avatar || avatar}
              alt="profile-avatar"
              onClick={() => fileRef.current?.click()}
              className="size-24 self-center rounded-full mb-4 aspect-auto object-cover transition-all ease-in-out hover:scale-110 hover:cursor-pointer"
            />
            <p className="text-sm self-center">
              {fileError ? (
                <span className="text-red-700">Error on image upload</span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-900">Uploading {filePerc}%</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">
                  Image successfully uploaded
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FaRegUserCircle height={16} width={16} />
              <span className="sr-only">User Icon</span>
            </span>
            <Input
              type="text"
              required
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              title="Username Input"
              placeholder="Enter your username"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <HiOutlineMail height={16} width={16} />
              <span className="sr-only">Email Icon</span>
            </span>
            <Input
              type="email"
              required
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              title="Email Input"
              placeholder="Enter your email address"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <IoLockOpenOutline height={16} width={16} />
              <span className="sr-only">Pasword Icon</span>
            </span>
            <Input
              type="password"
              required
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              title="Password Input"
              placeholder="Enter your password"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <Button
            type="submit"
            title="Update button"
            // disabled={loading}
            className="text-white rounded-lg p-2.5 uppercase mt-3 bg-slate-700 transition-all ease-in-out hover:scale-105 hover:opacity-95 disabled:opacity-80"
          >
            {/* {loading ? "Loading" : "Update"} */}
            Update
          </Button>
          <div className="flex items-center justify-between mt-5">
            <span
              onClick={handleAccountDelete}
              className="text-slate-900 cursor-pointer"
            >
              Delete Account
            </span>
            <Button
              title="SignOut"
              type="button"
              onClick={handleSignOut}
              className="text-red-700 cursor-pointer"
            >
              Logout
            </Button>
          </div>
        </form>
        <p className="text-green-700 text-2xl text-center mt-5 mx-auto">
          {onSuccess ? "User updated successfully" : ""}
        </p>
      </section>
    </Layout>
  );
};

export default Profile;
