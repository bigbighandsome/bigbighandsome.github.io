/**
 * iconData
 * @type {Array} iconData - iconData
 */
let iconData;
let folders;
let file;
let app;
let softwareData;
let lastData;
let allIconItemData;
let allFolderIconItemData;
let allFileIconItemData;
let allAppIconItemData;
let type;
let curPage = 'home';
let noShowBackBtnPage = ['home', 'folders', 'file', 'company', 'software'];
const baseUrl = 'https://micaui.github.io/WindowsIconCustomization/';
const deconstructionFileData = (file) => {
	return {
		pic: file.path,
		tip: file.name,
		url: baseUrl + file.path,
		name: file.name,
		company: file.company,
		app: file.app,
		type: file.type,
	};
};
const convertConfigToIconData = (config) => {
	const data = [];

	for (const company in config) {
		if (company === 'folders') {
			continue;
		}
		const apps = [];

		for (const app in config[company]) {
			let fileList;
			if (config[company][app].FileTypeIcon) {
				if (config[company][app].FileTypeIcon._files)
					fileList = config[company][app].FileTypeIcon._files;
			} else {
				if (config[company][app].AppIcon._files)
					fileList = config[company][app].AppIcon._files;
			}
			const appData = [];

			fileList.forEach((file) => {
				const fileData = deconstructionFileData(file);
				appData.push(fileData);
			});

			apps.push({
				[app]: appData,
			});
		}

		data.push({
			[company]: apps,
		});
	}

	return data;
};
const convertFoldersToFoldersData = (folders) => {
	const data = [];

	for (const folder in folders) {
		let fileList = folders[folder]._files;

		const folderData = [];

		fileList.forEach((file) => {
			const fileData = deconstructionFileData(file);
			folderData.push(fileData);
		});

		data.push({
			[folder]: folderData,
		});
	}

	return data;
};
const convertConfigToFileData = (config) => {
	const data = [];

	for (const company in config) {
		if (company === 'folders') {
			continue;
		}
		const apps = [];

		for (const app in config[company]) {
			let fileList;
			if (config[company][app].FileTypeIcon) {
				if (config[company][app].FileTypeIcon._files)
					fileList = config[company][app].FileTypeIcon._files;
			} else {
				continue;
			}
			const appData = [];

			fileList.forEach((file) => {
				const fileData = deconstructionFileData(file);
				appData.push(fileData);
			});

			apps.push({
				[app]: appData,
			});
		}

		data.push({
			[company]: apps,
		});
	}

	return data;
};
const convertConfigToAppData = (config) => {
	const data = [];

	for (const company in config) {
		if (company === 'folders') {
			continue;
		}
		const apps = [];

		for (const app in config[company]) {
			let fileList;
			if (config[company][app].AppIcon) {
				if (config[company][app].AppIcon._files)
					fileList = config[company][app].AppIcon._files;
			} else {
				continue;
			}
			const appData = [];

			fileList.forEach((file) => {
				const fileData = deconstructionFileData(file);
				appData.push(fileData);
			});

			apps.push({
				[app]: appData,
			});
		}
		if (apps.length !== 0) {
			data.push({
				[company]: apps,
			});
		}
	}

	return data;
};
const convertConfigToSoftwareData = (config) => {
	const data = [];

	for (const company in config) {
		if (company === 'folders') {
			continue;
		}
		const apps = [];

		for (const app in config[company]) {
			let fileList;
			if (config[company][app].FileTypeIcon) {
				if (config[company][app].FileTypeIcon._files)
					fileList = config[company][app].FileTypeIcon._files;
			} else {
				if (config[company][app].AppIcon._files)
					fileList = config[company][app].AppIcon._files;
			}
			const appData = [];

			fileList.forEach((file) => {
				const fileData = deconstructionFileData(file);
				appData.push(fileData);
			});

			apps.push({
				[app]: appData,
			});
		}

		data.push(...apps);
	}

	return data;
};
document.addEventListener('DOMContentLoaded', function () {
	$.getJSON('../../config.json', function (_config) {
		//data 代表读取到的json中的数据
		iconData = convertConfigToIconData(_config);
		folders = convertFoldersToFoldersData(_config['folders']);
		file = convertConfigToFileData(_config);
		app = convertConfigToAppData(_config);
		softwareData = convertConfigToSoftwareData(_config);
		allIconItemData = extractData(iconData, true);
		allFolderIconItemData = extractData(folders, true);
		allFileIconItemData = extractData(file, true);
		allAppIconItemData = extractData(app, true);
		allIconItemData.push(...allFolderIconItemData);
		doms.sum.innerText = `(${countSpecificTypeObjects(iconData)})`;
		doms.sum.style.opacity = 1;
		// createIconWrapElement(iconData);
		createHomePage();
	});
});
let curLeftNavStatus = true;
const toggleLeftNav = () => {
	console.log('toggle');
	curLeftNavStatus = !curLeftNavStatus;
	curLeftNavStatus ? showLeftNav() : hideLeftNav();
};
const showLeftNav = () => {
	curLeftNavStatus = true;
	doms.leftNav.classList.remove('hide');
	doms.leftNav.classList.remove('show');
	doms.leftNav.classList.add('show');
};
const hideLeftNav = () => {
	curLeftNavStatus = false;
	doms.leftNav.classList.remove('hide');
	doms.leftNav.classList.remove('show');
	doms.leftNav.classList.add('hide');
};
const doms = {
	/**
	 * coverImgShow
	 * @type {HTMLImageElement} coverImgShow - coverImgShow
	 */
	coverImgShow: document.querySelector('.showInfo .coverImgShow'),
	/**
	 * infoList
	 * @type {HTMLUListElement} infoList - infoList
	 */
	infoList: document.querySelector('.showInfo .infoList'),
	/**
	 * close
	 * @type {HTMLDivElement} close - close
	 */
	close: document.querySelector('.showInfo .close'),
	/**
	 * showInfo
	 * @type {HTMLDivElement} showInfo - showInfo
	 */
	showInfo: document.querySelector('.showInfo'),
	/**
	 * inputIcon
	 * @type {HTMLSpanElement} inputIcon - inputIcon
	 */
	inputIcon: document.querySelector('.inputIcon'),
	/**
	 * small
	 * @type {HTMLInputElement} small - small
	 */
	small: document.querySelector('.small'),
	/**
	 * control
	 * @type {HTMLDivElement} control - control
	 */
	control: document.querySelector('.leftNav .control'),
	/**
	 * mainHome
	 * @type {HTMLLIElement} mainHome - mainHome
	 */
	mainHome: document.querySelector('.mainHome'),
	/**
	 * app
	 * @type {HTMLLIElement} app - app
	 */
	app: document.querySelector('.app'),
	/**
	 * mainHome
	 * @type {HTMLLIElement} mainHome - mainHome
	 */
	mainHome: document.querySelector('.mainHome'),
	/**
	 * fileBook
	 * @type {HTMLLIElement} fileBook - fileBook
	 */
	folders: document.querySelector('.folders'),
	/**
	 * file
	 * @type {HTMLLIElement} file - file
	 */
	file: document.querySelector('.file'),
	/**
	 * company
	 * @type {HTMLLIElement} company - company
	 */
	company: document.querySelector('.company'),
	/**
	 * software
	 * @type {HTMLLIElement} software - software
	 */
	software: document.querySelector('.software'),
	/**
	 * sum
	 * @type {HTMLLIElement} sum - sum
	 */
	sum: document.querySelector('.mainContent .sum'),
	/**
	 * searchInput
	 * @type {HTMLInputElement} searchInput - searchInput
	 */
	searchInput: document.querySelector('.searchInput'),
	/**
	 * leftNav
	 * @type {HTMLDivElement} leftNav - leftNav
	 */
	leftNav: document.querySelector('.leftNav'),
	/**
	 * content
	 * @type {HTMLDivElement} content - content
	 */
	content: document.querySelector('.mainContent .content'),
	/**
	 * back
	 * @type {HTMLDivElement} back - back
	 */
	back: document.querySelector('.mainContent .back'),
};
let inputHasFocus = false;

