// autocomplet : this function will be executed every time we change the text
function autocomplet(box_id) {
	var min_length = 1; // min caracters to display the autocomplete
	var keyword = $('#search_term_'+ box_id).val();
	if (keyword.length >= min_length) {
		$.ajax({
			//url: 'http://128.199.241.54/labservices/public/get_investigation_list',
			url: 'get_investigation_list',
			type: 'GET',
			data: {keyword:keyword, count: box_id},
			success:function(data){

				li_count =	$(data).find('li')['prevObject'].length;

				if(li_count > 0){
					$('#list_'+ box_id).show();
					$('#list_'+ box_id).html(data);
					
					if(li_count > 4){
						if (box_id == 3) {
							$('#list_'+ box_id).css('height', '250px');
							$('#list_'+ box_id).css('width', '70%');
						}
						else // in home page box 1 and 2
							$('#list_'+ box_id).css('height', '360%');
						
						$('#list_'+ box_id).css('overflow', 'auto');
					}
					else{
						list_height  =  li_count * 21;
						$('#list_'+ box_id).css('height', list_height);
						//$('#list_'+ box_id).css('overflow', 'hidden');
					}	
				}
				else if(li_count == 0){
					$('#list_'+ box_id).hide();
					$('#list_'+ box_id).html(data);
				}	
			}
		});
	} else {
		$('#list_'+ box_id).hide();
	}
}

// set_item : this function will be executed when we select an item
function set_item(item, box_id, identifier, type) {
	// change input value and identifier
	$('#search_term_'+ box_id).val(item);
	$('#search_term_'+ box_id).attr('data-identifier', identifier);
	$('#search_term_'+ box_id).attr('data-type', type);
	// hide proposition list
	$('#list_' + box_id).hide();
}


var i =	2;
var search_box_count = i;
$('#add-more-tests').on('click', function(){
	if(i == 3){
		bootbox.alert('You can add test or packages in next page. You can click on search lab button');
		return false;
	}
	var search_input =
	'<input type="text" name="tests" data-identifier="" data-type="" class="input_text home_search_box_class" id="search_term_2" onkeyup="autocomplet(2)" placeholder="Enter Test / Investigation / Package Name" value="">'
    + '<div class="investigation_list"> <ul class="investigation_list_ul" id="list_2"></ul></div>';
  //$('.banner-heading').css('margin-top','-10%');
  $('.home_input_container').append(search_input);
  i++;
  search_box_count = i;
});

