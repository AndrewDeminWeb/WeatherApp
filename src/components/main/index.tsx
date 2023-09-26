import { WeatherInfo } from "./weather/WeatherInfo";
import st from "./ui/main.module.scss";

function MainComponent() {
	return (
		<main>
			<div className={st.mainBlock}>
				<div className={st.infoAboutWeather}>Info about weather!</div>

				<WeatherInfo />
			</div>
		</main>
	);
}

export { MainComponent };
