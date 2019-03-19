/**
 * 
 * 
 * 
 * 
 * IF I WEILL EVER NEED TO OPTIMIZE THE APP TO START TAKING TEXT INPUT, i WILL HAVE TO 
 * USE THE REPLACE METHDD AND USE IT TO CHANGE ALL SPACES TO DASHES AND CHANGE ALL DASHES TO 
 * SPACES BACK
 * 
 * 
 * 
 * 
 * 
 */





$(document).ready(function(){//this part mainly controls the triggers to the applcation functionality
 

      /*the following code controls the features in the home slider*/
        app().panel.fold();//to fold the panel.
        app().panel.swipe();//to slide the panel in or out
        /*end of the code controls the features in the home slider*/

  

        $(".side-nav-control").on("click", function () {//this function opens the side menu in small screens
              app().sideNav.open();//this function controls the openning of the side nav
        });

        $(".closebtn").on("click", function () {//this function closes the side menu for small screens
              app().sideNav.close();//this function controls the closing of the side nav
        });

        $("li.teacherProfilePage").on("click", function () {
            app().teachersProfile();//firing the function that triggers the teachers profile data
        });

        $(".toTeachersStatistics").on("click", function () {
            app().teachersRatingInfo();//this uns the teachers rating info on the app object
        });

        $(".toSubjects").on("click", function () {//this function contains the routing to the subjects page
            app().schoolSubjects();
        });

        $(".toStudentSubjects").on("click", function () {//this function contains the routing to the subjects page
          app().studentSubjects();
      });

      $(".toClassPeformance").on("click", function () {
        app().studentsRatingInfo();//this uns the teachers rating info on the app object
    });
  });
      


/*controller for the application*/
function app() {//handles the app features

    return {
        panel : {//this objects holds all the panel features
              fold : function () {
              $(".fold").slideUp();//this function slides up the panel
            },
            swipe : function () {
                  swipeObserver(".main-panel-area");//this function handles what happens when the panel is slided
                  
              }
        },
        sideNav : {
          open : function () {
            $(".side-nav-control").fadeOut("slow");//slowly takes away the menu button
            openNav();//opens the side menu for small screens
          },
          close : function () {
            $(".side-nav-control").fadeIn("slow");//displays the small menu for opening students details
            closeNav();//closes the side menu for small screens
          },
         
        },
        teachersProfile : function() {//this function moves the page to the teachers profile part, while also injecting the necessary data
          var info = teachersData();//binding the teachers JSON data to the info variable

          // info.forEach(information => {//this function loops through the info array
          teachersProfile(info);//passing each array element of the teachers information to the data function
            // console.log(information);
          // });
          $("#carousel-id").carousel(1);//this moves the carousel to the teachers profile part

        },
        teachersRatingInfo : function () {//this function triggers the binding of the teachers info with the output and passing the data that triggers this
          
          var info = teachersData();//binding the teachers JSON data to the info variable

          // info.forEach(information => {//this function loops through the info array
          teachersStatistics(info);//passing each array element of the teachers information to the data function
            // console.log(information);
          // });
          $("#carousel-id").carousel(3);//this moves the carousel to the teachers profile part


        },
        schoolSubjects : function () {//this function controls the viewing of nouns available subjects and teachers
          var info = teachersData();//binding the teachers JSON data to the info variable

          // info.forEach(information => {//this function loops through the info array
          subjects(info);//passing each array element of the teachers information to the data function
            // console.log(information);
          // });
          $("#carousel-id").carousel(2);//this moves the carousel to suchool subjects and the students performance part

        },
        studentAnalysis : function (performance, search, status, success, gauge){//this function takes in a subject name and brings out the specific student analysis for that subject
           

           studentAnalysis(performance, search, status, success, gauge);//passing the subjecdt name from the DOM to the student analysis function as a parameter

           $("#carousel-id").carousel(4);//this moves the page to tbe student analysis part
        },
        studentSubjects : function () {//this function controls the viewing of nouns available subjects and teachers
          var info = teachersData();//binding the teachers JSON data to the info variable

          // info.forEach(information => {//this function loops through the info array
          subjects(info);//passing each array element of the teachers information to the data function
            // console.log(information);
          // });
          $("#carousel-id").carousel(5);//this moves the carousel to suchool subjects and the students performance part

        },
        studentsRatingInfo : function () {//this function triggers the binding of the teachers info with the output and passing the data that triggers this
          
          var info = teachersData();//binding the teachers JSON data to the info variable

          // info.forEach(information => {//this function loops through the info array
          teachersStatistics(info);//passing each array element of the teachers information to the data function
            // console.log(information);
          // });
          $("#carousel-id").carousel(6);//this moves the carousel to the teachers profile part


        }
       
    };

};
/*end of controller for the application*/




