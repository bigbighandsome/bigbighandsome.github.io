// const app = require('express')();

// const port = 80;

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Headers', '*');
// 	res.header('Access-Control-Allow-Origin', '*');
// 	if (req.method === 'OPTIONS') {
// 		res.sendStatus(200);
// 	} else {
// 		next();
// 	}
// });

// app.get('/', (req, res) => {
// 	res.send('hello world');
// });

// app.listen(port, () => {
// 	console.log(`server is running on localhost:${port}`);
// });

const fs = require('fs');
const path = require('path');

// 函数用于遍历目录下的所有文件
function traverseDirectory(dir, fileList = []) {
	const files = fs.readdirSync(dir);
	for (let i = 0; i < files.length; i++) {
		/**
		 * file
		 * @type {string} file - file
		 */
		let file = files[i];

		const name = file.split('.')[0];
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			// 如果是文件夹，递归遍历子文件夹
			traverseDirectory(filePath, fileList);
		} else {
			// 如果是文件，将相对路径和文件名存入对象中，并加入到数组中
			const relativePath = path.relative(__dirname, filePath);
			if (
				relativePath.startsWith('.git') ||
				relativePath.startsWith('.github') ||
				relativePath.startsWith('asset') ||
				relativePath.startsWith('windowsIcon') ||
				relativePath.startsWith('css') ||
				relativePath.startsWith('js') ||
				relativePath === 'app.js'
			) {
				continue;
			}
			fileList.push({ path: relativePath, name: name });
		}
	}

	return fileList;
}
console.log(__dirname);

// 遍历当前目录
const fileList = traverseDirectory(path.join(__dirname, 'imgs'));

// 将结果写入config.json文件
const outputDir = path.join(__dirname);
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir);
}

// const configPath = path.join(outputDir, 'config.json');
const configPath = path.join('./config.json');
fs.writeFileSync(configPath, JSON.stringify(fileList, null, 2));

console.log('config.json 文件已生成在 out 目录下。');
