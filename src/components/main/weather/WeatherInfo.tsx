import { useCallback, useEffect, useState } from "react";
import { asyncActions } from "@/store/fetch-weather";
import { ActionSlice, useAppSelector } from "@/store/hooks";
import { WeatherData } from "./WeatherData";
import { useDebounce } from "@/hooks/useDebounce";
import st from "../ui/main.module.scss";

function WeatherInfo() {
	const fetchActions = ActionSlice(asyncActions);

	const fetchWeather: any = useAppSelector(
		state => state.weatherDataReducer.weathers
	);
	const weatherLoading = useAppSelector(
		state => state.weatherDataReducer.loading
	);

	const [region, setRegion] = useState<string>("");
	const [changeRegion, setChangeRegion] = useState<boolean>(false);

	const debounce = useDebounce(region, 500);

	useEffect(() => {
		fetchActions.getWeatherData();
	}, []);

	useEffect(() => {
		if (!debounce.length) {
			return;
		}

		fetchActions.searchWeatherData(debounce);
	}, [debounce]);

	const handleChangeRegion = useCallback((): void => {
		setChangeRegion(v => !v);
	}, []);

	const handleTypeRegion: React.ChangeEventHandler<HTMLInputElement> =
		useCallback((e): void => {
			setRegion(e.target.value);
		}, []);

	return (
		<div className={st.weatherBlockInfo}>
			<WeatherData
				key={fetchWeather?.location?.name}
				weather={fetchWeather}
				handleTypeRegion={handleTypeRegion}
				handleChangeRegion={handleChangeRegion}
				changeRegion={changeRegion}
				region={region}
				weatherLoading={weatherLoading}
			/>
		</div>
	);
}

export { WeatherInfo };
