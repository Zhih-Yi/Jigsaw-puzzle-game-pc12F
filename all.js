var app=new Vue({
    el:'#app',
    data:{
        isStarted:false, 
        playAgain:false,
        ranPosition:[],
        correct:[],
        isLoading:true
    },
    methods: {
        NewGame(){
            this.isStarted=true;
            this.playAgain=false; 
            this.correct.splice(0);
            this.setPuzzlePosition();
         
        } ,
        setPuzzlePosition(){
      
            let pieces=document.querySelectorAll('.puzzle_pieces');
            this.ranPosition=[];
            pieces.forEach((value)=>{
                let ranPositionTop= Math.floor(Math.random()*390);
                let ranPositionRight=Math.floor(Math.random()*390);
                  //擺回拼圖片
                document.querySelector('.puzzle-box div').appendChild(value);
               //設定拼圖片的隨機位置
                this.ranPosition.push(`position:absolute;top:${ranPositionTop}px;right:${ranPositionRight}px;`);
              
            })
 

            //清空拼圖坂
           let puzzleBoxs=document.querySelectorAll('.puzzleEmpty');
           puzzleBoxs.forEach((value)=>{
            value.innerHTML='';
           });
         },
        allowDrop(event){
            event.preventDefault();     
        }, 
        drop(ev) {
         //抓拼圖 抓過來的拼圖
        let Id = ev.dataTransfer.getData('id');
        let dragPieces = document.getElementById(Id);
        if (dragPieces === null) return
        let index = Id.substr(Id.length-1);
        
        //放拼圖
        let dropId = ev.target.id 
        let dropBox = document.getElementById(dropId)
        //放到拼圖板上
        if (dropBox.className  === 'puzzleEmpty') {
        //取消隨機固定位置放到拼圖板上
        this.ranPosition.splice(index-1,1,'');

        dropBox.append(dragPieces);
       
        }
        //檢查拼出來沒有
         let puzzleId=Id.substr(Id.length-1);
         let boxId= dropId.substr(dropId.length-1);
         //拼到正確拼圖板位置就不能移動
         if(puzzleId===boxId){
            dragPieces.setAttribute('draggable', false);
            this.correct.push(puzzleId);
         }
         //全部拼對，拼圖片區域重新加入拼圖片
          if(this.correct.length===9){
            this.isStarted=false;
            let pieces=document.querySelectorAll('.puzzle_pieces');
            pieces.forEach(function(value){
                document.querySelector('.puzzle-box div').appendChild(value);
           
            }); 
            this.playAgain=true;               
         } 
        },
      drag(ev) {
          //拖曳時傳遞資料id
            ev.dataTransfer.setData("id", ev.target.id);
    } 
    },
    mounted() {
        let vm=this;
        setTimeout(function(){
            vm.isLoading=false; 
        },1500)
    },
    
})