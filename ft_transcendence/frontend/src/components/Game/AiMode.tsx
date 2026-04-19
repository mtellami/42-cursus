import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import styled from "styled-components";
import Bios from "./Bios-Map.png";
import Freaks from "./Freaks-Map.png";
import Pandora from "./Pandora-Map.png";
import Comondo from './Commodore-Map.png'
import { useNavigate } from "react-router-dom";

const COM_LEVEL = 1;
const PLAYER_WIDHT = 20;
const PLAYER_HEIGTH = 100;
const START_BALL_SPEED = 1;
const BALL_DELTA_SPEED = 0.1;
const FACTOR = 1.666;
let tableWidth =  1000;
let tableHeight = tableWidth / FACTOR;


interface GameProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  score?: number;
  speed?: number;
  velocityX?: number;
  velocityY?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  radius?: number;
}

const getMap = (map: string) => {
  switch (map) {
    case "bios":
      return Bios;
    case "pandora":
      return Pandora;
    case "freax":
      return Freaks;
		case "comodore":
			return Comondo
		default:
			return 'https://fakeimg.pl/600x400/000000/000000'
  }
};

const player: GameProps = {
  x: 0,
  y: 0,
  width: PLAYER_WIDHT,
  height: PLAYER_HEIGTH,
  color: "red",
  score: 0,
};

const computer: GameProps = {
  x: tableWidth - PLAYER_WIDHT,
  y: tableHeight / 2 - PLAYER_HEIGTH / 2,
  width: PLAYER_WIDHT,
  height: PLAYER_HEIGTH,
  color: "blue",
  score: 0,
};

const ball = {
  x: tableWidth / 2,
  y: tableHeight / 2,
  width: 20,
  height: 20,
  speed: START_BALL_SPEED,
  velocityX: 5,
  velocityY: 5,
  color: "blue",
  radius: 10,
};

const drawPadlle = (p5: p5Types) => {
  p5.fill("white");
  p5.noStroke();
  p5.rect(
    player.x * (tableWidth / 1000),
    player.y *  (tableHeight / 600),
    20 * (tableWidth / 1000),
    player.height *  (tableHeight / 600),
    5,
    5,
    5,
    5
  );
  p5.rect(
    computer.x * (tableWidth / 1000),
    computer.y *  (tableHeight / 600),
    20 * (tableWidth / 1000),
    computer.height *  (tableHeight / 600),
    5,
    5,
    5,
    5
  );
};

const drawball = (p5: p5Types) => {
  p5.fill("white");
  p5.noStroke();
  p5.ellipse(
    ball.x * (tableWidth / 1000),
    ball.y *  (tableHeight / 600),
    ball.radius * 2 * (tableWidth / 1000),
    ball.radius * 2 * (tableWidth / 1000)
  );
};

const drawscenterLine = (p5: p5Types) => {
  p5.stroke("#656565");
  p5.strokeWeight(4);
  p5.line(tableWidth / 2, 10, tableWidth / 2, tableHeight - 10);
};

const render = (p5: p5Types) => {
  player.y = p5.mouseY - 50;
  if  (player.y < 0) player.y = 0
  if (player.y > tableHeight - player.height) player.y = tableHeight - player.height
  // p5.background("white");
  p5.clear()
  drawscenterLine(p5);
  drawPadlle(p5);
  drawball(p5);
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function resetBall() {
  ball.x = tableWidth / 2;
  ball.y = tableHeight / 2;
  ball.speed = START_BALL_SPEED;
  if (ball.velocityX) ball.velocityX = -ball.velocityX;
}

function collision(ball: GameProps, selectPlayer: GameProps) {
  if (!ball.radius) return;
  ball.top = ball.y - ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;
  ball.right = ball.x + ball.radius;

  selectPlayer.top = selectPlayer.y;
  selectPlayer.bottom = selectPlayer.y + selectPlayer.height;
  selectPlayer.left = selectPlayer.x;
  selectPlayer.right = selectPlayer.x + selectPlayer.width;
  return (
    ball.right > selectPlayer.left &&
    ball.bottom > selectPlayer.top &&
    ball.left < selectPlayer.right &&
    ball.top < selectPlayer.bottom
  );
}

const Game: React.FC = () => {
  const [score, setScore] = useState<{l:number, r:number}>({l: 0, r: 0})
  const navigate = useNavigate();
	const [map, setMap] = useState<string>('')

	useEffect(() => {
		const gameMap = localStorage.getItem('gameMap')
		if (gameMap) setMap(gameMap)
		return () => {
			computer.score = 0;
			player.score = 0
			localStorage.removeItem('liveGame')
		}
	}, [])

const update = (p5: p5Types) => {
  if (ball.speed && ball.velocityX && ball.velocityY) {
    ball.x += ball.velocityX * ball.speed;
    ball.y += ball.velocityY * ball.speed;
    if (ball.y + ball.radius > tableHeight || ball.y - ball.radius < 0) {
      ball.velocityY = -ball.velocityY;
    }
    let selectPlayer = ball.x < tableWidth / 2 ? player : computer;
    if (collision(ball, selectPlayer)) {
      ball.velocityX = -ball.velocityX;
     if (ball.speed < 2.3) 
      	ball.speed += BALL_DELTA_SPEED;
    }
  }
  let targetPos = ball.y - computer.height / 2;
  let currentPOS = computer.y;
  computer.y = lerp(currentPOS, targetPos, COM_LEVEL);
  if  (computer.y < 0) computer.y = 0
  if (computer.y > tableHeight - computer.height) computer.y = tableHeight - computer.height
  if (ball.x + ball.width < 0) {
    if (computer.score !== undefined) computer.score++;
    resetBall();
  } else if (ball.x + ball.width > tableWidth) {
    if (player.score !== undefined) player.score++;
    resetBall();
  }
  if (player.score !== undefined && computer.score !== undefined) {
    setScore({l: player.score, r: computer.score});
    if (player.score == 5) {
      p5.textSize(32);
      p5.text('You Win', tableWidth / 2, tableHeight / 2);
      localStorage.removeItem('liveGame')
    }
    if (computer.score == 5) {
			(async () => {
      	p5.textSize(32);
      	p5.text('Game Over', tableWidth / 2 - 90, tableHeight / 2);
				localStorage.removeItem('liveGame')
				await new Promise(resolve => setTimeout(resolve, 2000));
				navigate('/Wichgame')
			})();
    }
  }
};

  

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(tableWidth, tableHeight).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
		if(!localStorage.getItem('liveGame')) return
    render(p5);
    update(p5);
  };

  return (
    <Container
      style={{
        width: tableWidth,
        height: tableHeight,
      }}
    >
      <span className='absolute top-5 left-10 text-3xl font-bold z-10'>{score?.l ? score?.l : 0}</span>
      <span className='absolute top-5 right-10 text-3xl font-bold z-10'>{score?.r ? score?.r : 0}</span>
      <div className="map">
        <img src={getMap(map)} alt="map"></img>
      </div>

      <Sketch setup={setup} draw={draw} />
    </Container>
  );
};

export default Game;


const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0.5rem auto auto auto;
  border-radius: 15px;
  overflow: hidden;
  > .react-p5 {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
  .map {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      width: 125%;
      top: 12%;
      left: 50%;
      transform: translate(-50%, -20%);
    }
  }
`;
