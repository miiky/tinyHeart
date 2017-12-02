var ctx1,
	ctx2,
	lastTime,
	deltaTime,
	bgPic = new Image(),
	canWidth,
	canHeight,
	ane,
	fruit,
	mom,
	baby,
	mx,
	my

document.body.onload = game

function game() {
	init()
	lastTime = Date.now()
	deltaTime = 0
	gameloop()
}
function init() {
	var can1 = document.getElementById('canvas1')
	var can2 = document.getElementById('canvas2')
	ctx1 = can1.getContext('2d')
	ctx2 = can2.getContext('2d')

	can1.addEventListener('mousemove', onMouseMove, false)

	canWidth = can1.width
	canHeight = can1.height
	bgPic.src = './src/background.jpg'

	ane = new aneObj()
	ane.init()

	fruit = new fruitObj()
	fruit.init()

	mom = new momObj()
	mom.init()

	baby = new babyObj()
	baby.init()

	mx = canWidth * 0.5
	my = canHeight * 0.5
}

function gameloop() {
	window.requestAnimFrame(gameloop)
	var now = Date.now()
	deltaTime = now - lastTime
	deltaTime = deltaTime > 40 ? 40 : deltaTime
	lastTime = now

	drawBackground()
	ane.draw()

	fruitMonitor()
	fruit.draw()

	ctx1.clearRect(0, 0, canWidth, canHeight)
	mom.draw()
	baby.draw()

	momFruitsCollision()
}

function onMouseMove(e) {
	if (e.offSetX || e.layerX) {
		mx = e.offSetX == undefined ? e.layerX : e.offSetX
		my = e.offSetY == undefined ? e.layerY : e.offSetY
	}
}
