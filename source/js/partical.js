const docsize = [document.documentElement.clientWidth, document.documentElement.clientHeight],
dpr = window.devicePixelRatio

const maincanvas = document.getElementById("maincanvas")
const maincontent = maincanvas.getContext("2d")
maincanvas.width = docsize[0]
maincanvas.height = docsize[1]

const textcanvas = document.getElementById("textcanvas")
const textcontext = textcanvas.getContext("2d")
textcanvas.width = docsize[0]
textcanvas.height = docsize[1]

const color = ['#ffffff', '#b40b0b', '#ff4c94', '#f11010'],
    menu = document.getElementById("menu")

// 【粒子数组，动画时间， 聚拢速度，粒子活动速度，文字高度】
let [pointarr, time, joinspeed, pointspeed, fontsize] = [[], 0, 80, 4, 400]


class Point{
    constructor() {
        this.startx = Math.floor(Math.random() * docsize[0]),   // 初始起点
        this.starty = Math.floor(Math.random() * docsize[1]),
        this.speedx = (Math.random() * 2 - 1) * pointspeed,     // 移动速度
        this.speedy = (Math.random() * 2 - 1) * pointspeed, 
        this.endx = 0,                                          // 终点
        this.endy = 0,                    
        this.color = Math.floor(Math.random() * 5)              // 粒子颜色
    }
    endpoint(x, y) {
        this.endx = x
        this.endy = y
    }
    animal() {
        this.startx += this.speedx
        this.starty += this.speedy
        // 到达边界改变粒子运动方向
        this.speedy *= this.starty > docsize[1] || this.starty < 0 ? -1 : 1
        if(time < 140) this.speedx *= this.startx > docsize[0] || this.startx < 0 ? -1 : 1

        if(time === 140) {
            this.speedx = (Math.random() * -1 - 1) * pointspeed * 2 
            this.speedy = (Math.random() * 2 - 1) * pointspeed
        }
        // 调整点的移动速度用以聚和拼合文字
        if(time === 0) { 
            this.speedx = (this.endx - this.startx) / joinspeed
            this.speedy = (this.endy - this.starty) / joinspeed
        }
        // 到达终点后静止不动
        if(time === 0 + joinspeed) {
            this.speedx = 0
            this.speedy = 0
        }
        maincontent.beginPath()
        maincontent.fillStyle = color[this.color]
        maincontent.arc(this.startx, this.starty, 7, 0, Math.PI * 2)
        maincontent.fill()
    }
}

for (var i = 0; i < 609; i ++) {
    pointarr.push(new Point)
}

    
const backdrop = (text) => {
    // 【文字面积，循环时用于判读y轴高度，粒子大小间隔， 文字宽度】
    let [imgdata, cyclic, size, textwith] = [{}, 1, 16, 0]

    textcontext.font = "normal 900 " + fontsize + "px Avenir, Helvetica Neue, Helvetica, Arial, sans-serif"
    textwith = Math.floor(textcontext.measureText(text).width)
    textcontext.fillStyle = '#ff0000'
    textcontext.fillText(text, (docsize[0] - textwith) / 2, (docsize[1] + 200) / 2 )
    textwith = ~~ (textwith) * size + size
    
    // 获取文字所在区域，尽可能减小面积
    imgdata = textcontext.getImageData(0,0, textwith, (docsize[1] + 200) / 2)
    textcontext.clearRect(0, 0, docsize[0], docsize[1])

    // 粒子圆心坐标，粒子数组
    let [x, y, len] = [0, 0, 0]

    // 遍历data数据查找文字所在的坐标
    for (var i = 0; i < imgdata.data.length; i += size * 4) {
        if (imgdata.data[i] === 255 && imgdata.data[i+3] === 255) {

            // 判断当前粒子数量是否能够拼合文字
            if (len > pointarr.length - 1) pointarr.push(new Point)

            // 获取每个粒子聚拢的终点
            pointarr[len].endpoint(i /4 % textwith, cyclic)
            len ++
        }
        if (i/4 == cyclic * textwith) {
            cyclic += size
            i = textwith * (cyclic-1) * 4
        } 
    }
    pointarr.length - 1 - len > 0 ? pointarr.splice(len, pointarr.length - len) : ''
}

(function random() {
    // 指定时间重新生成文字
    if(time === 0) backdrop('Hello')
    maincontent.clearRect(0, 0, docsize[0], docsize[1])
    for (var i = 0; i < pointarr.length; i++) pointarr[i].animal(time)
    if (time === 200) menu.style.display = 'flex'
    if (time < 400) {
        window.requestAnimationFrame(random)
        time++
    }
})()
