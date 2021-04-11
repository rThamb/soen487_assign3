
export interface Player{
    id: string,
    name: string,
    position: string;
    averagePoints: number;
    pic: string;
    assignedPosition?: string;
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
    forwards: Player[],
    owner: string
}


