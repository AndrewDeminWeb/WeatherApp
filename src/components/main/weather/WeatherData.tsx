import type { WeatherData } from "@/store/fetch-weather/types-weather/weather.types";
import st from "../ui/main.module.scss";

interface Weathers {
	weather: WeatherData;
	handleTypeRegion(e: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeRegion(): void;
	changeRegion: boolean;
	region: string;
	weatherLoading: boolean;
}

function WeatherData({
	weather,
	handleTypeRegion,
	handleChangeRegion,
	changeRegion,
	region,
	weatherLoading
}: Weathers) {
	return (
		<div
			className={`${st.weatherBlock} ${weatherLoading ? st.changeTemp : ""} ${
				weather?.current?.temp_c > 16 ? st.warmTemp : st.coldTemp
			}`}>
			<span className={st.changeRegion} onClick={handleChangeRegion}>
				изменить регион
			</span>
			<div>Location - {weather?.location?.name}</div>
			<div>Country - {weather?.location?.country}</div>
			<div className={st.weatherTemperature}>
				Temperature {weather?.current?.temp_c}°
			</div>
			<div>Cloud {weather?.current?.cloud}</div>

			{changeRegion && (
				<input
					onChange={handleTypeRegion}
					type="search"
					value={region}
					className={st.changeRegionInput}
					placeholder="Введите регион..."
				/>
			)}
		</div>
	);
}

export { WeatherData };
