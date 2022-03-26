import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../../features/contact/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDistatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDistatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
