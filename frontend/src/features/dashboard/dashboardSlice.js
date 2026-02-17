import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployeeDashboard, getManagerDashboard } from "../../services/dashboardService";
import { checkIn, checkOut } from "../../services/attendanceService";


const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchEmployeeDashboard = createAsyncThunk(
  "dashboard/employee",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await getEmployeeDashboard(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchManagerDashboard = createAsyncThunk(
  "dashboard/manager",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await getManagerDashboard(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployeeDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchManagerDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchManagerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchManagerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(employeeCheckIn.fulfilled, (state) => {
        state.success = true;
      })
     .addCase(employeeCheckOut.fulfilled, (state) => {
        state.success = true;
     });
  },
});


export const employeeCheckIn = createAsyncThunk(
  "dashboard/checkIn",
  async (_, thunkAPI) => {
    try {
      return await checkIn();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const employeeCheckOut = createAsyncThunk(
  "dashboard/checkOut",
  async (_, thunkAPI) => {
    try {
      return await checkOut();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);



export default dashboardSlice.reducer;