$(function() {
	  var hostName 	=		window.location.hostname;

    $('#search-lab-btn').on('click', function(){
    	var queryParams = '';
    	var tests = '';
    	var packages = '';
    	var testsArr = new Array();
    	var packagesArr = new Array();
    	
    	var customerArea 	=	$('.home_customer_area').val();

    	//$("#search_labs :input").each(function(index, elm){
		$(".home_search_box_class").each(function(index, elm){

 			 	var type =	$(elm).attr('data-type');
 			 	var identifier = $(elm).attr('data-identifier');

 			 	if(typeof(type) !== "undefined" && typeof(identifier) !== "undefined" && type == "test"){
 			 		console.log('coming into tests part?');
 			 		testsArr.push($(elm).attr('data-identifier'));
 			 	}
 			  if(typeof(type) !== "undefined" && typeof(identifier) !== "undefined" && type == "package"){
 			  	packagesArr.push($(elm).attr('data-identifier'));
 			  }
			});

    	var uniqueTestNames = [];
			$.each(testsArr, function(i, el){
			    if($.inArray(el, uniqueTestNames) === -1) uniqueTestNames.push(el);
			});

    	if(uniqueTestNames.length > 1){
    		tests 	=	 uniqueTestNames.join("|");
    	}
    	else if(typeof(uniqueTestNames[0]) != "undefined"){
    		tests  =  uniqueTestNames[0];
    	}
    	else{
    		tests 	=		'';	
    	}

    	var uniquePackageNames = [];
			$.each(packagesArr, function(i, el){
			    if($.inArray(el, uniquePackageNames) === -1) uniquePackageNames.push(el);
			});

    	if(uniquePackageNames.length > 1){
    	 	packages 	=	 uniquePackageNames.join("|");
    	}
    	else if(typeof(uniquePackageNames[0]) != "undefined"){
    		packages 	=	 uniquePackageNames[0];	
    	}
    	else{	
    		packages 	=	 '';	
    	}

    	input_val = $('input[name="tests"]').val();
    	input_data_indentifier = $('input[name="tests"]').attr('data-identifier');
    	input_data_type = $('input[name="tests"]').attr('data-type');
    	li_items = $('.investigation_list_ul li');

    	if(tests || packages){
	    	var queryString		=	'tests='+tests+'&packages='+packages+'&customer_area='+customerArea;	

	    	if(hostName ==  'localhost')
	    		formAction	=		'http://'+hostName+'/labservices/search-diagnostics-centers?'+queryString;
				else
					formAction	=		'http://'+hostName+'/search-diagnostics-centers?'+queryString;
					window.location.href = formAction;		
			}
			else if(input_val && input_data_indentifier.length == 0 && input_data_type.length == 0 && li_items.length > 0){
				bootbox.alert('Please select the investigation from suggestion list.');
		   		return false;
			}
			else if(input_val && li_items.length == 0){
				$('.investigation_list ul').css('border', '0px solid #ccc');
				bootbox.alert('No Tests/Packages found.')
		   		return false;
			}
			else{
				bootbox.alert('Please enter the test/package name.');
		   		return false;
			}
		});

    // function refineSearch(){
    // 	console.log($.params());
    // }

    // Read a page's GET URL variables and return them as an associative array.
		function getUrlVars()
		{
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        //vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
		}
 

    $('.refine_by_lab').on('click', function(){
    	var selectedLab =	$(this).data('identifier');
    	var checkedProp  = 	$(this).prop('checked');

    	urlQueryparams 	=	 getUrlVars();

    	if(checkedProp){
	    	labs = 'labs' in urlQueryparams;
	    	if(!labs || urlQueryparams.labs == ''){
	    		urlQueryparams['labs'] 	=	  selectedLab;  	
	    	}
	    	else if(labs){
	    		urlQueryparams['labs'] 	=   urlQueryparams.labs+'|'+selectedLab;
	    	}	
    	}
    	else{
    		labs 	=	(urlQueryparams.labs).split('|');
    		if(jQuery.inArray(selectedLab, labs) !== -1){
    			var resultArr =  jQuery.grep( labs, function(value) {
        		return value != selectedLab;
     	 		});
     	 	}	
     	 	urlQueryparams['labs'] 	=  resultArr.join('|');
    	}
	    var testParam = (urlQueryparams.tests && urlQueryparams.tests != "undefined") ? 'tests=' + urlQueryparams.tests : '';
	    var packageParam = (urlQueryparams.packages && urlQueryparams.packages != "undefined") ? '&packages=' + urlQueryparams.packages : '';
	    var customerAreaParam = (urlQueryparams.customer_area && urlQueryparams.customer_area != "undefined") ? '&customer_area=' + urlQueryparams.customer_area : '';
	    var labsParam = (urlQueryparams.labs && urlQueryparams.labs != "undefined") ? '&labs=' + urlQueryparams.labs : '';
	    var queryString		=	testParam + packageParam + customerAreaParam + labsParam;    	

			if(hostName ==  'localhost')
    			formAction	=		'http://'+hostName+'/labservices/search-diagnostics-centers?'+queryString;
			else
				formAction	=		'http://'+hostName+'/search-diagnostics-centers?'+queryString;
    	
    	window.location.href = formAction;		
    });

	$('.customer_area').on('change', function(){
		var selectedArea =	$(this).val();
		if(selectedArea == 0){
			$('#select3').next().effect( "shake", {times:4}, 1000 );
			return false;
		}
		urlQueryparams 	=	 getUrlVars();
		
		urlQueryparams['customer_area'] = selectedArea;
	    
	    var queryString		=  '';

	    /*
	    if('labs' in urlQueryparams)
    		queryString = 'tests='+urlQueryparams.tests+'&packages='+urlQueryparams.packages+'&customer_area='+urlQueryparams.customer_area+'&labs='+urlQueryparams.labs;
        else
      		queryString =  'tests='+urlQueryparams.tests+'&packages='+urlQueryparams.packages+'&customer_area='+urlQueryparams.customer_area;
      	*/
      	//queryString =  'tests='+urlQueryparams.tests+'&packages='+urlQueryparams.packages+'&customer_area='+urlQueryparams.customer_area;
      	var testParam = (urlQueryparams.tests && urlQueryparams.tests != "undefined") ? 'tests=' + urlQueryparams.tests : '';
	    var packageParam = (urlQueryparams.packages && urlQueryparams.packages != "undefined") ? '&packages=' + urlQueryparams.packages : '';
	    var customerAreaParam = (urlQueryparams.customer_area && urlQueryparams.customer_area != "undefined") ? '&customer_area=' + urlQueryparams.customer_area : '';
	    queryString		=		testParam + packageParam + customerAreaParam;

    	if(hostName ==  'localhost')
    		formAction	= 'http://'+hostName+'/labservices/search-diagnostics-centers?'+queryString;
		else
			formAction	=  'http://'+hostName+'/search-diagnostics-centers?'+queryString;

		window.location.href = formAction;	
	}); // .customer_area on change event

		$('.remove_item').on('click', function(){
				var remove_item =	$(this).parent().parent().prev().find('li').data('identifier');
				var type =	$(this).parent().parent().prev().find('li').data('type');
				
				if(typeof(remove_item) != 'undefined' && remove_item != ''){							  
				  urlQueryparams 	=	 getUrlVars();

				if(type == 'test'){
						tests 	=	(urlQueryparams.tests).split('|');
		    		if(jQuery.inArray(remove_item, tests)!==-1){
		    			var resultArr =  jQuery.grep(tests, function(value) {
		        		return value != remove_item;
		     	 		});
		     	 	}	
	     	 		urlQueryparams['tests'] 	=  resultArr.join('|');
	     	  }

	     	  if(type == 'package'){
						packages 	=	(urlQueryparams.packages).split('|');
		    		if(jQuery.inArray(remove_item, packages)!==-1){
		    			var resultArr =  jQuery.grep(packages, function(value) {
		        		return value != remove_item;
		     	 		});
		     	 	}	
	     	 		urlQueryparams['packages'] 	=  resultArr.join('|');
	     	  }

	     	/*
	     	if('labs' in urlQueryparams)
				    queryString		=		'tests='+urlQueryparams.tests+'&packages='+urlQueryparams.packages+'&customer_area='+urlQueryparams.customer_area+'&labs='+urlQueryparams.labs;
	    	else 
	    			queryString		=		'tests='+urlQueryparams.tests+'&packages='+urlQueryparams.packages+'&customer_area='+urlQueryparams.customer_area;
	    	*/
	    	var testParam = (urlQueryparams.tests && urlQueryparams.tests != "undefined") ? 'tests=' + urlQueryparams.tests : '';
	    	var packageParam = (urlQueryparams.packages && urlQueryparams.packages != "undefined") ? '&packages=' + urlQueryparams.packages : '';
	    	var customerAreaParam = (urlQueryparams.customer_area && urlQueryparams.customer_area != "undefined") ? '&customer_area=' + urlQueryparams.customer_area : '';
	    	var queryString		=		testParam + packageParam + customerAreaParam;
	    				
	    	if(hostName ==  'localhost')
    			formAction	=		'http://'+hostName+'/labservices/search-diagnostics-centers?'+queryString;
				else
					formAction	=		'http://'+hostName+'/search-diagnostics-centers?'+queryString;

    		window.location.href = formAction;
    		$(this).closest('li').remove();	
	    }	
		});

$('#refine_add_more').on('click', function(){
	
	var new_item  = 	$('#search_term_3').attr('data-identifier');
	var type 	=		$('#search_term_3').attr('data-type');
	var new_item_value  = 	$('#search_term_3').val();
	var li_items = $('.investigation_list_ul li');

	urlQueryparams 	=	 getUrlVars();
	checkTests  =  new Array();

	if(typeof(new_item) != 'undefined' && new_item != ''){
		if(typeof(type) != 'undefined' && type == 'test'){
		    tests = 'tests' in urlQueryparams;
		    if(!tests || urlQueryparams.tests == ''){
			    urlQueryparams['tests'] 	=	  new_item;  	
			}
			else if(tests){
			   	checkTests 	=	urlQueryparams.tests.split("|");
			    if($.inArray(new_item, checkTests) == -1){
			    	urlQueryparams['tests'] =  urlQueryparams.tests+'|'+new_item;
			    }
			    else{ 
			    	$( "#test-added" ).dialog({
						modal: true,
						buttons: {
						Ok: function() {
						    $( this ).dialog( "close" );
						    $('#search_term_3').val('');
						}
					}
					});
					$(document).find('.ui-dialog-titlebar-close').remove();
					return false;
			    }	
			}	
		}
		else if(typeof(type) != 'undefined' && type == 'package'){
			packages = 'packages' in urlQueryparams;
			if(!packages || urlQueryparams.packages == ''){
			    urlQueryparams['packages'] 	=	  new_item;  	
			}
			else if(packages){
			    checkPackages 	=		urlQueryparams.packages.split("|");
			    var isExists = checkPackages.indexOf(new_item);	

			    if(isExists == -1){
			    	urlQueryparams['packages'] 	=   urlQueryparams.packages+'|'+new_item;
			    }
			    else{ 
			    	$( "#package-added" ).dialog({
						modal: true,
						buttons: {
						Ok: function() {
							$( this ).dialog( "close" );
							$('.add_more_test').val('');
							}
						}
					});
					$(document).find('.ui-dialog-titlebar-close').remove();
					return false;
				}
				urlQueryparams['packages'] 	=   urlQueryparams.packages+'|'+new_item;
			}	
		}
	    var testParam = (urlQueryparams.tests && urlQueryparams.tests != "undefined") ? 'tests=' + urlQueryparams.tests : '';
	    var packageParam = (urlQueryparams.packages && urlQueryparams.packages != "undefined") ? '&packages=' + urlQueryparams.packages : '';
	    var customerAreaParam = (urlQueryparams.customer_area && urlQueryparams.customer_area != "undefined") ? '&customer_area=' + urlQueryparams.customer_area : '';
	    var queryString		=		testParam + packageParam + customerAreaParam;

		//var queryString	= 'tests='+urlQueryparams.tests+'&packages='+urlQueryparams.packages+'&customer_area='+urlQueryparams.customer_area;
		/*var queryString		=   '';
		if('labs' in urlQueryparams){
			queryString	= 'tests='+urlQueryparams.tests+'&packages='+urlQueryparams.packages+'&customer_area='+urlQueryparams.customer_area+'&labs='+urlQueryparams.labs;
		}
	    else {
	    	queryString	= 'tests='+urlQueryparams.tests+'&packages='+urlQueryparams.packages+'&customer_area='+urlQueryparams.customer_area;
	    }*/
	    					
	    if(hostName ==  'localhost')
    		formAction	=	'http://'+hostName+'/labservices/search-diagnostics-centers?'+queryString;
		else
			formAction	=	'http://'+hostName+'/search-diagnostics-centers?'+queryString;

		window.location.href = formAction;	
	}
	else if(new_item_value.length == 0 && new_item_value == ''){
		$( "#empty-search" ).dialog({
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		//$(document).find('.ui-dialog-titlebar-close').remove();
		return false;
	}
	else if(new_item_value && !new_item.length && li_items.length > 0){
		$( "#direct-search" ).dialog({
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		//$(document).find('.ui-dialog-titlebar-close').remove();
		return false;	
	}
	else if(new_item_value && !new_item.length && li_items.length == 0){
		$( "#no-suggestions" ).dialog({
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		//$(document).find('.ui-dialog-titlebar-close').remove();
		return false;	    	
	}
});
// Function Book Appoint Button
    	$('.book_appoint_btn').on('click', function(){
    	
    	if(hostName ==  'localhost')
    		formAction	=		'http://'+hostName+'/labservices/check-investigation-details';
		else
			formAction	=		'http://'+hostName+'/check-investigation-details';
			
    		$(this).parent().parent().parent().find('.book-appointment').attr('action',formAction).submit();
    	});

    $(".final_cost").html(function() {
	    var a = 0;
	    $(".cost").each(function() {
	        a += parseInt($(this).html());
	    });
	    $('#total_cost').val(a);
	    return a;
		});

    $(".final_discount_price").html(function() {
	    var a = 0;
	    $(".discount_price").each(function() {
	        a += parseInt($(this).html());
	    });
	    $('#total_discounted_cost').val(a);
	    return a;
		});
		
		$(".final_discount").html(function(){
			var d 	=		$(".final_cost").html() -  $(".final_discount_price").html(); 
				$('#total_discount').val(d);
				return 	d;
		});

		$(".final_saved_price").html(function(){
				return 	$(".final_cost").html() -  $(".final_discount_price").html(); 
		});

		$('#step1_continue').on('click', function(){
			if(hostName ==  'localhost')
	    	formAction	=		'http://'+hostName+'/labservices/provide-contact-information';
			else
				formAction	=		'http://'+hostName+'/provide-contact-information';
    		$(this).closest('form').attr('action',formAction).submit();
		});






		


		$('#step3_confirm_btn').on('click', function(){
			if(hostName ==  'localhost')
	    		formAction	=		'http://'+hostName+'/labservices/order-complete';
			else
				formAction	=		'http://'+hostName+'/order-complete';
    		$(this).closest('form').attr('action',formAction).submit();
		});		



		$('#sorting').on('change', function(){
			if($('#sorting').val() == 2){
				$('.diagnostic_lab').sort(function (a, b) {
				  return $(a).find('.place-holder').data('price') - $(b).find('.lab_holder').data('price');
				}).each(function (_, diagnostic_lab) {
				  $(diagnostic_lab).parent().append(diagnostic_lab);
				});
			}
			else if($('#sorting').val() == 3){
				$('.diagnostic_lab').sort(function (b, a) {
				  return $(b).find('.place-holder').data('price') - $(a).find('.lab_holder').data('price');
				}).each(function (_, diagnostic_lab) {
				  $(diagnostic_lab).parent().append(diagnostic_lab);
				});
			}
			else if($('#sorting').val() == 4){				
				var area = $('#select_area').val();
				if(area == 0){
					alert('Please select area');
					return false;
				}
				$('.diagnostic_lab').sort(function (a, b) {
				  return $(a).find('.place-holder').data('distance') - $(b).find('.lab_holder').data('distance');
				}).each(function (_, diagnostic_lab) {
				  $(diagnostic_lab).parent().append(diagnostic_lab);
				});	
			}	
		});
		
		
});




































// var app = {
  
//   ajax: function(url, data, params) {
	
// 		var success_callback	= 	typeof(params.success_callback) == 'function' ? params.success_callback : null;
// 		var error_callback		= 	typeof(params.error_callback) == 'function' ? params.error_callback : null;
// 		var	overlay				=	typeof(params.overlay)!= 'undefined' ? params.overlay : 1;
// 		var complete_callback	= 	typeof(params.complete_callback) == 'function' ? params.complete_callback : null;

// 		if(overlay) {
// 			app.showBusy();
// 		}
// 		multiple : true;
// 		$.ajax({
// 			type: "POST",
// 			url: url,
// 			data: data,
// 			dataType: 'JSON',			
// 			success: function(response) {
// 				if(response.status == 'success') {
// 					if(success_callback == null) {					
// 						validation.showMessage(response);
// 						return;
// 					} else {
// 						success_callback(response,params);
// 					}
// 				} else {
// 					app.log('shit');
// 					if(error_callback == null) {
// 						validation.showMessage(response);
// 					} else {
// 						error_callback(response);
// 					}
// 				}						
// 			},
// 			error: function(jqXHR, textStatus, errorThrown){
// 				app.log('in error');
// 				app.log('error occured ' + errorThrown);
// 			},
// 			complete: function() {	
				
// 				if(overlay) {
// 					setTimeout(function(){ app.removeBusy(); }, 3000);
// 				}

// 				if(complete_callback != null) {
// 					complete_callback(params);
// 				}
// 			}
// 		});		
// 	},
	
// 	showBusy : function() {
// 		$(config.template.overlay).addClass('ajax-loading');
// 		$(config.template.overlay).show();
// 	},
	
// 	removeBusy : function() {
// 		$(config.template.overlay).removeClass('ajax-loading');
// 		$(config.template.overlay).hide();
// 		bind();
// 		if(config.poll)
// 			config.poll = 1 - config.poll;
// 	}
// }	

