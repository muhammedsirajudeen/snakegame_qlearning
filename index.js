//the width and height 49*49 that is just scaled down version of 490*490

class Snake{
    constructor(){
        this.canvas=document.querySelector(".canvas")
        this.canvas.height=500
        this.canvas.width=500
        this.ctx=this.canvas.getContext("2d")
        this.position_x=0
        this.position_y=0
        this.fruit_x=0
        this.fruit_y=0
        // this.snake_length=1
        this.unseeable=-10000
      
    }
    //x and y cordinates of the snake
    
    snake_position_updater(){
        let snake_context=this
        document.addEventListener('snakemover', function(event) {
            
           
          
            if(snake_context.position_x>490 ){
                snake_context.position_x=0
            }
            else if(snake_context.position_x<0){
                snake_context.position_x=490

            }
            if(snake_context.position_y>490){
                snake_context.position_y=0
            }
            else if(snake_context.position_y<0){
                snake_context.position_y=490
            }
          
            if(event.detail==="ArrowRight"){
                
                snake_context.position_x+=10
                
            }
            else if(event.detail==="ArrowLeft"){
                snake_context.position_x-=10
            }
            else if(event.detail==="ArrowUp"){
                snake_context.position_y-=10
            }
            else if(event.detail==="ArrowDown"){
                snake_context.position_y+=10
            }
           
           
        });
        
        }


    snake_motion(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.position_x, this.position_y, 10, 10);
        this.ctx.fillStyle="green"
        this.ctx.fillRect(this.fruit_x, this.fruit_y, 10, 10);
        if(this.position_x===this.fruit_x && this.position_y===this.fruit_y){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = "#FF0000";
            this.ctx.fillRect(this.position_x, this.position_y, 10, 10);
            this.fruit_x=this.unseeable
            this.fruit_y=this.unseeable
            this.fruit_position_placer()
            this.snake_length+=10
        }
        requestAnimationFrame(this.snake_motion.bind(this))
    }
    initial_fruit_position_placer(){
       
            let x=Math.floor(Math.random() * 49)*10;
            let y=Math.floor(Math.random()*49)*10
            while(this.position_x===x && this.position_y===y ){
                x==Math.floor(Math.random() * 49)*10;
                y==Math.floor(Math.random() * 49)*10;
            }
            //just placing the fruit on a place where it is not the snake
            this.fruit_x=x
            this.fruit_y=y
     


    }
    fruit_position_placer(){
        setTimeout(()=>{
            let x=Math.floor(Math.random() * 49)*10;
            let y=Math.floor(Math.random()*49)*10
            while(this.position_x===x && this.position_y===y ){
                x==Math.floor(Math.random() * 49)*10;
                y==Math.floor(Math.random() * 49)*10;
            }
            //just placing the fruit on a place where it is not the snake
            this.fruit_x=x
            this.fruit_y=y
        },2000)


    }



}

snake_class=new Snake()
snake_class.snake_position_updater()
snake_class.initial_fruit_position_placer()
snake_class.snake_motion()


let upbutton=document.querySelector(".upbutton")
let downbutton=document.querySelector(".downbutton")
let leftbutton=document.querySelector(".leftbutton")
let rightbutton=document.querySelector(".rightbutton")

upbutton.addEventListener("click",()=>{
    const clickEvent = new CustomEvent('snakemover',{detail:"ArrowUp"});

    document.dispatchEvent(clickEvent)
})
downbutton.onclick=()=>{
    const clickEvent = new CustomEvent('snakemover',{detail:"ArrowDown"});

    document.dispatchEvent(clickEvent)

}
leftbutton.onclick=()=>{
    const clickEvent = new CustomEvent('snakemover',{detail:"ArrowLeft"});

    document.dispatchEvent(clickEvent)

}
rightbutton.onclick=()=>{
    const clickEvent = new CustomEvent('snakemover',{detail:"ArrowRight"});

    document.dispatchEvent(clickEvent)

}

