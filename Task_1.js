var random=0;
var clicks=0;
var sc1=0;
var sc2=0;
var Hsc1=0;
var Hsc2=0;
var hsc1=0;
var hsc2=0;
var arr1=[0,0,0,0,0,0]
var arr2=[0,0,0,0,0,0]
var player1_pic_id=[1,21,41,61,81];
var player2_pic_id=[11,31,51,71,91];
var player1_kill_id=[1,21,41,61,81];
var player2_kill_id=[11,31,51,71,91];
hsc1 = window.localStorage.getItem("hsc1");
document.querySelector(".highscore1").innerHTML = "Highest1: " + hsc1;
hsc2 = window.localStorage.getItem("hsc2");
document.querySelector(".highscore2").innerHTML = "Highest2: " + hsc2;
var decision = prompt("Welcome to Spider WebDev Task1 !!!"+"\n"+"Choose your side(H/T):");
if(decision == null){
    decision = prompt("Choose (H/T):");
}
function toss(){
    x = (Math.floor(Math.random()*2) == 0);
    if(x){
        alert("Tossing coin -"+"\n"+"Got Heads!"+"\n"+"Start game.");
        if(decision=="H"){
            document.getElementById("btn2").disabled = true;
        }
        else{
            document.getElementById("btn1").disabled = true;
            clicks=-1;
        }
    } 
    else{
        alert("Tossing coin -"+"\n"+"Got Tails!"+"\n"+"Start game.");
        if(decision=="T"){
            document.getElementById("btn2").disabled = true;
        }
        else{
            document.getElementById("btn1").disabled = true;
            clicks=-1;
        }
    }
};
toss(); 
document.getElementById('btn1').onclick = function() {
    clickedSound.play();
    clicks++;
    clicked();
    if(arr1.includes(7)){
        kill(arr1);
        ShootSound.play();
    }
    else{
        random=getRndInteger(1,6);
        alert("Player1 Generated Box Number: "+random); 
        gameLogic();
    }
};
document.getElementById('btn2').onclick = function() {
    clickedSound.play();
    clicks++;
    clicked();
    if(arr2.includes(7)){
        kill(arr2);
        ShootSound.play();
    }
    else{
        random=getRndInteger(1,6);
        alert("Player2 Generated Box Number: "+random); 
        gameLogic();
    }
};
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
function clicked(){
    if(clicks%2==0){
        document.getElementById("btn2").disabled = true;
        document.getElementById("btn1").disabled = false;
    }
    else{
        document.getElementById("btn2").disabled = false;
        document.getElementById("btn1").disabled = true;
    }
};
function gameLogic(){
    if(clicks%2==1){
        if(random==1){
            build(arr1,0,player1_pic_id[0]);
            player1_pic_id[0]++;
        }
        else if(random==2){
            build(arr1,1,player1_pic_id[1]);
            player1_pic_id[1]++;
        }
        else if(random==3){
            build(arr1,2,player1_pic_id[2]);
            player1_pic_id[2]++;
        }
        else if(random==4){
            build(arr1,3,player1_pic_id[3]);
            player1_pic_id[3]++;
        }
        else if(random==5){
            build(arr1,4,player1_pic_id[4]);
            player1_pic_id[4]++;
        }
        winner();
    }
    else{
        if(random==1){
            build(arr2,0,player2_pic_id[0]);
            player2_pic_id[0]++;
        }
        else if(random==2){
            build(arr2,1,player2_pic_id[1]);
            player2_pic_id[1]++;
        }
        else if(random==3){
            build(arr2,2,player2_pic_id[2]);
            player2_pic_id[2]++;
        }
        else if(random==4){
            build(arr2,3,player2_pic_id[3]);
            player2_pic_id[3]++;
        }
        else if(random==5){
            build(arr2,4,player2_pic_id[4]);
            player2_pic_id[4]++;
        }
        winner();
    }
};
function build(arr,index,no){
    arr[index]++;
    if(arr[index]<10){
    var pic="img"+no;
    document.getElementById(pic).style.display="block"; 
    if(no%10==5){
        var n=no+1;
        pic="img"+n;
        document.getElementById(pic).style.display="block";
        if(arr==arr1){
            player1_pic_id[index]++;
        }
        else{
            player2_pic_id[index]++;
        }
    }  
    scoring();
    }
    else{
        return;
    }
};
function kill(arr){
    var indx=arr.indexOf(7);
    var opp_kill_box_no = prompt("Enter Box Number to kill: ");
    alert("Killing Box Number: "+opp_kill_box_no); 
    if(arr==arr1){
        var loopv=player2_kill_id[opp_kill_box_no-1];
        for(var k = loopv; k<(loopv+8); k++){
            var kill_img = "img"+k;
            document.getElementById(kill_img).style.display="none";
        }
        arr2[opp_kill_box_no-1]=0;
        player2_pic_id[opp_kill_box_no-1]=loopv;
        arr1[indx]--;
        player1_pic_id[indx]--;
        sc1+=50;
        document.getElementById("score1").innerHTML="Score1 : "+sc1;
        var bullet_id = "img" + (player1_kill_id[indx]+7);
        document.getElementById(bullet_id).style.display="none";
    }
    else{
        var loopv=player1_kill_id[opp_kill_box_no-1];
        for(var k = loopv; k<(loopv+8); k++){
            var kill_img = "img"+k;
            document.getElementById(kill_img).style.display="none";
        }
        arr1[opp_kill_box_no-1]=0;
        player1_pic_id[opp_kill_box_no-1]=loopv;
        arr2[indx]--;
        player2_pic_id[indx]--;
        sc2+=50;
        document.getElementById("score2").innerHTML="Score2 : "+sc2;
        var bullet_id = "img" + (player2_kill_id[indx]+7);
        document.getElementById(bullet_id).style.display="none";
    }
};
function scoring(){
    if(clicks%2==1){
        if(arr1[random-1]<6){
        sc1+=(arr1[random-1]*random);
        document.getElementById("score1").innerHTML="Score1 : "+sc1;
    }}
    else{
        if(arr2[random-1]<6){
        sc2+=(arr2[random-1]*random);
        document.getElementById("score2").innerHTML="Score2 : "+sc2;
    }}
};
function winner(){
    if(clicks<80){
        if((arr1[0]>=5 && arr1[1]>=5 && arr1[2]>=5 && arr1[3]>=5 && arr1[4]>=5)){
            GameEndSound.play();
            alert("Congrats Player1: You win!!!");
            document.getElementById("btn1").disabled = true;
            document.getElementById("btn2").disabled = true;
            highscoredisplay();
        }
        else if((arr2[0]>=5 && arr2[1]>=5 && arr2[2]>=5 && arr2[3]>=5 && arr2[4]>=5)){
            GameEndSound.play();
            alert("Congrats Player2: You win!!!");
            document.getElementById("btn1").disabled = true;
            document.getElementById("btn2").disabled = true;
            highscoredisplay();
        }
        else if(sc1>20 && (arr2[0]==0 && arr2[1]==0 && arr2[2]==0 && arr2[3]==0 && arr2[4]==0)){
            GameEndSound.play();
            alert("Congrats Player1: You win!!!");
            document.getElementById("btn1").disabled = true;
            document.getElementById("btn2").disabled = true;
            highscoredisplay();
        }
        else if(sc2>20 && (arr1[0]==0 && arr1[1]==0 && arr1[2]==0 && arr1[3]==0 && arr1[4]==0)){
            GameEndSound.play();
            alert("Congrats Player2: You win!!!");
            document.getElementById("btn1").disabled = true;
            document.getElementById("btn2").disabled = true;
            highscoredisplay();
        }
        else{
            return;
        }
    }
    else{
        if(sc1>sc2){
            GameEndSound.play();
            alert("Game Over!!!" + "\n" + "Congrats Player1: You win!!!");
            document.getElementById("btn1").disabled = true;
            document.getElementById("btn2").disabled = true;
            highscoredisplay();
        }
        else if(sc1<sc2){
            GameEndSound.play();
            alert("Game Over!!!" + "\n" + "Congrats Player2: You win!!!");
            document.getElementById("btn1").disabled = true;
            document.getElementById("btn2").disabled = true;
            highscoredisplay();
        }
        else{
            GameEndSound.play();
            alert("Game Over!!!" + "\n" + "OOPS!!! Its a draw.");
            document.getElementById("btn1").disabled = true;
            document.getElementById("btn2").disabled = true;
            highscoredisplay();
        }
    }
};
function highscoredisplay(){
    Hsc1 = window.localStorage.getItem("hsc1");
    if(sc1>Hsc1){
        window.localStorage.setItem("hsc1" , sc1); }
    document.querySelector(".highscore1").innerHTML = "Highest1: " + hsc1;
    Hsc2 = window.localStorage.getItem("hsc2");
    if(sc2>Hsc2){
        window.localStorage.setItem("hsc2" , sc2); }
    document.querySelector(".highscore2").innerHTML = "Highest2: " + hsc2;
};