/*THESE PARTS ARE THE DEFINTITIVE FUNCTIONS*/


function swipedLeft() {//this function defines what happens the panels are swiped left

    $(".side-nav").addClass("sweet-slide");//this slides the panels to the left
    $("img.logo").css("width", "75px");//this reduces the width of Noun logo
    $(".fold").slideDown();//this slides down the folded panel
    $(".the-panels").removeClass("main-panel-area");//the class that was removed increased the height of the page  to about 700px

    closeNav();//this close the nav when ever the page is slided
};

function swipedRight() {//this defines what happens after the element is swiped right
  $(".side-nav").removeClass("sweet-slide");//this slides the panels to the left
  $("img.logo").css("width", "125px");//this reduces the width of Noun logo
  $(".fold").slideUp();//this slides down the folded panel
  $(".the-panels").addClass("main-panel-area");//the class that gets added increases the page height to  700px
};



function swipeObserver(theElement) {//this function handles the sliding out of the panel
    // CLASS OR ID FOR WHERE YOU WANT TO DETECT SWIPE
    container = document.querySelector(theElement);
  
    container.addEventListener("touchstart", startTouch, false);
    container.addEventListener("touchmove", moveTouch, false);
  
    // Swipe Up / Down / Left / Right
    var initialX = null;
    var initialY = null;
  
    function startTouch(e) {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    };
  
    function moveTouch(e) {
      if (initialX === null) {
        return;
      }
  
      if (initialY === null) {
        return;
      }
  
      var currentX = e.touches[0].clientX;
      var currentY = e.touches[0].clientY;
  
      var diffX = initialX - currentX;
      var diffY = initialY - currentY;
  
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
          // swiped left
        //   console.log("swiped left");
          swipedLeft();//this function runs after the panels have been swiped left
        } else {
          // swiped right
        //   console.log("swiped right");
         swipedRight();//this function runs after the panels have been swiped right
        }  
      } else {
        // sliding vertically
        if (diffY > 0) {
          // swiped up
        //   console.log("swiped up");
        } else {
          // swiped down
        //   console.log("swiped down");
        }  
      }
  
      initialX = null;
      initialY = null;
  
      e.preventDefault();
    };
};

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "150px";
  
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

