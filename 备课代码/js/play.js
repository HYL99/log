var myCanvas = document.getElementById('myCanvas')
var ctx = myCanvas.getContext('2d')
// 设置关卡
// scrollBar 转动球的数量 waitBar 等待球的数量 speed 转动的速度

var leaveArr = [{
	scrollBar: 3,
	waitBar: 5,
	speed: 200
}, {
	scrollBar: 4,
	waitBar: 6,
	speed: 180
}, {
	scrollBar: 5,
	waitBar: 7,
	speed: 160
}, {
	scrollBar: 6,
	waitBar: 5,
	speed: 140
}, {
	scrollBar: 7,
	waitBar: 5,
	speed: 120
}, {
	scrollBar: 8,
	waitBar: 5,
	speed: 100
}, {
	scrollBar: 9,
	waitBar: 5,
	speed: 80
}]
// 封装函数用来获取url参数
function getQueryString() {
	return location.search.split('=')[1]
}

getQueryString()
// 设置转动球
var scrollBarArr = []
// 转动球的数量
var scrollBarNum = leaveArr[getQueryString() - 1].scrollBar
// 给转动球设置角度
//console.log(scrollBarNum)
for(var i = 0; i < scrollBarNum; i++) {
	var angle = (360 / scrollBarNum) * i
	scrollBarArr.push({
		angle: angle,
		content: ''
	})
}
// 设置等待球
var waitBarArr = []
// 等待球的数量
var waitBarNum = leaveArr[getQueryString() - 1].waitBar
for(var i = 0; i < waitBarNum; i++) {
	waitBarArr.push({
		angle: '',
		content: i + 1
	})
}

// 中间大圆
function drawBig() {
	ctx.save()
	ctx.beginPath()
	ctx.arc(400, 200, 50, 0, Math.PI * 2)
	ctx.closePath()
	ctx.fill()
	ctx.restore()

	// 设置关卡
	ctx.save()
	ctx.translate(400, 200)
	ctx.font = '60px 微软雅黑'
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.fillStyle = '#eed5b7'
	ctx.fillText(getQueryString(), 0, 0)
	ctx.restore()
}

// 绘制转动球
function drawScoll() {
	for(var i = 0; i < scrollBarArr.length; i++) {
		scrollBarArr[i].angle += 10
		if(scrollBarArr[i].angle >= 360) {
			scrollBarArr[i].angle = 0
		}
		// 画线
		ctx.save()
		ctx.translate(400, 200)
		ctx.rotate(Math.PI / 180 * scrollBarArr[i].angle)
		ctx.beginPath()
		ctx.moveTo(0, 0)
		ctx.lineTo(0, -150)
		ctx.closePath()
		ctx.stroke()
		ctx.restore()

		// 画圆
		ctx.save()
		ctx.translate(400, 200)
		ctx.rotate(Math.PI / 180 * scrollBarArr[i].angle)
		ctx.beginPath()
		ctx.arc(0, -150, 10, 0, Math.PI * 2)
		ctx.closePath()
		ctx.fill()
		ctx.restore()
		// 设置文字
		ctx.save()
		ctx.translate(400, 200)
		ctx.rotate(Math.PI / 180 * scrollBarArr[i].angle)
		ctx.font = '16px 微软雅黑'
		ctx.fillStyle = 'white'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillText(scrollBarArr[i].content, 0, -150)
		ctx.restore()
	}
}

// 绘制等待球
function drawWaitBar() {
	for(var i = 0; i < waitBarArr.length; i++) {
		ctx.save()
		ctx.translate(400, 200)
		ctx.beginPath()
		ctx.arc(0, 200 + 30 * i, 10, 0, Math.PI * 2)
		ctx.closePath()
		ctx.fill()
		ctx.restore()
		// 文字
		ctx.save()
		ctx.translate(400, 200)
		ctx.font = '16px 微软雅黑'
		ctx.fillStyle = 'white'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillText(waitBarArr[i].content, 0, 200 + 30 * i)
		ctx.restore()
	}
}
// 初始化
function init() {
	drawScoll()
	drawBig()
	drawWaitBar()
}
init()
// 滚动球旋转
setInterval(function() {
	ctx.clearRect(0, 0, 800, 390)
	drawScoll()
	drawBig()
}, leaveArr[getQueryString() - 1].speed)
// 页面点击
document.onclick = function() {
	var obj = waitBarArr.shift()
	obj.angle = 170
	scrollBarArr.push(obj)
	ctx.clearRect(0, 390, 800, 410)
	drawWaitBar()
	// 闯关成功的判断
	if(waitBarArr.length == 0) {
		alert('闯关成功')
		location.href = 'index.html?leave=' + (+getQueryString() + 1)
	}
	var flag = false
	// 闯关失败的判断
	for(var i = 0; i < scrollBarArr.length; i++) {
		for(var j = 0; j < scrollBarArr.length; j++) {
			if(i != j) {
				if(scrollBarArr[j].angle == scrollBarArr[i].angle) {
					flag = true
				}
			}
		}
	}
	if(flag) {
		alert('闯关失败')
		location.href = 'index.html?leave=1'
	}

}