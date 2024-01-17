$(function(){
//Variables
//    Appmode
    var mode= 0;
    
//    timecounter
    var timeCounter= 0;
    
//    lapCounter
    var lapCounter= 0;
    
//     variable for setInterval
    var action;
    
//       Number of Lapse
    var lapNumber= 1;
    
//    minutes, seconds, centiseconds for time and lap
    var timeMinutes,timeSeconds, timeCentiseconds, lapMinutes,lapSeconds,lapCentiseconds;
//    on Load show start and lap buttons
    hideshowButtons("#startButton","#lapButton");
    
//    mode on
    $("#startButton").click(function(){
       mode = 1; 
        
//    show stop and load buttons
        hideshowButtons("#stopButton","#lapButton");
//    start counter
        startaction();
    });
    
//    click on stopButton
    $("#stopButton").click(function(){
//          show resume and reset
        hideshowButtons("#resumeButton","#resetButton");
//            Stop counter
        clearInterval(action);
    }); 
    
//     click and resume button
    $("#resumeButton").click(function(){
        
//        show stop and reset button 
          hideshowButtons("#stopButton","#lapButton");
//          Start action
        startaction();
        });
//       click on resetButtons
    $("#resetButton").click(function(){
//               realoadPage
        location.reload();
    });
//    click on lap button
    $("#lapButton").click(function(){
//         if mode is on
        if(mode){
            
//              stop action
            clearInterval(action);
            
//              resetLap and print lap in details
            lapCounter = 0;
            addLap();
//                Start actions
            startaction();
            }
    });
    
    
    
    
    //functions
    
//    hide show buttons function declaration
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
//    start the action of time
    function startaction(){
       action = setInterval(function(){ timeCounter++;
       if(timeCounter == 100*60*100){
           timeCounter = 0;
       }
        lapCounter++;
        if(lapCounter == 100*60*100){
              lapCounter = 0;
        }
        updateTime();
        },10);
    }
    
//    Function updatetime covert the time in minute seconda and mini seconds;
    function updateTime(){
//        1min 60 * 100 Centiseconds = 6000 Centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        $("#timeMiniSecond").text(timeCentiseconds);
        
//         1sec 60 * 100 Centiseconds 
        timeSeconds = Math.floor((timeCounter%6000)/100);
        $("#timeSecond").text(format(timeSeconds));
        
        timeCentiseconds = (timeCounter%6000)%100;
        $("#timeMinute").text(format(timeMinutes));
        
        lapMinutes = Math.floor(lapCounter/6000);
        $("#lapMiniSecond").text(format(timeCentiseconds));
//         1sec 60 * 100 Centiseconds 
        lapSeconds = Math.floor((lapCounter%6000)/100);
         $("#lapSecond").text(format(timeSeconds));
        
        lapCentiseconds = (lapCounter%6000)%100;
        $("#lapMinute").text(format(timeMinutes));
    }
    
//    format function number
    function format(number){
        if(number<10){
            return '0'+number;
        }else{
            return number;
        }
    }
    
    function addLap(){
        var myLapDetails = 
            '<div class="lap">'+
                '<div class="lapTimeTitle">'+'Lap' +(lapNumber++) +
                '</div>'+ 
                '<div class="lapTime">'
                   +'<span>'+format(lapMinutes)+':</span>'+'<span>'+format(lapSeconds)+':</span>'+'<span>'+format(lapCentiseconds)+'</span>'+
                '</div>'+
            '</div>';
        $(myLapDetails).prependTo("#lapse");
    }
});