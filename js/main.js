/**
 * 程序入口js文件
 */
var ctx1, //画布1
	ctx2, //画布2
	lastTime, //上一次绘制序列帧的时间
	deltaTime, //相邻两帧的时间间隔
	bgPic = new Image(), //背景图片
	canWidth, //画布宽度
	canHeight, //画布高度
	ane, //海葵
	fruit, //食物
	mom, //妈妈大鱼
	baby, //宝宝小鱼
	mx, //大鱼位置x坐标
	my //大鱼位置y坐标

//启动
document.body.onload = game

function game() {
	//初始化canvas画布
	init()
	lastTime = Date.now()
	deltaTime = 0
	//循环绘制
	gameloop()
}
function init() {
	//初始化画布
	var can1 = document.getElementById('canvas1')
	var can2 = document.getElementById('canvas2')
	ctx1 = can1.getContext('2d')
	ctx2 = can2.getContext('2d')

	//给上层画布添加鼠标移动事件
	can1.addEventListener('mousemove', onMouseMove, false)

	//背景图片
	canWidth = can1.width
	canHeight = can1.height
	bgPic.src = './src/background.jpg'
	//初始化海葵
	ane = new aneObj()
	ane.init()
	//初始化食物
	fruit = new fruitObj()
	fruit.init()
	//初始化大鱼
	mom = new momObj()
	mom.init()
	//初始化小鱼
	baby = new babyObj()
	baby.init()
	//初始化大鱼位置
	mx = canWidth * 0.5
	my = canHeight * 0.5
}

function gameloop() {
	//以fps智能检测的方式绘制canvas序列帧
	window.requestAnimFrame(gameloop)
	var now = Date.now()
	deltaTime = now - lastTime
	deltaTime = deltaTime > 40 ? 40 : deltaTime
	lastTime = now

	//绘制背景图
	drawBackground()
	ane.draw()

	//绘制食物
	fruitMonitor()
	fruit.draw()

	//绘制大小鱼
	ctx1.clearRect(0, 0, canWidth, canHeight)
	mom.draw()
	baby.draw()

	//检测是否吃到食物
	momFruitsCollision()
}

//鼠标监听事件，让鱼往鼠标的方向移动
function onMouseMove(e) {
	if (e.offSetX || e.layerX) {
		mx = e.offSetX == undefined ? e.layerX : e.offSetX
		my = e.offSetY == undefined ? e.layerY : e.offSetY
	}
}
