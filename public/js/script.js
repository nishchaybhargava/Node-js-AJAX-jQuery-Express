//iife
(function () {
  //function init defined
    function init(){
      $('#submit').on("click",function(evt){
        
        var testForm = document.getElementById('credentials');
      
          
        evt.preventDefault();
        evt.stopPropagation();
        
        $('#fade').hide();
        $('#fade2').hide();
              
        $.ajax({
          url: '/form',
          type: 'POST',//or method:"POST"
          data: {
              uname: testForm.uname.value,
              pword: testForm.pword.value
                },
                //success callback
          success: postSuccessHandler
          });
      });
    }
  //function postSuccessHandker defined which is a callback function
    function postSuccessHandler (jsonData) {
      if(!(jsonData.uname!=null && jsonData.pword!=null)){
      return  $('#fade').fadeIn();
      }
      
      if(jsonData.flag==1)
      {
        window.location="https://mail.google.com";
      }
      else{
        $('#fade2').fadeIn();
      }
    };
    
  //the command run when iife comes into play
  $(document).ready(init);
  })();