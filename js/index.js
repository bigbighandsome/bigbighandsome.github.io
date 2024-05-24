
let type = document.getElementById("type");
let str = "我们的首页";

typeText();
setInterval(function () {
    typeText(str);
}, 2000);
async function typeText(str = "我们的首页") {
    let box = document.createElement("div");
    box.innerText = str;
    box.style.opacity = 0;
    type.appendChild(box);
    type.innerText = "";
    for (let i = 0; i < str.length; i++) {
        await delay(100);
        type.textContent += str[i];
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}