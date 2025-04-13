import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const currentDate = new Date();
const year = currentDate.getFullYear();

function Footer() {
  return (
    <footer className="relative left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 py-5 sm:px-20">
      <section className="text-lg">
        Copyright {year} | All rights reserved
      </section>
      <section className="flex items-center justify-center gap-5 text-2xl text-white">
        <a
          href="https://facebook.com"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsFacebook />
        </a>
        <a
          href="https://instagram.com"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsInstagram />
        </a>
        <a
          href="https://linkedin.com"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsLinkedin />
        </a>
        <a
          href="https://twitter.com"
          className="hover:text-yellow-500 transition-all ease-in-out duration-300"
        >
          <BsTwitter />
        </a>
      </section>
    </footer>
  );
}

export default Footer;