/*end of the block of code sets the output for the teachers area*/

  
/* function for the teachers Profile*/
function teachersProfile(array) {
          
        var arrayData = array,
        length = arrayData.length, i,
        teacher, subject, pass, fail, gauge;
        var out = '';
        for (i = 0; i < length; i++) {
            /*setting the different values on the array into specific variables */
              teacher = arrayData[i].teacher;
              subject = arrayData[i].subject;
              pass = arrayData[i].pass;
              fail = arrayData[i].fail;
          /*end of setting the different values on the array into specific variables */

        studentsTotal = pass + fail;//the total number of students in the classroom
        arrayData[i].subject = subject;//the name for the subject goes here
        arrayData[i].success = Math.round(pass/studentsTotal * 100);//number of students that passed
        arrayData[i].failure = Math.round(fail/studentsTotal * 100);//number of students that failed
        var rate = arrayData[i].success; //setting the rate variable to be the result of the pass property
        var gauge = guager(rate);//setting the guage variable to be the returned value of the gauger function.
            arrayData[i].gauge = gauge;//hanging the guage variable to the details object
        

          /**the next block of code sets the status of the teachers info
           * be it, warning, danger or success
          */
            if(rate >= 0 && rate <= 49) {
              arrayData[i].status = "danger";
                } else if(rate >= 50 && rate <=69) {
                  arrayData[i].status = "warning";
                } else if(rate >= 70 && rate <= 100) {
                  arrayData[i].status = "success";
            };
            /** end of the block of code that sets the status of the teachers info
           * be it, warning, danger or success
          */
            out += `<div class="row">
            <div class=" col-md-offset-2 col-md-8">
                    <div class="rating panel panel-${arrayData[i].status}">
                        <div class="panel-heading">
                            <h3 class="panel-title text-center">
                                <b>${arrayData[i].subject}</b>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class="row teachersRating">
                                <div class="col-md-3 col-xs-6 col-sm-6">
                                        <h5 class="teacherName text-default text-center">
                                          <i class="fa fa-user-circle-o"></i> ${arrayData[i].teacher}
                                        </h5>
                                </div>
                                
                                <div class="teachersStudentSuccesses col-md-3 col-xs-3 col-sm-6  hidden-xs hidden-sm">
                                    <p class="studentsPassed text-${arrayData[i].status} text-center">
                                        Total students :${arrayData[i].pass + arrayData[i].fail}
                                    </p>
                                </div>
                                
                                <div class="col-xs-3 hidden-sm hidden-xs">
                                </div>
                                <div class="col-md-3  col-xs-3 col-sm-3">
                                        <span class="teacherRating">
                                                <ul class="rating">
                                                        <li  class="${arrayData[i].status}" data-name="Rating" data-percent="${arrayData[i].success}%"> 
                                                        <svg viewBox="-10 -10 220 220">
                                                          <g fill="none" stroke-width="2" transform="translate(100,100)">
                                                            <path d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#cl1)"/>
                                                            <path d="M 86.6,-50 A 100,100 0 0,1 86.6,50" stroke="url(#cl2)"/>
                                                            <path d="M 86.6,50 A 100,100 0 0,1 0,100" stroke="url(#cl3)"/>
                                                            <path d="M 0,100 A 100,100 0 0,1 -86.6,50" stroke="url(#cl4)"/>
                                                            <path d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#cl5)"/>
                                                            <path d="M -86.6,-50 A 100,100 0 0,1 0,-100" stroke="url(#cl6)"/>
                                                          </g>
                                                          </svg> 
                                                          <svg viewBox="-10 -10 220 220">
                                                            <!-- in the stoke-offset, the highest to the end of the cicle is 630,
                                                            but you can exceed that it will just grow into the circle again -->
                                                            <path class="${arrayData[i].status}" d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="${arrayData[i].gauge}"></path>
                                                          </svg>
                                                        </li>
                                                      </ul>
                                          </span>
                                    </div>
                            </div>
                          
                        </div>
                  <div class="panel-footer text-center"> 
                        <a href="#" onclick="app().teachersRatingInfo();" >View statistics</a>
                    </div>
                </div>
            </div>
          </div>`;
        
          }
              $(".teachersProfile").html(out);
     }
/*end of function for the teachers Profile*/


/** function for viewing the subject as well as the teacher handling them */

