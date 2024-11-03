export interface IBoxProps{ 
    index: number,
    onDrop:(dropIdx:number)=>void,
    onDrag:(idx:number)=>void; 
}