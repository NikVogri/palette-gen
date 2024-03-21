// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (_) => {
	try {
		const url = "http://colormind.io/api/";
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify({ model: "default" }),
		});

		const data = await res.json();

		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (error) {
		console.log(error);
		return { statusCode: 500 };
	}
};

module.exports = { handler };