function subjects(array) {
          
  var arrayData = array,
  length = arrayData.length, i,
  teacher, subject, pass, fail, gauge;
  var out = '';
  for (i = 0; i < length; i++) {
      /*setting the different values on the array into specific variables */
        teacher = arrayData[i].teacher;
        subject = arrayData[i].subject;
        pass = arrayData[i].pass;
        fail = arrayData[i].fail;
    /*end of setting the different values on the array into specific variables */

  studentsTotal = pass + fail;//the total number of students in the classroom
  arrayData[i].subject = subject;//the name for the subject goes here
  arrayData[i].success = Math.round(pass/studentsTotal * 100);//number of students that passed
  arrayData[i].failure = Math.round(fail/studentsTotal * 100);//number of students that failed
  var rate = arrayData[i].success; //setting the rate variable to be the result of the pass property
  var gauge = guager(rate);//setting the guage variable to be the returned value of the gauger function.
      arrayData[i].gauge = gauge;//hanging the guage variable to the details object
  

    /**the next block of code sets the status of the teachers info
     * be it, warning, danger or success
    */
      if(rate >= 0 && rate <= 49) {
        arrayData[i].status = "danger";
        arrayData[i].performance = "students are performing poorly";//this tells the students perfomace on these course
          } else if(rate >= 50 && rate <=69) {
            arrayData[i].status = "warning";
            arrayData[i].performance = "students performance are at average";//this tells the students perfomace on these course
          } else if(rate >= 70 && rate <= 100) {
            arrayData[i].status = "success";
            arrayData[i].performance = "Excellent performance from students";//this tells the students perfomace on these course
      };
      /** end of the block of code that sets the status of the teachers info
     * be it, warning, danger or success
    */
      out += `<div class="row">
      <div class=" col-md-offset-2 col-md-8">
              <div class="rating panel panel-${arrayData[i].status}">
                  <div class="panel-heading">
                      <h3 class="panel-title text-center">
                          <b> ${arrayData[i].performance} </b>
                      </h3>
                  </div>
                  <div class="panel-body">
                      <div class="row teachersRating">
                          <div class="col-md-4 col-xs-6 col-sm-6">
                                  <h5 class="teacherName text-default text-center">
                                    <i class="fa fa-book"></i> ${arrayData[i].subject}
                                  </h5>
                          </div>
                          
                          <div class="teachersStudentSuccesses col-md-4 col-xs-3 col-sm-6  hidden-xs hidden-sm">
                              <p class="studentsPassed text-${arrayData[i].status} text-center">
                                  ${arrayData[i].pass + arrayData[i].fail} students are offering this
                              </p>
                          </div>
                          
                          <div class="col-xs-3 hidden-sm hidden-xs">
                          </div>
                          <div class="col-md-3  col-xs-3 col-sm-3">
                                  <span class="teacherRating">
                                          <ul class="rating">
                                                  <li  class="${arrayData[i].status}" data-name="performance" data-percent="${arrayData[i].success}%"> 
                                                  <svg viewBox="-10 -10 220 220">
                                                    <g fill="none" stroke-width="2" transform="translate(100,100)">
                                                      <path d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#cl1)"/>
                                                      <path d="M 86.6,-50 A 100,100 0 0,1 86.6,50" stroke="url(#cl2)"/>
                                                      <path d="M 86.6,50 A 100,100 0 0,1 0,100" stroke="url(#cl3)"/>
                                                      <path d="M 0,100 A 100,100 0 0,1 -86.6,50" stroke="url(#cl4)"/>
                                                      <path d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#cl5)"/>
                                                      <path d="M -86.6,-50 A 100,100 0 0,1 0,-100" stroke="url(#cl6)"/>
                                                    </g>
                                                    </svg> 
                                                    <svg viewBox="-10 -10 220 220">
                                                      <!-- in the stoke-offset, the highest to the end of the cicle is 630,
                                                      but you can exceed that it will just grow into the circle again -->
                                                      <path class="${arrayData[i].status}" d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="${arrayData[i].gauge}"></path>
                                                    </svg>
                                                  </li>
                                                </ul>
                                    </span>
                              </div>
                      </div>
                    
                  </div>
            <div class="panel-footer text-center"> 
                  <a href="#" onclick="app().teachersRatingInfo();" >View statistics</a>
              </div>
          </div>
      </div>
    </div>`;
  
    }
        $(".schoolSubjects").html(out);
}

/** end of function for viewing the subject as well as the teacher handling them */



