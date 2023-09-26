import {
	createSlice,
	createAsyncThunk,
	type PayloadAction
} from "@reduxjs/toolkit";
import type { WeatherData } from "./types-weather/weather.types";
import axios from "axios";

interface IWeatherData {
	weathers: WeatherData;
	loading: boolean;
}

const controller = new AbortController();

const optionsAxiosWeather = {
	method: "GET",
	signal: controller.signal,
	url: "https://weatherapi-com.p.rapidapi.com/current.json",
	params: { q: "Москва" },
	headers: {
		"X-RapidAPI-Key": "387c18e6c5msh8889244a6f3539cp15e310jsn2d6feee2ae97",
		"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
	}
};

export const getWeatherData = createAsyncThunk<
	WeatherData,
	undefined,
	{ rejectValue: string }
>(
	"weatherData/getWeatherData",
	async function (
		_,
		{ rejectWithValue }
	): Promise<WeatherData | ReturnType<typeof rejectWithValue>> {
		try {
			const response = await axios.request<WeatherData>(optionsAxiosWeather);
			const data = await response.data;

			return data;
		} catch (e: unknown) {
			return rejectWithValue("Some Error");
		}
	}
);

export const searchWeatherData = createAsyncThunk<
	undefined,
	string,
	{ rejectValue: string }
>(
	"weatherData/searchWeatherData",
	async function (query, { rejectWithValue }): Promise<any> {
		try {
			const postOptionsAxiosWeather = { ...optionsAxiosWeather };
			postOptionsAxiosWeather.params.q = query;

			const response = await axios.request(postOptionsAxiosWeather);

			return response.data;
		} catch (e: unknown) {
			if (e instanceof Error) {
				rejectWithValue(e.message);
			} else {
				console.error("Error", e);
			}
		}
	}
);

const initialState: IWeatherData = {
	weathers: {} as WeatherData,
	loading: false
};

export const weatherReducer = createSlice({
	name: "weatherData",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(
				getWeatherData.fulfilled,
				(state, action: PayloadAction<WeatherData>) => {
					state.weathers = action.payload;
				}
			)
			.addCase(
				searchWeatherData.fulfilled,
				(state, action: PayloadAction<any>) => {
					if (action.payload === undefined) {
						return;
					}

					state.loading = true;
					state.weathers = action.payload;
				}
			);
	}
});

export const { reducer: weatherDataReducer } = weatherReducer;

export const asyncActions = {
	getWeatherData,
	searchWeatherData
};
