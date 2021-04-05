
export interface Player{
    name: string,
    position: string;
    averagePoints: number;
    pic: string;
    assignedPostition?: string;
    averageAST?: number;
    averageREB?: number;
}

export interface Team{
    id: string,
    name: string,
    totalPoints: number,
    totalAst: number,
    totalReb: number,
    guards: Player[],
    forwards: Player[]
}


