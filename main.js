previous_result = "";

function setup() {
  canvas = createCanvas(300, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  model = ml5.imageClassifier("MobileNet",modelLoaded)
}

function modelLoaded(){

  console.log("Model has loaded successfully");

}

function draw(){

  image(video,0,0,300,250);

  model.classify(video,got_result);

}

function got_result(error,result){

  if (error){

    console.error(error);

  }

  else{

    console.log(result);
      
    object_name = result[0].label;

    object_accuracy = result[0].confidence.toFixed(2);
    
    if (object_accuracy > 0.5 && previous_result != object_name){
    
    document.getElementById("result_object_name").innerHTML = object_name;

    document.getElementById("result_object_accuracy").innerHTML = object_accuracy;


      previous_result = object_name;

      speak_data = "object detected is " + object_name;

      speak_audio = new SpeechSynthesisUtterance(speak_data);

      window.speechSynthesis.speak(speak_audio);

    }

  }

}




