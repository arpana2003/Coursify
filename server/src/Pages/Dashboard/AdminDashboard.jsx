import React, { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector(
    (state) => state.stat);
  const { allPayments,finalMonths, monthlySalesRecord } = useSelector(
    (state) => state.razorpay);
  

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    fontColor: "white",
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white" ,
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["rgb(255, 99, 132)"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };
console.log("HELLO");

const myCourses = useSelector((state) => state?.course?.courseData);
  console.log("CPURSEDATA", myCourses);
  

  const onCourseDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllCourses());
        console.log("Above stats");
        
        await dispatch(getStatsData());
        console.log("Loading stats sss");
        
        await dispatch(getPaymentRecord());
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-5 m-auto mx-10">
{/* left side  */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                </div>
                <FaUsers className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                </div>
                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
{/* right side  */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="h-80 relative w-full">
              <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscriptions Count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between py-5 px-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>

            </div>
          </div>
        </div>

{/* bottom data  */}
        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-3xl font-semibold">
              Courses Overview
            </h1>

            <button
              onClick={() => {
                 navigate("/course/create" //, {
                //   state: {
                //     initialCourseData: {
                //       newCourse: true,
                //       title: "",
                //       category: "",
                //       createdBy: "",
                //       description: "",
                //       thumbnail: undefined,
                //       previewImage: "",
                //     },
                //   },
                //}
              );
              }}
              className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
            >
              Create New Course
            </button>
          </div>

          <table className="table overflow-x-scroll">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Course Title</th>
                <th>Course Category</th>
                <th>Instructor</th>
                <th>Total Lectures</th>
                <th>Course Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* {myCourses? console.log("true"): console.log(false)
              } */}
              {myCourses?.map((course, idx) =>{
                return (
                  <tr key={course?._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <textarea
                      readOnly
                      className="w-40 h-auto bg-transparent resize-none"
                      value={course?.title} />
                  </td>
                  <td>{course?.category}</td>
                  <td>{course?.createdBy}</td>
                  <td>{course?.numberOfLectures}</td>
                  <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                    <textarea
                      readOnly
                      className="w-80 h-auto bg-transparent resize-none"
                      value={course?.description}
                    ></textarea>
                  </td>

                  <td className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        navigate("/course/create", {
                          state: {
                            initialCourseData: {
                              newCourse: false,
                              ...course,
                            },
                          },
                        })
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                    >
                      <MdOutlineModeEdit />
                    </button>

                    <button
                      onClick={() => onCourseDelete(course._id)}
                      className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                    >
                      <BsTrash />
                    </button>

                    <button
                      onClick={() =>
                        navigate("/course/displaylectures", {
                          state: { ...course },
                        })
                      }
                      className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                    >
                      <BsCollectionPlayFill />
                    </button>
                  </td>
                </tr>
                )
              } 
              )}
            </tbody>
            
          </table>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AdminDashboard;
