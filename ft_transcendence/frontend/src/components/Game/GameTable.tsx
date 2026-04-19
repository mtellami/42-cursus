import Sketch from "react-p5";
import p5Types from "p5";
import { styled } from "styled-components";
import Bios from "./Bios-Map.png";
import Freaks from "./Freaks-Map.png";
import Pandora from "./Pandora-Map.png";
import Comondo from './Commodore-Map.png'
import { useContext, useEffect, useState } from "react";
import SocketContext from "../../context/Socket"
import { Navigate, useNavigate } from "react-router-dom";

interface GameStateProps {
  status: 'playing' | 'break' | 'gameover';
  ballX: number;
  ballY: number;
  player1Y: number;
  player2Y: number;
  player1H: number;
  player2H: number;
  player1Score : number;
  player2Score : number;
}

const GameTable = () => {
	const navigate = useNavigate()
  const socket = useContext(SocketContext)
  const FACTOR = 1.666;
  const ballRadius = 10;
  let tableWidth = window.innerWidth / 2;
  let tableHeight = tableWidth / FACTOR;

	useEffect(() => {
		return () => {
			localStorage.removeItem('liveGame')
		}
	}, [])

	const gameState = {
    status: 'break',
    ballX: tableWidth / 2,
    ballY: tableHeight / 2,
    player1Y: tableHeight / 2,
    player2Y: tableHeight / 2,
    player1H: 120,
    player2H: 120,
    player1Score : 0,
    player2Score : 0,
  } as GameStateProps;

  useEffect(() => {
		socket.on('game_coordinates', (data: GameStateProps) => {
      gameState.status = data.status;
      gameState.ballX = data.ballX;
      gameState.ballY = data.ballY;
      gameState.player1Y = data.player1Y ;
      gameState.player2Y = data.player2Y;
      gameState.player1H = data.player1H;
      gameState.player2H = data.player2H;
      gameState.player1Score = data.player1Score;
      gameState.player2Score = data.player2Score;
    })
  }, [])

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(tableWidth, tableHeight).parent(canvasParentRef);
    p5.frameRate(60);
    p5.ellipseMode(p5.CENTER);
    p5.rectMode(p5.CENTER);
  }

  const drawscenterLine = (p5: p5Types) => {
    p5.stroke("#656565");
    p5.strokeWeight(4);
    p5.line(tableWidth / 2, 10, tableWidth / 2, tableHeight - 10);
  }

  const drawball = (p5: p5Types) => {
    p5.fill("white");
    p5.noStroke();
    p5.ellipse(
      gameState.ballX * (tableWidth / 1000),
      gameState.ballY *  (tableHeight / 600),
      ballRadius * 2 * (tableWidth / 1000),
      ballRadius * 2 * (tableWidth / 1000)
    )
  }

  const drawPadlle = (p5: p5Types) => {
    p5.fill("white");
    p5.noStroke();
    p5.rect(
      10 * (tableWidth / 1000),
      gameState.player1Y *  (tableHeight / 600),
      20 * (tableWidth / 1000),
      gameState.player1H *  (tableHeight / 600),
      5,
      5,
      5,
      5
    );
    p5.rect(
      tableWidth - 10 * (tableWidth / 1000),
      gameState.player2Y *  (tableHeight / 600),
      20 * (tableWidth / 1000),
      gameState.player2H *  (tableHeight / 600),
      5,
      5,
      5,
      5
    );
  };

	const draw = (p5: p5Types) => {
    p5.clear();
    if(gameState.status === 'playing'){
      drawscenterLine(p5);
      drawball(p5);
      drawPadlle(p5);
      socket.emit('game_paddel', p5.mouseY - 60);
    }
    if(gameState.status === 'break'){
			drawscenterLine(p5);
      p5.textSize(32);
      p5.text('Break', tableWidth / 2 - 40, tableHeight / 2 - 40);
      drawball(p5);
      drawPadlle(p5)
    }
    if(gameState.status === 'gameover'){
			drawscenterLine(p5);
			drawball(p5);
			drawPadlle(p5);
			(async () => {
      	p5.textSize(32);
      	p5.text('Game Over', tableWidth / 2 - 90, tableHeight / 2);
				localStorage.removeItem('liveGame')
				await new Promise(resolve => setTimeout(resolve, 2000));
				navigate('/Wichgame')
			})();
    }
    p5.textSize(32);
    p5.text(`${gameState.player1Score}`, 50, 50);
    p5.text(`${gameState.player2Score}`, tableWidth - 50, 50);
  };

  return (
		<>
    	<Container style={{ width: tableWidth, height: tableHeight }}>
      	<div className="map">
       		<img src={'https://fakeimg.pl/600x400/000000/000000'} alt="map"></img>
      	</div>
      	<Sketch setup={setup} draw={draw} />
    	</Container>
		</>
  )
};

export default GameTable;

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0.5rem auto auto auto;
  border-radius: 20px;
  overflow: hidden;
  > .react-p5 {
    width: fit-content;
    height: fit-content;
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
