var host_api ="http://localzotey.com/m-api" ;
function tabledata_handler(pageNum)
    {
      
       $.ajax({
         url:host_api+"/m-hot-deals/listing",
         type:'GET',
         dataType: 'json',
         data:{pageNum:pageNum},
         success:function(data){
         var load = document.getElementById("loading");
         $(load).css('display','none');
         if(data.error)
         {
           	 var error_modal = document.createElement('div');
               $(error_modal).addClass("modal");
               $(error_modal).attr('id', 'modal_firstpage');
               $(error_modal).css('position','relative');
               $(error_modal).css('backgroundColor','#fff'); 
               $(error_modal).css('position','relative');
               $(error_modal).css('border','0px');
               $(error_modal).css('borderRadius','5px');
               $(error_modal).css('paddingRight','0px');
               var close_action  = document.createElement('a');
               $(close_action).addClass("close");
               $(close_action).attr('href','#');
               $(close_action).html("&times;");
               $(close_action).css('marginTop' ,'-21px');
               $(close_action).css('fontSize','30px');
               $(close_action).css('marginRight','8px');
               var modal_body = document.createElement('div');
               $(modal_body).html('All pages are served');
               $(modal_body).css('padding' ,'10px');
               $(modal_body).css('position','relative');
              var modal_footer = document.createElement('div');
              $(modal_footer).css('textAlign','right');
              $(modal_footer).css('padding','15px');
              $(modal_footer).css('borderTop','1px solid #e5e5e5');
              $(modal_footer).css('marginRight','20px');
             var btn_element = document.createElement('button');
             $(btn_element).addClass("btn btn-primary");
             $(btn_element).html("Ok");
             $(close_action).on('click',function () 
             {
             	$(error_modal).modal().close(); 
             	});
             	$(btn_element).on('click',function () 
             	{
             		$(error_modal).modal().close();
             		 
             		});
                $(modal_footer).append(btn_element);
                $(error_modal).append(close_action);
                $(error_modal).append(modal_body);
                $(error_modal).append(modal_footer);
                $(error_modal).modal().open(); 
                  var view_btn = document.getElementById("view_button");
                 $(view_btn).html('');  
         }//id data error
         else 
         {
         	for(var i=0;i<data.length;i++)
             {	
               var table_row = document.createElement('tr');
               $(table_row).addClass("md-2");
               var hide = data[i].HotDealSlug;
               $(table_row).attr('data-id',hide);
               $(table_row).css('cursor','pointer');
               var details_btn = document.createElement('div');
               $(details_btn).addClass("details-btn");
               $(details_btn).html('Details');
               var table_data_des = document.createElement('td');
               $(table_data_des).html(data[i].HotDealName);
               $(table_data_des).append(details_btn);
               var table_data_mrp = document.createElement('td');
               $(table_data_mrp).html(data[i].HotDealMRP);
               var table_data_finalprice = document.createElement('td');
               $(table_data_finalprice).html(data[i].HotDealFinalPrice);
               var table_data_discount = document.createElement('td');
              $(table_data_discount).html(data[i].HotDealDiscount+"%");
               var table_data_date = document.createElement('td');
               var deal_date = data[i].HotDealEndDate;
               var deal_date_length = data[i].HotDealEndDate.length;
               if ( deal_date_length %2 == 0) 
               {
               	var deal_date_start = deal_date.substr(0,1);
               	var deal_date_sub = deal_date.substr(1,2);
               	var deal_date_end = deal_date.substr(3,deal_date_length);
               }
               else 
               {
               	  var deal_date_start = deal_date.substr(0,2);
               	  var deal_date_sub = deal_date.substr(2,3);
               	  var deal_date_end = deal_date.substr(4,deal_date_length);
               }
               $(table_data_date).html(deal_date_start+"<sup>"+deal_date_sub+"</sup>"+deal_date_end);
               $(table_row).append(table_data_des);
               $(table_row).append(table_data_mrp);
               $(table_row).append(table_data_finalprice);
               $(table_row).append(table_data_discount);
               $(table_row).append(table_data_date);
               $(".table-body").append(table_row);
               var dealslug = data[i].HotDealSlug;
            	$(table_row).on('click',function () 
             	{
             		var dataid = $(this).data('id');
             		loadingimage_handler();
             	    deal_details(dataid);
             	});
           }//for loop
              $("#view_button").unbind('click');
        	     $("#view_button").on('click',function () 
        	     {
                 tabledata_handler(pageNum+1);
              })//click fun
         }//else 
        }//success function
      });//ajax
    }//fnctn hndlr

 window.onload =tabledata_handler(1);
   function loadingimage_handler() 
   {
   	         var error_page = document.createElement('div');
               $(error_page).addClass("modal");
               $(error_page).attr('id','loading_page');
               $(error_page).css('backgroundColor','#fff');
               $(error_page).css('position','relative');
               var load_msg = document.createElement('div');
               $(load_msg).html("Please wait"+"&nbsp"+","+"&nbsp"+"while your request is being processed");
               $(load_msg).css('textAlign','center');
               var load_img = document.createElement('img');
               $(load_img).attr('id','loading_img');
               $(load_img).attr('src','images/loading.gif');
               $(load_img).css('marginLeft','256px');
                $(error_page).append(load_img);
                $(error_page).append(load_msg);
               $(error_page).modal().open();
    } 
      function deal_details(dataid)
    {    
          
          $.ajax({
         url:host_api+"/m-hot-deals/deal-info",
         type:'GET',
         dataType: 'json',
         data:{hotdealSlug:dataid},
          success:function(data){
          	 var dataToStore = JSON.stringify(data);
             localStorage.setItem('someData',dataToStore);
             var hotdeal_consultations = data.Consultations;
             var hotdeal_groups = data.GroupsInfo;
             var hotdeals_tests = data.TestsInfo;
              var deal_details_modal = document.createElement('div');
               $(deal_details_modal).addClass("modal");
               $(deal_details_modal).attr('id', 'modal_firstpage');
               $(deal_details_modal).css('position','relative');
               $(deal_details_modal).css('backgroundColor','#fff');
               $(deal_details_modal).css('paddingRight','0px');
               var close_element = document.createElement('a');
               $(close_element).addClass("close");
               $(close_element).attr('href','#');
               $(close_element).html("&times;");
               $(close_element).css('marginTop' ,'-19px');
               $(close_element).css('fontSize','26px');
               $(close_element).css('marginRight','7px');
               var head_name = document.createElement('h4');
               $(head_name).html(data.HotDealName);
               $(head_name).css('textAlign','center');
               $(head_name).css('fontSize','18px');
               $(head_name).css('fontWeight','bold');
               $(head_name).css('color','#5cb0cf');
               var price_heading = document.createElement('div');
               $(price_heading).css('width','554px');
               $(price_heading).css("background", "#41A7B3");
               $(price_heading).css('color','white');
               $(price_heading).css('fontWeight','bold');
               $(price_heading).css('marginTop','11px');
               $(price_heading).css('marginRight','20px');
               $(price_heading).css('marginBottom','6px');
               var valid_element = document.createElement('div');
               $(valid_element).html("Validity");
                $(valid_element).css('float','left');
                $(valid_element).css('paddingLeft','11px');
                $(valid_element).css('width','412px');
                 var price_element = document.createElement('div');
               $(price_element).html("Price Information");
               $(price_element).css('paddingRight','11px');
               var deal_price_valid_row = document.createElement('div');
               $(deal_price_valid_row).addClass("row");
               $(deal_price_valid_row).css('paddingRight','20px');
               var validity_element = document.createElement('div');
               $(validity_element).css('float','left');
               var from_date_element = document.createElement('div');
               var from_date_head = document.createElement('div');
               $(from_date_head).html("From"+"&nbsp"+"&nbsp"+":"+"&nbsp");
               $(from_date_head).css('fontWeight','bold');
               $(from_date_head).css('float','left');
               var from_date = document.createElement('div');
                var from_deal_date = data.HotDealStartDate;
               var from_deal_date_length = data.HotDealStartDate.length;
               if (from_deal_date_length %2 == 0) 
               {
               	 
               	var from_deal_date_start = from_deal_date.substr(0,1);
               	var from_deal_date_sub = from_deal_date.substr(1,2);
               	var from_deal_date_end = from_deal_date.substr(3,from_deal_date_length);
               }
               else 
               {
               	
               	  var from_deal_date_start = from_deal_date.substr(0,2);
               	  var from_deal_date_sub = from_deal_date.substr(2,3);
               	  var from_deal_date_end = from_deal_date.substr(4,from_deal_date_length);
               }
               $(from_date).html(from_deal_date_start+"<sup>"+ from_deal_date_sub+"</sup>"+from_deal_date_end);
               $(from_date).css('float','right');
               $(from_date_element).append(from_date_head);
               $(from_date_element).append(from_date);
               var end_date = document.createElement('div');
               var end_date_element = document.createElement('div');
               var end_date_head = document.createElement('div');
               $(end_date_head).html("To"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+":"+"&nbsp");
               $(end_date_head).css('fontWeight','bold');
               $(end_date_head).css('float','left');
               var end_date = document.createElement('div');
                var deal_date = data.HotDealEndDate;
               var deal_date_length = data.HotDealEndDate.length;
               if ( deal_date_length %2 == 0) 
               {
               	 
               	var deal_date_start = deal_date.substr(0,1);
               	var deal_date_sub = deal_date.substr(1,2);
               	var deal_date_end = deal_date.substr(3,deal_date_length);
               }
               else 
               {
               	
               	  var deal_date_start = deal_date.substr(0,2);
               	  var deal_date_sub = deal_date.substr(2,3);
               	  var deal_date_end = deal_date.substr(4,deal_date_length);
               }
               $(end_date).html(deal_date_start+"<sup>"+ deal_date_sub+"</sup>"+deal_date_end);
               $(end_date).css('float','right');
               $(end_date_element).append(end_date_head);
               $(end_date_element).append(end_date);
            var deal_price_details = document.createElement('div');
            $(deal_price_details).css('float','right');
            $(deal_price_details).css('paddingRight','12px');
            $(deal_price_details).css('marginBottom','11px');
            var deal_price_details_price = document.createElement('div');
            $(deal_price_details_price).html("Rs."+data.HotDealMRP);
            $(deal_price_details_price).css('textAlign','center');
            $(deal_price_details_price).css('fontSize','22px');
            $(deal_price_details_price).css('color','rgb(236,73,73)');
            var deal_price_details_mrp = document.createElement('div');
            $(deal_price_details_mrp).css('fontSize','18px');
            var deal_mrp_bracket_div = document.createElement('div');
            $(deal_mrp_bracket_div).css('float','left');
            var deal_mrp_openbracket = document.createElement('div');
            $(deal_mrp_openbracket).html("("+"&nbsp");
            $(deal_mrp_openbracket).css('float','left');
            var deal_mrp_price = document.createElement('div');
            $(deal_mrp_price).html("Rs."+"&nbsp"+data.HotDealFinalPrice);
            $(deal_mrp_price).css('textDecoration','line-through');
            $(deal_mrp_price).css('float','left');
            var deal_mrp_closebracket = document.createElement('div');
            $(deal_mrp_closebracket).html("&nbsp"+")");
            $(deal_mrp_closebracket).css('float','right');
            $(deal_mrp_bracket_div).append(deal_mrp_openbracket);
            $(deal_mrp_bracket_div).append(deal_mrp_price);
            $(deal_mrp_bracket_div).append(deal_mrp_closebracket);
            $(deal_price_details_mrp).append(deal_mrp_bracket_div);
            var deal_discount_det = document.createElement('div');
             $(deal_discount_det).html("&nbsp"+data.HotDealDiscount+"%");
             $(deal_discount_det).css('float','right');
             $(deal_price_details_mrp).append(deal_discount_det);
             $(deal_price_details).append(deal_price_details_price);
             $(deal_price_details).append(deal_price_details_mrp);
             $(validity_element).append(from_date_element);
               $(validity_element).append(end_date_element);
               $(deal_price_valid_row).append(validity_element);
               $(deal_price_valid_row).append(deal_price_details);
               $(price_heading).append(valid_element);
               $(price_heading).append(price_element);
               $(deal_details_modal).append(close_element);
               $(deal_details_modal).append(head_name);
               $(deal_details_modal).append(price_heading);
               $(deal_details_modal).append(deal_price_valid_row);
                var offer_labs = document.createElement('div');
                 $(offer_labs).html("Offering Labs");
                 $(offer_labs).css("background", "#41A7B3");
                 $(offer_labs).css("color","white");
                 $(offer_labs).css("fontWeight","bold");
                 $(offer_labs).css("marginBottom","11px");
                 $(offer_labs).css("marginRight",'20px');
                var labs_list = document.createElement('table');
               $(labs_list).addClass("offer_labs");
               $(labs_list).css('cursor','pointer');
               for(var i=0;i<data.OfferingLabs.length;i++)
               {
                 var tr_labs = document.createElement('tr');
                 $(tr_labs).addClass("labs_row");
                 $(tr_labs).css('border','5px solid white');
                 $(tr_labs).attr('data-labname',data.OfferingLabs[i].labName);
                 $(tr_labs).attr('data-labslug',data.OfferingLabs[i].labSlug);
                 $(tr_labs).attr('data-dealname',data.HotDealName);
                 $(tr_labs).attr('data-dealslug',data.HotDealSlug);
                 $(tr_labs).attr('data-dealmrp',data.HotDealMRP);
                 $(tr_labs).attr('data-dealdiscount',data.HotDealDiscount);
                 $(tr_labs).attr('data-dealfinalprice',data.HotDealFinalPrice);
                 $(tr_labs).attr('data-labarea',data.OfferingLabs[i].labArea);
                 $(tr_labs).attr('data-onlinereports',data.OfferingLabs[i].onlineReports);
                 $(tr_labs).attr('data-visittype' ,data.OfferingLabs[i].visitType);
                 $(tr_labs).attr('data-labaddress',data.OfferingLabs[i].labAddress);
                 $(tr_labs).attr('data-labpin',data.OfferingLabs[i].labPincode);
                 var td_labs = document.createElement('td');
                 $(td_labs).addClass("lab_name");
                 var td_lab_area = document.createElement('td');
                 var td_lab_pin = document.createElement('td');
                 var td_lab_btn = document.createElement('td');
                 var book_button = document.createElement("button");
                 $(book_button).html("Book Now");
                 $(book_button).attr('id','book_deal');
                 $(book_button).addClass("book_lab");
                 $(book_button).css('borderRadius','3px');
                 $(book_button).css('border','none');
                 $(book_button).css('width','80px');
                 $(book_button).css('fontSize','12px');
                 $(book_button).css('background','rgb(236, 73, 73)');
                 $(book_button).css('color','white');
                 $(td_lab_btn).append(book_button);
                 $(td_labs).html(data.OfferingLabs[i].labName);
                 $(td_lab_area).html(data.OfferingLabs[i].labArea);
                 $(td_lab_pin).html(data.OfferingLabs[i].labPincode);
                 $(td_labs).css('width','250px');
                 $(td_lab_area).css('width','145px');
                 $(td_lab_pin).css('width','80px');
                 $(tr_labs).append(td_labs);
                 $(tr_labs).append(td_lab_area);
                 $(tr_labs).append(td_lab_pin);
                 $(tr_labs).append(td_lab_btn);
                 $(labs_list).append(tr_labs); 
                 $(tr_labs).on('click',function () 
                	{
                		 var labname = $(this).data('labname');
                  	 var labslug = $(this).data('labslug');
                  	 var dealname = $(this).data('dealname');
                  	 var deal_slug = $(this).data('dealslug');
                  	 var deal_mrp = $(this).data('dealmrp');
                  	 var deal_discount = $(this).data('dealdiscount');
                  	 var deal_finalprice = $(this).data('dealfinalprice');
                  	 var labarea = $(this).data('labarea');
                  	 var online_reports = $(this).data('onlinereports');
                  	 var visit_type = $(this).data('visittype');
                  	 var lab_address = $(this).data('labaddress');
                  	 var lab_pin = $(this).data('labpin');
                		form_handler(lab_address,lab_pin,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);
                		});
                  }//for offeringlabs
                 $(deal_details_modal).append(offer_labs);
                 $(deal_details_modal).append(labs_list);
                 var deal_contents = document.createElement('div');
                 $(deal_contents).css('marginTop','13px');
                 $(deal_contents).addClass("row deal_heading");
                 $(deal_contents).css('paddingRight','20px');
                 var contents_heading = document.createElement('div');
                 $(contents_heading).html("Deal Contents");
                 $(contents_heading).css('fontWeight','bold');
                 $(contents_heading).css('textAlign','center');
                 $(contents_heading).css('height','20px');
                 $(contents_heading).css('backgroundColor','#41A7B3');
                 $(contents_heading).css('color','white');
                 $(deal_contents).append(contents_heading);
                 if (data.Consultations.length+data.GroupsInfo.length+data.OfferingLabs.length > 0)  
                 {
                   $(deal_details_modal).append(deal_contents); 
                    hotdeals_contents_handler(deal_contents,hotdeal_consultations,hotdeal_groups,hotdeals_tests);
                 }//if    
                $(deal_details_modal).modal().open(); 
                
                 $(".close").on('click',function () 
                 {
               	  $(deal_details_modal).modal().close(); 
                 });//click
           
             	
           }//success fnctn 
        });//ajax
     }//fnctn handler
 
 function  hotdeals_contents_handler(deal_contents,hotdeal_consultations,hotdeal_groups,hotdeals_tests)
 {
 	 var hotdeal_cnt_totalcount = 0;
 	 var hotdeal_cnt_cont_index = 0;
    var hotdeal_cnt_cont_array = [];
    var hotdeal_cnt_cont_type;
    for (var i=0;i<hotdeal_groups.length;i++) 
    {
    	var hotdeal_grp_cnt_str = hotdeal_groups[i].testsInGroup;
    	if (hotdeal_grp_cnt_str != null && hotdeal_grp_cnt_str != "") 
    	{
    		 hotdeal_grp_cnt_temp_str = hotdeal_grp_cnt_str.split(",");
    		 hotdeal_cnt_totalcount = hotdeal_cnt_totalcount +hotdeal_grp_cnt_temp_str.length+1;
    	}//if not null and empty string 
    	else 
    	{
    		  hotdeal_cnt_totalcount = hotdeal_cnt_totalcount+1;
    	}//else
    }//for groups lnth
    if (hotdeals_tests.length > 0)  
    {
    	  if (hotdeal_groups.length >0) 
    	  {
    	  	  hotdeal_cnt_totalcount =hotdeals_tests.length+ hotdeal_cnt_totalcount+1;
    	  }
    	  else 
    	  {
    	  	  hotdeal_cnt_totalcount =hotdeals_tests.length+ hotdeal_cnt_totalcount;
    	  }
    }//if tests length 
    if (hotdeal_consultations.length >0) 
    {
    	 hotdeal_cnt_totalcount = hotdeal_cnt_totalcount +1+hotdeal_consultations.length;
    }//if consultation length 
    var hotdeal_cnt_middle_count = Math.ceil(hotdeal_cnt_totalcount/2);
    if (hotdeal_groups.length >0) 
    {
    	 for (var  i=0;i<hotdeal_groups.length;i++) 
    	 {
    	 	hotdeal_cnt_grp_name = hotdeal_groups[i].GroupName;
    	 	var hotdeal_cnt_var = hotdeals_cont_details_append_handler("title",hotdeal_cnt_grp_name,hotdeal_cnt_cont_array,hotdeal_cnt_cont_index,hotdeal_cnt_middle_count);
    	 	hotdeal_cnt_cont_index = hotdeal_cnt_var[0];
    	 	hotdeal_cnt_cont_array = hotdeal_cnt_var[1];
    	 	var hotdeal_cnt_str =  hotdeal_groups[i].testsInGroup;
    	 	if (hotdeal_cnt_str != null && hotdeal_cnt_str !="") 
    	 	{
    	 		var hotdeal_cnt_str_split =  hotdeal_cnt_str.split(",");
    	 		for (var j=0;j<hotdeal_cnt_str_split.length;j++) 
    	 		{
    	 			var hotdeal_cnt_grp_name = hotdeal_cnt_str_split[j];
    	 			var hotdeal_cnt_var = hotdeals_cont_details_append_handler("value",hotdeal_cnt_grp_name,hotdeal_cnt_cont_array,hotdeal_cnt_cont_index,hotdeal_cnt_middle_count);
    	 	      hotdeal_cnt_cont_index = hotdeal_cnt_var[0];
    	 	      hotdeal_cnt_cont_array = hotdeal_cnt_var[1];
    	 		}//for grp split lnth
    	 	}//if grp not empty and null
    	 }//for loop
    }//if grps info lnth
    if (hotdeals_tests.length > 0) 
    {
    	if (hotdeal_groups.length >0) 
    	{
    		 hotdeal_cnt_grp_name = "Individual Tests";
    		 var hotdeal_cnt_var = hotdeals_cont_details_append_handler("title",hotdeal_cnt_grp_name,hotdeal_cnt_cont_array,hotdeal_cnt_cont_index,hotdeal_cnt_middle_count);
    	 	hotdeal_cnt_cont_index = hotdeal_cnt_var[0];
    	 	hotdeal_cnt_cont_array = hotdeal_cnt_var[1];
    	}//if groups info
    	for (var tst=0;tst<hotdeals_tests.length;tst++) 
    	{
    		hotdeal_cnt_grp_name = hotdeals_tests[tst];
    		var hotdeal_cnt_var = hotdeals_cont_details_append_handler("value",hotdeal_cnt_grp_name,hotdeal_cnt_cont_array,hotdeal_cnt_cont_index,hotdeal_cnt_middle_count);
    	   hotdeal_cnt_cont_index = hotdeal_cnt_var[0];
    	 	hotdeal_cnt_cont_array = hotdeal_cnt_var[1];
    	}//for tst lnth 
    }//if tests info
    if (hotdeal_consultations.length >0) 
    {
    	hotdeal_cnt_grp_name = "Consultations";
    	var hotdeal_cnt_var = hotdeals_cont_details_append_handler("title",hotdeal_cnt_grp_name,hotdeal_cnt_cont_array,hotdeal_cnt_cont_index,hotdeal_cnt_middle_count);
    	hotdeal_cnt_cont_index = hotdeal_cnt_var[0];
    	hotdeal_cnt_cont_array = hotdeal_cnt_var[1];
    	for (var conslt =0;conslt<hotdeal_consultations.length;conslt++) 
    	{
    		hotdeal_cnt_grp_name = hotdeal_consultations[conslt];
    		var hotdeal_cnt_var = hotdeals_cont_details_append_handler("value",hotdeal_cnt_grp_name,hotdeal_cnt_cont_array,hotdeal_cnt_cont_index,hotdeal_cnt_middle_count);
    	   hotdeal_cnt_cont_index = hotdeal_cnt_var[0];
    	 	hotdeal_cnt_cont_array = hotdeal_cnt_var[1];
    	}//for  conslt lnth 
    }//if consltnts lnth 
    for (var i=0;i<hotdeal_cnt_cont_array.length;i++) 
    {
    	 var hotdeal_cnt_row = document.createElement('div');
      $(hotdeal_cnt_row).addClass("row deal_pfl_cnt_data");
      $(hotdeal_cnt_row).css('border','1px solid #ddd');
      $(hotdeal_cnt_row).append(hotdeal_cnt_cont_array[i][0]);
      if (hotdeal_cnt_cont_array[i][1] != undefined) 
      {
        $(hotdeal_cnt_row).append(hotdeal_cnt_cont_array[i][1]);
      }//if arry undefnd
      $(deal_contents).append(hotdeal_cnt_row);
    }//for cont array 
 }//fnctn endng 

