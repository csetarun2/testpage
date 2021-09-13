var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    q : "Which of the following is a powerful automation platform that provides a way to transforms infrastructure into code?",
    o : [
      "Consul",
      "Chef",
      "Docker",
      "Gerrit"
    ],
    a : 1 // arrays start with 0, so answer is chef
  },
  {
    q : "Which of the following is true about Chef Server?",
    o : [
      "The Chef Server is the central store of your infrastructure’s configuration data.",
      "The Chef Server stores the data necessary to configure your nodes & provides search.",
      "It is a powerful tool that allows you to dynamically drive node configuration based on data.",
      "All of the above"
    ],
    a : 3
  },
  {
    q : "_________ are sometimes referred as clients as they are machines that run the Chef-client software.",
    o : [
      "Server",
      "Workstation",
      "Nodes",
      "Client"
    ],
    a : 2
  },
  {
    q : "A Resource represents a piece of infrastructure and its desired state, such as a package that should be installed.",
    o : [
      "TRUE",
      "FALSE",
      "Can be true or false",
      "Can not say"
    ],
    a : 0
  },
  {
    q : "A __________ is a collection of Resources that describes a particular configuration or policy.",
    o : [
      "Resource",
      "Cookbook",
      "Action",
      "Recipe"
    ],
    a : 3
  },
  {
    q : " What Is The Command You Use To Upload A Cookbook To The Chef Server?",
    o : [
      "Chef cookbook upload",
      "Knife cookbook Chef",
	  "Knife cookbook upload",
	  "Knife cookbook"
    ],
    a : 2
  },
 {
    q : "How many ways to set up a chef server ?",
    o : [
      "1",
      "2",
      "3",
      "4"
    ],
    a : 1
  },
  {
    q : "The ____________ provides certificates that enable you to securely communicate with the Chef server.",
    o : [
      "End Kit",
      "Med Kit",
      "Starter Kit",
      "None of the above"
    ],
    a : 3
  },
  {
    q : "A Chef Workstation is the host you use to modify your cookbooks and other configuration data.",
    o : [
      "Yes",
      "No",
      "Can be yes or no",
      "Can not say"
    ],
    a : 1
  },
  {
    q : "Chef Initial release ? ",
    o : [
      "2008",
      "2009",
      "2010",
      "2011"
    ],
    a : 2
  }
  
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: function(){
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: function(){
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", quiz.select);
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: function(){
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = this.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      this.classList.add("correct");
    } else {
      this.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(function(){
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : function () {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);
