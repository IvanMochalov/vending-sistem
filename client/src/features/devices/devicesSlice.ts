import { Device } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { deviceApi } from '../../app/services/device';
import { RootState } from '../../app/store';

interface IInitialState {
  devices: Device[] | null
}

const initialState: IInitialState = {
  devices: null,
}

const slice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(deviceApi.endpoints.getAllDevices.matchFulfilled, (state, action) => {
        state.devices = action.payload;
      }),
    builder
      .addMatcher(deviceApi.endpoints.addDevice.matchFulfilled, (state, action) => {
        state.devices?.push(action.payload);
      })
  }
})

export default slice.reducer;
export const selectDevices = (state: RootState) => state.devices;
