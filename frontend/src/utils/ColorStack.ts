export class ColorStack<T> {
    private values:T[] =[];

    push(item:T){
        this.values.push(item);
    }

    pop():T|undefined{
        return this.values.pop();
    }

    peek():T|undefined{
        return this.values[this.values.length-1];
    }

    clear(){
        this.values=[];
    }

    isEmpty():boolean{
        return this.values.length===0;
    }
    
}