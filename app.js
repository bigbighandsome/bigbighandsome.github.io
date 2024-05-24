const os = require('os');
const app = require('express')();

// 获取当前主机的网络接口信息
const networkInterfaces = os.networkInterfaces();

// 过滤出 IPv4 地址并排除 localhost
const ipv4Addresses = Object.values(networkInterfaces)
	.flat()
	.filter((info) => info.family === 'IPv4' && info.internal === false);

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

// 获取第一个可用的 IPv4 地址和端口号
if (ipv4Addresses.length > 0) {
	const { address } = ipv4Addresses[0];
	const port = process.env.PORT || 1314; // 或者您使用的端口号

	const currentAddress = `http://${address}:${port}`;
	app.listen(port, () => {
		console.log('当前运行地址:', currentAddress);
	});
} else {
	console.log('无法获取当前运行地址');
}