function teachersStatistics(array) {//this function calculates the teachers performance

  var arrayData = array,
      length = arrayData.length, i,
       teacher, subject, pass, fail, gauge;
       var out = '';
       for (i = 0; i < length; i++) {
          /*setting the different values on the array into specific variables */
            teacher = arrayData[i].teacher;
            subject = arrayData[i].subject;
            pass = arrayData[i].pass;
            fail = arrayData[i].fail;
        /*end of setting the different values on the array into specific variables */
    
      studentsTotal = pass + fail;//the total number of students in the classroom
      arrayData[i].subject = subject;//the name for the subject goes here
      arrayData[i].success = Math.round(pass/studentsTotal * 100);//number of students that passed
      arrayData[i].failure = Math.round(fail/studentsTotal * 100);//number of students that failed
      var rate = arrayData[i].success; //setting the rate variable to be the result of the pass property
      var gauge = guager(rate);//setting the guage variable to be the returned value of the gauger function.
           arrayData[i].gauge = gauge;//hanging the guage variable to the details object
      

        /**the next block of code sets the status of the teachers info
         * be it, warning, danger or success
        */
       if(rate >= 0 && rate <= 49) {
        arrayData[i].status = "danger";
        arrayData[i].performance = "students are performing poorly";//this tells the students perfomace on these course
          } else if(rate >= 50 && rate <=69) {
            arrayData[i].status = "warning";
            arrayData[i].performance = "students performance are at average";//this tells the students perfomace on these course
          } else if(rate >= 70 && rate <= 100) {
            arrayData[i].status = "success";
            arrayData[i].performance = "Excellent performance from students";//this tells the students perfomace on these course
      };
          /** end of the block of code that sets the status of the teachers info
         * be it, warning, danger or success
        */
          out += `<div class="row">
          <div class=" col-md-offset-2 col-md-8">
                  <div class="rating panel panel-${arrayData[i].status}">
                      <div class="panel-heading">
                          <h3 class="panel-title text-center">
                              <b>${arrayData[i].subject}</b>
                          </h3>
                      </div>
                      <div class="panel-body">
                          <div class="row teachersRating">
                              <div class="col-md-3 col-xs-6 col-sm-6">
                                      <h5 class="teacherName text-default text-center">
                                        <i class="fa fa-user-circle-o"></i> ${arrayData[i].teacher}
                                      </h5>
                              </div>
                              
                              <div class="teachersStudentSuccesses col-md-3 col-xs-3 col-sm-6  hidden-xs hidden-sm">
                                  <p class="studentsPassed text-${arrayData[i].status} text-center">
                                      passed students :${arrayData[i].success}%
                                  </p>
                              </div>
      
                              <div class="teachersStudentSuccesses col-md-3 col-xs-3 col-sm-6 hidden-xs hidden-sm" >
                                  <p class="studentsPassed text-danger text-center">
                                      failed students : ${arrayData[i].failure}%
                                  </p>
                              </div>
      
                              <div class="col-xs-3 hidden-sm hidden-xs">
                              </div>
                              <div class="col-md-3  col-xs-3 col-sm-3">
                                      <span class="teacherRating">
                                              <ul class="rating">
                                                      <li  class="${arrayData[i].status}" data-name="Rating" data-percent="${arrayData[i].success}%"> 
                                                      <svg viewBox="-10 -10 220 220">
                                                        <g fill="none" stroke-width="2" transform="translate(100,100)">
                                                          <path d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#cl1)"/>
                                                          <path d="M 86.6,-50 A 100,100 0 0,1 86.6,50" stroke="url(#cl2)"/>
                                                          <path d="M 86.6,50 A 100,100 0 0,1 0,100" stroke="url(#cl3)"/>
                                                          <path d="M 0,100 A 100,100 0 0,1 -86.6,50" stroke="url(#cl4)"/>
                                                          <path d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#cl5)"/>
                                                          <path d="M -86.6,-50 A 100,100 0 0,1 0,-100" stroke="url(#cl6)"/>
                                                        </g>
                                                        </svg> 
                                                        <svg viewBox="-10 -10 220 220">
                                                          <!-- in the stoke-offset, the highest to the end of the cicle is 630,
                                                          but you can exceed that it will just grow into the circle again -->
                                                          <path class="${arrayData[i].status}" d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="${arrayData[i].gauge}"></path>
                                                        </svg>
                                                      </li>
                                                    </ul>
                                        </span>
                                  </div>
                          </div>
                        
                      </div>
                <div class="panel-footer text-center"> 
                      <a href="#" onclick="app().studentAnalysis('${arrayData[i].performance}', '${arrayData[i].subject}', '${arrayData[i].status}', ${arrayData[i].success}, ${arrayData[i].gauge});">View class</a>
                  </div>
              </div>
          </div>
        </div>`;
      
        }
        $(".teachersStatistics").html(out);//this pushes the ouput to the tachersStatistics class

     };




