$(document).ready(function () {
    // 定义随机默认壁纸的路径
    const defaultBgPath = './static/img/bgs/bg';
    // 随机选择一张壁纸
    function getRandomBg() {
        const randomIndex = 1 + Math.floor(Math.random() * 10); // 假设有10张壁纸
        return `${defaultBgPath}${randomIndex}.jpg`;
    }
    // 设置背景图片
    function setBgImg() {
        $('#bg').attr('src', getRandomBg());
    }
    // 页面加载时设置背景图片
    setBgImg();
});
