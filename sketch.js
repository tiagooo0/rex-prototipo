let player, playerAgachado, enemy, enemyA;
let floor;
let gravity = 0.2;
let contador = 0;
let powerUp;
let min = 2000;
let max = 5000;
let salto = 0;
let Totalito = 0;
let aux = 0;
let aux1 = 0.09;
let playerFrame;
let playerFrame1;
let playerFrame2;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	createEnemy();
	createPlayer();
	createFloor();
	keyPressed();
	player.maxSpeed = 1.5;
	interval()
}

function draw() {
	background(0);
	if (document.getElementById('GameOver').style.display == 'block') {
		background(0,0,255)
	}
	contador = contador + aux1;
	deleteSprites();
	if (powerUp?.overlap(player)) {
		comidos++;
	}
	drawSprites();
	player.velocity.y += gravity;
	gameOver();
	document.getElementById('points').innerHTML = Math.ceil(contador);
}

// Cosas de PowerUp --------------------------------------------------------------------------
function createPowerUp() {
	let powerUpSpeed = 10 + contador / 20;
	powerUp = createSprite(width + 100, height - 81, 40);
	powerUp.setSpeed(powerUpSpeed, 180);
	powerUp.shapeColor = color(150, 150, 0);
	powerUp.collider = 'true';
}

// Cosas del Floor --------------------------------------------------------------------------
function createFloor() {
	floor = createSprite(0, height - 40, width * 2, 40);
	floor.shapeColor = color(123, 13, 153);
	floor.collider = 'static';
}
// Cosas del Enemy --------------------------------------------------------------------------
function createEnemy() {
	enemy = createSprite(width + 100, height - 81, 40, 40);	
	enemy.shapeColor = color(255, 5, 5);
	enemy.setSpeed(10 + contador / 10, 180);
}

function createEnemyAlto() {
	enemyA = createSprite(width + 100, height - 114, 40, 40);	
	enemyA.shapeColor = color(255, 5, 5);
	enemyA.setSpeed(10 + contador / 10, 180);
}

// Cosas del Player --------------------------------------------------------------------------
function createPlayer() {
  // let frame1	= loadImage('https://drive.google.com/drive/u/5/folders/1FNfrxAQg3AIKZ5LPc2EpfFAZO7nD54EF');
	// let frame2 	= loadImage('https://drive.google.com/drive/u/5/folders/1FNfrxAQg3AIKZ5LPc2EpfFAZO7nD54EF');
	// let frame3  = loadImage('https://drive.google.com/drive/u/5/folders/1FNfrxAQg3AIKZ5LPc2EpfFAZO7nD54EF');
	// let correrAnimacion = loadAnimation(
  //   frame1,
	// 	frame2,
	// 	frame3
  // )
	player = createSprite(100, height - 81, 40, 40);
	//player.addAnimation('correr', correrAnimacion);
}

function jumpPlayer() {
	if (player.position.y >= height - 90) {
		player.velocity.y = -5;
	}
}

function keyReleased() {
	if (keyCode == 83) {
		player.height += 10;
	}
}
function keyPressed() {
	if (keyCode === 87) {
		jumpPlayer();
		salto++;
	}
	if (keyCode === 83) {
		player.height -= 10;
	}
}

//Cosas generales del juego --------------------------------------------------------------------------
function deleteSprites() {
	if (enemy.position.x <= 0) {
		enemy.remove();
	}
	if (enemyA?.position.x <= 0) {
		enemyA.remove();
	}
	if (powerUp?.position.x <= 0) {
		powerUp.remove();
	}

	if (powerUp?.overlap(player)) {
		powerUp.remove();
		enemy.velocity + aux;
		aux + 5;
	}
	if (powerUp?.overlap(enemy)) {
		powerUp.remove();
	}
	if (document.getElementById('GameOver').style.display == 'block') {	
		player.remove();
		enemy.remove();
		enemyA.remove();
		floor.remove();
		powerUp?.remove()
		noLoop()
	}
}

function gameOver() {
	if (player.position.x < 0 || player.overlap(enemy) || (enemyA && player.overlap(enemyA))) {
		Totalito = contador - salto + aux;
		document.getElementById('GameOver').style.display = 'block';
		document.getElementById('cont').innerHTML = Math.ceil(contador);
		document.getElementById('salto').innerHTML = salto;
		document.getElementById('PuntuacionFinal').innerHTML = Math.ceil(Totalito);
		document.getElementById('points').style.display = 'none';
		document.getElementById('nDist').style.display = 'none';
	}
}

function interval() {
	setInterval(createEnemy, random(min, max));
	setInterval(createPowerUp, random(min + 8000, max + 8000));
	setInterval(createEnemyAlto, random(min, max));
}