/**   THIS FUNCTION CONTROLS THE EVAUATION OF the students*/
function studentAnalysis(performance, search, meterStatus, meterSuccess, meterGuage) {

    console.log(search);
    console.log(studentsData()[search]);

  var arrayData = studentsData(),
      namer = search,//holds the name of the searched class topic
      searchedObject = arrayData[search],
      length = searchedObject.length, i, status, rate,
      output = '',
      guageMeter = " ",
      gauge = guager(rate);//setting the guage variable to be the returned value of the gauger function.

      $(".theSubjectName").text(namer);//passes the subect name to the theSubjctName class
      $("h3.studentSpecificEvaluation").text(performance);//showing the students performance
      $(".studentPanel").addClass("panel-"+meterStatus);//coloring the panel accroding the student's perfomance
      

 for (i = 0; i < length; i++) {
     /*setting the different values on the array into specific variables */
       name = searchedObject[i].name;
       tma1 = searchedObject[i].tma1;
       tma2 = searchedObject[i].tma2;
       tma3 = searchedObject[i].tma3;
       exam = searchedObject[i].exam;
   /*end of setting the different values on the array into specific variables */

  studentsTotal = tma1 + tma2 + tma3 + exam;//the total number of students in the classroom
  
  rate = Math.round(studentsTotal);//number of students that passed


   /**the next block of code sets the status of the teachers info
    * be it, warning, danger or success
   */
     if(rate >= 0 && rate <= 49) {
            status = "danger";
         } else if(rate >= 50 && rate <=69) {
            status = "warning";
         } else if(rate >= 70 && rate <= 100) {
            status = "success";
     };
     /** end of the block of code that sets the status of the teachers info
    * be it, warning, danger or success
   */
     output += `<tr class="${status}">
                  <td>${name}</td>
                  <td>${tma1}</td>
                  <td>${tma2}</td>
                  <td>${tma3}</td>
                  <td>${exam}</td>
                  <td>${studentsTotal}</td>
                </tr>`;
   }
      
   $(output).insertAfter("tr.subjectOutput");//this takes the loop created Html and inserts it after the able element tr.subjectOutput

   

   guageMeter += `<ul class="rating">
                                <li  class="${meterStatus}" data-name="Rating" data-percent="${meterSuccess}%"> 
                                <svg viewBox="-10 -10 220 220">
                                  <g fill="none" stroke-width="2" transform="translate(100,100)">
                                    <path d="M 0,-100 A 100,100 0 0,1 86.6,-50" stroke="url(#cl1)"/>
                                    <path d="M 86.6,-50 A 100,100 0 0,1 86.6,50" stroke="url(#cl2)"/>
                                    <path d="M 86.6,50 A 100,100 0 0,1 0,100" stroke="url(#cl3)"/>
                                    <path d="M 0,100 A 100,100 0 0,1 -86.6,50" stroke="url(#cl4)"/>
                                    <path d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#cl5)"/>
                                    <path d="M -86.6,-50 A 100,100 0 0,1 0,-100" stroke="url(#cl6)"/>
                                  </g>
                                  </svg> 
                                  <svg viewBox="-10 -10 220 220">
                                    <!-- in the stoke-offset, the highest to the end of the cicle is 630,
                                    but you can exceed that it will just grow into the circle again -->
                                    <path class="${meterStatus}" d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z" stroke-dashoffset="${meterGuage}"></path>
                                  </svg>
                                </li>
                              </ul>`;



   $(".classPerformaceRating").html(guageMeter);//setting the guage meter to the use case
}
/**   END OF THE FUNCTION THAT CONTROLS THE EVAUATION OF the students*/




/** FUNCTION FOR GUAGING THE METER*/
function guager(rate) {

  var gauge = Number();
   /**the next block of code sets the guage of the meter */

      if (rate >= 0 && rate <= 5) {

                gauge = 630;

            } else if (rate >= 6 && rate <= 10) {

              gauge = 680;

            } else if (rate >= 11 && rate <= 15) {

              gauge = 725;

            } else if (rate >= 16 && rate <= 20) {

                gauge = 750;

            } else if (rate >= 21 && rate <= 25) {

                gauge = 775;

            } else if (rate >= 26 && rate <= 30) {

              gauge = 800;

            } else if (rate >= 31 && rate <= 35) {

                gauge = 825;

            } else if (rate >= 36 && rate <= 40) {

                gauge = 850;

            } else if (rate >= 41 && rate <= 45) {

                gauge = 875;

            } else if (rate >= 46 && rate <= 50) {

                gauge = 900;

            } else if (rate >= 51 && rate <= 55) {

                gauge = 925;

            } else if (rate >= 56 && rate <= 60) {

                gauge = 950;

            } else if (rate >= 61 && rate <= 65) {

                gauge = 975;

            } else if (rate >= 66 && rate <= 70) {

                gauge = 1000;

            } else if (rate >= 71 && rate <= 75) {

                gauge = 1025;

            } else if (rate >= 76 && rate <= 80) {

                gauge = 1100;

            } else if (rate >= 81 && rate <= 85) {

                gauge = 1125;

            } else if (rate >= 86 && rate <= 90) {

                gauge = 1150;

            } else if (rate >= 91 && rate <= 95) {

                gauge = 1175;

          }  else if (rate >= 96 && rate <= 100) {

              gauge = 1200;
    };

    return gauge;
}
/**END OF FUNCTION FOR GUAGING THE METER */



