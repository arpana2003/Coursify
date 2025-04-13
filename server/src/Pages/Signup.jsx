import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";

function Signup() {
  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();

    if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
      toast.error("Please fill all the details");
      return;
    }

    if (signupData.fullName.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }

    if (!isEmail(signupData.email)) {
      toast.error("Invalid format of email");
      return;
    }

    if (!isValidPassword(signupData.password)) {
      toast.error("Invalid format of password");
      return;
    }

    const formData = new FormData(); // Capital 'F'
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    try {
      const response = await dispatch(createAccount(formData));

      if (response.meta.requestStatus === 'fulfilled') {
        navigate("/");
      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>

          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img className="w-24 h-24 rounded-full m-auto" src={previewImage} alt="Preview" />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input onChange={getImage} type="file" className="hidden" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png, .svg" />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">Name</label>
            <input onChange={handleUserInput} value={signupData.fullName} type="text" required name="fullName" id="fullName" placeholder="Enter your name..." className="bg-transparent px-2 py-1 border" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input onChange={handleUserInput} value={signupData.email} type="email" required name="email" id="email" placeholder="Enter your email..." className="bg-transparent px-2 py-1 border" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input onChange={handleUserInput} value={signupData.password} type="password" required name="password" id="password" placeholder="Enter your password..." className="bg-transparent px-2 py-1 border" />
          </div>

          <button type="submit" className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer mt-2">
            Create Account
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="link text-accent cursor-pointer">Login</Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
