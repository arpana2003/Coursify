import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import HomePageImage from "../assets/Images/images2.png"

function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white items-center justify-center gap-10 mx-16 h-[90vh] flex">
        <div className="w-1/2 space-y-6 ">
          <h1 className="text-5xl font-semibold ">
            Find out best
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-xl text-gray-200 ">
            We have large library of courses taught by skilled and qualified
            faculties ata a very affodable price .
          </p>

          <div className="space-x-6">

            <Link to="/courses">
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Explore courses
              </button>
            </Link>

            <Link to="/contact">
              <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>

          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center">
        <img className="rounded-full" src={HomePageImage} alt="homepage image" />
        </div>

      </div>
    </HomeLayout>
  );
}

export default HomePage;