const search = () => {};
// Notification.requestPermission().then(function (permission) {
// 	if (permission === 'granted') {
// 		new Notification('页面有变化,请更新');
// 	}
// });

doms.close.addEventListener('click', (e) => {
	hideShowInfo();
});

doms.close.addEventListener('click', (e) => {
	hideShowInfo();
});

doms.inputIcon.addEventListener('click', (e) => {
	search();
});
doms.small.addEventListener('click', (e) => {
	showLeftNav();
	doms.searchInput.focus();
});

doms.control.addEventListener('click', (e) => {
	toggleLeftNav();
});
/**
 * setCurStatus
 * @param {HTMLElement} who - who
 */
const setCurStatus = (who) => {
	[
		doms.mainHome,
		doms.folders,
		doms.file,
		doms.app,
		doms.company,
		doms.software,
	].forEach((d) => {
		if (who != d) d.classList.remove('cur');
	});
	who.classList.add('cur');
};
doms.mainHome.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createHomePage();
});
doms.folders.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createFoldersPage();
});
doms.file.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createFilePage();
});
doms.app.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createAppPage();
});
doms.company.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createCompanyPage();
});
doms.software.addEventListener('click', (e) => {
	setCurStatus(e.target);
	createSoftwarePage();
});
doms.searchInput.addEventListener('focusin', (e) => {
	inputHasFocus = true;
	// doms.leftNav.classList.add('show');
});
doms.searchInput.addEventListener('focusout', (e) => {
	inputHasFocus = false;
	// doms.leftNav.classList.remove('show');
});

