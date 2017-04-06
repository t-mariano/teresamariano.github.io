$(document).ready(function(){

  // JSON: list of questions and answers with attributes stored in a variable
  var questions = [
    {
      question: "How long is a piece of string?",
      answers: [
      {
        answer: "Its pretty long",
        correct: "true"
      },
      {
        answer: "Its really really short",
        correct: "false"
      }
      ]
    },
    {
      question: "How tall is a tree?",
      answers: [
      {
        answer: "Its pretty tall",
        correct: "false"
      },
      {
        answer: "Its really really REALLY tall",
        correct: "true"
      }
      ]
    }
  ];

  // console.log(questions[0].question);
  //question=key; "text that creates the question"=value
  // console.log(questions[0].question);
  // console.log(questions[0].answers[0].answer);
  // console.log(questions[0].answers[0].correct);

  // console.log(questions[0].question);
  // console.log(questions[0].answers[1].answer);
  // console.log(questions[0].answers[1].correct);


  function gameStart() {

    //when gameStart button is clicked
    //console.log("it worked")
    //hide the following
    $("#welcome_title").hide();
    $("#bumper_text").hide();
    $("#game_start").hide();
    $("#result_headline, #result_message, p#play_again").hide();

    // show the following
    $("#question_number p").show();
    $("#score_box p").show();

    //get first question
    $("#question").show();

    //show first answer button and set event handlers
    $("#answers").show();
    $("#left_btn").show();
    $("#right_btn").show();


    // when answer is clicked
    // $("#play_options").show();
    // $("#next_question").show();

    // load question & answers
    setQuestion(0);
    var questionNumber=getQuestionNumber();
    console.log("this is question "+questionNumber+"!");

    setScore(0);
    var score=getScore();
    console.log(" "+score+" ");


  }

  //call set question -- Not randomizing in this iteration
  function setQuestion(index){
    var questionText=questions[index].question;
    var leftBtnText=questions[index].answers[0].answer;
    var rightBtnText=questions[index].answers[1].answer;

    //add questions and answers to the page
    $("#question").text(questionText);
    $("#left_btn").text(leftBtnText);
    $("#right_btn").text(rightBtnText);
    setAnswerButtons();

    //next question button is hidden
    $("#play_options").hide();
    $("#next_question").hide();

    setQuestionNumber(index);
  }

  // is button clicked right answer or no. do you get a point?
  function evaluateAnswer(index,answerIndex) {
    //console.log("index is " +index+" and answerIndex is " +answerIndex);
    var answer = questions[index].answers[answerIndex].correct;
    //console.log("This answer is "+answer);

    if (answer == "true") {
      // change button color to green

      // get the current score
      var currentScore = getScore();

      // add 150 to current score
      var newScore = parseInt(currentScore) + 150;

      // set the new score
      setScore(newScore);

    }
    else {
      //change button color to red

      //i award you no points, and may god have mercy on your soul

    }

    // turn off setScore event handler to prevent inflated scores
    $("a#left_btn, a#right_btn").off();

    //check to see if there are any more questions
    var currentQuestion=parseInt(index)+1;
    console.log("The next question is "+currentQuestion+" - The length is "+questions.length);
    if (currentQuestion >= parseInt(questions.length)) {
      //we're all out of questions
      $("#next_question").hide();
      $("#play_options").show();
      $("#see_score").show();
    }
    else {
      //next question button shows
      $("#play_options").show();
      $("#next_question").show();
    }


  }

  //get the current question number
  function getQuestionNumber() {
    var questionNumber=$("#question_value").val();
    return questionNumber;
  }

  // write/update the question number
  function setQuestionNumber(index) {
    $("#question_value").val(index);
    index++;
    $("#question_data").text(index);

  }

  // get the current score
  function getScore() {
    var score=$("#score_value").val();
    return score;
  }

  // write/update the current score
  function setScore(score) {
    $("#score_value").val(score);
    $("#score").text(score);
  }

  //set answer button event handlers
  function setAnswerButtons() {
    //click on an answer button
    $("a#left_btn, a#right_btn").click(function(event){
      //dont change the URL
      event.preventDefault();

      //get the ID of the button that weas clicked
      var thisAnswer=$(this).attr("id");

      //if it is the #left_btn, set answerindex to 0
      //right button set answerindex to 1
      if (thisAnswer==="left_btn"){
        var answerIndex=0;
      }
      else {
        var answerIndex=1;
      }

      //get the current question number save it as index
      var questionNumber=getQuestionNumber();

      //call evaluateAnswer(index,answerindex)
      evaluateAnswer(questionNumber, answerIndex); 

    });
  }

  //start the game 
  $("a#game_start").click(function(event){
    //dont change the URL
    event.preventDefault();
    //do stuff
    gameStart();

  });

  //next question button 
  $("#next_question a").click(function(event){
    //dont change the URL
    event.preventDefault();
    //do stuff
    currentQuestion = getQuestionNumber();
    //console.log(currentQuestion);
    currentQuestion++;
    setQuestion(currentQuestion);

  });

  //show score button 
  $("#see_score a").click(function(event){
    //dont change the URL
    event.preventDefault();
    //do stuff
    var score = getScore();
    var topscore = parseInt(questions.length)*150;
    var title = "You got "+score+" out of a possible "+topscore+" points";
    var text = "Thanks for playing. You get a cookie."
    
    //hide the quesions and answers
    $("#question, #answers, #question_number p, #score_box p, p#see_score").hide();

    //add the messages and show them
    $("#result_headline").text(title);
    $("#result_message").text(text);
    $("#result_headline, #result_message, p#play_again").show();


  });

  
  //play again button 
  $("p#play_again a").click(function(event){
    //dont change the URL
    event.preventDefault();
    //do stuff
    gameStart();

  });









});