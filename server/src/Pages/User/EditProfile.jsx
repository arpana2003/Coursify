import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", () => {
        setData({
          ...data,
          previewImage: fileReader.result,
          avatar: uploadImage,
        });
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Name cannot be less than 5 characters");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);
    console.log(formData.entries().next());

    try {
      await dispatch(updateProfile([data.userId, formData]));
      await dispatch(getUserData());
        // navigate("/user/profile");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
          <label htmlFor="image_uploads" className="cursor-pointer ">
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={data.previewImage}
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg , .jpeg , .svg , .png"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-lg font-semibold">
              Full Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
              className="bg-transparent px-2 py-1 border"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer "
          >
            Update Profile
          </button>
          <Link to="/user/profile">
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full">
              {" "}
              <AiOutlineArrowLeft /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
