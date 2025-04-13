import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLectures,
  getCourseLecture,
} from "../../Redux/Slices/LectureSlice";

function Displaylectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  // Correctly initialize the currentVideoIndex state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (!state) {
      navigate("/courses");
    }
    dispatch(getCourseLecture(state._id));
  }, [dispatch, navigate, state]);

  const onLectureDelete = async (courseId, lectureId) => {
    try {
      await dispatch(deleteCourseLectures({ courseId, lectureId }));
      await dispatch(getCourseLecture(courseId));
    } catch (error) {
      console.error("Error deleting lecture:", error);
    }
  };
  

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 item-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title}
        </div>

        {lectures && lectures.length > 0 ? (
  <div className="flex justify-center gap-10 w-full">
    {/* Left section for playing video and displaying course detail */}
    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
      <video
        className="object-fill rounded-tl-lg rounded-tr-lg w-full"
        src={lectures[currentVideoIndex]?.lecture?.secure_url}
        controls
        disablePictureInPicture
        muted
        controlsList="nodownload"
      />
      <div>
        <h1>
          <span className="text-yellow-500 line-clamp-4">Title: </span>
          {lectures[currentVideoIndex]?.title}
        </h1>
        <p>
          <span className="text-yellow-500">Description: </span>
          {lectures[currentVideoIndex]?.description}
        </p>
      </div>
    </div>
    {/* Right section for displaying list of lectures */}
    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
      <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
        <p>Lectures list</p>
        {role === "ADMIN" && (
          <button
            onClick={() =>
              navigate("/course/addlecture", { state: { ...state } })
            }
            className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm"
          >
            Add new lectures
          </button>
        )}
      </li>
      {lectures.map((lecture, idx) => (
        <li className="space-y-2" key={lecture._id}>
          <p
            className="cursor-pointer hover:text-red-500"
            onClick={() => setCurrentVideoIndex(idx)}
          >
            <span> Lecture {idx + 1}: </span>
          </p>
          {role === "ADMIN" && (
            <button
              onClick={() => onLectureDelete(state?._id, lecture?._id)}
              className="btn btn-accent px-2 rounded-md font-semibold text-sm"
            >
              Delete Lecture
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
) : (
  role === "ADMIN" && (
    <button
      onClick={() =>
        navigate("/course/addlecture", { state: { ...state } })
      }
      className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm"
    >
      Add new lectures
    </button>
  )
)}

      </div>
    </HomeLayout>
  );
}

export default Displaylectures;
