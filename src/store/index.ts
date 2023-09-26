import { configureStore } from "@reduxjs/toolkit";
import { weatherDataReducer } from "./fetch-weather";

export const store = configureStore({
	reducer: { weatherDataReducer }
});
