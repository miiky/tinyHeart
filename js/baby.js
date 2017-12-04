var babyObj = function() {
	this.x
	this.y
	this.angle
	this.babyEye = new Image()
	this.babyBody = new Image()
	this.babyTail = new Image()
	this.babyTailList = []

	this.babyTailTimer = 0
	this.babyTailCount = 0
}
babyObj.prototype.init = function() {
	this.x = canWidth * 0.5 - 50
	this.y = canHeight * 0.5 + 50
	this.angle = 0
	this.babyEye.src = './src/babyEye0.png'
	this.babyBody.src = './src/babyFade0.png'
	this.babyTail.src = './src/babyTail0.png'

	//小鱼尾巴摆动序列帧
	// for (var i = 0; i < 8; i++) {
	// 	this.babyTailList[i] = new Image()
	// 	this.babyTailList[i].src = './src/babyTail' + i + '.png'
	// }
}
babyObj.prototype.draw = function() {
	//lerp x,y
	this.x = lerpDistance(mom.x, this.x, 0.98)
	this.y = lerpDistance(mom.y, this.y, 0.98)
	//delta angle
	var deltaY = mom.y - this.y
	var deltaX = mom.x - this.x
	var beta = Math.atan2(deltaY, deltaX) + Math.PI
	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6)
	//baby tail count
	// this.babyTailTimer += deltaTime
	// if (this.babyTailTimer > 50) {
	// 	this.babyTailCount = (this.babyTailCount + 1) % 8
	// 	// console.log(this.babyTailList[this.babyTailCount].width)
	// 	// this.babyTail = this.babyTailList[this.babyTailCount]
	// 	this.babyTailTimer %= 50
	// }

	ctx1.save()
	ctx1.translate(this.x, this.y)
	ctx1.rotate(this.angle)
	ctx1.drawImage(this.babyTail, -this.babyTail.width * 0.5 + 23, -this.babyTail.height * 0.5)
	ctx1.drawImage(this.babyBody, -this.babyBody.width * 0.5, -this.babyBody.height * 0.5)
	ctx1.drawImage(this.babyEye, -this.babyEye.width * 0.5, -this.babyEye.height * 0.5)
	ctx1.restore()
}
