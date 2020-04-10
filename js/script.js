let imageUrl = 'https://storage.cloud.google.com/imagecontent/';
//let numberImageArray = ["75", "21", "59", "17", "69", "53", "62", "100", "41", "04", "46", "47", "79", "14", "67", "70", "25", "68", "73", "43", "64", "12", "78", "61", "02", "48", "50", "103", "13", "24", "06", "44", "20", "19", "01", "72", "56", "30", "05", "104", "57", "22", "10", "54", "102", "71", "02", "16", "65", "101", "74", "35", "07", "26", "105", "63", "27", "60", "40", "38", "45", "76", "77", "51", "58", "32", "15", "33", "42", "49", "18", "34", "55", "23", "36", "39", "03", "28", "31", "11", "52", "29", "37"];
//let isLogoArray = [0.9763564, 0.9805033, 0.9463242, 0.90811026, 0.9868586, 0.9889784, 0.6900824, 0, 0.978621, 0.95009124, 0.9655707, 0.9829835, 0.936785, 0.9818577, 0.95850134, 0.7975835, 0.9571807, 0.98913544, 0.98462546, 0.98012805, 0.98152727, 0.98191136, 0.9125938, 0.97927994, 0.9441859, 0.978611, 0.97721785, 0.9787812, 0.8903472, 0.974849, 0.9286436, 0.9817703, 0.93432343, 0.9836066, 0.9804828, 0.8672224, 0.903445, 0.98360544, 0.96360475, 0.98033726, 0.9244902, 0.98501456, 0.9267975, 0.8390163, 0.97424346, 0.9445907, 0.94403434, 0.87600255, 0.97927994, 0.9441859, 0, 0.97914976, 0.9634381, 0, 0.9581695, 0.9432032, 0, 0.98298645, 0.9402041, 0.98224914, 0, 0.96774495, 0.9239309, 0, 0.8782774, 0, 0.9709846, 0, 0.98654926, 0.96845555, 0, 0, 0.97937524, 0.9711497, 0.9773584, 0, 0.9740189, 0.980615, 0.80328035, 0.96075916, 0.9817336, 0, 0.97385436, 0, 0.985358, 0.9366503, 0];
//let isHappyArray = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0.5, 0.2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0.25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0.25, 0, 0, 0.5, 0.3333333333333333, 0, 0, 0.36363636363636365, 0, 0, 0.2727272727272727, 0, 0, 0.16666666666666666, 0, 0, 0.3333333333333333, 0.3333333333333333, 0.5, 0, 0, 0, 0.25];

let numberImageArray = [];
let isLogoArray = [];
let isHappyArray = [];

document.addEventListener("DOMContentLoaded", function() {
    //Initialize api with api key TODO
    gapi.load('client', start);   
    
    //Buttons functions
    $('.btn-test-api').click(function(e) {
      //getImageFirebase();

      $('.progress').show();
      loadingInfo();
      
    }); 
    
    document.getElementById("btn-table").addEventListener('click', function () {
      console.log(numberImageArray);
      console.log(isLogoArray);
      console.log(isHappyArray);
      $('.row-result').show();
      $('#chart_div').show();
      drawChart();
    }); 

});

function start() {
  // Initializes the client with the API key and the Google Vision API.
  /*gapi.client.init({
    'apiKey': "AIzaSyA7MWHhBgV5mzckdNEfHcCVWXoQS6r6VDM",
    'discoveryDocs': ['https://content.googleapis.com/discovery/v1/apis/vision/v1/rest']    
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });*/
}

function getInfoImage(imageName, functionToExecute, numberImage) {
  return gapi.client.vision.images.annotate({
    "resource": {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": imageName
            }
          },
          "features": [
            {
              "maxResults": 50,
              "type": "LANDMARK_DETECTION"
            },
            {
              "maxResults": 50,
              "type": "FACE_DETECTION"
            },
            {
              "maxResults": 50,
              "type": "LOGO_DETECTION"
            },
            {
              "maxResults": 50,
              "type": "LABEL_DETECTION"
            }
          ]
        }
      ]
    }
  })    
  .then(function(response) {
    functionToExecute(response.result, numberImage);   
  },
  function(err) { console.error("Execute error", err); });
}