function hotdeals_cont_details_append_handler(name_type,hotdeal_cnt_grp_name,hotdeal_cnt_cont_array,hotdeal_cnt_cont_index,hotdeal_cnt_middle_count)
{
    var hotdeal_cnt_element = document.createElement('div');
 	  $(hotdeal_cnt_element).addClass("pkg_pfl_cont");
 	  $(hotdeal_cnt_element).html(hotdeal_cnt_grp_name);
 	  if (name_type == "title") 
 	  {
 	  	  $(hotdeal_cnt_element).css('fontWeight','bold');
 	  	  $(hotdeal_cnt_element).css('paddingLeft','3px');
 	  }//if title
 	  else 
 	  {
 	  	 $(hotdeal_cnt_element).css('paddingLeft','12px');
 	  }//else title
 	  if(hotdeal_cnt_cont_index<hotdeal_cnt_middle_count)
 	  {
 	  	  $(hotdeal_cnt_element).css('borderRight','1px solid #ddd');
 	  	  $(hotdeal_cnt_element).css('float','left');
 	  	  $(hotdeal_cnt_element).css('width','50%');
 	  	  var hotdeal_cnt_data_array =[];
 	  	  hotdeal_cnt_data_array.push(hotdeal_cnt_element);
 	  	  hotdeal_cnt_cont_array.push(hotdeal_cnt_data_array);
 	   }//if
 	   else 
 	   {
 	   	 $(hotdeal_cnt_element).css('borderLeft','1px solid #ddd');
 	   	 $(hotdeal_cnt_element).css('float','right');
 	  	    $(hotdeal_cnt_element).css('width','50%');
 	   	 var hotdeal_temp_index = hotdeal_cnt_cont_index- hotdeal_cnt_middle_count;
 	   	hotdeal_cnt_cont_array[hotdeal_temp_index].push(hotdeal_cnt_element);
 	   }
 	  hotdeal_cnt_cont_index++;
 	  return [hotdeal_cnt_cont_index, hotdeal_cnt_cont_array];
}//fnctn hotdeals fnctn endng  
  
 function form_backbtn(lab_address,lab_pin,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea)
    {
    	         var localData = JSON.parse(localStorage.getItem('someData'));
    	         var hotdeal_consultations = localData.Consultations;
               var hotdeal_groups = localData.GroupsInfo;
               var hotdeals_tests = localData.TestsInfo;
              var local_deal_details_modal = document.createElement('div');
               $(local_deal_details_modal).addClass("modal");
               $(local_deal_details_modal).attr('id', 'modal_firstpage');
               $(local_deal_details_modal).css('position','relative');
               $(local_deal_details_modal).css('backgroundColor','#fff');
               $(local_deal_details_modal).css('paddingRight','0px');
               var local_close_element = document.createElement('a');
               $(local_close_element).addClass("close");
               $(local_close_element).attr('href','#');
               $(local_close_element).html("&times;");
               $(local_close_element).css('marginTop' ,'-19px');
               $(local_close_element).css('fontSize','26px');
               $(local_close_element).css('marginRight','7px');
               var local_head_name = document.createElement('h4');
               $(local_head_name).html(localData.HotDealName);
               $(local_head_name).css('textAlign','center');
               $(local_head_name).css('fontSize','18px');
               $(local_head_name).css('fontWeight','bold');
               $(local_head_name).css('color','#5cb0cf');
               var local_price_heading = document.createElement('div');
               $(local_price_heading).css('width','554px');
               $(local_price_heading).css("background", "#41A7B3");
               $(local_price_heading).css('color','white');
               $(local_price_heading).css('fontWeight','bold');
               $(local_price_heading).css('marginTop','11px');
               $(local_price_heading).css('marginRight','20px');
               $(local_price_heading).css('marginBottom','6px');
               var local_valid_element = document.createElement('div');
               $(local_valid_element).html("Validity");
                $(local_valid_element).css('float','left');
                $(local_valid_element).css('paddingLeft','11px');
                $(local_valid_element).css('width','412px');
                 var local_price_element = document.createElement('div');
               $(local_price_element).html("Price Information");
               $(local_price_element).css('paddingRight','11px');
               var local_deal_price_valid_row = document.createElement('div');
               $(local_deal_price_valid_row).addClass("row");
               $(local_deal_price_valid_row).css('paddingRight','20px');
               var local_validity_element = document.createElement('div');
               $(local_validity_element).css('float','left');
               var local_from_date_element = document.createElement('div');
               var local_from_date_head = document.createElement('div');
               $(local_from_date_head).html("From"+"&nbsp"+"&nbsp"+":"+"&nbsp");
               $(local_from_date_head).css('fontWeight','bold');
               $(local_from_date_head).css('float','left');
               var local_from_date = document.createElement('div');
               $(local_from_date).html(localData.HotDealStartDate);
               $(local_from_date).css('float','right');
               $(local_from_date_element).append(local_from_date_head);
               $(local_from_date_element).append(local_from_date);
               var local_end_date = document.createElement('div');
               var local_end_date_element = document.createElement('div');
               var local_end_date_head = document.createElement('div');
               $(local_end_date_head).html("To"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+":"+"&nbsp");
               $(local_end_date_head).css('fontWeight','bold');
               $(local_end_date_head).css('float','left');
               var local_end_date = document.createElement('div');
               $(local_end_date).html(localData.HotDealEndDate);
               $(local_end_date).css('float','right');
               $(local_end_date_element).append(local_end_date_head);
               $(local_end_date_element).append(local_end_date);
            var local_deal_price_details = document.createElement('div');
            $(local_deal_price_details).css('float','right');
            $(local_deal_price_details).css('paddingRight','12px');
            $(local_deal_price_details).css('marginBottom','11px');
            var local_deal_price_details_price = document.createElement('div');
            $(local_deal_price_details_price).html("Rs."+localData.HotDealMRP);
            $(local_deal_price_details_price).css('textAlign','center');
            $(local_deal_price_details_price).css('fontSize','22px');
            $(local_deal_price_details_price).css('color','rgb(236,73,73)');
            var local_deal_price_details_mrp = document.createElement('div');
            $(local_deal_price_details_mrp).css('fontSize','18px');
            var local_deal_mrp_bracket_div = document.createElement('div');
            $(local_deal_mrp_bracket_div).css('float','left');
            var local_deal_mrp_openbracket = document.createElement('div');
            $(local_deal_mrp_openbracket).html("("+"&nbsp");
            $(local_deal_mrp_openbracket).css('float','left');
            var local_deal_mrp_price = document.createElement('div');
            $(local_deal_mrp_price).html("Rs."+"&nbsp"+localData.HotDealFinalPrice);
            $(local_deal_mrp_price).css('textDecoration','line-through');
            $(local_deal_mrp_price).css('float','left');
            var local_deal_mrp_closebracket = document.createElement('div');
            $(local_deal_mrp_closebracket).html("&nbsp"+")");
            $(local_deal_mrp_closebracket).css('float','right');
            $(local_deal_mrp_bracket_div).append(local_deal_mrp_openbracket);
            $(local_deal_mrp_bracket_div).append(local_deal_mrp_price);
            $(local_deal_mrp_bracket_div).append(local_deal_mrp_closebracket);
            $(local_deal_price_details_mrp).append(local_deal_mrp_bracket_div);
            var local_deal_discount_det = document.createElement('div');
             $(local_deal_discount_det).html("&nbsp"+localData.HotDealDiscount+"%");
             $(local_deal_discount_det).css('float','right');
             $(local_deal_price_details_mrp).append(local_deal_discount_det);
             $(local_deal_price_details).append(local_deal_price_details_price);
             $(local_deal_price_details).append(local_deal_price_details_mrp);
             $(local_validity_element).append(local_from_date_element);
               $(local_validity_element).append(local_end_date_element);
               $(local_deal_price_valid_row).append(local_validity_element);
               $(local_deal_price_valid_row).append(local_deal_price_details);
               $(local_price_heading).append(local_valid_element);
               $(local_price_heading).append(local_price_element);
               $(local_deal_details_modal).append(local_close_element);
               $(local_deal_details_modal).append(local_head_name);
               $(local_deal_details_modal).append(local_price_heading);
               $(local_deal_details_modal).append(local_deal_price_valid_row);
                var local_offer_labs = document.createElement('div');
                 $(local_offer_labs).html("Offering Labs");
                 $(local_offer_labs).css("background", "#41A7B3");
                 $(local_offer_labs).css("color","white");
                 $(local_offer_labs).css("fontWeight","bold");
                 $(local_offer_labs).css("marginBottom","11px");
                 $(local_offer_labs).css("marginRight",'20px');
                var local_labs_list = document.createElement('table');
               $(local_labs_list).addClass("offer_labs");
               $(local_labs_list).css('cursor','pointer');
               for(var i=0;i<localData.OfferingLabs.length;i++)
               {
                 var local_tr_labs = document.createElement('tr');
                 $(local_tr_labs).addClass("labs_row");
                 $(local_tr_labs).css('lineHeight','24px');
                 $(local_tr_labs).attr('data-labname',localData.OfferingLabs[i].labName);
                 $(local_tr_labs).attr('data-labslug',localData.OfferingLabs[i].labSlug);
                 $(local_tr_labs).attr('data-dealname',localData.HotDealName);
                 $(local_tr_labs).attr('data-dealslug',localData.HotDealSlug);
                 $(local_tr_labs).attr('data-dealmrp',localData.HotDealMRP);
                 $(local_tr_labs).attr('data-dealdiscount',localData.HotDealDiscount);
                 $(local_tr_labs).attr('data-dealfinalprice',localData.HotDealFinalPrice);
                 $(local_tr_labs).attr('data-labarea',localData.OfferingLabs[i].labArea);
                 $(local_tr_labs).attr('data-onlinereports',localData.OfferingLabs[i].onlineReports);
                 $(local_tr_labs).attr('data-visittype' ,localData.OfferingLabs[i].visitType); 
                 $(local_tr_labs).attr('data-labaddress',localData.OfferingLabs[i].labAddress);
                 $(local_tr_labs).attr('data-labpin',localData.OfferingLabs[i].labPincode);
                 var local_td_labs = document.createElement('td');
                 $(local_td_labs).addClass("lab_name");
                 var local_td_lab_area = document.createElement('td');
                 var local_td_lab_pin = document.createElement('td');
                 var local_td_lab_btn = document.createElement('td');
                 var local_book_button = document.createElement("button");
                 $(local_book_button).html("Book Now");
                 $(local_td_lab_btn).append(local_book_button);
                 $(local_book_button).attr('id','book_deal');
                 $(local_book_button).addClass("book_lab");
                 $(local_book_button).css('borderRadius','3px');
                 $(local_book_button).css('border','none');
                 $(local_book_button).css('width','80px');
                 $(local_book_button).css('fontSize','12px');
                 $(local_book_button).css('background','rgb(236, 73, 73)');
                 $(local_book_button).css('color','white');
                 $(local_td_labs).html(localData.OfferingLabs[i].labName);
                 $(local_td_lab_area).html(localData.OfferingLabs[i].labArea);
                 $(local_td_lab_pin).html(localData.OfferingLabs[i].labPincode);
                 $(local_td_labs).css('width','250px');
                 $(local_td_lab_area).css('width','145px');
                 $(local_td_lab_pin).css('width','80px');
                 $(local_tr_labs).append(local_td_labs);
                 $(local_tr_labs).append(local_td_lab_area);
                 $(local_tr_labs).append(local_td_lab_pin);
                 $(local_tr_labs).append(local_td_lab_btn);
                 $(local_labs_list).append(local_tr_labs); 
                 $(local_tr_labs).on('click',function () 
                	{
                		 var labname = $(this).data('labname');
                  	 var labslug = $(this).data('labslug');
                  	 var dealname = $(this).data('dealname');
                  	 var deal_slug = $(this).data('dealslug');
                  	 var deal_mrp = $(this).data('dealmrp');
                  	 var deal_discount = $(this).data('dealdiscount');
                  	 var deal_finalprice = $(this).data('dealfinalprice');
                  	 var labarea = $(this).data('labarea');
                  	 var online_reports = $(this).data('onlinereports');
                  	 var visit_type = $(this).data('visittype');
                  	 var lab_address = $(this).data('labaddress');
                  	 var lab_pin = $(this).data('labpin');
                		form_handler(lab_address,lab_pin,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);
                		});
                  }//for offeringlabs
                 $(local_deal_details_modal).append(local_offer_labs);
                 $(local_deal_details_modal).append(local_labs_list);
                 var deal_contents = document.createElement('div');
                 $(deal_contents).css('marginTop','13px');
                 $(deal_contents).addClass("row deal_heading");
                 $(deal_contents).css('paddingRight','20px');
                 var local_contents_heading = document.createElement('div');
                 $(local_contents_heading).html("Deal Contents");
                 $(local_contents_heading).css('fontWeight','bold');
                 $(local_contents_heading).css('textAlign','center');
                 $(local_contents_heading).css('height','20px');
                 $(local_contents_heading).css('backgroundColor','#41A7B3');
                 $(local_contents_heading).css('color','white');
                 $(deal_contents).append(local_contents_heading);
                 if (localData.Consultations.length+localData.GroupsInfo.length+localData.OfferingLabs.length > 0)  
                 {
                   $(local_deal_details_modal).append(deal_contents); 
                    hotdeals_contents_handler(deal_contents,hotdeal_consultations,hotdeal_groups,hotdeals_tests);
                 }//if    
                $(local_deal_details_modal).modal().open(); 
                
                 $(".close").on('click',function () 
                 {
               	  $(local_deal_details_modal).modal().close(); 
                 });//click
  }//fnctn handler 
 
 function hotdeal_patient_homevisit_handler()
{
  
  var hotdeal_homevisit_value  = $('input:radio:checked').val();
  var hotdeal_ptnt_hme_vst_address = document.getElementById("hotdeal_ptnt_address");
  if (hotdeal_homevisit_value == "yes") 
  {
  	   $(hotdeal_ptnt_hme_vst_address).css('display','block');
  }//if yes
  else 
  {
  	  $(hotdeal_ptnt_hme_vst_address).css('display','none');
  }//else
}//homevst fnctn endng

 
function form_handler(lab_address,lab_pin,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea)
 {
    var booking_page = document.createElement('div');
    $(booking_page).addClass("modal");
    $(booking_page).attr('id','modal_secondpage');
    $(booking_page).css('backgroundColor','#fff');
    $(booking_page).css('position','relative');
    $(booking_page).css('paddingRight','0px');
    $(booking_page).modal().open();
    var close_element = document.createElement('a');
    $(close_element).addClass("close");
    $(close_element).attr('href','#');
    $(close_element).html("&times;");
    $(close_element).css('marginTop' ,'-19px');
    $(close_element).css('fontSize','26px');
    $(close_element).css('marginRight','7px');
    $(close_element).attr('id','modal_close');
    var contact_heading = document.createElement('h4');
    $(contact_heading).html("Patient Information");
    $(contact_heading).css('textAlign','center');
    $(contact_heading).css('fontSize','18px');
    $(contact_heading).css('fontWeight','bold');
    $(contact_heading).css('color','#5cb0cf');
    var parent_wizard = document.createElement('div');
    $(parent_wizard).attr('id','tmm-form-wizard');
    $(parent_wizard).addClass('container substrate');
    $(parent_wizard).css('width','100%');
    $(parent_wizard).css('paddingTop','1px');
    var form_element = document.createElement('form');
    $(form_element).attr('method','post');
    $(form_element).attr('id','patient_info'); 
    $(form_element).attr('name','patient_info');
    $(form_element).attr('action','#');
    $(form_element).attr('role','form');
    $(form_element).css('marginRight','20px');
    $(form_element).attr('autocomplete','off');
    var wizard_element = document.createElement('div');
    $(wizard_element).addClass("form-wizard");
    $(wizard_element).css('padding-top','0px');
    var row_element = document.createElement('div');
    $(row_element).addClass("row");
    var col_element = document.createElement('div');
    $(col_element).addClass("col-md-12 no-pad");
    var form_class = document.createElement('form-wizard');
    $(form_class).addClass("form-wizard");
    $(form_class).css('border','0px');
    $(form_class).css('paddingTop','4px');
    var second_row = document.createElement('div');
    $(second_row).addClass("row");
    var col_class_element = document.createElement('div');
    $(col_class_element).addClass("col-md-12 col-sm-12");
    $(col_class_element).css('paddingTop','5px');
    var name_row = document.createElement('div');
    $(name_row).addClass("row");
    var name_col_class = document.createElement('div');
    $(name_col_class).addClass("col-md-12 col-sm-12");
    var fieldset_element = document.createElement('fieldset');
    $(fieldset_element).addClass("input-block");
    var label_ptntname = document.createElement('label');
    $(label_ptntname).attr('for','patient_name');
    $(label_ptntname).html("Full Name");
    var input_element = document.createElement('input');
    $(input_element).attr('type','text');
    $(input_element).attr('id', 'hotdeal_patient_name');
    $(input_element).attr('name','patient_name');
    $(input_element).attr('value','');
    $(input_element).addClass("form-icon form-icon-user");
    $(input_element).attr('placeholder','Please enter your name');
    $(input_element).attr('required','');
    var email_row = document.createElement('div');
    $(email_row).addClass("row");
    var email_col_class = document.createElement('div');
    $(email_col_class).addClass("col-md-12 col-sm-12");
    var fieldset_email = document.createElement('fieldset');
    $(fieldset_email).addClass("input-block");
    var label_email = document.createElement('label');
    $(label_email).attr('for','email');
    $(label_email).html("Email");
    var input_email = document.createElement('input');
    $(input_email).attr('type','text');
    $(input_email).attr('id','hotdeal_email');
    $(input_email).attr('name','patient_email');
    $(input_email).attr('value','');
    $(input_email).addClass('form-icon form-icon-mail');
    $(input_email).attr('placeholder','Please enter your email ID');
    $(input_email).attr('required','required');
    var hotdeal_gender_row = document.createElement('div');
    $(hotdeal_gender_row).addClass("row");
    $(hotdeal_gender_row).css('marginBottom','6px');
    var hotdeal_age_gender_col_class = document.createElement('div');
    $(hotdeal_age_gender_col_class).css('width','247px');
    $(hotdeal_age_gender_col_class).css('paddingLeft','15px');
    $(hotdeal_age_gender_col_class).css('paddingRight','15px');
    $(hotdeal_age_gender_col_class).css('float','left');
    var hotdeal_age_col_class = document.createElement('div');
    $(hotdeal_age_col_class).css('paddingLeft','0px');
    $(hotdeal_age_col_class).css('paddingRight','0px');
    $(hotdeal_age_col_class).css('float','left');
    $(hotdeal_age_col_class).css('width','85px');
    $(hotdeal_age_col_class).css('marginRight','34px');
    var hotdeal_fieldset_age = document.createElement('fieldset');
    $(hotdeal_fieldset_age).addClass("input-block");
    var hotdeal_label_ptntage = document.createElement('label');
    $(hotdeal_label_ptntage).attr('for','patient_age');
    $(hotdeal_label_ptntage).html("Age");
    var hotdeal_input_age = document.createElement('input');
    $(hotdeal_input_age).attr('type','text');
    $(hotdeal_input_age).attr('id', 'hotdeal_patient_age');
    $(hotdeal_input_age).attr('name','patient_age');
    $(hotdeal_input_age).attr('value','');
    $(hotdeal_input_age).attr('placeholder','Age');
    $(hotdeal_input_age).attr('required','');
    $(hotdeal_input_age).attr('maxlength','2');
    $(hotdeal_input_age).css('paddingRight','6px');
    $(hotdeal_fieldset_age).append(hotdeal_label_ptntage);
    $(hotdeal_fieldset_age).append(hotdeal_input_age);
    $(hotdeal_age_col_class).append(hotdeal_fieldset_age);
    var hotdeal_gender_col_class = document.createElement('div');
    $(hotdeal_gender_col_class).css('float','right');
    $(hotdeal_gender_col_class).css('width','90px');
    $(hotdeal_gender_col_class).css('paddingLeft','0px');
    var hotdeal_fieldset_gender = document.createElement('fieldset');
    $(hotdeal_fieldset_gender).addClass("input-block");
    var hotdeal_label_gender = document.createElement('label');
    $(hotdeal_label_gender).html("Gender");
    var hotdeal_gender_dropdown = document.createElement('div');
    $(hotdeal_gender_dropdown).addClass("dropdown");
    var hotdeal_gender_select = document.createElement('select');
    $(hotdeal_gender_select).attr('id','hotdeal_ptnt_gender');
    $(hotdeal_gender_select).css('width','100%');
    $(hotdeal_gender_select).css('backgroundPosition','100% center');
    $(hotdeal_gender_select).css('background','white');
    $(hotdeal_gender_select).css('height','34px');
    var hotdeal_gender_empty_option = document.createElement('option');
    $(hotdeal_gender_empty_option).html("select");
    $(hotdeal_gender_empty_option).attr('value','1');
    var hotdeal_gender_male_option = document.createElement('option');
    $(hotdeal_gender_male_option).attr('value','2');
    $(hotdeal_gender_male_option).html("Male");
    var hotdeal_gender_female_option = document.createElement('option');
    $(hotdeal_gender_female_option).attr('value','3');
    $(hotdeal_gender_female_option).html("Female");
    $(hotdeal_gender_select).append(hotdeal_gender_empty_option);
    $(hotdeal_gender_select).append(hotdeal_gender_male_option);
    $(hotdeal_gender_select).append(hotdeal_gender_female_option);
    $(hotdeal_gender_dropdown).append(hotdeal_gender_select);
    $(hotdeal_fieldset_gender).append(hotdeal_label_gender);
    $(hotdeal_fieldset_gender).append(hotdeal_gender_dropdown);
    $(hotdeal_gender_col_class).append(hotdeal_fieldset_gender);
    $(hotdeal_age_gender_col_class).append(hotdeal_age_col_class);
    $(hotdeal_age_gender_col_class).append(hotdeal_gender_col_class);
    $(hotdeal_gender_row).append(hotdeal_age_gender_col_class);
    var hotdeal_pin_col_class = document.createElement('div');
    $(hotdeal_pin_col_class).css('width','247px');
    $(hotdeal_pin_col_class).css('paddingLeft','15px');
    $(hotdeal_pin_col_class).css('paddingRight','15px');
    $(hotdeal_pin_col_class).css('float','right');
    var hotdeal_fieldset_pin = document.createElement('fieldset');
    $(hotdeal_fieldset_pin).addClass("input-block");
    var hotdeal_label_ptnt_pin = document.createElement('label');
    $(hotdeal_label_ptnt_pin).attr('for','patient_age');
    $(hotdeal_label_ptnt_pin).html("Pin Code");
    var hotdeal_input_ptnt_pin = document.createElement('input');
    $(hotdeal_input_ptnt_pin).attr('type','text');
    $(hotdeal_input_ptnt_pin).attr('id', 'hotdeal_patient_pincode');
    $(hotdeal_input_ptnt_pin).attr('name','patient_pincode');
    $(hotdeal_input_ptnt_pin).attr('value','');
    $(hotdeal_input_ptnt_pin).attr('placeholder','Pin Code');
    $(hotdeal_input_ptnt_pin).attr('required','');
    $(hotdeal_input_ptnt_pin).attr('maxlength','6');
    $(hotdeal_input_ptnt_pin).css('paddingRight','6px');
    $(hotdeal_fieldset_pin).append(hotdeal_label_ptnt_pin);
    $(hotdeal_fieldset_pin).append(hotdeal_input_ptnt_pin);
    $(hotdeal_pin_col_class).append(hotdeal_fieldset_pin);
    $(hotdeal_gender_row).append(hotdeal_pin_col_class);
    var hotdeal_hardcopy_row = document.createElement('div');
    $(hotdeal_hardcopy_row).addClass("row");
    $(hotdeal_hardcopy_row).css('marginTop','6px');
    $(hotdeal_hardcopy_row).css('marginBottom','6px');
    var hotdeal_hardcopy_class = document.createElement('div');
    $(hotdeal_hardcopy_class).addClass("col-md-12 col-sm-12");
    var hotdeal_hardcopy_head = document.createElement('div');
    $(hotdeal_hardcopy_head).addClass("col-md-9 col-sm-9");
    $(hotdeal_hardcopy_head).html("Do you need hard copy report"+"&nbsp;"+" (Charges applicable) ?");
    $(hotdeal_hardcopy_head).css('color','#748286');
    $(hotdeal_hardcopy_head).css('fontSize','12px');
    $(hotdeal_hardcopy_head).css('fontWeight','bold');
    $(hotdeal_hardcopy_head).css('paddingLeft','0px');
    $(hotdeal_hardcopy_head).css('paddingRight','0px');
    $(hotdeal_hardcopy_class).append(hotdeal_hardcopy_head);
    var hotdeal_hardcopy_select = document.createElement('div');
    $(hotdeal_hardcopy_select).addClass("col-md-3 col-sm-3");
    $(hotdeal_hardcopy_select).css('paddingLeft','0px');
    var hotdeal_hardcopy_yes_element = document.createElement('div');
    $(hotdeal_hardcopy_yes_element).css('float','left');
    var hotdeal_hardcopy_yes_ip = document.createElement('input');
    $(hotdeal_hardcopy_yes_ip).attr('type','radio');
    $(hotdeal_hardcopy_yes_ip).attr('name','hotdeal_hardcopy');
    $(hotdeal_hardcopy_yes_ip).attr('value','yes');
    $(hotdeal_hardcopy_yes_ip).css('float','left');
    $(hotdeal_hardcopy_yes_ip).css('height','16px');
    $(hotdeal_hardcopy_yes_ip).css('width','16px');
    $(hotdeal_hardcopy_yes_ip).css('display','block');
    var hotdeal_hardcopy_yes_p_element = document.createElement('div');
    $(hotdeal_hardcopy_yes_p_element).html("&nbsp;"+"&nbsp;"+"Yes"+"&nbsp;"+"&nbsp;");
    $(hotdeal_hardcopy_yes_p_element).css('float','left');
    $(hotdeal_hardcopy_yes_p_element).css('fontSize','12px');
    var hotdeal_hardcopy_no_element = document.createElement('div');
    $(hotdeal_hardcopy_no_element).css('float','left');
    var hotdeal_hardcopy_no_ip = document.createElement('input');
    $(hotdeal_hardcopy_no_ip).attr('type','radio');
    $(hotdeal_hardcopy_no_ip).attr('name','hotdeal_hardcopy');
    $(hotdeal_hardcopy_no_ip).attr('value','no');
    $(hotdeal_hardcopy_no_ip).css('float','left');
    $(hotdeal_hardcopy_no_ip).css('width','16px');
    $(hotdeal_hardcopy_no_ip).css('height','16px');
    $(hotdeal_hardcopy_no_ip).css('display','block');
    var hotdeal_hardcopy_no_p_element = document.createElement('div');
    $(hotdeal_hardcopy_no_p_element).html("&nbsp;"+"&nbsp;"+"No");
    $(hotdeal_hardcopy_no_p_element).css('float','left');
    $(hotdeal_hardcopy_no_p_element).css('fontSize','12px');
    $(hotdeal_hardcopy_yes_element).append(hotdeal_hardcopy_yes_ip);
    $(hotdeal_hardcopy_yes_element).append(hotdeal_hardcopy_yes_p_element);
    $(hotdeal_hardcopy_no_element).append(hotdeal_hardcopy_no_ip);
    $(hotdeal_hardcopy_no_element).append(hotdeal_hardcopy_no_p_element);
    $(hotdeal_hardcopy_select).append(hotdeal_hardcopy_yes_element);
    $(hotdeal_hardcopy_select).append(hotdeal_hardcopy_no_element);
    $(hotdeal_hardcopy_class).append(hotdeal_hardcopy_select);
    $(hotdeal_hardcopy_row).append(hotdeal_hardcopy_class); 
    var address_row = document.createElement('div');
    $(address_row).addClass("row");
    var address_col_class = document.createElement('div');
    $(address_col_class).addClass("col-md-12 col-sm-12");
    var fieldset_address = document.createElement('fieldset');
    $(fieldset_address).addClass("input-block");
    var label_address = document.createElement('label');
    $(label_address).attr('for','Address');
    $(label_address).html("Address");
    var input_address = document.createElement('input');
    $(input_address).attr('type','text');
    $(input_address).attr('id','hotdeal_pkg_address');
    $(input_address).attr('name','patient_address');
    $(input_address).attr('value','');
    $(input_address).css('width','468px');
    $(input_address).css('border','1px solid #c4cdcf');
    $(input_address).attr('placeholder','Please enter your Address');
    $(input_address).attr('required','required');
    $(input_address).css('paddingRight','11px');
    var phno_row = document.createElement('div');
    $(phno_row).addClass("row");
    var phno_col_class = document.createElement('div');
    $(phno_col_class).addClass("col-md-6 col-sm-12");
    var fieldset_phno = document.createElement('fieldset');
    $(fieldset_phno).addClass("input-block");
    var label_phno = document.createElement('label');
    $(label_phno).attr('for','phone1');
    $(label_phno).html('Mobile No:');
    var input_phno = document.createElement('input');
    $(input_phno).attr('type','text');
    $(input_phno).attr('id','hotdeal_phone');
    $(input_phno).attr('name','patient_mobile');
    $(input_phno).attr('value','');
    $(input_phno).addClass('form-icon form-icon-phone');
    $(input_phno).attr('placeholder','Number');
    $(input_phno).attr('required','required');
    var apptime_col_class = document.createElement('div');
    $(apptime_col_class).addClass('col-md-6 col-sm-12');
    var fieldset_booking = document.createElement('fieldset');
    $(fieldset_booking).addClass("input-block");
    var label_booking = document.createElement('label');
    $(label_booking).attr('for','app_time');
    $(label_booking).html('Preferred Appointment Time:');
    var input_booking = document.createElement('input');
    $(input_booking).attr('type','text');
    $(input_booking).attr('id','hotdeal_app_time');
    $(input_booking).attr('name','appointment_time');
    $(input_booking).attr('value','');
    $(input_booking).attr('placeholder','Select Timeslot');
    $(input_booking).addClass("form_datetime");
    $(input_booking).attr('required','required');
    var information_row = document.createElement('row');
    $(information_row).addClass("row");
    var note_col_class = document.createElement('div');
    $(note_col_class).addClass("col-md-12 col-sm-12");
    var font_element = document.createElement('font');
    $(font_element).html("*Note: Patient Information is kept confidential and is used only for booking appointments and to improve the service.");
    $(font_element).css('fontSize','10px');
    var prevbtn_element = document.createElement('div');
    $(prevbtn_element).css('marginLeft','30px');
    $(prevbtn_element).addClass('prev');
    var backbtn = document.createElement('button');
    $(backbtn).attr('id','step2_back_btn');
    $(backbtn).addClass("button button-control");
    $(backbtn).attr('type','button');
    var span_backbtn = document.createElement('span');
    $(span_backbtn).html("Back");
    $(backbtn).append(span_backbtn);
    var backbtn_divider = document.createElement('div');
    $(backbtn_divider).addClass("button-divider");
    var nextbtn_element = document.createElement('div');
    $(nextbtn_element).css('marginLeft','50px');
    $(nextbtn_element).addClass('next');
    var nextbtn = document.createElement('button');
    $(nextbtn).attr('id','step2_next_btn');
    $(nextbtn).addClass("button button-control");
    $(nextbtn).attr('type','button');
    var span_nextbtn = document.createElement('span');
    $(span_nextbtn).html("Next");
    $(nextbtn).append(span_nextbtn);
    var nextbtn_divider = document.createElement('div');
    $(nextbtn_divider).addClass("button-divider");
    $(fieldset_element).append(label_ptntname);
    $(fieldset_element).append(input_element);
    $(fieldset_email).append(label_email);
    $(fieldset_email).append(input_email);
    $(fieldset_phno).append(label_phno);
    $(fieldset_phno).append(input_phno);
    $(fieldset_booking).append(label_booking);
    $(fieldset_booking).append(input_booking);
    $(name_col_class).append(fieldset_element);
    $(email_col_class).append(fieldset_email);
    $(phno_col_class).append(fieldset_phno);
    $(apptime_col_class).append(fieldset_booking);
    $(note_col_class).append(font_element);
    $(name_row).append(name_col_class);
    $(email_row).append(email_col_class);
    $(phno_row).append(phno_col_class);
    $(phno_row).append(apptime_col_class);
    $(information_row).append(note_col_class);
    $(col_class_element).append(name_row);
    $(col_class_element).append(email_row);
    $(col_class_element).append(hotdeal_gender_row);
    $(col_class_element).append(phno_row);
    if (visit_type == 'homevisitonly') 
    {
       var hotdeal_homevisit_row = document.createElement('div');
       $(hotdeal_homevisit_row).addClass("row");
       $(hotdeal_homevisit_row).css('marginTop','6px');
       $(hotdeal_homevisit_row).css('marginBottom','6px');
       var hotdeal_homevisit_class = document.createElement('div');
       $(hotdeal_homevisit_class).addClass("col-md-12 col-sm-12");
       var hotdeal_homevisit_head = document.createElement('div');
       $(hotdeal_homevisit_head).addClass("col-md-7 col-sm-7");
       $(hotdeal_homevisit_head).html("Do you want home sample collection ?");
       $(hotdeal_homevisit_head).css('color','#748286');
       $(hotdeal_homevisit_head).css('fontSize','12px');
       $(hotdeal_homevisit_head).css('fontWeight','bold');
       $(hotdeal_homevisit_head).css('paddingLeft','0px');
       $(hotdeal_homevisit_head).css('paddingRight','0px');
       $(hotdeal_homevisit_class).append(hotdeal_homevisit_head);
       var hotdeal_homevisit_select = document.createElement('div');
       $(hotdeal_homevisit_select).addClass("col-md-5 col-sm-5");
       $(hotdeal_homevisit_select).css('paddingLeft','0px');
       var hotdeal_homevisit_yes_element = document.createElement('div');
       $(hotdeal_homevisit_yes_element).css('float','left');
       var hotdeal_homevisit_yes_ip = document.createElement('input');
       $(hotdeal_homevisit_yes_ip).attr('type','radio');
       $(hotdeal_homevisit_yes_ip).attr('value','yes');
       $(hotdeal_homevisit_yes_ip).attr('id','hotdeal_homevisit_yes');
       $(hotdeal_homevisit_yes_ip).attr('name','hotdeal_homevisit'); 
       $(hotdeal_homevisit_yes_ip).attr('checked','true');  
       $(hotdeal_homevisit_yes_ip).css('float','left');
       $(hotdeal_homevisit_yes_ip).css('height','16px');
       $(hotdeal_homevisit_yes_ip).css('width','16px');
       $(hotdeal_homevisit_yes_ip).css('display','block');
       var hotdeal_homevisit_yes_p_element = document.createElement('div');
       $(hotdeal_homevisit_yes_p_element).html("&nbsp;"+"&nbsp;"+"Yes"+"&nbsp;"+"&nbsp;");
       $(hotdeal_homevisit_yes_p_element).css('float','left');
       $(hotdeal_homevisit_yes_p_element).css('fontSize','12px');
       var hotdeal_homevisit_no_element = document.createElement('div');
       $(hotdeal_homevisit_no_element).css('float','left');
       $(hotdeal_homevisit_no_element).css('display','none');
       var hotdeal_homevisit_no_ip = document.createElement('input');
       $(hotdeal_homevisit_no_ip).attr('type','radio');
       $(hotdeal_homevisit_no_ip).attr('id','hotdeal_homevisit_no');
       $(hotdeal_homevisit_no_ip).attr('name','hotdeal_homevisit');
       $(hotdeal_homevisit_no_ip).attr('value','no');
       $(hotdeal_homevisit_no_ip).css('float','left');
       $(hotdeal_homevisit_no_ip).css('width','16px');
       $(hotdeal_homevisit_no_ip).css('height','16px');
       $(hotdeal_homevisit_no_ip).css('display','block');
       var hotdeal_homevisit_no_p_element = document.createElement('div');
       $(hotdeal_homevisit_no_p_element).html("&nbsp;"+"&nbsp;"+"No");
       $(hotdeal_homevisit_no_p_element).css('float','left');
       $(hotdeal_homevisit_no_p_element).css('fontSize','12px');
       $(hotdeal_homevisit_yes_element).append(hotdeal_homevisit_yes_ip);
       $(hotdeal_homevisit_yes_element).append(hotdeal_homevisit_yes_p_element);
       $(hotdeal_homevisit_no_element).append(hotdeal_homevisit_no_ip);
       $(hotdeal_homevisit_no_element).append(hotdeal_homevisit_no_p_element);
       $(hotdeal_homevisit_select).append(hotdeal_homevisit_yes_element);
       $(hotdeal_homevisit_class).append(hotdeal_homevisit_select);
       $(hotdeal_homevisit_row).append(hotdeal_homevisit_class);
       var hotdeal_address_row = document.createElement('div');
       $(hotdeal_address_row).addClass("row");
       $(hotdeal_address_row).attr('id','hotdeal_ptnt_address');
       var hotdeal_address_col_class = document.createElement('div');
       $(hotdeal_address_col_class).addClass("col-md-12 col-sm-12");
       var hotdeal_fieldset_address = document.createElement('fieldset');
       $(hotdeal_fieldset_address).addClass("input-block");
       var hotdeal_input_address = document.createElement('input');
       $(hotdeal_input_address).attr('type','text');
       $(hotdeal_input_address).attr('id','hotdeal_pfl_address');
       $(hotdeal_input_address).attr('name','patient_address');
       $(hotdeal_input_address).attr('value','');
       $(hotdeal_input_address).css('border','1px solid #c4cdcf');
       $(hotdeal_input_address).attr('placeholder','Address & LandMark');
       $(hotdeal_input_address).attr('required','required');
       $(hotdeal_input_address).css('paddingRight','11px');
       $(hotdeal_fieldset_address).append(hotdeal_input_address);
       $(hotdeal_address_col_class).append(hotdeal_fieldset_address);
       $(hotdeal_address_row).append(hotdeal_address_col_class);
       $(col_class_element).append(hotdeal_homevisit_row);
       $(col_class_element).append(hotdeal_address_row);
    }
    else if (visit_type =="both") 
    {
    	 var hotdeal_homevisit_row = document.createElement('div');
       $(hotdeal_homevisit_row).addClass("row");
       $(hotdeal_homevisit_row).css('marginTop','6px');
       $(hotdeal_homevisit_row).css('marginBottom','6px');
       var hotdeal_homevisit_class = document.createElement('div');
       $(hotdeal_homevisit_class).addClass("col-md-12 col-sm-12");
       var hotdeal_homevisit_head = document.createElement('div');
       $(hotdeal_homevisit_head).addClass("col-md-7 col-sm-7");
       $(hotdeal_homevisit_head).html("Do you want home sample collection ?");
       $(hotdeal_homevisit_head).css('color','#748286');
       $(hotdeal_homevisit_head).css('fontSize','12px');
       $(hotdeal_homevisit_head).css('fontWeight','bold');
       $(hotdeal_homevisit_head).css('paddingLeft','0px');
       $(hotdeal_homevisit_head).css('paddingRight','0px');
       $(hotdeal_homevisit_class).append(hotdeal_homevisit_head);
       var hotdeal_homevisit_select = document.createElement('div');
       $(hotdeal_homevisit_select).addClass("col-md-5 col-sm-5");
       $(hotdeal_homevisit_select).css('paddingLeft','0px');
       var hotdeal_homevisit_yes_element = document.createElement('div');
       $(hotdeal_homevisit_yes_element).css('float','left');
       var hotdeal_homevisit_yes_ip = document.createElement('input');
       $(hotdeal_homevisit_yes_ip).attr('type','radio');
       $(hotdeal_homevisit_yes_ip).attr('value','yes');
       $(hotdeal_homevisit_yes_ip).attr('id','hotdeal_homevisit_yes');
       $(hotdeal_homevisit_yes_ip).attr('name','hotdeal_homevisit');  
       $(hotdeal_homevisit_yes_ip).css('float','left');
       $(hotdeal_homevisit_yes_ip).css('height','16px');
       $(hotdeal_homevisit_yes_ip).css('width','16px');
       $(hotdeal_homevisit_yes_ip).css('display','block');
       $(hotdeal_homevisit_yes_ip).on('click',hotdeal_patient_homevisit_handler);
       var hotdeal_homevisit_yes_p_element = document.createElement('div');
       $(hotdeal_homevisit_yes_p_element).html("&nbsp;"+"&nbsp;"+"Yes"+"&nbsp;"+"&nbsp;");
       $(hotdeal_homevisit_yes_p_element).css('float','left');
       $(hotdeal_homevisit_yes_p_element).css('fontSize','12px');
       var hotdeal_homevisit_no_element = document.createElement('div');
       $(hotdeal_homevisit_no_element).css('float','left');
       var hotdeal_homevisit_no_ip = document.createElement('input');
       $(hotdeal_homevisit_no_ip).attr('type','radio');
       $(hotdeal_homevisit_no_ip).attr('id','hotdeal_homevisit_no');
       $(hotdeal_homevisit_no_ip).attr('name','hotdeal_homevisit');
       $(hotdeal_homevisit_no_ip).attr('value','no');
       $(hotdeal_homevisit_no_ip).css('float','left');
       $(hotdeal_homevisit_no_ip).css('width','16px');
       $(hotdeal_homevisit_no_ip).css('height','16px');
       $(hotdeal_homevisit_no_ip).css('display','block');
       $(hotdeal_homevisit_no_ip).on('click',hotdeal_patient_homevisit_handler);
       var hotdeal_homevisit_no_p_element = document.createElement('div');
       $(hotdeal_homevisit_no_p_element).html("&nbsp;"+"&nbsp;"+"No");
       $(hotdeal_homevisit_no_p_element).css('float','left');
       $(hotdeal_homevisit_no_p_element).css('fontSize','12px');
       $(hotdeal_homevisit_yes_element).append(hotdeal_homevisit_yes_ip);
       $(hotdeal_homevisit_yes_element).append(hotdeal_homevisit_yes_p_element);
       $(hotdeal_homevisit_no_element).append(hotdeal_homevisit_no_ip);
       $(hotdeal_homevisit_no_element).append(hotdeal_homevisit_no_p_element);
       $(hotdeal_homevisit_select).append(hotdeal_homevisit_yes_element);
       $(hotdeal_homevisit_select).append(hotdeal_homevisit_no_element);
       $(hotdeal_homevisit_class).append(hotdeal_homevisit_select);
       $(hotdeal_homevisit_row).append(hotdeal_homevisit_class);
       var hotdeal_address_row = document.createElement('div');
       $(hotdeal_address_row).addClass("row");
       $(hotdeal_address_row).attr('id','hotdeal_ptnt_address');
       $(hotdeal_address_row).css('display','none');
       var hotdeal_address_col_class = document.createElement('div');
       $(hotdeal_address_col_class).addClass("col-md-12 col-sm-12");
       var hotdeal_fieldset_address = document.createElement('fieldset');
       $(hotdeal_fieldset_address).addClass("input-block");
       var hotdeal_input_address = document.createElement('input');
       $(hotdeal_input_address).attr('type','text');
       $(hotdeal_input_address).attr('id','hotdeal_pfl_address');
       $(hotdeal_input_address).attr('name','patient_address');
       $(hotdeal_input_address).attr('value','');
       $(hotdeal_input_address).css('border','1px solid #c4cdcf');
       $(hotdeal_input_address).attr('placeholder','Address & LandMark');
       $(hotdeal_input_address).attr('required','required');
       $(hotdeal_input_address).css('paddingRight','11px');
       $(hotdeal_fieldset_address).append(hotdeal_input_address);
       $(hotdeal_address_col_class).append(hotdeal_fieldset_address);
       $(hotdeal_address_row).append(hotdeal_address_col_class);
       $(col_class_element).append(hotdeal_homevisit_row);
       $(col_class_element).append(hotdeal_address_row);
    }//else if 
    else 
    {
      var hotdeal_address_row = document.createElement('div');
       $(hotdeal_address_row).addClass("row");
       $(hotdeal_address_row).attr('id','hotdeal_ptnt_address');
       $(hotdeal_address_row).css('display','none');
       var hotdeal_address_col_class = document.createElement('div');
       $(hotdeal_address_col_class).addClass("col-md-12 col-sm-12");
       var hotdeal_fieldset_address = document.createElement('fieldset');
       $(hotdeal_fieldset_address).addClass("input-block");
       var hotdeal_input_address = document.createElement('input');
       $(hotdeal_input_address).attr('type','text');
       $(hotdeal_input_address).attr('id','hotdeal_pfl_address');
       $(hotdeal_input_address).attr('name','patient_address');
       $(hotdeal_input_address).attr('value','');
       $(hotdeal_input_address).css('border','1px solid #c4cdcf');
       $(hotdeal_input_address).attr('placeholder','Address & LandMark');
       $(hotdeal_input_address).attr('required','required');
       $(hotdeal_input_address).css('paddingRight','11px');
       $(hotdeal_fieldset_address).append(hotdeal_input_address);
       $(hotdeal_address_col_class).append(hotdeal_fieldset_address);
       $(hotdeal_address_row).append(hotdeal_address_col_class);
       $(col_class_element).append(hotdeal_address_row);
    }//else    	
    $(col_class_element).append(hotdeal_hardcopy_row);
    //$(col_class_element).append(information_row);
    $(second_row).append(col_class_element);
    $(form_class).append(second_row);
    $(col_element).append(form_class);
    $(row_element).append(col_element);
    $(prevbtn_element).append(backbtn);
    $(prevbtn_element).append(backbtn_divider);
    $(row_element).append(prevbtn_element);
    $(nextbtn_element).append(nextbtn);
    $(nextbtn_element).append(nextbtn_divider);
    $(row_element).append(nextbtn_element);
    $(wizard_element).append(row_element);
    $(wizard_element).append(information_row);
    $(form_element).append(wizard_element);
    $(parent_wizard).append(form_element);
    var error_display = document.createElement('div');
    $(error_display).addClass("display_error");
    var name_element = document.createElement('div');
    $(name_element).addClass("err_msg");
    $(name_element).attr('id','err_name');
    $(name_element).css('color','rgb(236,73,73)');
    $(name_element).css('textAlign','left');
    $(name_element).css('marginLeft','16px');
    $(name_element).css('display','none');
    var star_element = document.createElement('span');
    $(star_element).addClass('star');
    $(star_element).html("&#x2605");
    $(star_element).css('float','left');
    var error_name_element = document.createElement('div');
    $(error_name_element).html('Enter Full Name');
    $(name_element).append(star_element);
    $(name_element).append(error_name_element);
    var email_element = document.createElement('div');
    $(email_element).addClass("err_msg");
    $(email_element).attr('id','err_email');
    $(email_element).css('color','rgb(236,73,73)');
    $(email_element).css('textAlign','left');
    $(email_element).css('marginLeft','16px');
    $(email_element).css('display','none');
    var star_email = document.createElement('span');
    $(star_email).addClass('star');
    $(star_email).html("&#x2605");
    $(star_email).css('float','left');
    var error_email_element = document.createElement('div');
    $(error_email_element).html('Enter valid e-mail id');
    $(email_element).append(star_email);
    $(email_element).append(error_email_element);
    var mbno_element = document.createElement('div');
    $(mbno_element).addClass("err_msg");
    $(mbno_element).attr('id','err_mbno');
    $(mbno_element).css('color','rgb(236,73,73)');
    $(mbno_element).css('textAlign','left');
    $(mbno_element).css('marginLeft','16px');
    $(mbno_element).css('display','none');
    var star_mbno = document.createElement('span');
    $(star_mbno).addClass('star');
    $(star_mbno).html("&#x2605");
    $(star_mbno).css('float','left');
    var error_mbno_element = document.createElement('div');
    $(error_mbno_element).html('Enter correct mobile number');
    $(mbno_element).append(star_mbno);
    $(mbno_element).append(error_mbno_element);
    var phno_element = document.createElement('div');
    $(phno_element).addClass("err_msg");
    $(phno_element).css('color','rgb(236,73,73)');
    $(phno_element).css('textAlign','left');
    $(phno_element).css('marginLeft','16px');
    $(phno_element).css('display','none');
    var star_phno = document.createElement('span');
    $(star_phno).addClass('star');
    $(star_phno).html("&#x2605");
    $(star_phno).css('float','left');
    var error_phno_element = document.createElement('div');
    $(error_phno_element).html('Mobile number is not valid');
    $(phno_element).append(star_phno);
    $(phno_element).append(error_phno_element);
    var address_element = document.createElement('div');
    $(address_element).addClass("err_msg");
    $(address_element).attr('id','err_address');
    $(address_element).css('color','rgb(236,73,73)');
    $(address_element).css('textAlign','left');
    $(address_element).css('marginLeft','16px');
    $(address_element).css('display','none');
    var star_address = document.createElement('span');
    $(star_address).addClass('star');
    $(star_address).html("&#x2605");
    $(star_address).css('float','left');
    var error_address_element = document.createElement('div');
    $(error_address_element).html('Enter your address');
    $(address_element).append(star_address);
    $(address_element).append(error_address_element);
    var apptime_element = document.createElement('div');
    $(apptime_element).attr('id','err_apptime');
    $(apptime_element).addClass("err_msg");
    $(apptime_element).css('color','rgb(236,73,73)');
    $(apptime_element).css('textAlign','left');
    $(apptime_element).css('marginLeft','16px');
    $(apptime_element).css('display','none');
    var star_apptime = document.createElement('span');
    $(star_apptime).addClass('star');
    $(star_apptime).html("&#x2605");
    $(star_apptime).css('float','left');
    var error_apptime_element = document.createElement('div');
    $(error_apptime_element).html('Please select Appointment Time');
    $(apptime_element).append(star_apptime);
    $(apptime_element).append(error_apptime_element);
    var app_time_element = document.createElement('div');
    $(app_time_element).attr('id','err_app_time');
    $(app_time_element).addClass("err_msg");
    $(app_time_element).css('color','rgb(236,73,73)');
    $(app_time_element).css('textAlign','left');
    $(app_time_element).css('marginLeft','16px');
    $(app_time_element).css('display','none');
    var star_app_time = document.createElement('span');
    $(star_app_time).addClass('star');
    $(star_app_time).html("&#x2605");
    $(star_app_time).css('float','left');
    var error_app_time_element = document.createElement('div');
    $(error_app_time_element).html('You have given past time.Give future time');
    $(app_time_element).append(star_app_time);
    $(app_time_element).append(error_app_time_element);
    var deal_age_element = document.createElement('div');
    $(deal_age_element).attr('id','err_age');
    $(deal_age_element).addClass("err_msg");
    $(deal_age_element).css('color','rgb(236,73,73)');
    $(deal_age_element).css('textAlign','left');
    $(deal_age_element).css('marginLeft','16px');
    $(deal_age_element).css('display','none');
    var deal_star_age = document.createElement('span');
    $(deal_star_age).addClass('star');
    $(deal_star_age).html("&#x2605");
    $(deal_star_age).css('float','left');
    var deal_error_age_element = document.createElement('div');
    $(deal_error_age_element).html('Enter your  age');
    $(deal_age_element).append(deal_star_age);
    $(deal_age_element).append(deal_error_age_element);
    var deal_gender_element = document.createElement('div');
    $(deal_gender_element).attr('id','err_gender');
    $(deal_gender_element).addClass("err_msg");
    $(deal_gender_element).css('color','rgb(236,73,73)');
    $(deal_gender_element).css('textAlign','left');
    $(deal_gender_element).css('marginLeft','16px');
    $(deal_gender_element).css('display','none');
    var deal_star_gender = document.createElement('span');
    $(deal_star_gender).addClass('star');
    $(deal_star_gender).html("&#x2605");
    $(deal_star_gender).css('float','left');
    var deal_error_gender_element = document.createElement('div');
    $(deal_error_gender_element).html('Select your gender');
    $(deal_gender_element).append(deal_star_gender);
    $(deal_gender_element).append(deal_error_gender_element);
    var deal_pincode_element = document.createElement('div');
    $(deal_pincode_element).attr('id','err_pincode');
    $(deal_pincode_element).addClass("err_msg");
    $(deal_pincode_element).css('color','rgb(236,73,73)');
    $(deal_pincode_element).css('textAlign','left');
    $(deal_pincode_element).css('marginLeft','16px');
    $(deal_pincode_element).css('display','none');
    var deal_star_pincode = document.createElement('span');
    $(deal_star_pincode).addClass('star');
    $(deal_star_pincode).html("&#x2605");
    $(deal_star_pincode).css('float','left');
    var deal_error_pincode_element = document.createElement('div');
    $(deal_error_pincode_element).html('Enter correct pin code');
    $(deal_pincode_element).append(deal_star_pincode);
    $(deal_pincode_element).append(deal_error_pincode_element);
    var deal_home_vst_element = document.createElement('div');
    $(deal_home_vst_element).attr('id','err_home_vst');
    $(deal_home_vst_element).addClass("err_msg");
    $(deal_home_vst_element).css('color','rgb(236,73,73)');
    $(deal_home_vst_element).css('textAlign','left');
    $(deal_home_vst_element).css('marginLeft','16px');
    $(deal_home_vst_element).css('display','none');
    var deal_star_home_vst = document.createElement('span');
    $(deal_star_home_vst).addClass('star');
    $(deal_star_home_vst).html("&#x2605");
    $(deal_star_home_vst).css('float','left');
    var deal_error_home_vst_element = document.createElement('div');
    $(deal_error_home_vst_element).html('Select home visit yes or no');
    $(deal_home_vst_element).append(deal_star_home_vst);
    $(deal_home_vst_element).append(deal_error_home_vst_element);
    var deal_hard_cpy_element = document.createElement('div');
    $(deal_hard_cpy_element).attr('id','err_hard_cpy');
    $(deal_hard_cpy_element).addClass("err_msg");
    $(deal_hard_cpy_element).css('color','rgb(236,73,73)');
    $(deal_hard_cpy_element).css('textAlign','left');
    $(deal_hard_cpy_element).css('marginLeft','16px');
    $(deal_hard_cpy_element).css('display','none');
    var deal_star_hard_cpy= document.createElement('span');
    $(deal_star_hard_cpy).addClass('star');
    $(deal_star_hard_cpy).html("&#x2605");
    $(deal_star_hard_cpy).css('float','left');
    var deal_error_hard_cpy_element = document.createElement('div');
    $(deal_error_hard_cpy_element).html('Select hard copy yes or no');
    $(deal_hard_cpy_element).append(deal_star_hard_cpy);
    $(deal_hard_cpy_element).append(deal_error_hard_cpy_element);
    $(error_display).append(name_element);
    $(error_display).append(email_element);
    $(error_display).append(mbno_element);
    $(error_display).append(apptime_element);
    $(error_display).append(app_time_element);
    $(error_display).append(address_element);
    $(error_display).append(deal_age_element);
    $(error_display).append(deal_gender_element);
    $(error_display).append(deal_pincode_element);
    $(error_display).append(deal_home_vst_element);
    $(error_display).append(deal_hard_cpy_element);
    $("#modal_secondpage").append(close_element);
    $("#modal_secondpage").append(contact_heading);
    $("#modal_secondpage").append(error_display);
    $("#modal_secondpage").append(parent_wizard);
    $(input_booking).on('keyup' ,function (event)
    { 
        event.preventDefault();
    });//keyup
    $(input_booking).on('keypress' ,function (event)
    {
          event.preventDefault();
    });//keypress	
    $(input_booking).on('keydown' ,function (event) 
    {
          event.preventDefault();
   });//keydown
   $("input[placeholder]").focusin(function () 
   {
    $(this).data('place-holder-text', $(this).attr('placeholder')).attr('placeholder', '');
  });
  $("input[placeholder]").focusout(function () 
  {
    $(this).attr('placeholder', $(this).data('place-holder-text'));
  });
   $("#modal_close").on('click',function ()
   {
      if(typeof(Storage)!=="undefined")
      {
            datastore_handler();
       }//if
       $("#modal_secondpage").modal().close(); 
    });//click
    var body_element = document.getElementsByClassName("themodal-lock")[0];
    $(body_element).on('keyup' ,function (event)
    {
        if(event.keyCode == 27)
        {
            if(typeof(Storage)!=="undefined")
            {
                datastore_handler();
            }//if storage
         }//if keycode
     });//key fnctn
     var today = new Date();  
     var minutes = today.getMinutes();
     if((minutes >= '0'))  
     {
        $('.form_datetime').datetimepicker
        ({ 
             format:'dd/M/yyyy HH:ii P',
             startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(),today.getHours()+1,today.getMinutes()-today.getMinutes()),
             weekStart: 1,
             todayBtn:  0,
             autoclose: 1,
             todayHighlight: 1,
             startView: 2,
             forceParse: 0,
             minuteStep: 30,
                 }); //datetimepicker	
                }//if
              
                  $('.form_datetime').datetimepicker('setHoursDisabled', '0,1,2,3,4,5,22,23,24'); 
                   
                 var pat_name = $("#hotdeal_patient_name").val();
                 var pat_email = $("#hotdeal_email").val();
                 var pat_phno = $("#hotdeal_phone").val();
                 var pat_apptime = $("#hotdeal_app_time").val();
                       if ((pat_name == "") && (pat_email =="") && (pat_phno == "") && (pat_apptime == ""))
                     {
                       Filling_localdata(); 
                     }//if
                    $('#step2_back_btn').on('click',function () 
                    {
                    	  form_backbtn(dataid,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);
                    	});//back btn click
                    $('#step2_next_btn').on('click', function()
                    {
                     		 	if(typeof(Storage)!=="undefined")
                       { 
                     	 datastore_handler();
                       }//if  
                        var patient_name = $('#hotdeal_patient_name').val();
                         var patient_email = $('#hotdeal_email').val();
                       var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                        var mobile_number = $('#hotdeal_phone').val();
                         var patient_apptime =  $('#hotdeal_app_time').val();
                         if(typeof(Storage)!=="undefined")
                       { 
                     	 datastore_handler();
                       }//if
                      
                   var appt_time = localStorage.getItem("patient_app_time");
                   var  tday = new Date();
                     
                   var i;
                   function addZero(i) 
                     {
                         if (i < 10) 
                           {
                               i = "0" + i;
                           }//if i
                       return i;
                      }//fnctn
                          var year = tday.getFullYear();
                          var date = addZero(tday.getDate());
                          var month = addZero(tday.getMonth()+1);
                          var hours = addZero(tday.getHours());
                          var mnt = addZero(tday.getMinutes());
                          var sec =  addZero(tday.getSeconds());
                          var selected_time =year+"-"+month+"-"+date+" "+hours +":"+ mnt+":"+sec;
                         
                         
                          var currenttime = new Date();
                          var current_year = currenttime.getFullYear();
                          var current_month = addZero(currenttime.getMonth()+1);
                          
                          var current_date = addZero(currenttime.getDate());
                          var current_hours = addZero(currenttime.getHours());
                          var current_minutes = addZero(currenttime.getMinutes());
                          var current_time = current_year+"-"+current_month+"-"+current_date+" "+current_hours+":"+current_minutes;
                          var val_time = date+"-"+month+"-"+year+" "+hours +":"+ mnt+":"+sec;
                          var sel_month_name = appt_time.substr(3,3);
    
    
    if (sel_month_name == 'Jan') 
     {
    	 var sel_month = '01';
    	 
     }//if mnth 1
    if (sel_month_name == 'Feb') 
     {
        var  sel_month = '02';
     }//if mnth 2
    if (sel_month_name == 'Mar') 
     {
    	 var sel_month = '03';
     }//if mnth 3
    if (sel_month_name == 'Apr') 
     {
    	var sel_month = '04';
  	  }//if mnth 4
    if (sel_month_name == 'May') 
  	  {
    		var sel_month = '05';
    	}//if mnth 5
    if (sel_month_name == 'Jun') 
  	  {
    		var sel_month = '06';
     }//if mnth 6
    if (sel_month_name == 'Jul') 
     {
    		var sel_month = '07';
     }//if mnth 7
    if (sel_month_name == 'Aug') 
     {
    		var sel_month = '08';
     	}//if mnth 8
     if (sel_month_name == 'Sep') 
    	{
    		var sel_month = '09';
    	}//if mnth 9
    	if (sel_month_name == 'Oct') 
    	{
    		var sel_month = '10';
    	}//if mnth 10
    	if (sel_month_name == 'Nov') 
    	{
    			var sel_month = '11';
    	}//if mnth 11
    	if (sel_month_name == 'Dec') 
    	{
    		var sel_month = '12';
    	}//if mnth 12
    	 var tday = new Date();
    	       var sel_year = appt_time.substr(7,4);
             var sel_date = appt_time.substr(0,2);
             var sel_hours = appt_time.substr(12,2);
             var sel_minutes = appt_time.substr(15,2);
             var sel_sec = addZero(tday.getSeconds());
             var sel_meridian = appt_time.substr(18,2);
             var sel_hours_meridian = sel_hours +" "+ sel_meridian;
             if (sel_meridian == "AM") 
             {
             	 var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
             	
              }//if AM
              if (sel_hours_meridian == "12 PM")
              {
              	   var sel_hours = "12";
              	 var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                 
              	}//if 12
             if (sel_hours_meridian == "01 PM")
              {
              	   var sel_hours = "13";
              	 var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                 
              	}//if 01
              	if (sel_hours_meridian == "02 PM")
               {
              	   var sel_hours = "14";
                  var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                 
                }//if 02
               	if (sel_hours_meridian == "03 PM")
                  {
              	      var sel_hours = "15";
                      var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                     
                 }//if 03
                 if (sel_hours_meridian == "04 PM")
                 {
              	    var sel_hours = "16";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                  
                  }// if 04
                  if (sel_hours_meridian == "05 PM")
                 {
              	    var sel_hours = "17";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                  
                  }// if 05
                   if (sel_hours_meridian == "06 PM")
                 {
              	    var sel_hours = "18";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                  
                  }// if 06
                   if (sel_hours_meridian == "07 PM")
                 {
              	    var sel_hours = "19";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                   
                  }// if 07
                   if (sel_hours_meridian == "08 PM")
                 {
              	    var sel_hours = "20";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                   
                  }// if 08
                   if (sel_hours_meridian == "09 PM")
                 {
              	    var sel_hours = "21";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                   
                  }// if 09
                  if (visit_type == "both") 
                  {   
                     hotdeal_both_vst_handler(lab_address,lab_pin,address_element,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea,deal_hard_cpy_element,deal_home_vst_element,app_time_element,apptime_element,mbno_element,sel_time,current_time,name_element,email_element,deal_age_element,deal_gender_element,deal_pincode_element); 
                  }//if both       
                  else if (visit_type == "homevisitonly") 
                  {
                  	 hotdeal_hme_vst_handler(lab_address,lab_pin,address_element,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea,deal_hard_cpy_element,deal_home_vst_element,app_time_element,apptime_element,mbno_element,sel_time,current_time,name_element,email_element,deal_age_element,deal_gender_element,deal_pincode_element);
                  }
                  else 
                  {
                  	 hotdeal_lab_vst_handler(lab_address,lab_pin,address_element,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea,deal_hard_cpy_element,deal_home_vst_element,app_time_element,apptime_element,mbno_element,sel_time,current_time,name_element,email_element,deal_age_element,deal_gender_element,deal_pincode_element);
                  }   
             });//btn onclick handler
                    
                
          }//form_handler
          
