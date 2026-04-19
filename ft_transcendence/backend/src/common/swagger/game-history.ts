import { ApiProperty } from "@nestjs/swagger";

class GameHistoryUserData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    avatar: string; 
}

export class GameHistorySwagger {
    @ApiProperty()
    id: string;
    @ApiProperty()
    winnerScore: number;
    @ApiProperty()
    loserScore: number;
    @ApiProperty()
    at: Date;
    @ApiProperty()
    winner: GameHistoryUserData;
    @ApiProperty()
    loser: GameHistoryUserData;
}
