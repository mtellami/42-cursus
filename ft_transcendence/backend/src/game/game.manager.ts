import { LiveGameType } from "datatype/live-game.type";
import { SocketUser } from "datatype/socket-ws.type";
import { Server } from "socket.io";
import * as EVENTS from "src/common/constants/constants";
import { sleep } from "src/common/utils/date-time";


let [nextCX, nextCY] = [0, 0]

export async function gameManager(
    server: Server, sender: SocketUser,
    receiver: SocketUser, liveGame: LiveGameType,
    ): Promise<{winner: string, loser: string, score1: number, score2: number}> {
  	    sender.game.paddel = 300;
  	    receiver.game.paddel = 300;
				let gameFinish : any;
        let player1Y = 300;
        let player2Y = 300;
        const FRAME_RATE = 60;
        const PADDLE_HEIGHT = 120;
        const BALL_RADIUS = 10;
        const INITIAL_SPEED = 8;
        const TABLE_WIDTH = 1000;
        const TABLE_HEIGHT = 600;
        let speed = INITIAL_SPEED;
        let gameStatus: 'playing' | 'break' | 'gameover' = 'break';
	
        const player1 = {
            id : liveGame.sender.id,
            positionY : TABLE_HEIGHT / 2,
            paddleHeight : PADDLE_HEIGHT,
            score : 0,
        }
    
        const player2 = {
            id : liveGame.receiver.id,
            positionY : TABLE_HEIGHT / 2,
            paddleHeight : PADDLE_HEIGHT,
            score : 0,
        }
    
        const table = {
            height : TABLE_HEIGHT,
            width : TABLE_WIDTH,
            topLimit : BALL_RADIUS,
            bottomLimit : TABLE_HEIGHT - BALL_RADIUS,
            leftLimit : BALL_RADIUS,
            rightLimit : TABLE_WIDTH - BALL_RADIUS,
        }
    
        const ball = {
            x : TABLE_WIDTH / 2,
            y : TABLE_HEIGHT / 2,
            r : BALL_RADIUS,
            velocityX : speed,
            velocityY : speed,
            width: 20,
            height: 20,
        }
    
        const updatescore = (x : number) =>{
            let update = false;
            [nextCX, nextCY] = [ball.x + ball.velocityX, ball.y + ball.velocityY];
            if (x - BALL_RADIUS <= table.leftLimit && !Collision(nextCX, nextCY)) {
                player2.score++;
                update = true;
            } else if (x + BALL_RADIUS >= table.rightLimit && !Collision(nextCX, nextCY)) {
                player1.score++;
                update = true;
            }
            if (update) {
                // server.to(liveGame.id).emit(EVENTS.WS_GAME_EVENT_COORDINATES, gameCore());
                if(player1.score == 5 || player2.score == 5){
                    gameStatus = 'gameover';
                }
                else {
                    gameStatus = 'break';
                }
            }
            return update;
        }
    
    
        const Collision = (cx: number, cy: number) => {
            const leftGoalLine = 30;
            const rightGoalLine = table.width - 30;
            const [y2, h2] = [player1Y - (player1.paddleHeight / 2), player1.paddleHeight];
            const [y3, h3] = [player2Y - (player2.paddleHeight / 2), player2.paddleHeight];
    
            const isCollisionPlayer1 =
                cx - BALL_RADIUS <= leftGoalLine && cx - BALL_RADIUS >= 20 && cy >= y2 && cy <= y2 + h2;
            const isCollisionPlayer2 =
                cx + BALL_RADIUS >= rightGoalLine &&
                cx + BALL_RADIUS <= table.width - 20 &&
                cy >= y3 &&
                cy <= y3 + h3;
            return isCollisionPlayer1 || isCollisionPlayer2;
        };

        const gameCore = (): any => {
            [nextCX, nextCY] = [ball.x + ball.velocityX, ball.y + ball.velocityY];
            if(sender.game.paddel <= table.height - player1.paddleHeight/2 &&
            sender.game.paddel >= player1.paddleHeight/2){
                player1Y = sender.game.paddel;
            }
            if (receiver.game.paddel <= table.height - player2.paddleHeight/2 &&
                receiver.game.paddel >= player2.paddleHeight/2){
                player2Y = receiver.game.paddel;
            }
            if (nextCY < table.topLimit || nextCY > table.bottomLimit) {
                ball.velocityY *= -1;
            }
            if (Collision(nextCX, nextCY)) {
                ball.velocityX *= -1;
            }
            // if (nextCX < table.leftLimit || nextCX > table.rightLimit) {
            //     ball.velocityX *= -1;
            // }

            let gameState = {
                status: gameStatus,
                ballX: nextCX,
                ballY: nextCY,
                player1Y: player1Y,
                player2Y: player2Y,
                player1H: player1.paddleHeight,
                player2H: player2.paddleHeight,
                player1Score: player1.score,
                player2Score: player2.score,
            };

            ball.x = nextCX;
            ball.y = nextCY;
            return gameState;
        }

        const initgoal = () => {
            ball.x = TABLE_WIDTH / 2;
		    ball.y = TABLE_HEIGHT / 2;
            player1.positionY = TABLE_HEIGHT / 2;
		    player2.positionY =  TABLE_HEIGHT / 2;
            ball.velocityX = speed;
            ball.velocityY = speed;
        }
        
        const GameLoop = async () => {
            await sleep(1000);
            while (sender.connected && receiver.connected) {
                if (gameStatus === 'break') {
            		await sleep(400);
                    initgoal();
                    gameStatus = 'playing';
                    // }
                }
                else if (gameStatus === 'gameover') {
                    const winner = player1.score > player2.score ? player1 : player2;
                    const loser = player2.score < player1.score ? player2 : player1;
                    gameFinish = {
                        winner : winner.id,
                        loser : loser.id,
                        score1 : player1.score,
                        score2 : player2.score,
                    }
					return gameFinish;
                }
                else {
                    updatescore(ball.x);
            	}
				server.to(liveGame.id).emit(EVENTS.WS_GAME_EVENT_COORDINATES, gameCore());
                await sleep(1000 / FRAME_RATE);
            }
				gameStatus = 'gameover';
				server.to(liveGame.id).emit(EVENTS.WS_GAME_EVENT_COORDINATES, gameCore());

			return {
				winner: sender.disconnected ? receiver.user.id : sender.user.id,
				loser: sender.disconnected ? sender.user.id: receiver.user.id,
				score1: 5,
				score2: 0,
			}

    }
    return GameLoop();
}