/** the next function holds the teacher data*/
function teachersData() {
  var data = [{
      teacher:  "Emmanuel Kadiri",
      subject: "GST 101 Use of English and Communication Skill I 2 C",
      pass: 8,
      fail:  2
  }, {
      teacher:  "Kadiri Emmanuel",
      subject: "GST 107 The Good Study Guide 2 C",
      pass: 6,
      fail:  4
  }, {
      teacher:  "Emmanuel Kadiri",
      subject: "BIO101 General Biology 2 C" ,
      pass: 5,
      fail:  5
  }, {
      teacher:  "Kadiri Emmanuel",
      subject: "CHM101 Introductory Inorganic Chemistry 2 C",
      pass: 2,
      fail:  8
  }, {
      teacher:  "Emmanuel Kadiri",
      subject: "CIT 101 Computers in Society 2 C",
      pass: 9,
      fail:  1
  }, {
      teacher:  "Kadiri Emmanuel",
      subject: "CIT132 Programming in BASIC 2",
      pass: 1,
      fail:  9
  }, {
      teacher:  "Emmanuel Kadiri",
      subject: "CIT 143 Introduction to Data Organisation and Management 2 C",
      pass: 3,
      fail:  7
  }, {
     teacher:  "Kadiri Emmanuel",
      subject: "CHM191 Introductory Practical Chemistry I 2 C",
      pass: 7,
      fail:  3
  }, {
      teacher:  "Emmanuel Kadiri",
      subject: "MTH 121 Linear Algebra I 2 C",
      pass: 5,
      fail:  5
  }, {
      teacher:  "Kadiri Emmanuel",
      subject: "PHY 111 Elementary Mechanics 2 C",
      pass: 8,
      fail:  2
  }];

  return data;
}
/** end of the function that holds the teacher data*/