function analysisImageGVApi (infoImage, numberImage){ 

  let happiness = 0;
  let happyFaces = 0;
  let angrer = 0;
  let angerFaces = 0;
  let logoPoint = 0;
  let contFaces = 0;

  numberImageArray.push(numberImage);

  if (infoImage.responses[0].logoAnnotations){
    //array with each face detected
    let logos = infoImage.responses[0].logoAnnotations;
    if (logos){
      logos.forEach(logo => {
        if (logo.description=='Emirates'){
          logoPoint = logo.score;
          isLogoArray.push(logoPoint);
          return;
        }
      });
    }
  }else{
    isLogoArray.push(0);
  }
  if (infoImage.responses[0].faceAnnotations){
    let faces = infoImage.responses[0].faceAnnotations;
    faces.forEach(face =>{
      if (face.joyLikelihood == 'VERY_LIKELY' || face.joyLikelihood == 'LIKELY'){
        happyFaces++;
      }else{
        if (face.sorrowLikelihood== 'VERY_LIKELY' || face.sorrowLikelihood == 'LIKELY' ||
            face.angerLikelihood== 'VERY_LIKELY' || face.angerLikelihood == 'LIKELY'){
          angerFaces++;
        }
      }      
      contFaces++;
    });
    happiness = (happyFaces - angerFaces) / contFaces;
    isHappyArray.push(happiness);
  }else{
    isHappyArray.push(0);
  }

}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var chartDiv = document.getElementById('chart_div');
  var data = new google.visualization.arrayToDataTable([]);
  data.addColumn('string', 'Número imagen');
  data.addColumn('number', 'Logo + happiness');
  data.addColumn({'type': 'string', 'role': 'style'});
  
  var dataChart = [];
  var acumWithLogo = 0;
  var maxHighValue = 0;
  var acumAlert = 0;
  var colorLine = '';

  $.each(numberImageArray,function(i, number) {
    if (isLogoArray[i] > 0){
      acumWithLogo = acumWithLogo + isHappyArray[i];
      if (acumWithLogo > maxHighValue){
        maxHighValue = acumWithLogo;
      }
      colorLine = '#0f7f96';
    }else{
      acumWithLogo = acumWithLogo - Math.abs(isHappyArray[i]);
      colorLine = '#d8a407';
    }
    if (Math.abs(maxHighValue - acumWithLogo) >= 1){
      acumAlert++;
      console.log('ALERTA!!!');    
      dataChart.push([number, acumWithLogo, 'line { color: '+ colorLine +' ; }, point { size: 5; shape-type: diamond; fill-color: #dc3545; opacity: 1 }' ]);
      if (acumAlert > 3){
        console.log('Mail a sponsor');
        acumAlert = 0;
      }                  
    }else{
      dataChart.push([number, acumWithLogo, 'line { color: '+ colorLine +'; }' ]);
    }     
  });

  data.addRows(dataChart);

  var options = {
    title: 'Image Sponsor Analysis',
    width: 1200,
    height: 700,
    pointSize: 5,
    dataOpacity: 0.5,
    lineWidth: 4,
    animation:{
      startup: true,
      duration: 5000,
      easing: 'linear',
    },
    series: {
      0: {pointShape: 'circle'},
    },
    vAxes: {
      0: {title: 'Status'}
    },
    hAxis : {textColor: '#ffffff'}
  };

  var chart = new google.visualization.LineChart(chartDiv);
  chart.draw(data, options);
}

function loadingInfo(){
  $('.progress-bar').animate({
    width: "100%"
  }, 5000, function () {
    $('.progress-bar').css('background-color', '#28a745');
    $('#btn-table').show();
  });
}
