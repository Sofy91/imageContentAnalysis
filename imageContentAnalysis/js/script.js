let imageUrl = 'https://storage.googleapis.com/t3chbucket/images/';

document.addEventListener("DOMContentLoaded", function() {
    //Initialize api with api key
    gapi.load('client', start);   
    
    //Buttons functions
    document.getElementById("btn-test-api").addEventListener('click', function () {
      getInfoImage('faces/face5.jpeg', demostrationExecute)
    });

    document.getElementById("btn-exercise-1").addEventListener('click', function () {
      getInfoImage('faces/face3.jpg', exercise1Execute); 
    });

    document.getElementById("btn-exercise-2").addEventListener('click', function () {
      getInfoImage('nature/nature1.jpeg', exercise2Photo1Execute); 
      getInfoImage('nature/nature2.jpg', exercise2Photo2Execute);
      getInfoImage('architecture/architecture1.jpg', exercise2Photo3Execute);
      getInfoImage('nature/nature3.jpeg', exercise2Photo4Execute);      
    });

    document.getElementById("btn-extra").addEventListener('click', function () {
      getInfoImage('architecture/locations/location2.jpg', extraExecute);
    });

    //Tab function with jquery
    $(".nav-tabs a").click(function(){
      $(this).tab('show');
    });    
});

function start() {
  // Initializes the client with the API key and the Google Vision API.
  gapi.client.init({
    'apiKey': "AIzaSyBbUq316_3xhBPNz8Ad1i4xu7ujOHq8RXQ",
    'discoveryDocs': ['https://content.googleapis.com/discovery/v1/apis/vision/v1/rest']    
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}

function getInfoImage(imageName, functionToExecute) {
  return gapi.client.vision.images.annotate({
    "resource": {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": imageUrl + imageName
            }
          },
          "features": [
            {
              "type": "IMAGE_PROPERTIES"
            },
            {
              "type": "TYPE_UNSPECIFIED"
            },
            {
              "type": "FACE_DETECTION"
            },
            {
              "type": "OBJECT_LOCALIZATION"
            },
            {
              "type": "LABEL_DETECTION"
            },
            {
              "type": "LANDMARK_DETECTION"
            }
          ]
        }
      ]
    }
  })    
  .then(function(response) {
    functionToExecute(response.result);   
  },
  function(err) { console.error("Execute error", err); });
}

function demostrationExecute (infoImage){ 
  //Transform info to json data
  let jsonInfoImage = JSON.stringify(infoImage, undefined, 4);
  document.getElementById("code-json-demostration").innerHTML = jsonInfoImage;
  document.getElementsByClassName('col-btn-test')[0].style.display = 'none';
  
  //Functions get faces, hapiness and labels info
  document.getElementsByClassName('numberFaces')[0].textContent   = detectFaces(infoImage).length;
  detectHappiness(infoImage);
  detectLabels(infoImage);
  
  document.getElementsByClassName('info-test-image')[0].style.display = 'block'; 
  document.getElementsByClassName('info-test-image')[1].style.display = 'block';     
}

function exercise1Execute (infoImage){
  //JSON with api response
  let jsonInfoImage = JSON.stringify(infoImage, undefined, 4);
  //array with each face detected
  let faces = infoImage.responses[0].faceAnnotations;

  let firstExerciseImg = document.getElementById('first-exercise-img-id');

  //Width and Height of printed image
  let firstExerciseWidth = firstExerciseImg.clientWidth;
  let firstExerciseHeight = firstExerciseImg.clientHeight;

  //Width and Height of source image
  let naturalWidthFirstImage = firstExerciseImg.naturalWidth;
  let naturalHeightFirstImage = firstExerciseImg.naturalHeight;

  faces.forEach(index => {
      //face coordinates
      let coordinatesFaces = index.landmarks[0].position;
      let xVert = coordinatesFaces.x;
      let yVert = coordinatesFaces.y;

      //create a blank div
      let div = document.createElement('div');
      //and give it an absolute position
      div.style.position = 'absolute';
      //put image into our div
      div.innerHTML = '<img src="https://storage.googleapis.com/t3chbucket/images/icons/lol.png" class="lol-class" alt="alt">';
      //and our div into his wrapper
      document.getElementById('images-wrapper').appendChild(div);

      //getting width and height of our lol image
      let lolImg = document.getElementsByClassName('lol-class');
      let lolWidth = lolImg[0].width;
      let lolHeight = lolImg[0].height;

      //calculate where to put our lol image
      let xResult = (xVert * firstExerciseWidth / naturalWidthFirstImage) - (lolWidth / 2);
      let yResult = (yVert * firstExerciseHeight / naturalHeightFirstImage) - (lolHeight / 2);

      //injecting style top and left to our div
      div.style.left = xResult + 'px';
      div.style.top = yResult + 'px';
  });

  document.getElementById("code-json-exercise-1").innerHTML = jsonInfoImage;
  document.getElementsByClassName('col-btn-exercise-1')[0].style.display = 'none';
  document.getElementsByClassName('info-image-1')[0].style.display = 'block';
}

