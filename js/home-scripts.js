// 下面实现的是滚动后的两个窗口(div圈住)fade-in-out的实现

// 获取主要的div元素
const mainDiv = document.querySelector(".main-div");
// 获取第二个div元素
const secondDiv = document.querySelector(".second-div");
console.log(mainDiv);

// 监听窗口滚动事件：
window.addEventListener("scroll", function(){
    // 当滚动距离大于某个值时，第一个div添加fade-out类；否则移除
    if(this.window.scrollY > 100) {
        mainDiv.classList.add("fade-out");
        secondDiv.classList.add("fade-in");

    } else {
        mainDiv.classList.remove("fade-out");
        secondDiv.classList.remove("fade-in");
    }
});


// 这里再添加一个滚动监听器，用于实现滚动进度条
window.addEventListener("scroll", function(){
    // 获取页面总高度
    const totalHeight = document.documentElement.scrollHeight - this.window.innerHeight;
    //获取滚动高度
    const scrolled = window.scrollY;
    // 计算滚动百分比
    const progress = (scrolled / totalHeight) * 100;
    // 更新进度条宽度
    this.document.getElementById("progress-bar").style.width = progress + "%";
});