function extractData(
	obj,
	more = false,
	targetCount = 7,
	targetType = 'tip',
	extractedData = []
) {
	// Helper function to recursively traverse the object
	function traverse(obj) {
		// Check if the target count has been reached
		if (extractedData.length === targetCount && !more) {
			return;
		}

		// Check if the current object is an array
		if (Array.isArray(obj)) {
			// If it's an array, traverse each element
			obj.forEach((element) => traverse(element));
		} else if (typeof obj === 'object' && obj !== null) {
			// If it's an object, check if it contains the target type
			if (obj[targetType]) {
				extractedData.push(obj);
			}
			// Traverse each key-value pair
			Object.values(obj).forEach((value) => traverse(value));
		}
	}

	// Start traversing the object
	traverse(obj);
	if (!more) {
		return extractedData.slice(0, targetCount); // Return only the required number of extracted data
	} else {
		return extractedData;
	}
}

function countSpecificTypeObjects(obj, targetType = 'tip') {
	let count = 0;

	function traverse(obj) {
		if (Array.isArray(obj)) {
			obj.forEach((element) => traverse(element));
		} else if (typeof obj === 'object' && obj !== null) {
			if (obj[targetType]) {
				count++;
			}
			Object.values(obj).forEach((value) => traverse(value));
		}
	}

	traverse(obj);

	return count;
}

const createHomePage = () => {
	curPage = 'home';
	createIconItemElement(allIconItemData);
	doms.sum.innerText = `(${countSpecificTypeObjects(allIconItemData)})`;
	hideBack();
};
const createFoldersPage = () => {
	curPage = 'folders';
	createIconItemElement(allFolderIconItemData);
	doms.sum.innerText = `(${countSpecificTypeObjects(allFolderIconItemData)})`;
	hideBack();
};
const createFilePage = () => {
	curPage = 'file';
	createIconItemElement(allFileIconItemData);
	doms.sum.innerText = `(${countSpecificTypeObjects(allFileIconItemData)})`;
	hideBack();
};
const createAppPage = () => {
	curPage = 'app';
	createIconItemElement(allAppIconItemData);
	doms.sum.innerText = `(${countSpecificTypeObjects(allAppIconItemData)})`;
	hideBack();
};
const createCompanyPage = () => {
	curPage = 'company';
	createIconWrapElement(iconData);
	doms.sum.innerText = `(${countSpecificTypeObjects(iconData)})`;
	hideBack();
};