function exercise2Photo1Execute(infoImage){
  exercise2Execute (infoImage, 1);
}

function exercise2Photo2Execute(infoImage){
  exercise2Execute (infoImage, 2);
}

function exercise2Photo3Execute(infoImage){
  exercise2Execute (infoImage, 3);
}

function exercise2Photo4Execute(infoImage){
  exercise2Execute (infoImage, 4);
}

function exercise2Execute (infoImage, position){
  let labels = infoImage.responses[0].labelAnnotations;
  let div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.top = '20%';
      div.style.left = '10%';
  if (labels.find(isNature => isNature.description === 'Nature')){
      div.innerHTML = '<img src="https://storage.googleapis.com/t3chbucket/images/icons/tick.png" style="width:50%" alt="alt">';
  } else {
      div.innerHTML = '<img src="https://storage.googleapis.com/t3chbucket/images/icons/cross.png" style="width:50%" alt="alt">';
  }
  document.getElementsByClassName('col-photo-' + position)[0].appendChild(div);
}

function extraExecute (infoImage){
  let jsonInfoImage = JSON.stringify(infoImage, undefined, 4);
  document.getElementById("code-json-extra").innerHTML = jsonInfoImage;
  document.getElementsByClassName('col-btn-extra')[0].style.display = 'none';
  document.getElementsByClassName('info-image-extra')[0].style.display = 'block'; 

  let latAndLong = getLocalizedObject(infoImage);   
  let map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latAndLong.latitude, lng: latAndLong.longitude},
    zoom: 8
  });
  var marker = new google.maps.Marker({
    position: {lat: latAndLong.latitude, lng: latAndLong.longitude},
    map: map,
  });
  marker.setMap(map);
  document.getElementById('locationName').textContent   = getNameLocation(infoImage);
  document.getElementsByClassName('row-map-show')[0].style.display = 'block';
}

function detectFaces(infoImage){
  let faces = infoImage.responses[0].faceAnnotations;
  return faces;
}

function detectHappiness(infoImage){
    let facesArray = infoImage.responses[0].faceAnnotations;
    facesArray.forEach(index => {
        let joyListElement = document.createElement('li');
        let joyData = document.createTextNode(index.joyLikelihood);
        joyListElement.appendChild(joyData);
        document.getElementsByClassName('infoHappy')[0].appendChild(joyListElement);
    });
}

function detectLabels(infoImage){
    let arrayLabels = infoImage.responses[0].labelAnnotations;
    arrayLabels.forEach(label => {
        let labelListElement = document.createElement('li');
        let labelData = document.createTextNode(label.description);
        labelListElement.appendChild(labelData);
        document.getElementsByClassName('labelsInfo')[0].appendChild(labelListElement);
    });
}

function getLocalizedObject(infoImage){
  if(infoImage.responses[0].landmarkAnnotations){
    return infoImage.responses[0].landmarkAnnotations[0].locations[0].latLng;
  }
  return '';
}

function getNameLocation(infoImage){
  if(infoImage.responses[0].landmarkAnnotations){
    return infoImage.responses[0].landmarkAnnotations[0].description;
  }
  return '';
}


