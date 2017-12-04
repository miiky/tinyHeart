var momObj = function() {
	this.x = 0
	this.y = 0
	this.angle = 0
	this.bigEye = new Image()
	this.bigBody = new Image()
	this.bigTail = new Image()
	this.bigTailList = []

	this.bigTailTimer = 0
	this.bigTailCount = 0
}
momObj.prototype.init = function() {
	this.x = canWidth * 0.5
	this.y = canHeight * 0.5
	this.bigEye.src = './src/bigEye0.png'
	this.bigBody.src = './src/bigSwim0.png'
	this.bigTail.src = './src/bigTail0.png'
	for (var i = 0; i < 8; i++) {
		this.bigTailList[i] = new Image()
		this.bigTailList[i].src = './src/bigTail' + i + '.png'
	}
}
momObj.prototype.draw = function() {
	//lerp x,y
	this.x = lerpDistance(mx, this.x, 0.98)
	this.y = lerpDistance(my, this.y, 0.98)
	//delta angle
	var deltaY = my - this.y
	var deltaX = mx - this.x
	var beta = Math.atan2(deltaY, deltaX) + Math.PI
	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6)
	this.bigTailTimer += deltaTime
	if (this.bigTailTimer > 50) {
		this.bigTailCount = (this.bigTailCount + 1) % 8
		// console.log(this.babyTailList[this.babyTailCount].width)
		this.bigTail = this.bigTailList[this.bigTailCount]
		this.bigTailTimer %= 50
	}

	ctx1.save()
	ctx1.translate(this.x, this.y)
	ctx1.rotate(this.angle)
	ctx1.drawImage(this.bigTail, -this.bigTail.width * 0.5 + 30, -this.bigTail.height * 0.5)
	ctx1.drawImage(this.bigBody, -this.bigBody.width * 0.5, -this.bigBody.height * 0.5)
	ctx1.drawImage(this.bigEye, -this.bigEye.width * 0.5, -this.bigEye.height * 0.5)
	ctx1.restore()
}
