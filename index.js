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
        this.snake_length=[[0,0]] //initial length of the snake
        this.unseeable=-10000
        this.snake_pointer=[]
        this.last_action=""
    }
    //x and y cordinates of the snake
    
    snake_position_updater(){
        let snake_context=this
        document.addEventListener('snakemover', function(event) {

            console.log(snake_context.snake_length)
            console.log(snake_context.snake_pointer)

          
            if(snake_context.snake_length[0][0]>490 ){
                snake_context.snake_length[0][0]=0
            }
            else if(snake_context.snake_length[0][0]<0){
                snake_context.snake_length[0][0]=490

            }
            if(snake_context.snake_length[0][1]>490 ){
                snake_context.snake_length[0][1]=0
            }
            else if(snake_context.snake_length[0][1]<0){
                snake_context.snake_length[0][1]=490

            }
            //starting snake movement
          
            if(event.detail==="ArrowRight"){
               if(snake_context.snake_length.length!=1){
                if(snake_context.last_action==="left") return 0
               }
                // snake_context.position_x+=10
                snake_context.last_action="right"
                snake_context.snake_length[0][0]+=10
                       
                snake_context.snake_pointer=snake_context.snake_length[0]
                for(let i=1;i<snake_context.snake_length.length;i++){

                        snake_context.snake_length[i][0]=snake_context.snake_pointer[0]-10
                        snake_context.snake_length[i][1]=snake_context.snake_pointer[1]
                        snake_context.snake_pointer=snake_context.snake_length[i]
                    
                }

                
            }
            else if(event.detail==="ArrowLeft"){
                // snake_context.position_x-=10
                if(snake_context.snake_length.length!=1){
                    if(snake_context.last_action==="right") return 0
                   }
                snake_context.last_action="left"

                snake_context.snake_length[0][0]-=10
                       
                snake_context.snake_pointer=snake_context.snake_length[0]
                for(let i=1;i<snake_context.snake_length.length;i++){

                        snake_context.snake_length[i][0]=snake_context.snake_pointer[0]+10
                        snake_context.snake_length[i][1]=snake_context.snake_pointer[1]
                        snake_context.snake_pointer=snake_context.snake_length[i]
                    
                }
            }
            else if(event.detail==="ArrowUp"){
                if(snake_context.snake_length.length!=1){
                    if(snake_context.last_action==="down") return 0
                   }
                // snake_context.position_y-=10
                snake_context.last_action="up"

                snake_context.snake_length[0][1]-=10
                       
                snake_context.snake_pointer=snake_context.snake_length[0]
                for(let i=1;i<snake_context.snake_length.length;i++){

                        snake_context.snake_length[i][0]=snake_context.snake_pointer[0]
                        snake_context.snake_length[i][1]=snake_context.snake_pointer[1]+10
                        snake_context.snake_pointer=snake_context.snake_length[i]
                    
                }
            }
            else if(event.detail==="ArrowDown"){
                // snake_context.position_y+=10
                if(snake_context.snake_length.length!=1){
                    if(snake_context.last_action==="up") return 0
                   }
                snake_context.last_action="down"

                snake_context.snake_length[0][1]+=10
                       
                snake_context.snake_pointer=snake_context.snake_length[0]
                for(let i=1;i<snake_context.snake_length.length;i++){

                        snake_context.snake_length[i][0]=snake_context.snake_pointer[0]
                        snake_context.snake_length[i][1]=snake_context.snake_pointer[1]-10
                        snake_context.snake_pointer=snake_context.snake_length[i]
                    
                }
            }
           
           
        });
        
    }

    snake_drawer(){
        for(let i=0;i<this.snake_length.length;i++){
            if(i===0){

                this.ctx.fillStyle = "darkred";
                this.ctx.fillRect(this.snake_length[i][0], this.snake_length[i][1], 10, 10);  
            }
            else{

            
            this.ctx.fillStyle = "#FF0000";
            this.ctx.fillRect(this.snake_length[i][0], this.snake_length[i][1], 10, 10);
            }
        }
    }


    snake_motion(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake_drawer()
        this.ctx.fillStyle="green"
        this.ctx.fillRect(this.fruit_x, this.fruit_y, 10, 10);
        //collission detection
        if(this.snake_length[0][0]===this.fruit_x && this.snake_length[0][1]===this.fruit_y){
            console.log(this.snake_pointer[0])
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.snake_length.push([this.snake_pointer[0]-10,this.snake_pointer[1]])
            
            this.snake_drawer()
            this.fruit_x=this.unseeable
            this.fruit_y=this.unseeable
            this.fruit_position_placer()
           
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

