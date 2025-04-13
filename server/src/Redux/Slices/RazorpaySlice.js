import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};
 // Fetches the Razorpay API key
export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("/payments/razorpay-key");
    console.log(response.data);
    
    return response.data;
    
  } catch (error) {
    toast.error("Failed to load data");
  }
});

// Initiates a subscription purchase
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const response = await axiosInstance.post("/payments/subscribe");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// Verifies the payment using Razorpay payment ID and signatur
export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    try {
      const response = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// Retrieves payment records
export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      
      const response = await axiosInstance.get("/payments/");
      console.log("Hi bro ");
      console.log("response ", response);
      
      // toast.promise(response, {
      //   loading: "Getting the payment records...",
      //   success: (data) => {
      //     console.log("Hi bro 1");
      //     return data?.data?.message;
      //   },
      //   error: "Failed to get payment records",
      // });
      console.log("Hi Dude");
      
      return (await response).data;
    } catch (error) {
      toast.error("Operation Failed");
    }
  }
);

 // Cancels a subscription
export const cancelCourseBundle = createAsyncThunk(
  "/payments/cancel",
  async () => {
    try {
      const response = await axiosInstance.get("/payments/unsubscribe");
      toast.promise(response, {
        loading: "Unsubscribing the bundle...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to unsubscribe",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  //Handling API Responses in extraReducers
  extraReducers: (builder) => {
    builder.addCase(getRazorPayId.fulfilled, (state,action)=>{
        state.key= action?.payload?.key; // Updates the Razorpay key in the state
    })
    .addCase(purchaseCourseBundle.fulfilled , (state,action)=>{
        state.subscription_id = action?.payload?.subscription_id; // Updates subscription ID
    })
    .addCase(verifyUserPayment.fulfilled , (state,action)=>{
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success; // Updates verification status
    })
    .addCase(verifyUserPayment.rejected , (state,action)=>{
        toast.error(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success; // Updates verification status
    })
    .addCase(getPaymentRecord.fulfilled , (state,action)=>{
        state.allPayments = action?.payload?.allPayments;  // Updates all payments
        state.finalMonths = action?.payload?.finalMonths;  // Updates final months data
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;  // Updates sales records
    })
  },
});

export default razorpaySlice.reducer;