/** this function holds the student data*/
function studentsData() {
    return {
      "GST 101 Use of English and Communication Skill I 2 C" : [{
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 56
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 3,
                                                                tma3:  4,
                                                                exam: 55
                                                              },
                                                              {
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 4,
                                                                tma2 : 9,
                                                                tma3:  5,
                                                                exam: 38
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 6,
                                                                tma2 : 7,
                                                                tma3:  8,
                                                                exam: 20
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 8,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 13
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 10,
                                                                tma3:  8,
                                                                exam: 70
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 4,
                                                                tma2 : 8,
                                                                tma3:  10,
                                                                exam: 54
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 47
                                                              }],
                          "GST 107 The Good Study Guide 2 C" : [{
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 58
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 3,
                                                                tma3:  4,
                                                                exam: 32
                                                              },
                                                              {
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 4,
                                                                tma2 : 9,
                                                                tma3:  5,
                                                                exam: 43
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 6,
                                                                tma2 : 7,
                                                                tma3:  8,
                                                                exam: 35
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 57
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 8,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 32
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 10,
                                                                tma3:  8,
                                                                exam: 43
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 56
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 4,
                                                                tma2 : 8,
                                                                tma3:  10,
                                                                exam: 32
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 56
                                                              }],               
                                "BIO101 General Biology 2 C" : [{
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 53
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 3,
                                                                tma3:  4,
                                                                exam: 55
                                                              },
                                                              {
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 4,
                                                                tma2 : 9,
                                                                tma3:  5,
                                                                exam: 49
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 6,
                                                                tma2 : 7,
                                                                tma3:  8,
                                                                exam: 36
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 8,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 34
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 10,
                                                                tma3:  8,
                                                                exam: 56
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 78
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 4,
                                                                tma2 : 8,
                                                                tma3:  10,
                                                                exam: 54
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 36
                                                              }],               
               "CHM101 Introductory Inorganic Chemistry 2 C" : [{
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 3,
                                                                tma3:  4,
                                                                exam: 55
                                                              },
                                                              {
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 4,
                                                                tma2 : 9,
                                                                tma3:  5,
                                                                exam: 49
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 6,
                                                                tma2 : 7,
                                                                tma3:  8,
                                                                exam: 68
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 8,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 69
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 10,
                                                                tma3:  8,
                                                                exam: 70
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 4,
                                                                tma2 : 8,
                                                                tma3:  10,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              }],               
                          "CIT 101 Computers in Society 2 C" : [{
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                               {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 3,
                                                                tma3:  4,
                                                                exam: 55
                                                              },
                                                              {
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 4,
                                                                tma2 : 9,
                                                                tma3:  5,
                                                                exam: 49
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 6,
                                                                tma2 : 7,
                                                                tma3:  8,
                                                                exam: 68
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 8,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 69
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 10,
                                                                tma3:  8,
                                                                exam: 70
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 4,
                                                                tma2 : 8,
                                                                tma3:  10,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              }],               
                        "CIT132 Programming in BASIC 2" : [{
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 3,
                                                                tma3:  4,
                                                                exam: 55
                                                              },
                                                              {
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 4,
                                                                tma2 : 9,
                                                                tma3:  5,
                                                                exam: 49
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 6,
                                                                tma2 : 7,
                                                                tma3:  8,
                                                                exam: 68
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 8,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 69
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 10,
                                                                tma3:  8,
                                                                exam: 70
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 4,
                                                                tma2 : 8,
                                                                tma3:  10,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              }],               
        "CIT 143 Introduction to Data Organisation and Management 2 C" : [{
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 3,
                                                                tma3:  4,
                                                                exam: 55
                                                              },
                                                              {
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 4,
                                                                tma2 : 9,
                                                                tma3:  5,
                                                                exam: 49
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 6,
                                                                tma2 : 7,
                                                                tma3:  8,
                                                                exam: 36
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 8,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 69
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 10,
                                                                tma3:  8,
                                                                exam: 70
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 20
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 4,
                                                                tma2 : 8,
                                                                tma3:  10,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 41
                                                              }],               
            "CHM191 Introductory Practical Chemistry I 2 C" : [{
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 32
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 3,
                                                                tma3:  4,
                                                                exam: 54
                                                              },
                                                              {
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 4,
                                                                tma2 : 9,
                                                                tma3:  5,
                                                                exam: 31
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 6,
                                                                tma2 : 7,
                                                                tma3:  8,
                                                                exam: 57
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 8,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 69
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 10,
                                                                tma3:  8,
                                                                exam: 70
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 4,
                                                                tma2 : 8,
                                                                tma3:  10,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 49
                                                              }],               
                          "MTH 121 Linear Algebra I 2 C" : [{
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 60
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 3,
                                                                tma3:  4,
                                                                exam: 55
                                                              },
                                                              {
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 4,
                                                                tma2 : 9,
                                                                tma3:  5,
                                                                exam: 25
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 6,
                                                                tma2 : 7,
                                                                tma3:  8,
                                                                exam: 18
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 59
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 8,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 69
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 10,
                                                                tma3:  8,
                                                                exam: 70
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 4,
                                                                tma2 : 8,
                                                                tma3:  10,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 43
                                                              }],               
                          "PHY 111 Elementary Mechanics 2 C" : [{
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 3,
                                                                tma3:  4,
                                                                exam: 55
                                                              },
                                                              {
                                                                name:  "Adegbola Joel Abiodun",
                                                                tma1 : 4,
                                                                tma2 : 9,
                                                                tma3:  5,
                                                                exam: 58
                                                              },
                                                              {
                                                                name:  "Abiodun Joel Adegbola",
                                                                tma1 : 6,
                                                                tma2 : 7,
                                                                tma3:  8,
                                                                exam: 36
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 43
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 8,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 32
                                                              },
                                                              {
                                                                name:  "Joel Abiodun Adegbola",
                                                                tma1 : 9,
                                                                tma2 : 10,
                                                                tma3:  8,
                                                                exam: 70
                                                              },
                                                              {
                                                                name:    "Joel Adegbola Abiodun",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 64
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 4,
                                                                tma2 : 8,
                                                                tma3:  10,
                                                                exam: 67
                                                              },
                                                              {
                                                                name:  "Abiodun Adegbola Joel",
                                                                tma1 : 7,
                                                                tma2 : 6,
                                                                tma3:  8,
                                                                exam: 36
                                                              }]                                                          
    };
}
/** end of the function that holds the student data*/
