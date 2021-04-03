
export interface Player{
    name: string,
    position: string;
    averagePoints: number;
}

export interface Team{
    name: string,
    totalPoints: number,
    players: Player[]
}

