import {useState, useRef, useEffect, cloneElement} from "react";
import { TowerLevel } from "../elements/TowerLevel";

function Tower() {
	const inputRef = useRef(null);
	const [towerDifficulty, setTowerDifficulty] = useState(1);
	const [currentLevel, setCurrentLevel] = useState(0);
	const [winTable, setWinTable] = useState([0, 4, 4, 2, 3, 1, 2, 5, 0, 3]);
	const [AlertInfo, setAlertInfo] = useState([]);
	const multipliers = [
		[
			{multiplier: "x34.526"},
			{multiplier: "x24.228"},
			{multiplier: "x17.002"},
			{multiplier: "x11.931"},
			{multiplier: "x8.373"},
			{multiplier: "x5.875"},
			{multiplier: "x4.123"},
			{multiplier: "x2.893"},
			{multiplier: "x2.03"},
			{multiplier: "x1.425"}
		],
		[
			{multiplier: "x613.106"},
			{multiplier: "x322.687"},
			{multiplier: "x169.836"},
			{multiplier: "x89.387"},
			{multiplier: "x47.045"},
			{multiplier: "x24.76"},
			{multiplier: "x13.032"},
			{multiplier: "x6.858"},
			{multiplier: "x3.61"},
			{multiplier: "x1.9"}
		],
		[
			{multiplier: "x35354.817"},
			{multiplier: "x12405.199"},
			{multiplier: "x4352.701"},
			{multiplier: "x1527.263"},
			{multiplier: "x535.881"},
			{multiplier: "x188.028"},
			{multiplier: "x65.975"},
			{multiplier: "x23.149"},
			{multiplier: "x8.122"},
			{multiplier: "x2.85"}
		],
];

	function changeInput(action) {
		if (inputRef.current) {
			switch (action) {
				case "0":
					inputRef.current.value = 0;
					betRound();
					break;
				case "+10":
					inputRef.current.value = Number(inputRef.current.value) + 10;
					betRound();
					break;
				case "+100":
					inputRef.current.value = Number(inputRef.current.value) + 100;
					betRound();
					break;
				case "+1000":
					inputRef.current.value = Number(inputRef.current.value) + 1000;
					betRound();
					break;
				case "1/2":
					inputRef.current.value = Number(inputRef.current.value) / 2;
					betRound();
					break;
				case "x2":
					inputRef.current.value = Number(inputRef.current.value) * 2;
					betRound();
					break;
				case "MAX":
					inputRef.current.value = balance;
					break;
			}
		}
	}

	function betRound() {
		inputRef.current.value = Math.floor(Number(inputRef.current.value));
	}

	function reveal(e) {
		const level = Number((e.target.parentElement.parentElement.id).substring(5)) - 1;
		const chosenOption = Number(e.target.id.substring(10));
		const winSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="90%" viewBox="0 0 256 256" xml:space="preserve">

						<defs>
						</defs>
						<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
							<circle cx="45.001" cy="47.211" r="42.791" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(232,129,2); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
							<circle cx="45" cy="42.79" r="35" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(243,158,9); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
							<path d="M 45 13.791 c 17.977 0 32.78 13.555 34.766 31 c 0.15 -1.313 0.234 -2.647 0.234 -4 c 0 -19.33 -15.67 -35 -35 -35 s -35 15.67 -35 35 c 0 1.353 0.085 2.687 0.234 4 C 12.22 27.346 27.023 13.791 45 13.791 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(232,129,2); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(253,216,53); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 83.422 23.947 l -7.339 7.339 c 1.241 3.352 1.947 6.961 2.035 10.723 l 8.623 -8.623 C 85.999 30.079 84.88 26.916 83.422 23.947 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 44.218 75.909 c -3.762 -0.087 -7.371 -0.794 -10.723 -2.035 l -7.339 7.339 c 2.969 1.459 6.132 2.578 9.439 3.32 L 44.218 75.909 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 15.236 57.365 l -7.118 7.118 c 3.188 5.408 7.526 10.054 12.685 13.598 l 6.975 -6.975 C 22.396 67.826 18.027 63.053 15.236 57.365 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 66.692 5.909 l -7.118 7.118 c 5.688 2.791 10.461 7.16 13.741 12.541 l 6.975 -6.975 C 76.745 13.435 72.1 9.097 66.692 5.909 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 49.861 10.012 c 1.441 0.212 2.849 0.522 4.223 0.913 l 7.565 -7.565 c -1.224 -0.517 -2.478 -0.976 -3.756 -1.379 L 49.861 10.012 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 5.569 59.44 l 7.565 -7.565 c -0.391 -1.374 -0.701 -2.782 -0.913 -4.223 L 4.19 55.683 C 4.593 56.962 5.052 58.216 5.569 59.44 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(254,236,154); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 39.88 47 l 16.603 -16.604 c 1.172 -1.171 1.172 -3.071 0 -4.242 c -1.172 -1.172 -3.07 -1.172 -4.242 0 L 38.638 39.758 V 28 c 0 -1.657 -1.343 -3 -3 -3 s -3 1.343 -3 3 v 38 c 0 1.657 1.343 3 3 3 s 3 -1.343 3 -3 V 54.242 l 13.604 13.604 c 0.586 0.586 1.354 0.879 2.121 0.879 s 1.535 -0.293 2.121 -0.879 c 1.172 -1.171 1.172 -3.071 0 -4.242 L 39.88 47 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(232,129,2); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
							<path d="M 39.88 43 l 16.603 -16.604 c 1.172 -1.171 1.172 -3.071 0 -4.242 c -1.172 -1.172 -3.07 -1.172 -4.242 0 L 38.638 35.758 V 24 c 0 -1.657 -1.343 -3 -3 -3 s -3 1.343 -3 3 v 38 c 0 1.657 1.343 3 3 3 s 3 -1.343 3 -3 V 50.242 l 13.604 13.604 c 0.586 0.586 1.354 0.879 2.121 0.879 s 1.535 -0.293 2.121 -0.879 c 1.172 -1.171 1.172 -3.071 0 -4.242 L 39.88 43 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(253,216,53); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
						</g>
						</svg>`;
		const loseSVG = `
		<svg
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns:ns1="http://sozi.baierouge.fr"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    id="svg8526"
    viewBox="0 0 214.4 221.65"
    version="1.1"
	height="100%"
  >
  <g
      id="layer1"
      transform="translate(-332.37 -231.28)"
    >
    <path
        id="path26649"
        style="color:#000000"
        d="m533.08 235.77-6.2869 1.7963c-0.0862-0.007-0.30896 0.004-0.44547 0-5.8458-0.17388-11.757 0.39302-17.738 1.7963-11.818 2.7726-23.124 9.4807-32.783 20.657-11.496-4.4723-22.335-3.7541-26.046 2.4699l-3.5925 6.0624c-36.886-7.6032-76.174 8.2651-96.549 42.437-25.735 43.159-11.5 98.882 31.659 124.62 43.159 25.734 98.882 11.725 124.62-31.435 20.391-34.199 15.745-76.244-8.533-105.08l3.5925-6.0624c3.3856-5.6716-0.0862-14.443-7.8583-22.004 6.2762-6.6475 12.884-10.235 19.984-11.9 4.1113-0.96474 8.5394-1.1474 13.022-0.89813l6.7367 3.1435 1.1223-4.9397 3.8167-2.4699-4.0409-6.0624 4.939-6.5115-5.1639-0.89813-0.44548-4.7152z"
        fill-rule="evenodd"
        stroke="#000"
        stroke-width="9.1244"
    />
    <path
        id="path26367"
        d="m1915-237.1a20.179 20.179 0 1 1 -40.357 0 20.179 20.179 0 1 1 40.357 0z"
        fill-rule="evenodd"
        transform="matrix(3.8728 2.3092 -2.3092 3.8728 -7457.9 -3099.7)"
        stroke="#000"
        stroke-width="1.0103"
        fill="#c91051"
    />
    <path
        id="path26369"
        style="color:#000000"
        d="m483.68 263.83c-14.131-8.4258-29.279-8.9471-33.834-1.3083l-8.893 14.843c-4.5582 7.6366 3.178 20.597 17.31 29.023 14.132 8.4262 29.329 9.1408 33.883 1.5015l8.893-14.843c4.5582-7.6367-3.2261-20.79-17.358-29.216z"
        fill-rule="evenodd"
        stroke="#000"
        stroke-width="4.5553"
        fill="#c91051"
    />
    <path
        id="path26371"
        fill-rule="evenodd"
        style="color:#000000"
        fill-opacity=".48936"
        d="m451.26 259.99-8.0825 13.697c-0.74796 0.0287-1.5541-0.11712-2.254-0.0287-4.597 0.56259-8.1558 2.3163-10.078 5.2132-5.1301 7.7216 3.6364 20.894 19.597 29.446 13.962 7.4828 28.813 8.9549 35.736 4.0259-3.6536 1.1893-8.4798 1.0132-13.667-0.19256 0-0.0431-0.0718-0.0992 0-0.15017l8.9828-17.489c-2.5909-0.68617-5.3018-1.7159-7.9905-2.9306l-8.1356 17.36-10.221-4.6536 8.8513-18.195c-11.155-8.2856-16.77-19.343-12.738-26.108zm-73.237 27.153c-9.559 6.7521-17.945 15.592-24.326 26.291-24.398 40.924-11.02 93.827 29.903 118.23 23.975 14.295 52.08 15.447 76.154 5.8624-14.147-1.7046-28.206-6.1995-41.234-13.967-47.33-28.221-64.302-87.79-40.497-136.42z"
    />
    <path
        id="path26373"
        d="m1912.2-248.9a4.1037 5.3664 0 1 1 -8.2075 0 4.1037 5.3664 0 1 1 8.2075 0z"
        fill-opacity=".92021"
        fill-rule="evenodd"
        transform="matrix(3.475 -2.8731 2.8731 3.475 -5437 6685.1)"
        fill="#fff"
    />
    <path
        id="path26375"
        d="m1912.2-248.9a4.1037 5.3664 0 1 1 -8.2075 0 4.1037 5.3664 0 1 1 8.2075 0z"
        fill-opacity=".92021"
        fill-rule="evenodd"
        transform="matrix(2.0469 -1.6923 1.6923 2.0469 -3006.3 4115)"
        fill="#fff"
    />
    <path
        id="path26377"
        stroke="#000"
        stroke-width="4.5553"
        fill="none"
        d="m483.68 263.83c-14.131-8.4258-29.279-8.9471-33.834-1.3083l-8.893 14.843c-4.5582 7.6366 3.178 20.597 17.31 29.023 14.132 8.4262 29.329 9.1408 33.883 1.5015l8.893-14.843c4.5582-7.6367-3.2261-20.79-17.358-29.216z"
    />
    <path
        id="path26379"
        d="m513.1 259.12c-10.479 2.4584-19.946 8.6752-28.74 23.576l-0.6754 0.89813c-1.978 1.9218-6.8265 1.4987-11.227-1.1227-4.4806-2.6713-6.9709-6.5659-6.062-9.2059 0.25148-0.42823 0.89813-1.5717 0.89813-1.5717 11.069-18.362 25.835-28.701 41.314-32.333 5.9808-1.4032 11.892-1.9701 17.738-1.7963 0.1437 0.004 0.29458-0.006 0.38081 0.002l6.2646-1.6906 0.56043 4.563 5.1934 1.0306-5.0166 6.5142 4.135 6.0209-3.9956 2.4776-1.123 4.9277-6.6368-3.1139c-4.4828-0.24932-8.8994-0.14083-13.011 0.82391z"
        fill-rule="evenodd"
        stroke="#000"
        stroke-width="4.5553"
        fill="#ccab7f"
    />
    <path
        id="path26383"
        style="color:#000000"
        d="m475.41 261.18c-0.28021 12.349 5.4441 19.469 8.9813 20.208"
        stroke-opacity=".68617"
        stroke="#000"
        stroke-linecap="round"
        stroke-width="2.2811"
        fill="none"
    />
    <path
        id="path26385"
        style="color:#000000"
        d="m486.06 251.84c-1.8782 12.208 2.8747 20.011 6.2869 21.202"
        stroke-opacity=".68617"
        stroke="#000"
        stroke-linecap="round"
        stroke-width="2.2811"
        fill="none"
    />
    <path
        id="path26387"
        style="color:#000000"
        d="m498.36 243.31c-4.199 11.616-1.0411 20.189 2.0772 22.016"
        stroke-opacity=".68617"
        stroke="#000"
        stroke-linecap="round"
        stroke-width="2.2811"
        fill="none"
    />
    <path
        id="path26389"
        style="color:#000000"
        d="m511.77 238.56c-6.3013 10.624-4.8054 19.637-2.088 22.015"
        stroke-opacity=".68617"
        stroke="#000"
        stroke-linecap="round"
        stroke-width="2.2811"
        fill="none"
    />
    <path
        id="path26391"
        style="block-progression:tb;color:#000000;text-transform:none;text-indent:0"
        fill-opacity=".68627"
        d="m533.08 235.77-6.0628 1.7963a1.1407 1.1407 0 0 0 0 -0.22418 1.1407 1.1407 0 0 0 0 -0.22417 1.1407 1.1407 0 0 0 0 -0.22417 1.1407 1.1407 0 0 0 -0.22273 -0.22418 1.1407 1.1407 0 0 0 -0.22274 -0.22417 1.1407 1.1407 0 0 0 -0.22274 -0.22417 1.1407 1.1407 0 0 0 -0.22273 0 1.1407 1.1407 0 0 0 -0.22274 0 1.1407 1.1407 0 0 0 -0.22274 0 1.1407 1.1407 0 0 0 -0.22273 0.22417 1.1407 1.1407 0 0 0 -0.22274 0 1.1407 1.1407 0 0 0 -0.22274 0.22417c-0.26584 0.29603-0.42392 0.60283-0.67539 0.89814-1.1949 0.0503-2.3826 0.16094-3.5925 0.22417l0.67539 1.7963c-0.98435 0.0877-1.6411 0.47781-2.4702 0.89814-3.2807 1.6652 0.59636 1.2225 1.123 2.2453 0.10059 0.14514-2.6017 1.0592-2.6944 1.3472-0.28741 0.87162 0.91178 2.5723 0.67539 3.368-0.30177 0.93995-2.213 1.2355-2.4695 2.0208-0.25867 0.80006 0.89454 1.8078 2.0212 2.6944-0.38799 3.0948-0.10059 5.6 1.1223 7.1851a1.1407 1.1407 0 0 0 0.22274 0.22417 1.1407 1.1407 0 0 0 0.22273 0 1.1407 1.1407 0 0 0 0.22274 0.22418 1.1407 1.1407 0 0 0 0.22274 0 1.1407 1.1407 0 0 0 0.22274 0 1.1407 1.1407 0 0 0 0.22273 -0.22418 1.1407 1.1407 0 0 0 0.22274 0 1.1407 1.1407 0 0 0 0.22274 -0.22417 1.1407 1.1407 0 0 0 0.22273 -0.22417 1.1407 1.1407 0 0 0 0 -0.22418 1.1407 1.1407 0 0 0 0 -0.22417 1.1407 1.1407 0 0 0 0 -0.22417 1.1407 1.1407 0 0 0 0 -0.22418 1.1407 1.1407 0 0 0 -0.22273 -0.22417c-0.28741-0.37075-0.52451-1.1307-0.6754-2.0208 0.56762 0.19256 2.3538 0.89569 2.4702 1.1227 0.21556 0.42249 0.46703 0.7142 0.6754 1.1227 1.0346 0.0144 2.098-0.0575 3.1427 0l6.7367 3.1435 1.1223-4.9397 3.8167-2.4699-4.0409-6.0624 4.939-6.5115-5.1639-0.89814-0.44548-4.7152z"
    />
  </g
  >
  <metadata
    >
    <rdf:RDF
      >
      <cc:Work
        >
        <dc:format
          >image/svg+xml</dc:format
        >
        <dc:type
            rdf:resource="http://purl.org/dc/dcmitype/StillImage"
        />
        <cc:license
            rdf:resource="http://creativecommons.org/licenses/publicdomain/"
        />
        <dc:publisher
          >
          <cc:Agent
              rdf:about="http://openclipart.org/"
            >
            <dc:title
              >Openclipart</dc:title
            >
          </cc:Agent
          >
        </dc:publisher
        >
        <dc:title
          >Cartoon bomb</dc:title
        >
        <dc:date
          >2013-09-22T06:13:15</dc:date
        >
        <dc:description
          >Red cartoon bomb</dc:description
        >
        <dc:source
          >https://openclipart.org/detail/183653/cartoon-bomb-by-purzen-183653</dc:source
        >
        <dc:creator
          >
          <cc:Agent
            >
            <dc:title
              >purzen</dc:title
            >
          </cc:Agent
          >
        </dc:creator
        >
        <dc:subject
          >
          <rdf:Bag
            >
            <rdf:li
              >bomb</rdf:li
            >
            <rdf:li
              >cartoon</rdf:li
            >
            <rdf:li
              >cherry</rdf:li
            >
            <rdf:li
              >explosive</rdf:li
            >
            <rdf:li
              >fuse</rdf:li
            >
            <rdf:li
              >game</rdf:li
            >
            <rdf:li
              >purple</rdf:li
            >
            <rdf:li
              >red</rdf:li
            >
            <rdf:li
              >shiny</rdf:li
            >
            <rdf:li
              >weapon</rdf:li
            >
          </rdf:Bag
          >
        </dc:subject
        >
      </cc:Work
      >
      <cc:License
          rdf:about="http://creativecommons.org/licenses/publicdomain/"
        >
        <cc:permits
            rdf:resource="http://creativecommons.org/ns#Reproduction"
        />
        <cc:permits
            rdf:resource="http://creativecommons.org/ns#Distribution"
        />
        <cc:permits
            rdf:resource="http://creativecommons.org/ns#DerivativeWorks"
        />
      </cc:License
      >
    </rdf:RDF
    >
  </metadata
  >
</svg>`;
		if (level == currentLevel) {
			switch (towerDifficulty) {
				case 1:
					if (winTable[currentLevel] < 4) {
						// setting an img didn't work, weird
						e.target.innerHTML = winSVG;
						setCurrentLevel(currentLevel + 1);
					} else {
						e.target.innerHTML = loseSVG;
						setCurrentLevel(-1);
					}
					break;
				case 2:
					if (winTable[currentLevel] > 2) {
						e.target.innerHTML = winSVG;
						setCurrentLevel(currentLevel + 1);
					} else {
						e.target.innerHTML = loseSVG;
						setCurrentLevel(-1);
					}
					break;
				case 3:
					if (winTable[currentLevel] > 3) {
						e.target.innerHTML = winSVG;
						setCurrentLevel(currentLevel + 1);
					} else {
						e.target.innerHTML = loseSVG;
						setCurrentLevel(-1);
					}
					break;
			}

			if (currentLevel == -1) {
				// game over
			}
		}
	}

	function showAlert(positive, mess) {
		setAlertInfo([...AlertInfo, {isPositive: positive, message: mess}]);
	}


  	return (
	<>
		{
			AlertInfo.map((obj, index) => (
				<Alert key={index} isPositive={obj.isPositive} message={obj.message}/>
			))
		}

    <div className="w-full h-full flex">
		{/* Difficulty */}
		<div className="w-1/4 h-[95%] m-3 py-2 bg-[#525864] rounded-lg flex flex-col justify-between">
			<div className="w-full p-2">
				<div className="w-full flex flex-col items-center">
					<h1 className="text-white text-xl select-none">TRUDNOŚĆ:</h1>
					<div className="w-5/6 my-[2%] font-bold p-3 text-lg select-none
					flex justify-between items-center rounded-2xl bg-[#27262a]
					hover:text-[#eaad03] hover:cursor-pointer
					" onClick={() => setTowerDifficulty(1)}>
						<p>Łatwe</p>
						<div className="w-2/3 flex justify-end items-center">
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#eaad03] rounded-md"></div>
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#eaad03] rounded-md"></div>
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#f20409] rounded-md"></div>
						</div>
					</div>

					<div className="w-5/6 my-[2%] font-bold p-3 text-lg select-none
					flex justify-between items-center rounded-2xl bg-[#27262a]
					hover:text-[#eaad03] hover:cursor-pointer
					" onClick={() => setTowerDifficulty(2)}>
						<p>Średnie</p>
						<div className="w-2/3 flex justify-end items-center">
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#eaad03] rounded-md"></div>
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#f20409] rounded-md"></div>
						</div>
					</div>

					<div className="w-5/6 my-[2%] font-bold p-3 text-lg select-none
					flex justify-between items-center rounded-2xl bg-[#27262a]
					hover:text-[#eaad03] hover:cursor-pointer
					" onClick={() => setTowerDifficulty(3)}>
						<p>Trudne</p>
						<div className="w-2/3 flex justify-end items-center">
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#eaad03] rounded-md"></div>
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#f20409] rounded-md"></div>
							<div className="w-[1.5vw] mx-[0.3vw] aspect-square bg-[#f20409] rounded-md"></div>
						</div>
					</div>
				</div>
			</div>

			{/* Bet */}
			<div className="w-full p-2">
				<form className="w-full flex flex-col items-center justify-center">
					<input type="number" name="bet" id="bet" ref={inputRef} placeholder="Zakład" className="
					w-5/6 h-10 rounded-lg p-2 m-1 bg-[#525864] select-none border-2 border-[#27262a]
					"/>
					<div className="flex flex-wrap justify-center items-center">
						{
							[
								{text: "0"},
								{text: "+10"},
								{text: "+100"},
								{text: "+1000"},
								{text: "1/2"},
								{text: "x2"},
								{text: "MAX"}
							].map((div, index) => (
								<div key={index} className={`
								w-${div.text == "MAX" ? "3/4" : "1/4"} select-none flex justify-center items-center text-lg ${div.text == "MAX" ? "bg-[#eab308]" : "bg-[#27262a]"}
								m-1 p-2 rounded-lg hover:cursor-pointer ${div.text == "MAX" ? "hover:bg-[#d7a614]" : "hover:bg-[#383a3f]"}
								`} onClick={()=>{ changeInput(div.text) }}>
									{div.text}
								</div>
							))
						}
					</div>
				</form>
			</div>
		</div>

		<div className="w-[70%] h-[95%] m-3 py-2 bg-[#525864] rounded-lg flex flex-col justify-between">
			<div className="w-full h-4/5 px-2">
			{
				multipliers[towerDifficulty - 1].map((div, key) => (
					<TowerLevel multiplier={div.multiplier} key={key} difficulty={towerDifficulty} clicked={reveal} id={key}/>
				))
			}
			</div>

			<div className="w-full p-1 m-1 flex justify-center items-center">
				<button className="w-2/3 h-full bg-[#e9b308] text-lg p-4 rounded-full hover:bg-[#eeba4a] select-none">
					WYPŁAĆ
				</button>
				{/* <button className="w-2/3 h-full bg-[#fd0100] text-lg p-4 rounded-full hover:bg-[#f34545]">
					ZAGRAJ PONOWNIE
				</button> */}
			</div>
		</div>
    </div>
	</>
  	);
}

export { Tower };