function  hotdeal_hme_vst_handler(lab_address,lab_pin,address_element,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea,deal_hard_cpy_element,deal_home_vst_element,app_time_element,apptime_element,mbno_element,sel_time,current_time,name_element,email_element,deal_age_element,deal_gender_element,deal_pincode_element)
{
   var patient_name = $("#hotdeal_patient_name").val();
   var patient_email = $("#hotdeal_email").val();
   var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   var mobile_number = $("#hotdeal_phone").val();
   var patient_apptime = $("#hotdeal_app_time").val();
   var pat_age = $("#hotdeal_patient_age").val();
   var pat_gender = $("#hotdeal_ptnt_gender").val();
   var pat_pinno = $("#hotdeal_patient_pincode").val();
   var pat_address = $("#hotdeal_pfl_address").val();
    if((document.getElementById("err_email").style.display ='none') &&
     (document.getElementById('err_mbno').style.display = 'none') &&
     (document.getElementById('err_apptime').style.display = 'none') &&
     (document.getElementById('err_app_time').style.display = 'none') &&
     (document.getElementById("err_address").style.display ='none') &&
     (document.getElementById("err_age").style.display = 'none') &&
     (document.getElementById("err_gender").style.display = 'none') &&
     (document.getElementById("err_pincode").style.display = 'none') &&
     (document.getElementById("err_home_vst").style.display = 'none') &&
     (document.getElementById("err_hard_cpy").style.display = 'none'))
     { 
         if (!(patient_name.length >= 6 && patient_name.length <= 26) || patient_name.match(/[^a-zA-Z ]/))
         {
             $(name_element).css('display','block');
             return false;
          }//if patient name
          if(document.getElementById('err_name').style.display = 'block')
          {
              document.getElementById('err_name').style.display = 'none';
          }//if err_name
      }//if 
      if((document.getElementById("err_name").style.display ='none') &&
       (document.getElementById('err_mbno').style.display = 'none') &&
       (document.getElementById('err_apptime').style.display = 'none') &&
       (document.getElementById('err_app_time').style.display = 'none') &&
       (document.getElementById("err_address").style.display ='none') &&
       (document.getElementById("err_age").style.display = 'none') &&
       (document.getElementById("err_gender").style.display = 'none') &&
       (document.getElementById("err_pincode").style.display = 'none') &&
       (document.getElementById("err_home_vst").style.display = 'none') &&
       (document.getElementById("err_hard_cpy").style.display = 'none'))
       {
            if(!filter.test(patient_email))
            {
               $(email_element).css('display','block');
               return false;
            }//if email
            if(document.getElementById('err_email').style.display = 'block')
            {
                document.getElementById('err_email').style.display = 'none';
            }//if err_email
          }//if
         if((document.getElementById("err_name").style.display ='none') &&
       (document.getElementById('err_mbno').style.display = 'none') &&
       (document.getElementById('err_apptime').style.display = 'none') &&
       (document.getElementById('err_app_time').style.display = 'none') &&
       (document.getElementById("err_address").style.display ='none') &&
       (document.getElementById("err_email").style.display = 'none') &&
       (document.getElementById("err_gender").style.display = 'none') &&
       (document.getElementById("err_pincode").style.display = 'none') &&
       (document.getElementById("err_home_vst").style.display = 'none') &&
       (document.getElementById("err_hard_cpy").style.display = 'none'))
       {
       	 if (!pat_age.match(/^[0-9]+$/) || (pat_age == "") || (pat_age >100) || (pat_age <=0))
          {
              $(deal_age_element).css('display','block');  
              return false; 
          }//if age
          if (document.getElementById("err_age").style.display = 'block') 
          {
          	 document.getElementById("err_age").style.display = 'none';
          }//if err_age 
       }//if 
        if((document.getElementById("err_name").style.display ='none') &&
       (document.getElementById('err_mbno').style.display = 'none') &&
       (document.getElementById('err_apptime').style.display = 'none') &&
       (document.getElementById('err_app_time').style.display = 'none') &&
       (document.getElementById("err_address").style.display ='none') &&
       (document.getElementById("err_email").style.display = 'none') &&
       (document.getElementById("err_age").style.display = 'none') &&
       (document.getElementById("err_pincode").style.display = 'none') &&
       (document.getElementById("err_home_vst").style.display = 'none') &&
       (document.getElementById("err_hard_cpy").style.display = 'none'))
       {
       	 if (pat_gender !=2 && pat_gender !=3) 
       	 {
       	 	 $(deal_gender_element).css('display','block');
       	 	 return false;
       	 }//if gender 
       	 if (document.getElementById("err_gender").style.display = 'block') 
       	 {
       	 	 document.getElementById("err_gender").style.display = 'none';
       	 }//if gender
       }//if 
       var hodeal_ptnt_pin_substr = pat_pinno.substr(0,2); 
            if((document.getElementById("err_name").style.display ='none') &&
            (document.getElementById('err_mbno').style.display = 'none') &&
            (document.getElementById('err_apptime').style.display = 'none') &&
            (document.getElementById('err_app_time').style.display = 'none') &&
            (document.getElementById("err_address").style.display ='none') &&
            (document.getElementById("err_email").style.display = 'none') &&
            (document.getElementById("err_age").style.display = 'none') &&
            (document.getElementById("err_gender").style.display = 'none') &&
            (document.getElementById("err_home_vst").style.display = 'none') &&
            (document.getElementById("err_hard_cpy").style.display = 'none'))
           {
       	   if (pat_pinno == null || pat_pinno == "" || !pat_pinno.match(/^[0-9]+$/) || pat_pinno.length != 6 || hodeal_ptnt_pin_substr != "56")
       	   {
       	 	 $(deal_pincode_element).css('display','block');
       	 	 return false;
       	   }//if pin num
       	  if (document.getElementById("err_pincode").style.display = 'block') 
       	  {
       	 	 document.getElementById("err_pincode").style.display = 'none';
       	  }//if pin no 
         }//if 
        if((document.getElementById("err_email").style.display ='none') &&
          (document.getElementById('err_name').style.display = 'none') &&
          (document.getElementById('err_apptime').style.display = 'none') &&
          (document.getElementById('err_app_time').style.display = 'none') &&
          (document.getElementById("err_address").style.display ='none') &&
          (document.getElementById("err_age").style.display = 'none') &&
          (document.getElementById("err_gender").style.display = 'none') &&
          (document.getElementById("err_pincode").style.display = 'none') &&
          (document.getElementById("err_home_vst").style.display = 'none') &&
          (document.getElementById("err_hard_cpy").style.display = 'none'))
          {
              if((mobile_number.match(/[^0-9]/) || mobile_number.length != 10) || (!(mobile_number.charAt(0)=="9" || mobile_number.charAt(0)=="8" || mobile_number.charAt(0)=="7")))
              {
                  $(mbno_element).css('display','block');
                  return false;
               }//if mble
              if(document.getElementById('err_mbno').style.display = 'block')
              {
                   document.getElementById('err_mbno').style.display = 'none';
               }//if err_mbno
           }//if
         if((document.getElementById("err_email").style.display ='none') && 
         (document.getElementById('err_mbno').style.display = 'none') &&
         (document.getElementById('err_name').style.display = 'none') &&
         (document.getElementById('err_app_time').style.display = 'none') &&
         (document.getElementById("err_address").style.display ='none') &&
         (document.getElementById("err_age").style.display = 'none') &&
         (document.getElementById("err_gender").style.display = 'none') &&
         (document.getElementById("err_pincode").style.display = 'none') &&
         (document.getElementById("err_home_vst").style.display = 'none') &&
         (document.getElementById("err_hard_cpy").style.display = 'none'))
         {
              if(! ($('#hotdeal_app_time').val()))   
              {
                 $(apptime_element).css('display','block');
                 return false;
              }//if app_time
              if(!(sel_time.match(/\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}/)))
              {
                    $(apptime_element).css('display','block');
                     return false;
              }//if val time 
              if(document.getElementById('err_apptime').style.display = 'block')
              {
                  document.getElementById('err_apptime').style.display = 'none';
              }
          }//if
           if((document.getElementById("err_email").style.display ='none') && 
           (document.getElementById('err_mbno').style.display = 'none') &&
           (document.getElementById('err_name').style.display = 'none') &&
           (document.getElementById('err_apptime').style.display = 'none') &&
           (document.getElementById("err_address").style.display ='none') &&
           (document.getElementById("err_age").style.display = 'none') &&
           (document.getElementById("err_gender").style.display = 'none') &&
           (document.getElementById("err_pincode").style.display = 'none') &&
           (document.getElementById("err_home_vst").style.display = 'none') &&
           (document.getElementById("err_hard_cpy").style.display = 'none'))
           {
              if(current_time > sel_time) 
              {
                  $(app_time_element).css('display','block');
                   return false;
              	}//if time
              if (document.getElementById('err_app_time').style.display = 'block') 
              {
                  document.getElementById('err_app_time').style.display = 'none';
              }//if err_time
           }//if
            if((document.getElementById('err_name').style.display = 'none') &&
            (document.getElementById("err_email").style.display ='none') &&
             (document.getElementById('err_mbno').style.display = 'none') &&
             (document.getElementById('err_apptime').style.display = 'none') &&
             (document.getElementById('err_app_time').style.display = 'none') &&
             (document.getElementById("err_age").style.display = 'none') &&
             (document.getElementById("err_gender").style.display = 'none') &&
             (document.getElementById("err_pincode").style.display = 'none') &&
             (document.getElementById("err_home_vst").style.display = 'none') &&
             (document.getElementById("err_hard_cpy").style.display = 'none'))
             {
                if((!($('#hotdeal_pfl_address').val()))  ||  pat_address.length <10)
                {
                     $(address_element).css('display','block');
                      return false;
                 }// if visit type
                 if (document.getElementById('err_address').style.display = 'block') 
                 {
                      document.getElementById('err_address').style.display = 'none';
                 }//if err_visittype
             }
          var hotdeal_hardcopy = document.getElementsByName("hotdeal_hardcopy");
          if((document.getElementById('err_name').style.display = 'none') &&
            (document.getElementById("err_email").style.display ='none') &&
             (document.getElementById('err_mbno').style.display = 'none') &&
             (document.getElementById('err_apptime').style.display = 'none') &&
             (document.getElementById('err_app_time').style.display = 'none') &&
             (document.getElementById("err_age").style.display = 'none') &&
             (document.getElementById("err_gender").style.display = 'none') &&
             (document.getElementById("err_pincode").style.display = 'none') &&
             (document.getElementById("err_home_vst").style.display = 'none') &&
             (document.getElementById("err_address").style.display = 'none'))
             {
             	 if (hotdeal_hardcopy[0].checked == false && hotdeal_hardcopy[1].checked == false) 
             	 {
             	 	 $(deal_hard_cpy_element).css('display','block');
             	 	 return false;
             	 }//if 
             	 if (document.getElementById("err_hard_cpy").style.display = 'block') 
             	 {
             	 	 document.getElementById("err_hard_cpy").style.display = 'none';
             	 }
             }//if 
             var  hme_vst = "yes";
             if (hotdeal_hardcopy[0].checked == true)
             {
                var hrd_cpy = "yes";
             }
             else 
             {
             	 var hrd_cpy = "no";
             }
           preview_handler(lab_address,lab_pin,hme_vst,hrd_cpy,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);
}//fncnt endng  
function hotdeal_lab_vst_handler(lab_address,lab_pin,address_element,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea,deal_hard_cpy_element,deal_home_vst_element,app_time_element,apptime_element,mbno_element,sel_time,current_time,name_element,email_element,deal_age_element,deal_gender_element,deal_pincode_element)
{
   var patient_name = $("#hotdeal_patient_name").val();
   var patient_email = $("#hotdeal_email").val();
   var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   var mobile_number = $("#hotdeal_phone").val();
   var patient_apptime = $("#hotdeal_app_time").val();
   var pat_age = $("#hotdeal_patient_age").val();
   var pat_gender = $("#hotdeal_ptnt_gender").val();
   var pat_pinno = $("#hotdeal_patient_pincode").val();
   var pat_address = $("#hotdeal_pfl_address").val();
    if((document.getElementById("err_email").style.display ='none') &&
     (document.getElementById('err_mbno').style.display = 'none') &&
     (document.getElementById('err_apptime').style.display = 'none') &&
     (document.getElementById('err_app_time').style.display = 'none') &&
     (document.getElementById("err_address").style.display ='none') &&
     (document.getElementById("err_age").style.display = 'none') &&
     (document.getElementById("err_gender").style.display = 'none') &&
     (document.getElementById("err_pincode").style.display = 'none') &&
     (document.getElementById("err_home_vst").style.display = 'none') &&
     (document.getElementById("err_hard_cpy").style.display = 'none'))
     { 
         if (!(patient_name.length >= 6 && patient_name.length <= 26) || patient_name.match(/[^a-zA-Z ]/))
         {
             $(name_element).css('display','block');
             return false;
          }//if patient name
          if(document.getElementById('err_name').style.display = 'block')
          {
              document.getElementById('err_name').style.display = 'none';
          }//if err_name
      }//if 
      if((document.getElementById("err_name").style.display ='none') &&
       (document.getElementById('err_mbno').style.display = 'none') &&
       (document.getElementById('err_apptime').style.display = 'none') &&
       (document.getElementById('err_app_time').style.display = 'none') &&
       (document.getElementById("err_address").style.display ='none') &&
       (document.getElementById("err_age").style.display = 'none') &&
       (document.getElementById("err_gender").style.display = 'none') &&
       (document.getElementById("err_pincode").style.display = 'none') &&
       (document.getElementById("err_home_vst").style.display = 'none') &&
       (document.getElementById("err_hard_cpy").style.display = 'none'))
       {
            if(!filter.test(patient_email))
            {
               $(email_element).css('display','block');
               return false;
            }//if email
            if(document.getElementById('err_email').style.display = 'block')
            {
                document.getElementById('err_email').style.display = 'none';
            }//if err_email
          }//if
         if((document.getElementById("err_name").style.display ='none') &&
       (document.getElementById('err_mbno').style.display = 'none') &&
       (document.getElementById('err_apptime').style.display = 'none') &&
       (document.getElementById('err_app_time').style.display = 'none') &&
       (document.getElementById("err_address").style.display ='none') &&
       (document.getElementById("err_email").style.display = 'none') &&
       (document.getElementById("err_gender").style.display = 'none') &&
       (document.getElementById("err_pincode").style.display = 'none') &&
       (document.getElementById("err_home_vst").style.display = 'none') &&
       (document.getElementById("err_hard_cpy").style.display = 'none'))
       {
       	 if (!pat_age.match(/^[0-9]+$/) || (pat_age == "") || (pat_age >100) || (pat_age <=0))
          {
              $(deal_age_element).css('display','block');  
              return false; 
          }//if age
          if (document.getElementById("err_age").style.display = 'block') 
          {
          	 document.getElementById("err_age").style.display = 'none';
          }//if err_age 
       }//if 
        if((document.getElementById("err_name").style.display ='none') &&
       (document.getElementById('err_mbno').style.display = 'none') &&
       (document.getElementById('err_apptime').style.display = 'none') &&
       (document.getElementById('err_app_time').style.display = 'none') &&
       (document.getElementById("err_address").style.display ='none') &&
       (document.getElementById("err_email").style.display = 'none') &&
       (document.getElementById("err_age").style.display = 'none') &&
       (document.getElementById("err_pincode").style.display = 'none') &&
       (document.getElementById("err_home_vst").style.display = 'none') &&
       (document.getElementById("err_hard_cpy").style.display = 'none'))
       {
       	 if (pat_gender !=2 && pat_gender !=3) 
       	 {
       	 	 $(deal_gender_element).css('display','block');
       	 	 return false;
       	 }//if gender 
       	 if (document.getElementById("err_gender").style.display = 'block') 
       	 {
       	 	 document.getElementById("err_gender").style.display = 'none';
       	 }//if gender
       }//if 
        if((document.getElementById("err_email").style.display ='none') &&
          (document.getElementById('err_name').style.display = 'none') &&
          (document.getElementById('err_apptime').style.display = 'none') &&
          (document.getElementById('err_app_time').style.display = 'none') &&
          (document.getElementById("err_address").style.display ='none') &&
          (document.getElementById("err_age").style.display = 'none') &&
          (document.getElementById("err_gender").style.display = 'none') &&
          (document.getElementById("err_pincode").style.display = 'none') &&
          (document.getElementById("err_home_vst").style.display = 'none') &&
          (document.getElementById("err_hard_cpy").style.display = 'none'))
          {
              if((mobile_number.match(/[^0-9]/) || mobile_number.length != 10) || (!(mobile_number.charAt(0)=="9" || mobile_number.charAt(0)=="8" || mobile_number.charAt(0)=="7")))
              {
                  $(mbno_element).css('display','block');
                  return false;
               }//if mble
              if(document.getElementById('err_mbno').style.display = 'block')
              {
                   document.getElementById('err_mbno').style.display = 'none';
               }//if err_mbno
           }//if
         if((document.getElementById("err_email").style.display ='none') && 
         (document.getElementById('err_mbno').style.display = 'none') &&
         (document.getElementById('err_name').style.display = 'none') &&
         (document.getElementById('err_app_time').style.display = 'none') &&
         (document.getElementById("err_address").style.display ='none') &&
         (document.getElementById("err_age").style.display = 'none') &&
         (document.getElementById("err_gender").style.display = 'none') &&
         (document.getElementById("err_pincode").style.display = 'none') &&
         (document.getElementById("err_home_vst").style.display = 'none') &&
         (document.getElementById("err_hard_cpy").style.display = 'none'))
         {
              if(! ($('#hotdeal_app_time').val()))   
              {
                 $(apptime_element).css('display','block');
                 return false;
              }//if app_time
              if(!(sel_time.match(/\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}/)))
              {
                    $(apptime_element).css('display','block');
                     return false;
              }//if val time 
              if(document.getElementById('err_apptime').style.display = 'block')
              {
                  document.getElementById('err_apptime').style.display = 'none';
              }
          }//if
           if((document.getElementById("err_email").style.display ='none') && 
           (document.getElementById('err_mbno').style.display = 'none') &&
           (document.getElementById('err_name').style.display = 'none') &&
           (document.getElementById('err_apptime').style.display = 'none') &&
           (document.getElementById("err_address").style.display ='none') &&
           (document.getElementById("err_age").style.display = 'none') &&
           (document.getElementById("err_gender").style.display = 'none') &&
           (document.getElementById("err_pincode").style.display = 'none') &&
           (document.getElementById("err_home_vst").style.display = 'none') &&
           (document.getElementById("err_hard_cpy").style.display = 'none'))
           {
              if(current_time > sel_time) 
              {
                  $(app_time_element).css('display','block');
                   return false;
              	}//if time
              if (document.getElementById('err_app_time').style.display = 'block') 
              {
                  document.getElementById('err_app_time').style.display = 'none';
              }//if err_time
           }//if
          var hotdeal_hardcopy = document.getElementsByName("hotdeal_hardcopy");
          if((document.getElementById('err_name').style.display = 'none') &&
            (document.getElementById("err_email").style.display ='none') &&
             (document.getElementById('err_mbno').style.display = 'none') &&
             (document.getElementById('err_apptime').style.display = 'none') &&
             (document.getElementById('err_app_time').style.display = 'none') &&
             (document.getElementById("err_age").style.display = 'none') &&
             (document.getElementById("err_gender").style.display = 'none') &&
             (document.getElementById("err_pincode").style.display = 'none') &&
             (document.getElementById("err_home_vst").style.display = 'none') &&
             (document.getElementById("err_address").style.display = 'none'))
             {
             	 if (hotdeal_hardcopy[0].checked == false && hotdeal_hardcopy[1].checked == false) 
             	 {
             	 	 $(deal_hard_cpy_element).css('display','block');
             	 	 return false;
             	 }//if 
             	 if (document.getElementById("err_hard_cpy").style.display = 'block') 
             	 {
             	 	 document.getElementById("err_hard_cpy").style.display = 'none';
             	 }
             }//if 
             
             	 var  hme_vst = "no";
             if (hotdeal_hardcopy[0].checked == true)
             {
                var hrd_cpy = "yes";
             }
             else 
             {
             	 var hrd_cpy = "no";
             }
           preview_handler(lab_address,lab_pin,hme_vst,hrd_cpy,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);

}//fnctn endng 
function hotdeal_both_vst_handler(lab_address,lab_pin,address_element,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea,deal_hard_cpy_element,deal_home_vst_element,app_time_element,apptime_element,mbno_element,sel_time,current_time,name_element,email_element,deal_age_element,deal_gender_element,deal_pincode_element)
{
	var patient_name = $("#hotdeal_patient_name").val();
   var patient_email = $("#hotdeal_email").val();
   var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   var mobile_number = $("#hotdeal_phone").val();
   var patient_apptime = $("#hotdeal_app_time").val();
   var pat_age = $("#hotdeal_patient_age").val();
   var pat_gender = $("#hotdeal_ptnt_gender").val();
   var pat_pinno = $("#hotdeal_patient_pincode").val();
   var pat_address = $("#hotdeal_pfl_address").val();
    if((document.getElementById("err_email").style.display ='none') &&
     (document.getElementById('err_mbno').style.display = 'none') &&
     (document.getElementById('err_apptime').style.display = 'none') &&
     (document.getElementById('err_app_time').style.display = 'none') &&
     (document.getElementById("err_address").style.display ='none') &&
     (document.getElementById("err_age").style.display = 'none') &&
     (document.getElementById("err_gender").style.display = 'none') &&
     (document.getElementById("err_pincode").style.display = 'none') &&
     (document.getElementById("err_home_vst").style.display = 'none') &&
     (document.getElementById("err_hard_cpy").style.display = 'none'))
     { 
         if (!(patient_name.length >= 6 && patient_name.length <= 26) || patient_name.match(/[^a-zA-Z ]/))
         {
             $(name_element).css('display','block');
             return false;
          }//if patient name
          if(document.getElementById('err_name').style.display = 'block')
          {
              document.getElementById('err_name').style.display = 'none';
          }//if err_name
      }//if 
      if((document.getElementById("err_name").style.display ='none') &&
       (document.getElementById('err_mbno').style.display = 'none') &&
       (document.getElementById('err_apptime').style.display = 'none') &&
       (document.getElementById('err_app_time').style.display = 'none') &&
       (document.getElementById("err_address").style.display ='none') &&
       (document.getElementById("err_age").style.display = 'none') &&
       (document.getElementById("err_gender").style.display = 'none') &&
       (document.getElementById("err_pincode").style.display = 'none') &&
       (document.getElementById("err_home_vst").style.display = 'none') &&
       (document.getElementById("err_hard_cpy").style.display = 'none'))
       {
            if(!filter.test(patient_email))
            {
               $(email_element).css('display','block');
               return false;
            }//if email
            if(document.getElementById('err_email').style.display = 'block')
            {
                document.getElementById('err_email').style.display = 'none';
            }//if err_email
          }//if
         if((document.getElementById("err_name").style.display ='none') &&
       (document.getElementById('err_mbno').style.display = 'none') &&
       (document.getElementById('err_apptime').style.display = 'none') &&
       (document.getElementById('err_app_time').style.display = 'none') &&
       (document.getElementById("err_address").style.display ='none') &&
       (document.getElementById("err_email").style.display = 'none') &&
       (document.getElementById("err_gender").style.display = 'none') &&
       (document.getElementById("err_pincode").style.display = 'none') &&
       (document.getElementById("err_home_vst").style.display = 'none') &&
       (document.getElementById("err_hard_cpy").style.display = 'none'))
       {
       	 if (!pat_age.match(/^[0-9]+$/) || (pat_age == "") || (pat_age >100) || (pat_age <=0))
          {
              $(deal_age_element).css('display','block');  
              return false; 
          }//if age
          if (document.getElementById("err_age").style.display = 'block') 
          {
          	 document.getElementById("err_age").style.display = 'none';
          }//if err_age 
       }//if 
        if((document.getElementById("err_name").style.display ='none') &&
       (document.getElementById('err_mbno').style.display = 'none') &&
       (document.getElementById('err_apptime').style.display = 'none') &&
       (document.getElementById('err_app_time').style.display = 'none') &&
       (document.getElementById("err_address").style.display ='none') &&
       (document.getElementById("err_email").style.display = 'none') &&
       (document.getElementById("err_age").style.display = 'none') &&
       (document.getElementById("err_pincode").style.display = 'none') &&
       (document.getElementById("err_home_vst").style.display = 'none') &&
       (document.getElementById("err_hard_cpy").style.display = 'none'))
       {
       	 if (pat_gender !=2 && pat_gender !=3) 
       	 {
       	 	 $(deal_gender_element).css('display','block');
       	 	 return false;
       	 }//if gender 
       	 if (document.getElementById("err_gender").style.display = 'block') 
       	 {
       	 	 document.getElementById("err_gender").style.display = 'none';
       	 }//if gender
       }//if 
        if((document.getElementById("err_email").style.display ='none') &&
          (document.getElementById('err_name').style.display = 'none') &&
          (document.getElementById('err_apptime').style.display = 'none') &&
          (document.getElementById('err_app_time').style.display = 'none') &&
          (document.getElementById("err_address").style.display ='none') &&
          (document.getElementById("err_age").style.display = 'none') &&
          (document.getElementById("err_gender").style.display = 'none') &&
          (document.getElementById("err_pincode").style.display = 'none') &&
          (document.getElementById("err_home_vst").style.display = 'none') &&
          (document.getElementById("err_hard_cpy").style.display = 'none'))
          {
              if((mobile_number.match(/[^0-9]/) || mobile_number.length != 10) || (!(mobile_number.charAt(0)=="9" || mobile_number.charAt(0)=="8" || mobile_number.charAt(0)=="7")))
              {
                  $(mbno_element).css('display','block');
                  return false;
               }//if mble
              if(document.getElementById('err_mbno').style.display = 'block')
              {
                   document.getElementById('err_mbno').style.display = 'none';
               }//if err_mbno
           }//if
         if((document.getElementById("err_email").style.display ='none') && 
         (document.getElementById('err_mbno').style.display = 'none') &&
         (document.getElementById('err_name').style.display = 'none') &&
         (document.getElementById('err_app_time').style.display = 'none') &&
         (document.getElementById("err_address").style.display ='none') &&
         (document.getElementById("err_age").style.display = 'none') &&
         (document.getElementById("err_gender").style.display = 'none') &&
         (document.getElementById("err_pincode").style.display = 'none') &&
         (document.getElementById("err_home_vst").style.display = 'none') &&
         (document.getElementById("err_hard_cpy").style.display = 'none'))
         {
              if(! ($('#hotdeal_app_time').val()))   
              {
                 $(apptime_element).css('display','block');
                 return false;
              }//if app_time
              if(!(sel_time.match(/\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}/)))
              {
                    $(apptime_element).css('display','block');
                     return false;
              }//if val time 
              if(document.getElementById('err_apptime').style.display = 'block')
              {
                  document.getElementById('err_apptime').style.display = 'none';
              }
          }//if
           if((document.getElementById("err_email").style.display ='none') && 
           (document.getElementById('err_mbno').style.display = 'none') &&
           (document.getElementById('err_name').style.display = 'none') &&
           (document.getElementById('err_apptime').style.display = 'none') &&
           (document.getElementById("err_address").style.display ='none') &&
           (document.getElementById("err_age").style.display = 'none') &&
           (document.getElementById("err_gender").style.display = 'none') &&
           (document.getElementById("err_pincode").style.display = 'none') &&
           (document.getElementById("err_home_vst").style.display = 'none') &&
           (document.getElementById("err_hard_cpy").style.display = 'none'))
           {
              if(current_time > sel_time) 
              {
                  $(app_time_element).css('display','block');
                   return false;
              	}//if time
              if (document.getElementById('err_app_time').style.display = 'block') 
              {
                  document.getElementById('err_app_time').style.display = 'none';
              }//if err_time
           }//if
            var hotdeal_homevisit_checking = document.getElementsByName("hotdeal_homevisit");
            if((document.getElementById('err_name').style.display = 'none') &&
            (document.getElementById("err_email").style.display ='none') &&
             (document.getElementById('err_mbno').style.display = 'none') &&
             (document.getElementById('err_apptime').style.display = 'none') &&
             (document.getElementById('err_app_time').style.display = 'none') &&
             (document.getElementById("err_age").style.display = 'none') &&
             (document.getElementById("err_gender").style.display = 'none') &&
             (document.getElementById("err_pincode").style.display = 'none') &&
             (document.getElementById("err_address").style.display = 'none') &&
             (document.getElementById("err_hard_cpy").style.display = 'none'))
             {
             	if (hotdeal_homevisit_checking[0].checked == false && hotdeal_homevisit_checking[1].checked == false) 
             	{
             		 $(deal_home_vst_element).css('display','block');
             		 return false;
             	}//if 
             	if (document.getElementById("err_home_vst").style.display = 'block') 
             	{
             		 document.getElementById("err_home_vst").style.display = 'none';
             	}//if 
             }//if 
             var hodeal_ptnt_pin_substr = pat_pinno.substr(0,2); 
            if (hotdeal_homevisit_checking[0].checked == true)
         {
            if((document.getElementById("err_name").style.display ='none') &&
            (document.getElementById('err_mbno').style.display = 'none') &&
            (document.getElementById('err_apptime').style.display = 'none') &&
            (document.getElementById('err_app_time').style.display = 'none') &&
            (document.getElementById("err_address").style.display ='none') &&
            (document.getElementById("err_email").style.display = 'none') &&
            (document.getElementById("err_age").style.display = 'none') &&
            (document.getElementById("err_gender").style.display = 'none') &&
            (document.getElementById("err_home_vst").style.display = 'none') &&
            (document.getElementById("err_hard_cpy").style.display = 'none'))
           {
       	   if (pat_pinno == null || pat_pinno == "" || !pat_pinno.match(/^[0-9]+$/) || pat_pinno.length != 6 || hodeal_ptnt_pin_substr != "56")
       	   {
       	 	 $(deal_pincode_element).css('display','block');
       	 	 return false;
       	   }//if pin num
       	  if (document.getElementById("err_pincode").style.display = 'block') 
       	  {
       	 	 document.getElementById("err_pincode").style.display = 'none';
       	  }//if pin no 
         }//if 
        }//if home visit checked
          if (hotdeal_homevisit_checking[0].checked == true)
         {
           if((document.getElementById('err_name').style.display = 'none') &&
            (document.getElementById("err_email").style.display ='none') &&
             (document.getElementById('err_mbno').style.display = 'none') &&
             (document.getElementById('err_apptime').style.display = 'none') &&
             (document.getElementById('err_app_time').style.display = 'none') &&
             (document.getElementById("err_age").style.display = 'none') &&
             (document.getElementById("err_gender").style.display = 'none') &&
             (document.getElementById("err_pincode").style.display = 'none') &&
             (document.getElementById("err_home_vst").style.display = 'none') &&
             (document.getElementById("err_hard_cpy").style.display = 'none'))
             {
                if((!($('#hotdeal_pfl_address').val()))  ||  pat_address.length <10)
                {
                     $(address_element).css('display','block');
                      return false;
                 }// if visit type
                 if (document.getElementById('err_address').style.display = 'block') 
                 {
                      document.getElementById('err_address').style.display = 'none';
                 }//if err_visittype
             }
          }//if checked 
          var hotdeal_hardcopy = document.getElementsByName("hotdeal_hardcopy");
          if((document.getElementById('err_name').style.display = 'none') &&
            (document.getElementById("err_email").style.display ='none') &&
             (document.getElementById('err_mbno').style.display = 'none') &&
             (document.getElementById('err_apptime').style.display = 'none') &&
             (document.getElementById('err_app_time').style.display = 'none') &&
             (document.getElementById("err_age").style.display = 'none') &&
             (document.getElementById("err_gender").style.display = 'none') &&
             (document.getElementById("err_pincode").style.display = 'none') &&
             (document.getElementById("err_home_vst").style.display = 'none') &&
             (document.getElementById("err_address").style.display = 'none'))
             {
             	 if (hotdeal_hardcopy[0].checked == false && hotdeal_hardcopy[1].checked == false) 
             	 {
             	 	 $(deal_hard_cpy_element).css('display','block');
             	 	 return false;
             	 }//if 
             	 if (document.getElementById("err_hard_cpy").style.display = 'block') 
             	 {
             	 	 document.getElementById("err_hard_cpy").style.display = 'none';
             	 }
             }//if 
              if (hotdeal_homevisit_checking[0].checked == true)
             {
             	var  hme_vst = "yes";
             }
             else 
             {
             	 var  hme_vst = "no";
             }
             if (hotdeal_hardcopy[0].checked == true)
             {
                var hrd_cpy = "yes";
             }
             else 
             {
             	 var hrd_cpy = "no";
             }
           preview_handler(lab_address,lab_pin,hme_vst,hrd_cpy,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);
  }//vst bth fnctn endng
  
      
            
               
    function datastore_handler()
    {
   	  var ptnt_name = document.getElementById("hotdeal_patient_name");
        var ptnt_email = document.getElementById("hotdeal_email");
        var ptnt_phone = document.getElementById("hotdeal_phone");
        var ptnt_apptime = document.getElementById("hotdeal_app_time");
        var ptnt_address = document.getElementById("hotdeal_pfl_address");
        var ptnt_age = document.getElementById("hotdeal_patient_age");
        var ptnt_gender = document.getElementById("hotdeal_ptnt_gender");
        var ptnt_pinnum = document.getElementById("hotdeal_patient_pincode");
        localStorage.setItem("patient_name",ptnt_name.value);
        localStorage.setItem("patient_email" ,ptnt_email.value);
        localStorage.setItem("patient_phone" ,ptnt_phone.value);
        localStorage.setItem("patient_app_time" ,ptnt_apptime.value);
        localStorage.setItem("patient_address",ptnt_address.value);
        localStorage.setItem("patient_age",ptnt_age.value);
        localStorage.setItem("patient_gender",ptnt_gender.value);
        localStorage.setItem("patient_pincode",ptnt_pinnum.value);
    } //fnctn handler

    function Filling_localdata()
    {
     	    document.getElementById("hotdeal_patient_name").value = localStorage.getItem("patient_name");
          document.getElementById("hotdeal_email").value = localStorage.getItem("patient_email");
          document.getElementById("hotdeal_phone").value = localStorage.getItem("patient_phone");
          document.getElementById("hotdeal_app_time").value = localStorage.getItem("patient_app_time");
          document.getElementById("hotdeal_pfl_address").value = localStorage.getItem("patient_address");
          document.getElementById("hotdeal_patient_age").value = localStorage.getItem("patient_age");
          document.getElementById("hotdeal_ptnt_gender").value = localStorage.getItem("patient_gender");
          document.getElementById("hotdeal_patient_pincode").value = localStorage.getItem("patient_pincode");
    }//fnctn handler
    
   function preview_handler(lab_address,lab_pin,hme_vst,hrd_cpy,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea)
   {
   	            var hotdeal_ptnt_address = localStorage.getItem("patient_address"); 
   	            var order_page = document.createElement('div');
                  $(order_page).addClass("modal");
                  $(order_page).attr('id','modal_thirdpage');
                  $(order_page).css('backgroundColor','#fff');
                  $(order_page).css('position','relative');
                  $(order_page).css('paddingRight','0px');
                  $(order_page).modal().open();
                  var closing_element = document.createElement('a');
                  $(closing_element).addClass("close");
                  $(closing_element).attr('href','#');
                  $(closing_element).html("&times;");
                  $(closing_element).css('marginTop' ,'-19px');
                  $(closing_element).css('fontSize','26px');
                  $(closing_element).css('marginRight','7px');
                  $(closing_element).attr('id','modal_close');
                  var preview_box = document.createElement('div');
                  $(preview_box).addClass("preview_details");
                  $(preview_box).css('padding','10px');
                  $(preview_box).css('marginRight','20px');
                  var preview_div_element = document.createElement('div');
                  var preview_heading = document.createElement('h4');
                  $(preview_heading).html("Order Preview");
                  $(preview_heading).css('textAlign','center');
                  $(preview_heading).css('fontSize','18px');
                  $(preview_heading).css('fontWeight','bold');
                  $(preview_heading).css('color','#5cb0cf');
                  var deal_info = document.createElement('div');
                  $(deal_info).html("Lab & price  Information");
                  $(deal_info).css('background','rgb(65, 167, 179)');
                  $(deal_info).css('color','white');
                  $(deal_info).css('fontWeight','bold');
                  $(deal_info).css('paddingLeft','6px');
                  $(deal_info).css('marginTop','10px');
                  var table_dealname = document.createElement('table');
                  $(table_dealname).css('float','left');
                  $(table_dealname).css('marginBottom','15px');
                  $(table_dealname).css('width','316px');
                   var tr_dealname = document.createElement('tr');
                  var td_dealname = document.createElement('td');
                  $(td_dealname).html("&nbsp"+"&nbsp"+"&nbsp"+labname);
                  $(td_dealname).css('paddingTop','3px');
                  $(td_dealname).css('fontWeight','bold');
                  $(tr_dealname).append(td_dealname);
                  var tr_labname = document.createElement('tr');
                  var td_labname = document.createElement('td');
                  var deal_pfl_td_loc_div = document.createElement('div');
                  $(deal_pfl_td_loc_div).css('float','left');
                  $(deal_pfl_td_loc_div).html("&nbsp"+"&nbsp"+"&nbsp");
                  var deal_pfl_td_loc_img = document.createElement('img');
                  $(deal_pfl_td_loc_img).attr('src','images/location-bi.png');
                  $(deal_pfl_td_loc_img).css('height','17px');
                  $(deal_pfl_td_loc_img).css('width','12px');
                  $(deal_pfl_td_loc_div).append(deal_pfl_td_loc_img);
                  var deal_pfl_td_loc_detail = document.createElement('div');
                 $(deal_pfl_td_loc_detail).html("&nbsp;"+lab_address+","+labarea+","+lab_pin);
                 $(deal_pfl_td_loc_detail).css('float','right');
                  $(deal_pfl_td_loc_detail).css('width','290px');
                  $(td_labname).append(deal_pfl_td_loc_div);
                  $(td_labname).append(deal_pfl_td_loc_detail);
                  $(tr_dealname).append(td_labname);
                  $(tr_labname).append(td_labname);
                  $(table_dealname).append(tr_dealname);
                  $(table_dealname).append(tr_labname);
                   if (online_reports == "yes") 
                {
                 	 var onlinereports_tr = document.createElement('tr');
                   var onlinereports_element = document.createElement('td');
               	$(onlinereports_element).addClass("err_msg");
                  $(onlinereports_element).attr('id','pkg_reports_msg');
                  $(onlinereports_element).css('color','rgb(236,73,73)');
                  $(onlinereports_element).css('textAlign','left');
                  $(onlinereports_element).css('fontSize','10px');
                  $(onlinereports_element).css('display','block');
                  var star_onlinereports = document.createElement('span');
                  $(star_onlinereports).addClass('star');
                  $(star_onlinereports).html("&nbsp"+"&nbsp"+"&nbsp"+"&#x2605");
                  $(star_onlinereports).css('float','left');
                  var error_onlinereports_element = document.createElement('div');
                  $(error_onlinereports_element).html("Online reports  available");
                 	$(onlinereports_element).append(star_onlinereports);
                 	$(onlinereports_element).append(error_onlinereports_element);
                   $(onlinereports_tr).append(onlinereports_element);
                   $(table_dealname).append(onlinereports_tr);
                    $(ptnt_info).css('marginTop','14%');
                	}
                	
                	  if(visit_type== "homevisitonly")
                   {
                   	   var homevisit_tr_one_element = document.createElement('tr');
                      var homevisit_one_element = document.createElement('td');
               	    $(homevisit_one_element).addClass("err_msg");
                      $(homevisit_one_element).attr('id','pkg_reports_msg');
                       $(homevisit_one_element).css('color','rgb(236,73,73)');
                     $(homevisit_one_element).css('textAlign','left');
                    $(homevisit_one_element).css('fontSize','10px');
                     $(homevisit_one_element).css('display','block');
                    var star_homevisit_one = document.createElement('span');
                    $(star_homevisit_one).addClass('star');
                    $(star_homevisit_one).html("&nbsp"+"&nbsp"+"&nbsp"+"&#x2605");
                    $(star_homevisit_one).css('float','left');
                    var error_homevisit_one_element = document.createElement('div');
                    $(error_homevisit_one_element).html('Home visit only');
                 	  $(homevisit_one_element).append(star_homevisit_one);
                 	  $(homevisit_one_element).append(error_homevisit_one_element);
                  $(homevisit_tr_one_element).append(homevisit_one_element);   
                  $(table_dealname).append(homevisit_tr_one_element);        
                  }//if home visit
                  else  if(visit_type == "both")
                   {
                   	  var labvisit_homevisit_tr_one_element = document.createElement('tr');
                      var labvisit_homevisit_one_element = document.createElement('td');
               	    $(labvisit_homevisit_one_element).addClass("err_msg");
                      $(labvisit_homevisit_one_element).attr('id','pkg_reports_msg');
                       $(labvisit_homevisit_one_element).css('color','rgb(236,73,73)');
                     $(labvisit_homevisit_one_element).css('textAlign','left');
                     $(labvisit_homevisit_one_element).css('fontSize','10px');
                     $(labvisit_homevisit_one_element).css('display','block');
                    var star_labvisit_homevisit_one = document.createElement('span');
                    $(star_labvisit_homevisit_one).addClass('star');
                    $(star_labvisit_homevisit_one).html("&nbsp"+"&nbsp"+"&nbsp"+"&#x2605");
                    $(star_labvisit_homevisit_one).css('float','left');
                    var error_labvisit_homevisit_one_element = document.createElement('div');
                    $(error_labvisit_homevisit_one_element).html('Home visit  available');
                 	  $(labvisit_homevisit_one_element).append(star_labvisit_homevisit_one);
                 	  $(labvisit_homevisit_one_element).append(error_labvisit_homevisit_one_element);
                  $(labvisit_homevisit_tr_one_element).append(labvisit_homevisit_one_element);   
                  $(table_dealname).append(labvisit_homevisit_tr_one_element); 
                  }//if home visit
                  else 
                  {
                    var labvisit_tr_one_element = document.createElement('tr');
                      var labvisit_one_element = document.createElement('td');
               	    $(labvisit_one_element).addClass("err_msg");
                      $(labvisit_one_element).attr('id','pkg_reports_msg');
                       $(labvisit_one_element).css('color','rgb(236,73,73)');
                     $(labvisit_one_element).css('textAlign','left');
                     $(labvisit_one_element).css('fontSize','10px');
                     $(labvisit_one_element).css('display','block');
                    var star_labvisit_one = document.createElement('span');
                    $(star_labvisit_one).addClass('star');
                    $(star_labvisit_one).html("&nbsp"+"&nbsp"+"&nbsp"+"&#x2605");
                    $(star_labvisit_one).css('float','left');
                    var error_labvisit_one_element = document.createElement('div');
                    $(error_labvisit_one_element).html('Home visit not available');
                 	  $(labvisit_one_element).append(star_labvisit_one);
                 	  $(labvisit_one_element).append(error_labvisit_one_element);
                  $(labvisit_tr_one_element).append(labvisit_one_element);   
                  $(table_dealname).append(labvisit_tr_one_element); 
                   }
             var deal_pfl_price_details = document.createElement('div');
             $(deal_pfl_price_details).css('float','right');
             $(deal_pfl_price_details).css('paddingTop','6px');
             $(deal_pfl_price_details).css('paddingRight','12px');
             $(deal_pfl_price_details).css('marginBottom','11px');
             var deal_pfl_price_details_price = document.createElement('div');
             $(deal_pfl_price_details_price).html("Rs."+deal_mrp);
             $(deal_pfl_price_details_price).css('textAlign','center');
             $(deal_pfl_price_details_price).css('fontSize','22px');
             $(deal_pfl_price_details_price).css('color','rgb(236,73,73)');
             var deal_pfl_price_details_mrp = document.createElement('div');
             $(deal_pfl_price_details_mrp).css('fontSize','18px');
             var deal_pfl_mrp_bracket_div = document.createElement('div');
             $(deal_pfl_mrp_bracket_div).css('float','left');
             var deal_pfl_mrp_openbracket = document.createElement('div');
             $(deal_pfl_mrp_openbracket).html("("+"&nbsp");
             $(deal_pfl_mrp_openbracket).css('float','left');
             var deal_pfl_mrp_price = document.createElement('div');
             $(deal_pfl_mrp_price).html("Rs."+"&nbsp"+deal_finalprice);
             $(deal_pfl_mrp_price).css('textDecoration','line-through');
             $(deal_pfl_mrp_price).css('float','left');
             var deal_pfl_mrp_closebracket = document.createElement('div');
             $(deal_pfl_mrp_closebracket).html("&nbsp"+")");
             $(deal_pfl_mrp_closebracket).css('float','right');
             $(deal_pfl_mrp_bracket_div).append(deal_pfl_mrp_openbracket);
             $(deal_pfl_mrp_bracket_div).append(deal_pfl_mrp_price);
             $(deal_pfl_mrp_bracket_div).append(deal_pfl_mrp_closebracket);
             $(deal_pfl_price_details_mrp).append(deal_pfl_mrp_bracket_div);
             var deal_pfl_discount_det = document.createElement('div');
             $(deal_pfl_discount_det).html("&nbsp"+deal_discount+"%");
             $(deal_pfl_discount_det).css('float','right');
             $(deal_pfl_price_details_mrp).append(deal_pfl_discount_det);
             $(deal_pfl_price_details).append(deal_pfl_price_details_price);
             $(deal_pfl_price_details).append(deal_pfl_price_details_mrp);
             var deal_testinfo_head_table = document.createElement('table');
             $(deal_testinfo_head_table).css('width','531px');
             $(deal_testinfo_head_table).css('marginBottom','16px');
             var deal_testinfo_head_tr = document.createElement('tr');
             $(deal_testinfo_head_tr).css('border','1px solid rgb(65, 167, 179)');
             var deal_testinfo_head = document.createElement('th');
             $(deal_testinfo_head).html("&nbsp;"+"&nbsp;"+"Deal Information");
             $(deal_testinfo_head).css('background','rgb(65, 167, 179)');
             $(deal_testinfo_head).css('color','white');
             $(deal_testinfo_head).css('fontWeight','bold');
             $(deal_testinfo_head_tr).append(deal_testinfo_head);
             var deal_testname_tr = document.createElement('tr');
             $(deal_testname_tr).css('border','1px solid rgb(221, 221, 221)');
             var deal_testname  = document.createElement('td');
             $(deal_testname).html("&nbsp;"+"&nbsp;"+"&nbsp;"+dealname);
             $(deal_testname).css('background', 'rgba(236,246,248,0.99)');
             $(deal_testname_tr).append(deal_testname);
             $(deal_testinfo_head_table).append(deal_testinfo_head_tr);
             $(deal_testinfo_head_table).append(deal_testname_tr);
              var ptnt_info = document.createElement('div');
                  $(ptnt_info).html("Patient Information");
                  $(ptnt_info).css('fontWeight' ,'bold');
                  $(ptnt_info).css('background','rgb(65, 167, 179)');
                  $(ptnt_info).css('color','white');
                  $(ptnt_info).css('paddingLeft','6px');
                  var patient_details_table = document.createElement('table');
                  $(patient_details_table).css('marginBottom','5%');
                  $(patient_details_table).css('width','100%');
                  $(patient_details_table).addClass("deals_ptnt_details");
                  var tr_patient = document.createElement('tr');
                   $(tr_patient).addClass("deals_ptnt_preview_info");
                   $(tr_patient).css('border' ,'1px solid rgb(221, 221, 221)');
                  var td_patientname = document.createElement('td');
                  $(td_patientname).html("&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"Name");
                  $(td_patientname).css('border','1px solid #ddd');
                  if (localStorage.getItem("patient_gender") == 2) 
                  {
             	       var ptnt_gender = "Male";
                   }//if
                  else 
                  {
             	     var ptnt_gender = "Female";
                  }//else 
                  var td_patient_name = document.createElement('td');
                  $(td_patient_name).html(localStorage.getItem("patient_name")+"&nbsp;"+"("+"&nbsp;"+ptnt_gender+"&nbsp;"+localStorage.getItem("patient_age")+"yrs"+"&nbsp;"+")");
                  $(td_patient_name).css('paddingLeft','6px');
                  var tr_email = document.createElement('tr');
                  $(tr_email).css('border' ,'1px solid rgb(221, 221, 221)');
                  $(tr_email).addClass("deals_ptnt_preview_info");
                  var td_emailheading = document.createElement('td');
                  $(td_emailheading).html("&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"Email");
                  $(td_emailheading).css('width','50%');
                  $(td_emailheading).css('border','1px solid #ddd');
                  var td_email_heading = document.createElement('td');
                  $(td_email_heading).html(localStorage.getItem("patient_email"));
                  $(td_email_heading).css('paddingLeft','6px');
                  var tr_phno = document.createElement('tr');
                  $(tr_phno).addClass("deals_ptnt_preview_info");
                  $(tr_phno).css('border' ,'1px solid rgb(221, 221, 221)');
                  var td_phnoheading = document.createElement('td');
                  $(td_phnoheading).html("&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"Mobile No");
                  $(td_phnoheading).css('width','50%');
                  $(td_phnoheading).css('border','1px solid #ddd');
                  var td_phno_heading = document.createElement('td');
                  $(td_phno_heading).html(localStorage.getItem("patient_phone"));
                  $(td_phno_heading).css('paddingLeft','6px');
                  var tr_apptime = document.createElement('tr');
                  $(tr_apptime).addClass("deals_ptnt_preview_info");
                  $(tr_apptime).css('border' ,'1px solid rgb(221, 221, 221)');
                  var td_apptimeheading = document.createElement('td');
                  $(td_apptimeheading).html("&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"Preferred Appointment Time");
                  $(td_apptimeheading).css('border','1px solid #ddd');
                  $(td_apptimeheading).css('width','50%');
                  var td_apptime_heading = document.createElement('td');
                  $(td_apptime_heading).html(localStorage.getItem("patient_app_time"));
                  $(td_apptime_heading).css('paddingLeft','6px');
                  var tr_address = document.createElement('tr');
                  $(tr_address).addClass("ptnt_preview_info");
                  $(tr_address).css('border' ,'1px solid rgb(221, 221, 221)');
                  var td_address_heading = document.createElement('td');
                  $(td_address_heading).html("&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"Address");
                  $(td_address_heading).css('width','50%');
                  $(td_address_heading).css('border','1px solid rgb(221, 221, 221)');
                  var td_address = document.createElement('td');
                  $(td_address).html(localStorage.getItem("patient_address"));
                  $(td_address).css('paddingLeft','6px');
                  $(tr_address).append(td_address_heading);
                  $(tr_address).append(td_address);
                  var tmm_form_element = document.createElement('div');
                  $(tmm_form_element).attr('id','tmm-form-wizard');
                  $(tmm_form_element).addClass("row");
                  var prevbtn_element = document.createElement('div');
                  $(prevbtn_element).css('margin','0px');
                  $(prevbtn_element).addClass('prev');
                  var backbtn = document.createElement('button');
                  $(backbtn).attr('id','step2_back_btn');
                  $(backbtn).addClass("button button-control");
                  $(backbtn).attr('type','button');
                  var span_backbtn = document.createElement('span');
                  $(span_backbtn).html("Back");
                  var backbtn_divider = document.createElement('div');
                  $(backbtn_divider).addClass("button-divider");
                  var orderbtn_element = document.createElement('div');
                  $(orderbtn_element).css('margin','0px');
                  $(orderbtn_element).addClass('next');
                  var nextbtn = document.createElement('button');
                  $(nextbtn).attr('id','step2_next_btn');
                  $(nextbtn).addClass("button button-control");
                  $(nextbtn).attr('type','button');
                  var span_nextbtn = document.createElement('span');
                  $(span_nextbtn).html("Order");
                  var nextbtn_divider = document.createElement('div');
                  $(nextbtn_divider).addClass("button-divider");
                  $(backbtn).append(span_backbtn);
                  $(prevbtn_element).append(backbtn);
                  $(prevbtn_element).append(backbtn_divider);
                   $(nextbtn).append(span_nextbtn);
                   $(orderbtn_element).append(nextbtn);
                   $(orderbtn_element).append(nextbtn_divider);
                  $(tr_patient).append(td_patientname);
                  $(tr_patient).append(td_patient_name);
                  $(tr_email).append(td_emailheading);
                  $(tr_email).append(td_email_heading);
                  $(tr_phno).append(td_phnoheading);
                  $(tr_phno).append(td_phno_heading);
                  $(tr_apptime).append(td_apptimeheading);
                  $(tr_apptime).append(td_apptime_heading);
                  $(patient_details_table).append(tr_patient);
                  $(patient_details_table).append(tr_email);
                  $(patient_details_table).append(tr_phno);
                  $(patient_details_table).append(tr_apptime);
                  if (hme_vst == "yes") 
                  {
                     $(patient_details_table).append(tr_address);
                  }//if 
                  $(tmm_form_element).append(prevbtn_element);
                  $(tmm_form_element).append(orderbtn_element);
                  $(preview_div_element).append(preview_heading);
                  $("#modal_thirdpage").append(closing_element);
                  $(preview_box).append(preview_div_element);
                  $(preview_box).append(deal_info);
                  $(preview_box).append(table_dealname); 
                  $(preview_box).append(deal_pfl_price_details);
                  $(preview_box).append(deal_testinfo_head_table);
                  $(preview_box).append(ptnt_info);
                  $(preview_box).append(patient_details_table);
                  $(preview_box).append(tmm_form_element);
                  $(".close").on('click',function () 
                 {
               	  $(order_page).modal().close(); 
                 });//click
                   $("#modal_thirdpage").append(preview_box);  
                    
                     $(prevbtn_element).on('click', function ()
                      {
                      	 
                          form_handler(lab_address,lab_pin,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);
                     	});//click fnctn  
                     	$(orderbtn_element).on('click',function ()
                     	 {
                            loadingimage_page();                    		
                             confirm_pagehandler(hme_vst,hrd_cpy,lab_address,lab_pin,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea)                     		
                     	      
                     		});//click          
                 
   }//fnctn handler
   
   function loadingimage_page() 
   {
   	         var error_page = document.createElement('div');
               $(error_page).addClass("modal");
               $(error_page).attr('id','loading_page');
               $(error_page).css('backgroundColor','#fff');
               $(error_page).css('position','relative');
               var load_msg = document.createElement('div');
               $(load_msg).html("Please wait"+"&nbsp"+","+"&nbsp"+"while your order is being processed");
               $(load_msg).css('textAlign','center');
               var load_img = document.createElement('img');
               $(load_img).attr('id','loading_img');
               $(load_img).attr('src','images/loading.gif');
               $(load_img).css('marginLeft','256px');
                $(error_page).append(load_img);
                $(error_page).append(load_msg);
               $(error_page).modal().open();
    }// loading img fnctn           
 
 function confirm_pagehandler(hme_vst,hrd_cpy,lab_address,lab_pin,dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea)
 {
 	 var pnt_name =localStorage.getItem("patient_name");
    var pnt_mobileno = localStorage.getItem("patient_phone");
    var mail = localStorage.getItem("patient_email");
    var appt_time = localStorage.getItem("patient_app_time");
    var deal_book_pnt_address = localStorage.getItem("patient_address");
    var deal_ptnt_age = localStorage.getItem("patient_age");
    var deal_patient_pin = localStorage.getItem("patient_pincode");
    var sel_month_name = appt_time.substr(3,3);
    
    
    if (sel_month_name == 'Jan') 
     {
    	 var sel_month = '01';
    	 
     }//if mnth 1
    if (sel_month_name == 'Feb') 
     {
        var  sel_month = '02';
     }//if mnth 2
    if (sel_month_name == 'Mar') 
     {
    	 var sel_month = '03';
     }//if mnth 3
    if (sel_month_name == 'Apr') 
     {
    	var sel_month = '04';
  	  }//if mnth 4
    if (sel_month_name == 'May') 
  	  {
    		var sel_month = '05';
    	}//if mnth 5
    if (sel_month_name == 'Jun') 
  	  {
    		var sel_month = '06';
     }//if mnth 6
    if (sel_month_name == 'Jul') 
     {
    		var sel_month = '07';
     }//if mnth 7
    if (sel_month_name == 'Aug') 
     {
    		var sel_month = '08';
     	}//if mnth 8
     if (sel_month_name == 'Sep') 
    	{
    		var sel_month = '09';
    	}//if mnth 9
    	if (sel_month_name == 'Oct') 
    	{
    		var sel_month = '10';
    	}//if mnth 10
    	if (sel_month_name == 'Nov') 
    	{
    			var sel_month = '11';
    	}//if mnth 11
    	if (sel_month_name == 'Dec') 
    	{
    		var sel_month = '12';
    	}//if mnth 12
    	   var i ;
         function addZero(i)
         {
            if (i < 10) 
            {
               i = "0" + i;
            }//if i
              return i;
            }//fnctn
                       
    	       var tday = new Date();
    	       var sel_year = appt_time.substr(7,4);
             var sel_date = appt_time.substr(0,2);
             var sel_hours = appt_time.substr(12,2);
             var sel_minutes = appt_time.substr(15,2);
             var sel_sec = addZero(tday.getSeconds());
             var sel_meridian = appt_time.substr(18,2);
             var sel_hours_meridian = sel_hours +" "+ sel_meridian;
             if (sel_meridian == "AM") 
             {
             	 var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
             	
              }//if AM
              if (sel_hours_meridian == "12 PM")
              {
              	   var sel_hours = "12";
              	 var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                 
              	}//if 12
             if (sel_hours_meridian == "01 PM")
              {
              	   var sel_hours = "13";
              	 var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                 
              	}//if 01
              	if (sel_hours_meridian == "02 PM")
               {
              	   var sel_hours = "14";
                  var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                 
                }//if 02
               	if (sel_hours_meridian == "03 PM")
                  {
              	      var sel_hours = "15";
                      var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                     
                 }//if 03
                 if (sel_hours_meridian == "04 PM")
                 {
              	    var sel_hours = "16";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                  
                  }// if 04
                  if (sel_hours_meridian == "05 PM")
                 {
              	    var sel_hours = "17";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                  
                  }// if 05
                   if (sel_hours_meridian == "06 PM")
                 {
              	    var sel_hours = "18";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                  
                  }// if 06
                   if (sel_hours_meridian == "07 PM")
                 {
              	    var sel_hours = "19";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                   
                  }// if 07
                   if (sel_hours_meridian == "08 PM")
                 {
              	    var sel_hours = "20";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                   
                  }// if 08
                   if (sel_hours_meridian == "09 PM")
                 {
              	    var sel_hours = "21";
                   var sel_time = sel_year+"-"+sel_month+"-"+sel_date+" "+sel_hours+":"+sel_minutes+":"+sel_sec;
                   
                  }// if 09
           if (localStorage.getItem("patient_gender") == 2) 
             {
             	var ptnt_gender = "Male";
             }
             else 
             {
             	var ptnt_gender = "Female";
             }             
         $.ajax({
         url:host_api+"/m-checkout/book-order",
         type:'POST',
         dataType:'json',
         data:{isHomeVisit:hme_vst,patientPincode:deal_patient_pin,patientGender:ptnt_gender,patientAge:deal_ptnt_age,reportHardCopy:hrd_cpy,homeVisitAddress:deal_book_pnt_address,labSlug:labslug,hotDealSlugs:deal_slug,patientName:pnt_name,patientMobile:pnt_mobileno,patientEmail:mail,apptTime:sel_time},
          success:function(data)
          {
          	 if(data.error)
          	{
          	     var error_page = document.createElement('div');
                  $(error_page).addClass("modal");
                  $(error_page).attr('id','modal_errorpage');
                  $(error_page).css('backgroundColor','#fff');
                  $(error_page).css('position','relative');
                  $(error_page).css('paddingRight','0px');
                  $(error_page).modal().open();
                   var error_closing = document.createElement('a');
                  $(error_closing).addClass("confirm_close");
                  $(error_closing).attr('href','#');
                  $(error_closing).html("&times;");
                  $(error_closing).css('marginTop' ,'-24px');
                   $(error_closing).css('marginRight','8px');
                  $(error_closing).css('fontSize','26px');
                  $(error_closing).css('float','right');
                  var error_heading = document.createElement('h4');
                  $(error_heading).html("Order Confirmation failed");
                   $(error_heading).css('color','#5cb0cf');
                  $(error_heading).css('textAlign','center');
                  var error_detail = document.createElement('div');
                  $(error_detail).html(data.error);
                  $(error_detail).css('marginTop','16px');
                  $(error_detail).css('marginLeft','16px');
                  var error_close = document.createElement('button');
                  $(error_close).addClass("close_modal");
                  $(error_close).attr('type','button');
                  $(error_close).html("Close");
                  $(error_close).css('float','right');
                  $(error_close).css('marginTop','8px');
                  $(error_close).css('width','80px');
                  $(error_close).css('borderRadius','5px');
                  $(error_close).css('color','white');
                  $(error_close).css('background','rgb(236,73,73)');
                  $(error_close).css('border','0px');
                  $(error_close).css('marginRight','20px');
                   $("#modal_errorpage").append(error_closing);
                   $("#modal_errorpage").append(error_heading);
                   $("#modal_errorpage").append(error_detail);
                   $("#modal_errorpage").append(error_close);
                   $(error_closing).on('click',function () 
                   {
                   	$(error_page).modal().close();
                   	});
                   $(error_close).on('click',function () 
                   {
                   	$(error_page).modal().close();
                   	});
          	}//if error
          	else
          	 {
                  var confirm_page = document.createElement('div');
                  $(confirm_page).addClass("modal");
                  $(confirm_page).attr('id','modal_fourthpage');
                  $(confirm_page).css('backgroundColor','#fff');
                  $(confirm_page).css('position','relative');
                  $(confirm_page).css('paddingRight','0px');
                  $(confirm_page).modal().open();
                  var confirm_closing = document.createElement('a');
                  $(confirm_closing).addClass("confirm_close");
                  $(confirm_closing).attr('href','#');
                  $(confirm_closing).html("&times;");
                  $(confirm_closing).css('marginTop' ,'-23px');
                  $(confirm_closing).css('fontSize','26px');
                  $(confirm_closing).css('float','right');
                  $(confirm_closing).css('marginRight','8px');
                  var order_element = document.createElement('div');
                  $(order_element).addClass("order_details");
                  $(order_element).css('marginTop','9px');
                  var booking_heading = document.createElement('h4');
                  $(booking_heading).html("Order Confirmation");
                  $(booking_heading).css('textAlign','center');
                  $(booking_heading).css('fontSize','18px');
                  $(booking_heading).css('fontWeight','bold');
                  $(booking_heading).css('color','#5cb0cf');
                  var success_element = document.createElement('div');
                  $(success_element).html("Your order is successfully placed."+"&nbsp"+"&nbsp"+"Please check your mail for details.");
                  $(success_element).css('marginLeft','24px');
                  $(success_element).css('marginTop','8px');
                  var ordered_table = document.createElement('table');
                  $(ordered_table).css('marginTop','8px');
                  $(ordered_table).css('width','552px');
                  var labname_tr = document.createElement('tr');
                  $(labname_tr).addClass("order_class");
                  $(labname_tr).attr('id','ordered_lab');
                  var labname_td= document.createElement('td');
                  $(labname_td).html("Lab name");
                  $(labname_td).css('paddingLeft','6px');
                  $(labname_td).css('borderRight','1px solid #ddd');
                  var lab_name_td = document.createElement('td');
                  $(lab_name_td).html(data.labName);
                  $(lab_name_td).css('paddingLeft','6px');
                  var orderid_tr = document.createElement('tr');
                  $(orderid_tr).addClass("order_class");
                  var orderid_td = document.createElement('td');
                  $(orderid_td).html("OrderId");
                  $(orderid_td).css('borderRight','1px solid #ddd');
                  $(orderid_td).css('paddingLeft','6px');
                  var order_id_td = document.createElement('td');
                  $(order_id_td).html(data.orderId);
                  $(order_id_td).css('paddingLeft','6px');
                  var ptnt_name_tr = document.createElement('tr');
                  $(ptnt_name_tr).addClass("order_class");
                  $(ptnt_name_tr).attr('id','order_name');
                  var ptnt_name_td = document.createElement('td');
                  $(ptnt_name_td).html("Name");
                  $(ptnt_name_td).css('borderRight','1px solid #ddd');
                  $(ptnt_name_td).css('paddingLeft','6px');
                  var ptntname_td = document.createElement('td');
                  $(ptntname_td).html(data.patientName);
                  $(ptntname_td).css('paddingLeft','6px');
                  var apptime_tr = document.createElement('tr');
                  $(apptime_tr).addClass("order_class");
                  var apptime_td = document.createElement('td');
                  $(apptime_td).html("Preferred Appointment Time");
                  $(apptime_td).css('borderRight','1px solid #ddd');
                  $(apptime_td).css('paddingLeft','6px');
                  var appt_time_td = document.createElement('td');
                  $(appt_time_td).html(data.apptTime);
                  $(appt_time_td).css('paddingLeft','6px');
                  var close_button = document.createElement('button');
                  $(close_button).addClass("close_modal");
                  $(close_button).attr('type','button');
                  $(close_button).html("Close");
                  $(close_button).css('float','right');
                  $(close_button).css('marginTop','8px');
                  $(close_button).css('width','80px');
                  $(close_button).css('borderRadius','5px');
                  $(close_button).css('color','white');
                  $(close_button).css('background','rgb(236,73,73)');
                  $(close_button).css('border','0px');
                  $(close_button).css('marginRight','20px');
                  $(labname_tr).append(labname_td);
                  $(labname_tr).append(lab_name_td);
                  $(orderid_tr).append(orderid_td);
                  $(orderid_tr).append(order_id_td);
                  $(ptnt_name_tr).append(ptnt_name_td);
                  $(ptnt_name_tr).append(ptntname_td);
                  $(apptime_tr).append(apptime_td);
                  $(apptime_tr).append(appt_time_td);
                  $(ordered_table).append(labname_tr);
                  $(ordered_table).append(orderid_tr);
                  $(ordered_table).append(ptnt_name_tr);
                  $(ordered_table).append(apptime_tr);
                  $(order_element).append(booking_heading);
                  $(order_element).append(success_element);
                  $(order_element).append(ordered_table);
                  $(order_element).append(close_button);
                  $("#modal_fourthpage").append(confirm_closing);
                  $("#modal_fourthpage").append(order_element);
                 
                   $(".confirm_close").on('click',function () 
                 {
               	  $(confirm_page).modal().close(); 
                 });//click
                  $(".close_modal").on('click',function () 
                  {
                  	 $(confirm_page).modal().close(); 
                 	});//click btn
                  }//else
                   }//success
                 
                  });//ajax   
 }//fnctn handler
function subscribe_alert_handler()
{
    var  name_alert = document.createElement('div');
    $(name_alert).addClass("modal");
               $(name_alert).attr('id', 'name_modal');
               $(name_alert).css('position','relative');
               $(name_alert).css('backgroundColor','#fff'); 
               $(name_alert).css('position','relative');
               $(name_alert).css('border','0px');
               $(name_alert).css('borderRadius','5px');
               $(name_alert).css('paddingRight','0px');
               $(name_alert).modal().open(); 
               var close_action  = document.createElement('a');
               $(close_action).addClass("close");
               $(close_action).attr('href','#');
               $(close_action).html("&times;");
               $(close_action).css('marginTop' ,'-21px');
               $(close_action).css('fontSize','30px');
               $(close_action).css('marginRight','7px');
               var modal_name_body = document.createElement('div');
                $(modal_name_body).attr('id','deal_modal_body');
                $(modal_name_body).css('padding' ,'10px');
                $(modal_name_body).css('position','relative');
               var modal_name_footer = document.createElement('div');
               $(modal_name_footer).css('textAlign','right');
               $(modal_name_footer).css('padding','15px');
               $(modal_name_footer).css('borderTop','1px solid #e5e5e5');
               $(modal_name_footer).css('marginRight','20px');
               var name_btnelement = document.createElement('button');
               $(name_btnelement).addClass("btn btn-primary");
               $(name_btnelement).html("Ok");
               $(close_action).on('click',function () 
               {
             	   $(name_alert).modal().close(); 
             	});//close click
             	$(name_btnelement).on('click',function () 
             	{
             		$(name_alert).modal().close();
            	});//btn click
              $(modal_name_footer).append(name_btnelement);
                $('#name_modal').append(close_action);
                $('#name_modal').append(modal_name_body);
                $('#name_modal').append(modal_name_footer);
   
  } //alert fnctn endng  
    	
     $("#subscriber_button").on('click', function() 
   { 
       var subscriber_fullname = $("#subscriber_name").val();
       var mobile_number = $("#subscriber_phonenumber").val();
       var subscriber_mailid = $("#subscriber_email").val();
       if ( !(subscriber_fullname.length >= 6 && subscriber_fullname.length <= 26) || subscriber_fullname.match(/[^a-zA-Z ]/)  )
        {
                subscribe_alert_handler();
                var deal_modal_error = document.getElementById('deal_modal_body');
                $(deal_modal_error).html('Enter Full Name');
                return false;
          }//if sub_name
         var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
         if(!filter.test(subscriber_mailid))
         {
                 subscribe_alert_handler();
                var deal_modal_error = document.getElementById('deal_modal_body');
                $(deal_modal_error).html('Enter valid e-mail id');
                 return false;
        }//if subscriber_mail 
     });//sub btn
        	  $("#subscriber_phonenumber").on('keyup',function (event) 
        	   {
        		   var mobile_number = $("#subscriber_phonenumber").val();
        		   if (mobile_number.match(/^[a-zA-Z]+$/))
               {
                subscribe_alert_handler();
                var deal_modal_error = document.getElementById('deal_modal_body');
                $(deal_modal_error).html('Enter  numeric digits only');
                 return false;
                 }//if letters
            });//letters alert
        $("#subscriber_button").on('click', function() 
        { 
     
              var subscriber_fullname = $("#subscriber_name").val();
              var mobile_number = $("#subscriber_phonenumber").val();
              var subscriber_mailid = $("#subscriber_email").val();
              if ( !(subscriber_fullname.length >= 6 && subscriber_fullname.length <= 26) || subscriber_fullname.match(/[^a-zA-Z ]/)  )
              {
                subscribe_alert_handler();
                var deal_modal_error = document.getElementById('deal_modal_body');
                $(deal_modal_error).html('Enter Full Name');
               return false;
          }//if sub_name
         var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
         if(!filter.test(subscriber_mailid))
         {
                 subscribe_alert_handler();
                var deal_modal_error = document.getElementById('deal_modal_body');
                $(deal_modal_error).html('Enter valid e-mail id');
                 return false;
        }//if subscriber_mail
              if (mobile_number.match(/^[a-zA-Z]+$/))
               {
                  
                 subscribe_alert_handler();
                var deal_modal_error = document.getElementById('deal_modal_body');
                $(deal_modal_error).html('Enter  numeric digits only.');
                 return false;
                 }//if letters   
 
             if(mobile_number.match(/[^0-9]/) || mobile_number.length != 10) 
            {
                 subscribe_alert_handler();
                var deal_modal_error = document.getElementById('deal_modal_body');
                $(deal_modal_error).html('Enter correct mobile number');
                return false;
        }//if mobile_number
        if (!(mobile_number.charAt(0)=="9" || mobile_number.charAt(0)=="8" || mobile_number.charAt(0)=="7"))
        {
                subscribe_alert_handler();
                var deal_modal_error = document.getElementById('deal_modal_body');
                $(deal_modal_error).html('Mobile number is not valid');
                return false;
        }//if mobile_number 7,8,9
        loadingimage_page();
         $.ajax({
         url:host_api+"/m-hot-deals/digest-subscribe",
         type:'POST',
         dataType:'json',
         data:{fullName:subscriber_fullname,emailId:subscriber_mailid,mobileNum:mobile_number},
          success:function(data){
          
          	if(data.error)
          	{
          	     var sub_error_modal = document.createElement('div');
                  $(sub_error_modal).addClass("modal");
                  $(sub_error_modal).attr('id','sub_errormodal');
                  $(sub_error_modal).css('backgroundColor','#fff');
                  $(sub_error_modal).css('position','relative');
                  $(sub_error_modal).css('paddingRight','0px');
                  $(sub_error_modal).modal().open();
                  var sub_error_heading = document.createElement('h4');
                  $(sub_error_heading).html("Subscription failed");
                  $(sub_error_heading).css('textAlign','center');
                  $(sub_error_heading).css('fontSize','18px');
                  $(sub_error_heading).css('fontWeight','bold');
                  $(sub_error_heading).css('color','#5cb0cf');
                  var sub_error_close = document.createElement('a');
                  $(sub_error_close).addClass("confirm_close");
                  $(sub_error_close).attr('href','#');
                  $(sub_error_close).html("&times;");
                  $(sub_error_close).css('marginTop' ,'-25px');
                  $(sub_error_close).css('fontSize','30px');
                  $(sub_error_close).css('float','right');
                  $(sub_error_close).css('marginRight','6px');
                  var sub_error_msg = document.createElement('div');
                 $(sub_error_msg).html(data.error);
                 $(sub_error_msg).css('marginTop','16px');
                  $(sub_error_msg).css('marginLeft','16px');
                  var sub_error_closebtn = document.createElement('button');
                  $(sub_error_closebtn).addClass("close_modal");
                  $(sub_error_closebtn).attr('type','button');
                  $(sub_error_closebtn).html("Close");
                  $(sub_error_closebtn).css('float','right');
                  $(sub_error_closebtn).css('marginTop','8px');
                  $(sub_error_closebtn).css('width','80px');
                  $(sub_error_closebtn).css('borderRadius','5px');
                  $(sub_error_closebtn).css('color','white');
                  $(sub_error_closebtn).css('background','rgb(236,73,73)');
                  $(sub_error_closebtn).css('border','0px');
                  $(sub_error_closebtn).css('marginRight','20px');
                  $("#sub_errormodal").append(sub_error_close);
                  $("#sub_errormodal").append(sub_error_heading);
                  $("#sub_errormodal").append(sub_error_msg);
                  $("#sub_errormodal").append(sub_error_closebtn);
                  $(sub_error_close).on('click',function () 
                  {
                  	 $(sub_error_modal).modal().close();
                  	});//click close
                  $(sub_error_closebtn).on('click',function () 
                  {
                  	$(sub_error_modal).modal().close();
                  	});//click btn 

          	}
          	else
            {
          	var subscriber_modal = document.createElement('div');
                  $(subscriber_modal).addClass("modal");
                  $(subscriber_modal).attr('id','modal_subscribedpage');
                  $(subscriber_modal).css('backgroundColor','#fff');
                  $(subscriber_modal).css('position','relative');
                  $(subscriber_modal).css('paddingRight','0px');
                  $(subscriber_modal).modal().open();
             var sub_confirm_heading = document.createElement('h4');
             $(sub_confirm_heading).html("Subscription Confirmation");
                  $(sub_confirm_heading).css('textAlign','center');
                  $(sub_confirm_heading).css('fontSize','18px');
                  $(sub_confirm_heading).css('fontWeight','bold');
                  $(sub_confirm_heading).css('color','#5cb0cf');
              var sub_confirm_close = document.createElement('a');
                  $(sub_confirm_close).addClass("confirm_close");
                  $(sub_confirm_close).attr('href','#');
                  $(sub_confirm_close).html("&times;");
                  $(sub_confirm_close).css('marginTop' ,'-25px');
                  $(sub_confirm_close).css('fontSize','30px');
                  $(sub_confirm_close).css('float','right');
                  $(sub_confirm_close).css('marginRight','6px');
              var sub_confirm_msg = document.createElement('div');
              $(sub_confirm_msg).html(data.success);
               $(sub_confirm_msg).css('marginTop','16px');
                  $(sub_confirm_msg).css('marginLeft','16px');
                  var sub_confirm_btn = document.createElement('button');
                  $(sub_confirm_btn).addClass("close_modal");
                  $(sub_confirm_btn).attr('type','button');
                  $(sub_confirm_btn).html("Close");
                  $(sub_confirm_btn).css('float','right');
                  $(sub_confirm_btn).css('marginTop','8px');
                  $(sub_confirm_btn).css('width','80px');
                  $(sub_confirm_btn).css('color','white');
                  $(sub_confirm_btn).css('borderRadius','5px');
                  $(sub_confirm_btn).css('marginRight','20px');
                  $(sub_confirm_btn).css('border','0px');
                  $(sub_confirm_btn).css('background','rgb(236,73,73)');
                  $("#modal_subscribedpage").append(sub_confirm_close);
                  $("#modal_subscribedpage").append(sub_confirm_heading);
                  $("#modal_subscribedpage").append(sub_confirm_msg);
                  $("#modal_subscribedpage").append(sub_confirm_btn);
                  $(sub_confirm_close).on('click',function () 
                  {
                  	 $(subscriber_modal).modal().close();
                  	});//click close
                  $(sub_confirm_btn).on('click',function () 
                  {
                  	$(subscriber_modal).modal().close();
                  	});//click btn
               }//else
       }//success fnct
      });//ajax
      return false;
  });
 
      
     
   