const createSoftwarePage = () => {
	curPage = 'software';
	createAppElement(softwareData);
	doms.sum.innerText = `(${countSpecificTypeObjects(softwareData)})`;
	hideBack();
};
const createIconWrapElement = (what) => {
	doms.content.innerHTML = '';
	what.forEach((data) => {
		const companyName = Object.keys(data)[0];
		const allIconNum = countSpecificTypeObjects(data[companyName]);
		const iconWrap = document.createElement('div');
		const showIconData = extractData(data[companyName]);
		iconWrap.id = companyName;
		iconWrap.classList.add('iconWrap');
		iconWrap.innerHTML = `<div class="iconWrapContent">
	        <div class="smallIconWrap">
	        </div>
	    </div>
	    <div class="bottomInfo">
	        <p class="name">
	            ${companyName}
	        </p>
	        <span class="sum">
	            (${allIconNum})
	        </span>
	    </div>`;
		doms.content.appendChild(iconWrap);
		const iconWrapContent = iconWrap.querySelector('.iconWrapContent');
		const smallIconWrap = iconWrap.querySelector('.smallIconWrap');
		for (let i = 0; i < showIconData.length; i++) {
			if (i >= 3) {
				const smallIcon = document.createElement('div');
				smallIcon.classList.add('smallIcon');
				smallIcon.innerHTML = `<img src="${showIconData[i].pic}" alt="">`;
				smallIconWrap.appendChild(smallIcon);
			} else {
				const bigIcon = document.createElement('div');
				bigIcon.classList.add('bigIcon');
				bigIcon.innerHTML = `<img src="${showIconData[i].pic}" alt="">`;
				iconWrapContent.insertBefore(bigIcon, smallIconWrap);
			}
		}
		iconWrapContent.addEventListener('click', () => {
			lastData = what;
			type = 'wrap';
			curPage = 'canShowBack';
			createAppElement(data[companyName]);
		});
	});
	hideBack();
	doms.content.classList.remove('showIconItem');
	doms.content.classList.add('showIconWrap');
};

const createAppElement = (data = []) => {
	doms.content.innerHTML = '';
	data.forEach((d) => {
		const appName = Object.keys(d)[0];
		const allIconNum = countSpecificTypeObjects(d[appName]);
		const iconWrap = document.createElement('div');
		const showIconData = extractData(d[appName]);
		iconWrap.id = appName;
		iconWrap.classList.add('iconWrap');
		iconWrap.innerHTML = `<div class="iconWrapContent">
	        <div class="smallIconWrap">
	        </div>
	    </div>
	    <div class="bottomInfo">
	        <p class="name">
	            ${appName}
	        </p>
	        <span class="sum">
	            (${allIconNum})
	        </span>
	    </div>`;
		doms.content.appendChild(iconWrap);
		const iconWrapContent = iconWrap.querySelector('.iconWrapContent');
		const smallIconWrap = iconWrap.querySelector('.smallIconWrap');
		for (let i = 0; i < showIconData.length; i++) {
			if (i >= 3) {
				const smallIcon = document.createElement('div');
				smallIcon.classList.add('smallIcon');
				smallIcon.innerHTML = `<img src="${showIconData[i].pic}" alt="">`;
				smallIconWrap.appendChild(smallIcon);
			} else {
				const bigIcon = document.createElement('div');
				bigIcon.classList.add('bigIcon');
				bigIcon.innerHTML = `<img src="${showIconData[i].pic}" alt="">`;
				iconWrapContent.insertBefore(bigIcon, smallIconWrap);
			}
		}
		iconWrapContent.addEventListener('click', () => {
			type = 'app';
			lastData = data;
			createIconItemElement(d[appName]);
		});
	});
	showBack();
	console.log(curPage);
	if (noShowBackBtnPage.includes(curPage)) {
		hideBack();
	}
	doms.content.classList.remove('showIconItem');
	doms.content.classList.add('showIconWrap');
};
const showInfoDataInit = {
	pic: '',
	app: '',
	company: '',
	type: [],
};
let showInfoData = showInfoDataInit;
const extractDataToShowInfo = (infoData, showInfoData) => {
	for (const key in showInfoData) {
		if (infoData[key] !== undefined) {
			showInfoData[key] = infoData[key];
		}
	}
};

/**
 * addEventListenerInfoItemClickWillGo
 * @type {HTMLDivElement} infoItem - infoItem
 * @type {string} key - key
 * @type {string} will - will
 */
