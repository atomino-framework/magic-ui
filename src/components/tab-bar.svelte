<main>
	<slot/>
</main>

<style lang="scss">
	main {
		grid-area: tab;
		height: 50px;
		display: flex;
		background-color: #0009;
		backdrop-filter: blur(4px);
		overflow-y: hidden;
		overflow-x: auto;
		box-shadow: inset 0px -14px 16px -14px rgba(0, 0, 0, 0.75);
	}
</style>