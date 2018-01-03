$(document).ready(function() {
  var horn = $("#horn")[0];
  $("#reset").hide();

  var count = parseInt($("#sessionTime").html());
  var breakCount = parseInt($("#breakTime").html());

  // session +
  $("#plusSession").click(function() {
    count += 1;
    $("#sessionTime").html(count);
  });

  //session -
  $("#minusSession").click(function() {
    if (count > 1) {
      count -= 1;
      $("#sessionTime").html(count);
    }
  });

  //break +
  $("#plusBreak").click(function() {
    breakCount += 1;
    $("#breakTime").html(breakCount);
  });

  //break -
  $("#minusBreak").click(function() {
    if (breakCount > 1) {
      breakCount -= 1;
      $("#breakTime").html(breakCount);
    }
  }); //end + - section

  // countdown section
  $("#start").click(function() {
    var counter = setInterval(timer, 1000);
    count *= 60;
    breakCount *= 60;

    function timer() {
      //hide stuff when start countdown
      $("#start, #plusSession, #minusSession, .break").hide();
      $(".session").addClass("offset-3");
      //session countdown
      count -= 1;
      if (count === 0) {
        horn.play();
        clearInterval(counter);
        var startBreak = setInterval(breakTimer, 1000);
      }
      // seconds into minutes
      if (count % 60 >= 10) {
        $("#sessionTime").html(Math.floor(count / 60) + ":" + count % 60);
      } else {
        $("#sessionTime").html(Math.floor(count / 60) + ":" + "0" + count % 60);
      }
      //$("#sessionTime").html(count);

      //break time
      function breakTimer() {
        $(".session, #minusBreak, #plusBreak").hide();
        $(".break").show();
        $(".break").addClass("offset-3 text-center");
        breakCount -= 1;
        if (breakCount === 0) {
          horn.play();
          $("#reset").show();
          $("#stop").hide();
          clearInterval(startBreak);
        }

        if (breakCount % 60 >= 10) {
          $("#breakTime").html(
            Math.floor(breakCount / 60) + ":" + breakCount % 60
          );
        } else {
          $("#breakTime").html(
            Math.floor(breakCount / 60) + ":" + "0" + breakCount % 60
          );
        }
        //$("#breakTime").html(breakCount);
      }
    }
  });
  // reset
  $("#reset").click(function() {
    $("#reset").hide();
    $(
      ".session,#plusSession, #minusSession, #minusBreak, #plusBreak, #start, #stop"
    ).show();
    $(".break, .session").removeClass("offset-3 text-center");
    count = 25;
    breakCount = 5;
    $("#sessionTime").html(count);
    $("#breakTime").html(breakCount);
  });
}); // end document.ready
