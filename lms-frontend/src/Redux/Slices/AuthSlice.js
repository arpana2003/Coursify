import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // Ensure this is a boolean
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") !== undefined
      ? JSON.parse(localStorage.getItem("data"))
      : {}, // Parse if it's a JSON object
};

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
  try {
    console.log("AuthSlice start");

    const res = await axiosInstance.post("/user/register", data);
    console.log("AuthSlice end");

    // Use `res.data` for the toast promise
    toast.promise(Promise.resolve(res), {
      loading: "Wait creating your account",
      success: (data) => data?.data?.message,
      error: "Failed to create account",
    });

    console.log("done");
    return res.data; // Return data directly
  } catch (e) {
    toast.error(e?.response?.data?.message || "An error occurred");
    throw e; // Ensure the error is thrown so Redux can catch it
  }
});

//reducer for login
export const login = createAsyncThunk("auth/login", async (data) => {
  //hamne jiss name se App.jsx mein diya h
  try {
    const res = await axiosInstance.post("/user/login", data); //backend mein jiss name se hai voh vala name h

    // Use `res.data` for the toast promise
    toast.promise(Promise.resolve(res), {
      loading: "Wait , authentication in progress....",
      success: (data) => data?.data?.message,
      error: "Failed to login",
    });

    console.log("done");
    return await res.data; // Return data directly
  } catch (e) {
    toast.error(e?.response?.data?.message || "An error occurred");
    throw e; // Ensure the error is thrown so Redux can catch it
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = await axiosInstance.get("/user/logout");

  toast.promise(Promise.resolve(res), {
    loading: "Wait , logout in progress....",
    success: (data) => data?.data?.message,
    error: "Failed to logout",
  });

  console.log("done");
  return await res.data; // Return data directly
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile", // Corrected action type
  async (data) => {
    try {
      console.log("HELLO ARPANA 1");
      console.log("DATA", data[0]);
      console.log("DATA", data[1]);

      const res = await axiosInstance.put(`user/update/${data[0]}`, data[1], {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("HELLO ARPANA 2");

      toast.promise(Promise.resolve(res), {
        loading: "Wait, profile update in progress....",
        success: (data) => data?.data?.message,
        error: "Failed to update profile",
      });

      console.log("done");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      throw error; // Make sure to re-throw for Redux to catch it
    }
  }
);

export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("user/me");
    return (await res).data; // Return data directly
  } catch (e) {
    toast.error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // Define reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

// Export actions if needed
// export const {} = authSlice.actions;
export default authSlice.reducer;
