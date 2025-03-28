function svgToBase64(svgString: string) {
	const base64String = btoa(
		encodeURIComponent(svgString).replace(/%([0-9A-F]{2})/g, (_, p1) =>
			String.fromCharCode(Number.parseInt(p1, 16)),
		),
	);

	return `data:image/svg+xml;base64,${base64String}`;
}

console.log(
	"%cKontrapunkt",
	`
		font-size: 64px;
		color: #0000;
		background-size: contain;
		background-position: left center;
		background-repeat: no-repeat;
		background-image: url(${svgToBase64(`
			<svg width="1081" height="152" viewBox="0 0 1081 152" fill="none" xmlns="http://www.w3.org/2000/svg">
				<style>
					path {
						fill: #000;
						animation: fadeIn 2s infinite;
					}

					path:nth-child(1) {
						animation-delay: 0ms;
					}

					path:nth-child(2) {
						animation-delay: 50ms;
					}

					path:nth-child(3) {
						animation-delay: 100ms;
					}

					path:nth-child(4) {
						animation-delay: 150ms;
					}

					path:nth-child(5) {
						animation-delay: 200ms;
					}

					path:nth-child(6) {
						animation-delay: 250ms;
					}

					path:nth-child(7) {
						animation-delay: 300ms;
					}

					path:nth-child(8) {
						animation-delay: 350ms;
					}

					path:nth-child(9) {
						animation-delay: 400ms;
					}

					path:nth-child(10) {
						animation-delay: 450ms;
					}

					path:nth-child(11) {
						animation-delay: 500ms;
					}

					path:nth-child(12) {
						animation-delay: 550ms;
					}

					@media (prefers-color-scheme: dark) {
						path {
							fill: #fff;
						}
					}

					@keyframes fadeIn {
						30% {
							animation-timing-function: cubic-bezier(0.32, 0, 0.67, 0);
							transform: translateY(0);
						}

						50% {
							transform: translateY(-100%);
						}

						50.1% {
							animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
							transform: translateY(100%);
						}

						70% {
							transform: translateY(0);
						}
					}
				</style>
				<path d="M0.591797 118.222V109.271H16.0933C19.2947 109.271 20.4741 108.258 20.9796 106.062V12.16C20.4741 9.96445 19.2947 8.95112 16.0933 8.95112H0.591797V0H55.184V8.95112H40.3565C37.3236 8.95112 36.1441 9.96445 35.6386 12.16V69.5822L91.7472 12.4978C93.7692 10.4711 92.9267 8.44445 90.0623 8.44445H73.2129V0H124.604V8.44445H111.798C108.934 8.44445 107.08 9.28889 105.395 10.9778L68.3265 48.3022L124.435 118.222H104.721L58.3854 58.2667L38.3345 78.3644C36.3126 80.3911 35.6386 82.4178 35.6386 85.12V106.062C36.1441 108.258 37.3236 109.271 40.3565 109.271H55.184V118.222H0.591797Z" />
				<path d="M173.188 119.911C151.789 119.911 130.896 103.36 130.896 76C130.896 48.8089 151.789 32.0889 173.188 32.0889C194.755 32.0889 215.312 48.8089 215.312 76.1689C215.312 103.529 194.418 119.911 173.188 119.911ZM145.049 76C145.049 96.7733 156.338 110.791 173.188 110.791C190.037 110.791 201.495 96.7733 201.495 76.1689C201.495 55.2267 190.037 41.2089 173.188 41.2089C156.338 41.2089 145.049 55.0578 145.049 76Z" />
				<path d="M225.325 118.222V110.116H236.614C240.49 110.116 241.501 108.933 241.669 105.218V46.7822C241.501 43.0667 240.49 41.8844 236.614 41.8844H225.325V33.7778H252.453L255.317 59.28C258.518 49.3156 267.28 32.0889 288.51 32.0889C303.843 32.0889 312.942 41.3778 312.942 60.6311V106.907C313.448 109.271 314.627 110.116 317.828 110.116H329.118V118.222H284.13V110.116H294.745C297.441 110.116 298.62 109.44 299.126 107.751V60.2933C299.126 49.1467 293.734 42.2222 282.782 42.2222C267.449 42.2222 256.834 58.2667 255.317 71.9467V107.582C255.823 109.44 257.171 110.116 259.698 110.116H270.313V118.222H225.325Z" />
				<path d="M372.675 119.911C354.646 119.911 349.254 109.947 349.254 94.9156V42.0533H331.394V33.7778H345.716C347.401 33.7778 348.917 32.9333 349.422 31.2444L358.016 7.09333H363.071V33.7778H394.916V42.0533H363.071V95.4222C363.071 107.582 367.788 110.622 374.865 110.622C382.616 110.622 387.334 103.36 387.334 90.0178V85.2889L395.59 86.1333V91.7067C395.59 108.596 388.008 119.911 372.675 119.911Z" />
				<path d="M473.655 56.24C467.084 56.24 463.377 51.5111 463.377 46.9511C463.377 42.7289 465.736 40.1956 467.59 39.52C450.403 38.3378 439.114 57.2533 439.114 74.1422V107.413C440.125 109.44 442.316 110.116 447.707 110.116H468.095V118.222H409.122V110.116H420.411C424.287 110.116 425.298 108.933 425.466 105.218V46.7822C425.298 43.0667 424.287 41.8844 420.411 41.8844H409.122V33.7778H436.25L438.609 55.2267C442.484 44.4178 451.92 32.0889 466.579 32.0889C476.52 32.0889 484.102 36.48 484.102 44.9244C484.102 51.3422 479.89 56.24 473.655 56.24Z" />
				<path d="M516.728 119.911C500.553 119.911 493.476 111.298 493.476 100.151C493.476 82.7556 511.842 71.9467 548.237 65.5289V60.2933C548.237 47.12 540.654 39.6889 526.838 39.6889C517.739 39.6889 511.168 43.0667 508.809 45.7689C513.021 46.4444 515.717 49.8222 515.717 54.5511C515.717 59.7867 511.505 63.6711 506.113 63.6711C499.71 63.6711 496.003 59.6178 496.003 53.3689C496.003 43.9111 509.483 32.0889 527.849 32.0889C546.72 32.0889 562.053 39.1822 562.053 61.9822V99.4755C562.053 106.062 563.738 110.453 569.972 110.453C574.522 110.453 578.397 107.92 579.914 106.062V115.182C578.566 117.378 574.016 119.911 567.108 119.911C551.775 119.911 548.237 108.596 548.237 102.516V96.9422C546.72 104.373 536.779 119.911 516.728 119.911ZM508.135 99.3067C508.135 106.062 511.842 110.622 519.761 110.791C537.116 111.129 548.068 95.76 548.068 86.3022V72.1156C521.783 77.3511 508.135 87.3156 508.135 99.3067Z" />
				<path d="M609.159 33.7778L612.529 54.2133C615.393 44.4178 625.166 32.0889 642.521 32.0889C662.235 32.0889 678.747 47.2889 678.747 76C678.747 104.711 662.235 119.911 642.521 119.911C625.166 119.911 615.73 107.751 612.698 98.1244V141.36C613.371 143.218 614.888 143.893 618.258 143.893H631.737V152H582.706V143.893H593.995C597.196 143.893 598.376 143.049 598.881 140.684V45.0933C598.376 42.7289 597.196 41.8844 593.995 41.8844H582.706V33.7778H609.159ZM612.698 80.56C613.877 94.5778 621.796 111.467 638.983 111.467C652.799 111.467 663.92 100.996 663.92 76C663.92 51.0044 652.799 40.5333 638.983 40.5333C621.796 40.5333 613.877 57.2533 612.698 71.2711V80.56Z" />
				<path d="M687.842 33.7778H717.834V91.7067C717.834 102.853 723.226 109.778 734.178 109.778C749.511 109.778 760.126 93.7333 761.643 80.0533V45.0933C761.137 42.7289 759.958 41.8844 756.756 41.8844H745.467V33.7778H775.291V105.218C775.459 108.933 776.47 110.116 780.345 110.116H791.635V118.222H764.507L761.643 92.72C758.441 102.684 749.679 119.911 728.449 119.911C713.116 119.911 704.017 110.622 704.017 91.3689V45.0933C703.512 42.7289 702.333 41.8844 699.131 41.8844H687.842V33.7778Z" />
				<path d="M800.74 118.222V110.116H812.029C815.904 110.116 816.915 108.933 817.084 105.218V46.7822C816.915 43.0667 815.904 41.8844 812.029 41.8844H800.74V33.7778H827.867L830.732 59.28C833.933 49.3156 842.695 32.0889 863.925 32.0889C879.258 32.0889 888.357 41.3778 888.357 60.6311V106.907C888.862 109.271 890.042 110.116 893.243 110.116H904.532V118.222H859.544V110.116H870.159C872.855 110.116 874.035 109.44 874.54 107.751V60.2933C874.54 49.1467 869.149 42.2222 858.196 42.2222C842.863 42.2222 832.248 58.2667 830.732 71.9467V107.582C831.237 109.44 832.585 110.116 835.113 110.116H845.728V118.222H800.74Z" />
				<path d="M945.158 85.9644C943.136 87.8222 942.294 89.68 942.294 92.2133V107.582C942.799 109.44 944.147 110.116 946.674 110.116H957.121V118.222H912.302V110.116H923.591C926.792 110.116 927.972 109.271 928.477 106.907V11.3156C927.972 8.95112 926.792 8.10667 923.591 8.10667H912.302V0H942.294V79.3778L979.194 45.7689C981.216 43.9111 979.868 42.0533 977.846 42.0533H964.703V33.7778H1008.17V42.0533H999.582C994.695 42.0533 992.842 42.8978 989.977 45.6L968.242 65.1911L1009.86 118.222H992.505L958.469 73.9733L945.158 85.9644Z" />
				<path d="M1057.68 119.911C1039.65 119.911 1034.26 109.947 1034.26 94.9156V42.0533H1016.4V33.7778H1030.72C1032.4 33.7778 1033.92 32.9333 1034.42 31.2444L1043.02 7.09333H1048.07V33.7778H1079.92V42.0533H1048.07V95.4222C1048.07 107.582 1052.79 110.622 1059.87 110.622C1067.62 110.622 1072.34 103.36 1072.34 90.0178V85.2889L1080.59 86.1333V91.7067C1080.59 108.596 1073.01 119.911 1057.68 119.911Z" />
			</svg>
		`)});
	`,
);

console.log("Website by Kontrapunkt: https://kontrapunkt.com");
