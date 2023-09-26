import st from "./ui/navbar.module.scss";

function HeaderNavBar() {
	return (
		<header className={st.navBar}>
			<div className={st.navList}>
				<ul>
					<li>Main page</li>
					<li>About...</li>
				</ul>
			</div>
		</header>
	);
}

export { HeaderNavBar };
