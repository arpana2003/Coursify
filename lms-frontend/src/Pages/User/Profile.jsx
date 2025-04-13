import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

function Profile() {
    //useSelector is a hook from React Redux that allows you to extract data from the Redux store state.
    const userData = useSelector((state) => state?.auth?.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleCancellation(){
        toast("Initiating Cancellation");
        console.log("Heelo 1");
        
        await dispatch(cancelCourseBundle());
        console.log("Heelo 2");
        await dispatch(getUserData());
        console.log("Heelo 3");
        toast.success("Cancellation completed! ");
        navigate("/");
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh]">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <img src={userData?.avatar?.secure_url} alt="" className="w-40 m-auto rounded-full border border-black"/>
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2">
                        <p>Email :</p><p>{userData?.email}</p>
                        <p>Role :</p><p>{userData?.role}</p>
                        <p>Subscription :</p><p>{userData?.subscription?.status==="active"? "Active" : "Inactive"}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Link to="/changepassword" className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                        <button>Change Password</button>
                        </Link>
                        <Link to="/user/editprofile" className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                        <button>Edit profile</button>
                        </Link>
                    </div>
                    {userData?.subscription?.status === "active" && (
                        <button onClick={handleCancellation} className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">Cancel Subscription</button>
                    )}
                </div>

            </div>

        </HomeLayout>
    )
}

export default Profile;