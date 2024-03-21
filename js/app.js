const cardsContainer = document.getElementById("cards");
const generateButton = document.querySelector(".generate-btn");

const getColors = async () => {
	const url = "/.netlify/functions/palette";
	const res = await fetch(url, {
		method: "GET",
	});

	const data = await res.json();
	return data.result;
};

const rgbToHex = (rgb) => {
	return "#" + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
};

const appendToHtml = (colors) => {
	let string = ``;

	colors.forEach((color) => {
		string += `
    <div class="card" data-hex="${color}">
        <div class="card__color" style="background-color: ${color};"></div>
        <div class="card__hex">${color}</div>
      </div>
    `;
	});

	cardsContainer.innerHTML = string;

	document.querySelectorAll(".card").forEach((card) => {
		card.addEventListener("click", (e) => {
			const hexValue = card.getAttribute("data-hex");
			navigator.clipboard.writeText(hexValue);
			displayNotification(hexValue);
		});
	});
};

const init = async () => {
	const colors = await getColors();

	const hexColors = colors.map((color) => {
		return rgbToHex(color);
	});

	appendToHtml(hexColors);
};

generateButton.addEventListener("click", (e) => {
	init();
});

document.addEventListener("keypress", (e) => {
	if (e.key == " ") init();
});

const displayNotification = (color) => {
	const notification = document.createElement(`div`);
	notification.classList.add("notification");
	notification.textContent = `Color ${color} copied to your clipboard`;

	document.body.appendChild(notification);

	setTimeout(() => {
		notification.style.animation = "animateNotificationOut .5s ease-in";
	}, 1500);

	setTimeout(() => {
		document.body.removeChild(notification);
	}, 2000);
};

init();