const addEventListenerInfoItemClickWillGo = (
	infoItem = new HTMLDivElement(),
	key,
	will
) => {
	switch (key) {
		case 'company': {
			infoItem.removeEventListener('click', (e) => {
				hideShowInfo();
				createCompanyPage();
			});
			infoItem.addEventListener('click', (e) => {
				hideShowInfo();
				createCompanyPage();
				setTimeout(() => {
					location.href = `#${will}`;
				}, 1);
			});
			break;
		}
		case 'app': {
			infoItem.removeEventListener('click', (e) => {
				hideShowInfo();
				createAppPage();
			});
			infoItem.addEventListener('click', (e) => {
				hideShowInfo();
				createSoftwarePage();
				setTimeout(() => {
					location.href = `#${will}`;
				}, 1);
			});
			break;
		}
	}
};

const showShowInfo = (infoData) => {
	console.log(infoData);
	extractDataToShowInfo(infoData, showInfoData);
	doms.coverImgShow.src = showInfoData.pic;
	for (key in showInfoData) {
		if (key === 'pic' || showInfoData[key] === '') {
			continue;
		}
		const infoItem = document.createElement('li');
		infoItem.classList.add('infoItem');
		infoItem.innerHTML = `<div class="what" title="${key}">${key}</div>
                        <div class="info" title="${showInfoData[key]}">${showInfoData[key]}</div>`;
		if (key === 'company' || key === 'app') {
			addEventListenerInfoItemClickWillGo(
				infoItem,
				key,
				showInfoData[key]
			);
		}
		doms.infoList.appendChild(infoItem);
	}
	doms.showInfo.classList.remove('show');
	doms.showInfo.classList.remove('hide');
	doms.showInfo.classList.add('show');
};

const hideShowInfo = () => {
	doms.infoList.innerHTML = '';
	showInfoData = showInfoDataInit;
	doms.showInfo.classList.remove('show');
	doms.showInfo.classList.remove('hide');
	doms.showInfo.classList.add('hide');
};

const createIconItemElement = (data) => {
	doms.content.innerHTML = '';
	data.forEach((d) => {
		const iconItem = document.createElement('div');
		iconItem.classList.add('iconItem');
		iconItem.title = d.tip;
		iconItem.innerHTML = `<img id="${d.name}" src="${d.pic}" alt="">`;
		iconItem.addEventListener('click', () => {
			// window.open(d.url);
			showShowInfo(d);
		});
		doms.content.appendChild(iconItem);
	});
	showBack();
	// if (!noShowBackBtnPage.includes(curPage)) {
	// showBack();
	// }
	doms.content.classList.remove('showIconWrap');
	doms.content.classList.add('showIconItem');
};
// createHomeElement();
let isBackShow = false;
const hideBack = () => {
	doms.back.style.opacity = 0;
	isBackShow = false;
};
const showBack = () => {
	doms.back.style.opacity = 1;
	isBackShow = true;
};
const back = () => {
	if (!isBackShow) {
		return;
	}
	switch (type) {
		case 'wrap': {
			createIconWrapElement(iconData);
			break;
		}
		case 'app': {
			createAppElement(lastData);
		}
	}
	type = 'wrap';
};
doms.back.addEventListener('click', back);

{
	// 	<div class="iconWrap">
	//     <div class="iconWrapContent">
	//         <div class="bigIcon">
	//             <img src="./asset/1716458856474.png" alt="">
	//         </div>
	//         <div class="bigIcon">
	//             <img src="./asset/1716515782501.png" alt="">
	//         </div>
	//         <div class="bigIcon">
	//             <img src="./asset/1716515799621.png" alt="">
	//         </div>
	//         <div class="smallIconWrap">
	//             <div class="smallIcon">
	//                 <img src="./asset/1716515811590.png" alt="">
	//             </div>
	//             <div class="smallIcon">
	//                 <img src="./asset/1716515811590.png" alt="">
	//             </div>
	//             <div class="smallIcon">
	//                 <img src="./asset/1716515811590.png" alt="">
	//             </div>
	//             <div class="smallIcon">
	//                 <img src="./asset/1716515811590.png" alt="">
	//             </div>
	//         </div>
	//     </div>
	//     <div class="bottomInfo">
	//         <p class="name">
	//             xygod
	//         </p>
	//         <span class="sum">
	//             (99)
	//         </span>
	//     </div>
	// </div>
}
