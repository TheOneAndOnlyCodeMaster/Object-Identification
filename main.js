objects=[];
img = "";
status = "";
function preload(){
img = loadImage("dog_cat.jpg");
}
function setup(){
canvas = createCanvas(640, 420);
canvas.center();

objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: detecting objects";
}
function draw(){
image(img, 0, 0, 640, 420);
/*fill(116, 132, 204);
textSize(25);
textFont('Times New Roman')
text("Dog", 70, 70);
noFill();
stroke(116, 132, 204);
rect(60, 45, 450, 350);

fill(116, 132, 204);
textSize(25);
textFont('Times New Roman')
text("Cat", 255, 95);
noFill();
stroke(116, 132, 204);
rect(245, 75, 350, 330);*/
if(status != ""){
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML = "Status: Object Detected";
        fill(116, 132, 204);
        textSize(25); 
        textFont('Times New Roman')
        percent = floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%", objects[i].x+7, objects[i].y+18);
        noFill();
        stroke(116, 132, 204);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}
function modelLoaded(){
    console.log("model is ready");
    status = true;
    objectDetector.detect(img, gotResults);
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        objects = results;
        console.log(results);
    }
}