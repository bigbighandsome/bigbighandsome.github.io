const app = require('express')();

const port = 80;

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Origin', '*');
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});

app.get('/', (req, res) => {
	res.send('hello world');
});

app.listen(port, () => {
	console.log(`server is running on localhost:${port}`);
});
