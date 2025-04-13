import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try{
        console.log("Loaded 1");
        // Await the response here
        const response = await axiosInstance.get("/courses/");
        console.log("Loaded 3");

        // toast.promise(Promise.resolve(response), {
        //     loading: "loading course data ....",
        //     success: "Courses loaded successfully",
        //     error: "Failed to get the courses"
        // });

        console.log("Loaded 2");
        
        return response.data.courses;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})


export const createNewCourse = createAsyncThunk("/course/create", async (data)=> {
    try{
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response = axiosInstance.post("/courses",formData);

        toast.promise(response, {
            loading: "Creating new course",
            success: "Course created successfully",
            error:"Failed to create course"
        })

        return (await response).data

    }catch(e){
        toast.error(e?.response?.data?.message);
    }
})

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try{
        const response = await axiosInstance.delete(`/courses/${id}`);

        toast.promise(response, {
            loading: "deleting course data ....",
            success: "Courses deleted successfully",
            error: "Failed to delete the courses"
        });
        
        return ( await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})



const courseSlice=createSlice({
    name: "courses",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state,action)=> {
            if(action.payload){
                console.log(action.payload);
                
                state.courseData=[...action.payload]
            }
        })
    }
});

export default courseSlice.reducer;