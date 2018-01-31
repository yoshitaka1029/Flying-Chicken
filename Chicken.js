
var W = 400, H = 600;
var ctx;
var gravity = 0.5, velocity = 0, lift = -10;
var x = W/6, y = H/2, radius = 20;

//ボムのインスタンス
var boms = [new Bom(W, Math.random()*559+1, 40)]

//
var addInterval = 70
var addIntervalTime = addInterval


function init(){
	var canvas = document.getElementById("canvas")
	ctx = canvas.getContext('2d')
	draw()
	requestAnimationFrame(init)
}

function draw(){
	//画面のリセット
	ctx.clearRect(0,0,W,H)

	//チキン
	Chicken()

	for(var i=0; i < boms.length; i++){
		boms[i].show()
		boms[i].update()
	}

	//１フレームごとにマイナス１	
	addIntervalTime -= 1
	//addIntervalTimeが０になるとボム追加
	if (addIntervalTime == 0){
		var b = new Bom(W, Math.random()*559+1, 40)
		boms.push(b)
		addIntervalTime = addInterval
	}
	//画面から消えたボムを配列から取り除く
	for (var i = 0; i < boms.length; i++){
		if (boms[i].x < -50){
			boms.splice(i, 1)
		}
	}
}

//チキンのオブジェクト
function Chicken(){

	//スペースでチキンアップ
	window.document.onkeydown = function(e){
		if (e.key === ' ') {
			velocity += lift
		}
	}

	//チキンにかかる重力
	velocity += gravity
	y += velocity

	//上辺と下辺との衝突判定＆チキンの動きの停止
	if (y + radius >= H) {
		velocity = 0
		y = H - radius
	}
	if (y - radius < 0) {
		velocity = 0
		y = 0 + radius
	}

	//チキンの描写
	ctx.beginPath()
	ctx.arc(x, y, radius, 0, Math.PI*2, true)
	ctx.fill()
}

//ボムのコンストラクター
function Bom(x, y, radius){
	this.x = x
	this.y = y
	this.radius = radius

	this.show = function() {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true)
		ctx.fill()
	}

	this.update = function(){
		this.x -= 3
	}
}
