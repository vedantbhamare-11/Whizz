import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentVendor {
  user_id: number;
  email: string;
  user_name: string;  // Ensure this property exists
  profile_photo: string;
  feedback_count: number;
  is_profile_completed: boolean;
  mobile_number: string;
  designation: string;
  reported_to: string;
  dob: Date;
  job_id: number;
  department: number;
  organization_id: number;
  department_name: string;
}

interface CurrentVendorState {
  CurrentUser: CurrentVendor | null;
}

const initialState: CurrentVendorState = {
  CurrentUser: null,
};

const CurrentUserSlice = createSlice({
  name: 'CurrentUser',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      if (state.CurrentUser) {
        state.CurrentUser.user_id = action.payload;
      }
    },
    setCurrentUser: (state, action: PayloadAction<CurrentVendor | null>) => {
      state.CurrentUser = action.payload;
    },
    updateCurrentUser: (state, action: PayloadAction<Partial<CurrentVendor>>) => {
      if (state.CurrentUser) {
        state.CurrentUser = { ...state.CurrentUser, ...action.payload };
      }
    },
    selectCurrentUser: (state, action: PayloadAction<CurrentVendor>) => {
      state.CurrentUser = action.payload;
    },
  },
});

export const { setUserId, setCurrentUser, updateCurrentUser, selectCurrentUser } = CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;
