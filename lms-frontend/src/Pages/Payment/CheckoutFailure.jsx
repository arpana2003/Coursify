import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { RxCrossCircled } from 'react-icons/rx';

function CheckoutFailure() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center text-white justify-center">
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-red-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center ">
            Payment Failed
          </h1>
          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="texy-lg font-semibold">
                Oops ! Your payment failed
              </h2>
              <p className="text-left">Please try again later</p>
            </div>
            <RxCrossCircled className="text-red-500 text-5xl " />
          </div>
          <Link
            to="/checkout"
            className="bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out absolute bottom-0 w-full py-2 text-xl font-semibold text-center rounded-br-lg rounded-bl-lg"
          >
            <button>Try again</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutFailure;
