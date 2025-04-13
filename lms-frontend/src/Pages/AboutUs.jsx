import CarouselSlide from "../Components/CarouselSlide";
import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../assets/Images/images3.jpeg";
import celebrities from "/src/Constants/CelebrityData"

function AboutUs() {

  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-20 mx-10 ml-20">
          <section className="w-1/2 space-y-10 mb-10">
            <h1 className="text-5xl text-yelloe-500 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world . We are providing platform for the aspiring teachers and
              students to share their skills,creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>

          <div className="w-1/2 ml-10">
            <img
              id="test1"
              style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0))" }}
              className="drop-shadow-2xl"
              src={aboutMainImage}
              alt=""
            />
          </div>
        </div>

        <div className="carousel w-1/2 mx-[20%] mt-10 mb-4">
            {celebrities && celebrities.map(celebrity=> (<CarouselSlide {...celebrity} key={celebrity.slideNumber} totalSlides={celebrities.length} />) )}



          
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
