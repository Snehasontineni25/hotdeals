var host_api ="http://zotey.com/m-api" ;
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
         	 console.log(data);
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
               $(table_data_date).html(data[i].HotDealEndDate);
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
             console.log(data);
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
               $(price_heading).css('background','#41A7B3');
               $(price_heading).css('color','white');
               $(price_heading).css('fontWeight','bold');
               $(price_heading).css('marginTop','11px');
               $(price_heading).css('marginRight','20px');
               var price_element = document.createElement('div');
               $(price_element).html("Price Information");
               $(price_element).css('float','left');
               $(price_element).css('paddingRight','375px');
               var valid_element = document.createElement('div');
               $(valid_element).html("Validity");
               var price_table = document.createElement('table');
               $(price_table).addClass("pricetable");
               $(price_table).css('float','left');
                var tr_price = document.createElement('tr');
               var td_finalprice = document.createElement('td');
               var td_finalprice_data = document.createElement('td');
               $(td_finalprice).html("&nbsp"+"Final Price"+"&nbsp"+"&nbsp"+":");
               $(td_finalprice_data).addClass("fa fa-inr");
               $(td_finalprice_data).html(data.HotDealFinalPrice);
               $(td_finalprice_data).css('paddingLeft','10px');
               var td_mrp_start = document.createElement('td');
               $(td_mrp_start).html("&nbsp"+"(");
               var td_mrp_data = document.createElement('td');
               $(td_mrp_data).html(data.HotDealMRP);
               $(td_mrp_data).css('textDecoration','line-through');
               $(td_mrp_data).css('color','rgb(236,73,73)');
               var td_mrp_end = document.createElement('td');
               $(td_mrp_end).html(")");
               var tr_discount= document.createElement('tr');
               var td_discount = document.createElement('td');
               var td_discount_data = document.createElement('td');
               $(td_discount).html("&nbsp"+"Discount"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+":");
               $(td_discount_data).html(data.HotDealDiscount+"%");
               $(td_discount_data).css('paddingLeft','11px');
               var validity_table = document.createElement('table');
               $(validity_table).css('marginBottom','30px');
               var tr_date = document.createElement('tr');
               var td_date = document.createElement('td');
               var td_from_date = document.createElement('td');
               $(td_date).html("From"+"&nbsp"+"&nbsp"+":");
               $(td_from_date).html(data.HotDealStartDate);
               $(td_from_date).css('paddingLeft',"6px");
               var tr_enddate = document.createElement('tr');
               var td_to_date = document.createElement('td');
               var td_end_date = document.createElement('td');
               $(td_to_date).html("To"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+":");
               $(td_end_date).html(data.HotDealEndDate);
               $(td_end_date).css("paddingLeft","8px");
               $(tr_discount).append(td_discount);
               $(tr_discount).append(td_discount_data);
               $(tr_price).append(td_finalprice);
               $(tr_price).append(td_finalprice_data);
               $(tr_price).append(td_mrp_start);
               $(tr_price).append(td_mrp_data);
               $(tr_price).append(td_mrp_end);
               $(tr_date).append(td_date);
               $(tr_date).append(td_from_date);
               $(tr_enddate).append(td_to_date);
               $(tr_enddate).append(td_end_date);
               $(price_table).append(tr_price);
               $(price_table).append(tr_discount);
               $(price_heading).append(price_element);
               $(price_heading).append(valid_element);
               $(validity_table).append(tr_date);
               $(validity_table).append(tr_enddate);
               $(deal_details_modal).append(close_element);
               $(deal_details_modal).append(head_name);
               $(deal_details_modal).append(price_heading);
               $(deal_details_modal).append(price_table);
               $(deal_details_modal).append(validity_table);
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
                 var td_labs = document.createElement('td');
                 $(td_labs).addClass("lab_name");
                 var td_lab_area = document.createElement('td');
                 var td_lab_pin = document.createElement('td');
                 var td_lab_btn = document.createElement('td');
                 var book_button = document.createElement("button");
                 $(book_button).html("Book Now");
                 $(td_lab_btn).append(book_button);
                 $(book_button).attr('id','book_deal');
                 $(book_button).addClass("book_lab");
                 $(book_button).css('borderRadius','3px');
                 $(book_button).css('border','none');
                 $(book_button).css('width','80px');
                 $(book_button).css('fontSize','12px');
                 $(book_button).css('background','rgb(221,234,255)');
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
                		form_handler(dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);
                		});
              
               }//for offeringlabs
                 $(deal_details_modal).append(offer_labs);
                 $(deal_details_modal).append(labs_list);
                 var deal_contents = document.createElement('div');
                 $(deal_contents).css('marginTop','13px');
                 $(deal_contents).addClass("deal_heading");
                 $(deal_contents).css('marginRight','20px');
                 var contents_heading = document.createElement('h5');
                 $(contents_heading).html("Deal Contents");
                 $(contents_heading).css('fontWeight','bold');
                 $(contents_heading).css('textAlign','center');
                 $(contents_heading).css('height','20px');
                 $(contents_heading).css('backgroundColor','#41A7B3');
                 $(contents_heading).css('color','white');
                 $(deal_contents).append(contents_heading);
                 $(deal_details_modal).append(deal_contents);
                 var count_var = 1;
                 var counter_element = document.createElement('div');
                 $(counter_element).addClass("tests-list");
                 $(counter_element).css('marginRight','20px');
                 var left_element = document.createElement('div');
                 $(left_element).addClass("left_list");
                 var right_element = document.createElement('div');
                 $(right_element).addClass("right_list");
                 var totalcount =0;
                 for(var i=0;i<data.GroupsInfo.length;i++)
                 {
                 	  var new_str  =  data.GroupsInfo[i].testsInGroup;
                 	  var temp_str = new_str.split(",");
                 	  totalcount = totalcount+temp_str.length+1;
                  }//for groupsinfo
                 if(data.TestsInfo.length !=0)
                 {
                    totalcount = data.TestsInfo.length+1+totalcount;                 
                 }//if testslength
                 if(data.Consultations.length !=0)
                 {
                    totalcount = data.Consultations.length+1+totalcount;                 
                 }//if consultationslength
                
                 if ((totalcount%2) =="0") 
             {
             	 count_var = 1;
             }
             if ((totalcount%2) !="0") 
             {
             	 count_var = 0;
             }
              if(data.GroupsInfo.length !=0)
               {
                for(var i=0;i<data.GroupsInfo.length;i++)
                 {
                 	 
                    if((totalcount >20) && (count_var >(totalcount/2)) ) 
                    {  
                        var group_heading = document.createElement('div');
                 	      $(group_heading).addClass("deal_data");
                        $(group_heading).html(data.GroupsInfo[i].GroupName);
                        $(group_heading).css('fontWeight', 'bold');
                        $(right_element).append(group_heading);
                        $(left_element).css('float','left');
                        count_var++;
                    }//if groupheading
                  else 
                   {
                   	 var group_heading = document.createElement('div');
                 	    $(group_heading).addClass("deal_data");
                      $(group_heading).html(data.GroupsInfo[i].GroupName);
                      $(group_heading).css('fontWeight', 'bold');
                   	 $(left_element).append(group_heading);
                	    count_var++;
                	 }//else groupheading
                   var new_str = data.GroupsInfo[i].testsInGroup;
                   var temp_str = new_str.split(",");
                   for(j=0;j<temp_str.length;j++)
                    {
                      
                       if((totalcount > 20)&& (count_var>(totalcount/2)))
                       { 
                         var group_data = document.createElement('div');
                         $(group_data).addClass("deal_data");
                         $(group_data).html(temp_str[j]);
                         $(group_data).css('textIndent','20pt');
                         $(right_element).append(group_data);
                         $(left_element).css('float','left');
                         count_var++;  
                       }//if groupdata
                       else 
                        { 
                           var group_data = document.createElement('div');
                           $(group_data).addClass("deal_data");
                           $(group_data).html(temp_str[j]);
                           $(group_data).css('textIndent','20pt');
                           $(left_element).append(group_data);
                           count_var++;
                        }//else groupdata
                    }//for strlength
                 } //for groupslength 
                }//if groupsinfolength
              if(data.TestsInfo.length != 0)
              {
                if((totalcount >20) && (count_var >(totalcount/2)) ) 
                 {        
                    var tests_heading = document.createElement('div'); 
                    $(tests_heading).addClass("deal_data");
                    $(tests_heading).html("Individual Tests");
                    $(tests_heading).css('fontWeight','bold');
                    $(right_element).append(tests_heading);
                    $(left_element).css('float','left');
                    count_var++;
                 }//if testsheading
               else 
               {
               	 var tests_heading = document.createElement('div');
               	 $(tests_heading).addClass("deal_data");
                   $(tests_heading).html("Individual Tests");
                   $(tests_heading).css('fontWeight','bold');
                   $(left_element).append(tests_heading);
                   count_var++;               	
               }//else testsheading
                 
                for(var  i=0;i<data.TestsInfo.length;i++)
                 {
                    
                     if((totalcount >20) && (count_var >(totalcount/2)) ) 
                      {
                      	  var content_data = document.createElement('div');
                          $(content_data).addClass("deal_data");
                          $(content_data).html(data.TestsInfo[i]);
                          $(content_data).css('textIndent','20pt');
                          $(right_element).append(content_data);
                          $(left_element).css('float','left');
                          count_var++;
                      }//if contentdata
                    else 
                     {
                     	var content_data = document.createElement('div');
                        $(content_data).addClass("deal_data");
                        $(content_data).html(data.TestsInfo[i]);
                        $(content_data).css('textIndent','20pt');
                    	   $(left_element).append(content_data);
                    	  count_var++;
                    	}//else contentdata
                 }//for TestsInfo
                }//if testsinfolength
              if(data.Consultations.length !=0)
              {
                if((totalcount >20) && (count_var >(totalcount/2)) ) 
                   {
                   	   var consult_heading = document.createElement('div');
                   	   $(consult_heading).addClass("deal_data");
                        $(consult_heading).html("Consultations");
                        $(consult_heading).css('fontWeight','bold');
                        $(right_element).append(consult_heading);
                        $(left_element).css('float','left');
                      count_var++;
                   }//if consultheading
                 else  
                    {
                   	  var consult_heading = document.createElement('div');
                   	  $(consult_heading).addClass("deal_data");
                       $(consult_heading).html("Consultations");
                       $(consult_heading).css('fontWeight','bold');
                       $(left_element).append(consult_heading);
                       count_var++;
                 	 }//else consultheading
                      	
                 for(var i=0;i<data.Consultations.length;i++)
                 {
                    
                    if((totalcount >20) && (count_var >(totalcount/2)) ) 
                     { 
                        var consult_data = document.createElement('div');
                        $(consult_data).addClass("deal_data");
                        $(consult_data).html(data.Consultations[i]);
                        $(consult_data).css('textIndent','20pt');
                        $(right_element).append(consult_data); 
                        $(left_element).css('float','left');
                        count_var++;
                     }//if consultdata
                   else 
                    {
                    	  var consult_data = document.createElement('div');
                       $(consult_data).addClass("deal_data");
                       $(consult_data).html(data.Consultations[i]);
                       $(consult_data).css('textIndent','20pt');
                   	 $(left_element).append(consult_data);
                   	 count_var++;        
                    }//else consultdata
                 }//for Consultations   
              }//if dataconsultationslength
               
                if((totalcount >20) && ((totalcount%2) !=0))  
                {
                var empty_element = document.createElement('div');
                $(empty_element).addClass("deal_data");
                $(empty_element).html("-");
                $(empty_element).css('textIndent','20pt')
                $(right_element).append(empty_element);
                }//if odd
                if(data.GroupsInfo.length ==0 && data.TestsInfo.length ==0 && data.Consultations.length ==0 )
                {
                	  $(deal_contents).detach();
                                  
                }
                $(counter_element).append(left_element);
                $(counter_element).append(right_element);
                $(deal_details_modal).append(counter_element);    
                $(deal_details_modal).modal().open(); 
                
                 $(".close").on('click',function () 
                 {
               	  $(deal_details_modal).modal().close(); 
                 });//click
           
             	
           }//success fnctn 
        });//ajax
     }//fnctn handler
    
  
  
  
  
      function form_handler(dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea)
      {
                  var booking_page = document.createElement('div');
                  $(booking_page).addClass("modal");
                  $(booking_page).attr('id','modal_secondpage');
                  $(booking_page).css('backgroundColor','#fff');
                  $(booking_page).css('height','578px');
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
                  var lab_details = document.createElement('div');
                  $(lab_details).html(labname);
                  $(lab_details).css('textAlign' ,'right');
                  $(lab_details).css('paddingRight','17px');
                  $(lab_details).css('fontWeight','bold');
                  $(lab_details).css('marginTop','6px');  
                  $(lab_details).css('marginRight','20px');
                  var deal_name  = document.createElement('div');
                  $(deal_name).html(dealname);
                  $(deal_name).css('textAlign' ,'right');
                  $(deal_name).css('paddingRight','14px');
                  $(deal_name).css('fontWeight','bold');
                  $(deal_name).css('marginTop','6px');
                  $(deal_name).css('marginRight','20px');
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
                  $(input_element).attr('id', 'patient_name');
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
                  $(input_email).attr('id','email');
                  $(input_email).attr('name','patient_email');
                  $(input_email).attr('value','');
                  $(input_email).addClass('form-icon form-icon-mail');
                  $(input_email).attr('placeholder','Please enter your email ID');
                  $(input_email).attr('required','required');
                  /*var address_row = document.createElement('div');
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
                  $(input_address).attr('id','pkg_address');
                  $(input_address).attr('name','patient_address');
                  $(input_address).attr('value','');
                  $(input_address).css('width','468px');
                  $(input_address).css('border','1px solid #c4cdcf');
                  $(input_address).attr('placeholder','Please enter your Address');
                  $(input_address).attr('required','required');
                  $(input_address).css('paddingRight','11px');*/

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
                  $(input_phno).attr('id','phone');
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
                  $(label_booking).html('Appointment Timing:');
                  var input_booking = document.createElement('input');
                  $(input_booking).attr('type','text');
                  $(input_booking).attr('id','app_time');
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
                  $(fieldset_address).append(label_address);
                  $(fieldset_address).append(input_address);
                 
                  $(name_col_class).append(fieldset_element);
                  $(email_col_class).append(fieldset_email);
                  $(phno_col_class).append(fieldset_phno);
                  $(apptime_col_class).append(fieldset_booking);
                  $(address_col_class).append(fieldset_address);
                  $(note_col_class).append(font_element);
                  $(name_row).append(name_col_class);
                  $(email_row).append(email_col_class);
                  $(phno_row).append(phno_col_class);
                  $(phno_row).append(apptime_col_class);
                  $(address_row).append(address_col_class);
                  $(information_row).append(note_col_class);
                  $(col_class_element).append(name_row);
                  $(col_class_element).append(email_row);
                  $(col_class_element).append(phno_row);
                  $(col_class_element).append(address_row);
                  $(col_class_element).append(information_row);
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
                     $(error_display).append(name_element);
                     $(error_display).append(email_element);
                     $(error_display).append(mbno_element);
                     $(error_display).append(apptime_element);
                     $(error_display).append(app_time_element);
                     $(error_display).append(address_element);
                     $("#modal_secondpage").append(close_element);
                     $("#modal_secondpage").append(contact_heading);
                     $("#modal_secondpage").append(lab_details);
                     $("#modal_secondpage").append(deal_name);
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
                   
                 var pat_name = $("#patient_name").val();
                 var pat_email = $("#email").val();
                 var pat_phno = $("#phone").val();
                 var pat_apptime = $("#app_time").val();
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
                        var patient_name = $('#patient_name').val();
                         var patient_email = $('#email').val();
                       var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                        var mobile_number = $('#phone').val();
                         var patient_apptime =  $('#app_time').val();
                         if(typeof(Storage)!=="undefined")
                       { 
                     	 datastore_handler();
                       }//if
                      
                   var appt_time = localStorage.getItem("app_time");
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
                         
                          //(document.getElementById("err_address").style.display ='none')
                          var currenttime = new Date();
                          var current_year = currenttime.getFullYear();
                          var current_month = addZero(currenttime.getMonth()+1);
                          
                          var current_date = addZero(currenttime.getDate());
                          var current_hours = addZero(currenttime.getHours());
                          var current_minutes = addZero(currenttime.getMinutes());
                          var current_time = current_year+"-"+current_month+"-"+current_date+" "+current_hours+":"+current_minutes;
                     if((document.getElementById("err_email").style.display ='none') && (document.getElementById('err_mbno').style.display = 'none') &&(document.getElementById('err_apptime').style.display = 'none') &&(document.getElementById('err_app_time').style.display = 'none') &&(document.getElementById("err_address").style.display ='none'))
                    { 
                      if ( !(patient_name.length >= 6 && patient_name.length <= 26) || patient_name.match(/[^a-zA-Z ]/)  )
                        {
                           $(name_element).css('display','block');
                          return false;
                        
                        }//if patient name
                      if(document.getElementById('err_name').style.display = 'block')
                        {
                            document.getElementById('err_name').style.display = 'none';
                          
                        }//if err_name
                      }//if 
                     if((document.getElementById("err_name").style.display ='none') && (document.getElementById('err_mbno').style.display = 'none') &&(document.getElementById('err_apptime').style.display = 'none') &&(document.getElementById('err_app_time').style.display = 'none') &&(document.getElementById("err_address").style.display ='none')) 
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
                       if((document.getElementById("err_email").style.display ='none') && (document.getElementById('err_name').style.display = 'none') &&(document.getElementById('err_apptime').style.display = 'none') &&(document.getElementById('err_app_time').style.display = 'none') &&(document.getElementById("err_address").style.display ='none'))
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
                      
                       if((document.getElementById("err_email").style.display ='none') && (document.getElementById('err_mbno').style.display = 'none') &&(document.getElementById('err_name').style.display = 'none') &&(document.getElementById('err_app_time').style.display = 'none') &&(document.getElementById("err_address").style.display ='none'))
                     {
                     	
                     	if(! ($('#app_time').val()))   
                       {
                         	$(apptime_element).css('display','block');
                           return false;
                       }//if app_time
                       
                       var val_time = date+"-"+month+"-"+year+" "+hours +":"+ mnt+":"+sec;
                      //var appt_time = localStorage.getItem("app_time");
                         
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
                          if((document.getElementById("err_email").style.display ='none') && (document.getElementById('err_mbno').style.display = 'none') &&(document.getElementById('err_name').style.display = 'none') &&(document.getElementById('err_apptime').style.display = 'none') &&(document.getElementById("err_address").style.display ='none'))
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
                       if(visit_type.length == "13")
                      {
                       if((document.getElementById('err_name').style.display = 'none') && (document.getElementById("err_email").style.display ='none') && (document.getElementById('err_mbno').style.display = 'none') &&(document.getElementById('err_apptime').style.display = 'none') &&(document.getElementById('err_app_time').style.display = 'none'))
                       {
                            if(! ($('#hotdeal_pkg_address').val()))  
                          {
                             $(address_element).css('display','block');
                              return false;
                          }// if visit type
                       
                         if (document.getElementById('err_address').style.display = 'block') 
                          {
                          	  document.getElementById('err_address').style.display = 'none';
                          	  
                           }//if err_visittype
                       }
                      }
                       preview_handler(dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);
                 
                    });//btn onclick handler
                    
                
          }//form_handler
          
    function form_backbtn(dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea)
    {
    	         var localData = JSON.parse(localStorage.getItem('someData'));
               var deal_details_element = document.createElement('div');
               $(deal_details_element).addClass("modal");
               $(deal_details_element).attr('id', 'modal_firstpage');
               $(deal_details_element).css('position','relative');
               $(deal_details_element).css('backgroundColor','#fff');
               $(deal_details_element).css('paddingRight','0px');
               var close_element = document.createElement('a');
               $(close_element).addClass("close");
               $(close_element).attr('href','#');
               $(close_element).html("&times;");
               $(close_element).css('marginTop' ,'-19px');
               $(close_element).css('fontSize','26px');
               $(close_element).css('marginRight','7px');
               var head_name = document.createElement('h4');
               $(head_name).html(localData.HotDealName);
               $(head_name).css('textAlign','center');
               $(head_name).css('fontSize','18px');
               $(head_name).css('fontWeight','bold');
               $(head_name).css('color','#5cb0cf');
               var price_heading = document.createElement('div');
               $(price_heading).css('background','#41A7B3');
               $(price_heading).css('color','white');
               $(price_heading).css('fontWeight','bold');
               $(price_heading).css('marginTop','11px');
               $(price_heading).css('marginRight','20px');
               var price_element = document.createElement('div');
               $(price_element).html("Price Information");
               $(price_element).css('float','left');
               $(price_element).css('paddingRight','375px');
               var valid_element = document.createElement('div');
               $(valid_element).html("Validity");
               var table_element = document.createElement('table');
               $(table_element).css('float','left');
               $(table_element).css('marginRight','256px');
                var tr_price = document.createElement('tr');
               var td_finalprice = document.createElement('td');
               var td_finalprice_data = document.createElement('td');
               $(td_finalprice).html("&nbsp"+"Final Price"+"&nbsp"+"&nbsp"+":");
               $(td_finalprice_data).addClass("fa fa-inr");
               $(td_finalprice_data).html(localData.HotDealFinalPrice);
               $(td_finalprice_data).css('paddingLeft','10px');
               var td_mrp_start = document.createElement('td');
               $(td_mrp_start).html("&nbsp"+"(");
               var td_mrp_data = document.createElement('td');
               $(td_mrp_data).html(localData.HotDealMRP);
               $(td_mrp_data).css('textDecoration','line-through');
               $(td_mrp_data).css('color','rgb(236,73,73)');
               var td_mrp_end = document.createElement('td');
               $(td_mrp_end).html(")");
               var tr_discount = document.createElement('tr');
               var td_discount = document.createElement('td');
               var td_discount_data = document.createElement('td');
               $(td_discount).html("&nbsp"+"Discount"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+":");
               $(td_discount_data).html(localData.HotDealDiscount+"%");
               $(td_discount_data).css('paddingLeft','11px');
               var validity_table = document.createElement('table');
               $(validity_table).css('marginBottom','30px');
               var tr_date = document.createElement('tr');
               var td_date = document.createElement('td');
               var td_from_date = document.createElement('td');
               $(td_date).html("From"+"&nbsp"+"&nbsp"+":");
               $(td_from_date).html(localData.HotDealStartDate);
               $(td_from_date).css('paddingLeft',"6px");
               var tr_enddate = document.createElement('tr');
               var td_to_date = document.createElement('td');
               var td_end_date = document.createElement('td');
               $(td_to_date).html("To"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+":");
               $(td_end_date).html(localData.HotDealEndDate);
               $(td_end_date).css("paddingLeft","8px");
               $(tr_discount).append(td_discount);
               $(tr_discount).append(td_discount_data);
               $(tr_price).append(td_finalprice);
               $(tr_price).append(td_finalprice_data);
               $(tr_price).append(td_mrp_start);
               $(tr_price).append(td_mrp_data);
               $(tr_price).append(td_mrp_end);
               $(tr_date).append(td_date);
               $(tr_date).append(td_from_date);
               $(tr_enddate).append(td_to_date);
               $(tr_enddate).append(td_end_date);
               $(table_element).append(tr_price);
               $(table_element).append(tr_discount);
               $(price_heading).append(price_element);
               $(price_heading).append(valid_element);
               $(validity_table).append(tr_date);
               $(validity_table).append(tr_enddate);
               $(deal_details_element).append(close_element);
               $(deal_details_element).append(head_name);
               $(deal_details_element).append(price_heading);
               $(deal_details_element).append(table_element);
               $(deal_details_element).append(validity_table);
               var labs_list = document.createElement('table');
               $(labs_list).addClass("offer_labs");
               $(labs_list).css('cursor','pointer');
               var offer_labs = document.createElement('div');
                 $(offer_labs).html("Offering Labs");
                 $(offer_labs).css("background", "#41A7B3");
                 $(offer_labs).css("color","white");
                 $(offer_labs).css("fontWeight","bold");
                 $(offer_labs).css("marginBottom","11px");
                 $(offer_labs).css("marginRight",'20px');
               for(var i=0;i<localData.OfferingLabs.length;i++)
               {
                 var tr_labs = document.createElement('tr');
                 $(tr_labs).addClass("labs_row");
                 var td_labs = document.createElement('td');
                 $(td_labs).addClass("lab_name");
                 var td_lab_area = document.createElement('td');
                 var td_lab_pin = document.createElement('td');
                 var td_lab_btn = document.createElement('td');
                 var book_button = document.createElement("button");
                 $(book_button).html("Book Now");
                 $(book_button).attr('id','book_deal');
                 $(book_button).css('borderRadius','3px');
                 $(book_button).css('border','none');
                 $(book_button).css('width','80px');
                 $(book_button).css('fontSize','12px');
                 $(book_button).css('background','rgb(221,234,255)');
                 $(tr_labs).attr('data-labname',localData.OfferingLabs[i].labName);
                 $(tr_labs).attr('data-labslug',localData.OfferingLabs[i].labSlug);
                 $(tr_labs).attr('data-dealname',localData.HotDealName);
                 $(tr_labs).attr('data-dealslug',localData.HotDealSlug);
                 $(tr_labs).attr('data-dealmrp',localData.HotDealMRP);
                 $(tr_labs).attr('data-dealdiscount',localData.HotDealDiscount);
                 $(tr_labs).attr('data-dealfinalprice',localData.HotDealFinalPrice);
                 $(tr_labs).attr('data-labarea',localData.OfferingLabs[i].labArea);
                 $(tr_labs).attr('data-onlinereports',localData.OfferingLabs[i].onlineReports);
                 $(tr_labs).attr('data-visittype' ,localData.OfferingLabs[i].visitType); 

                 $(td_labs).html(localData.OfferingLabs[i].labName);
                 $(td_lab_area).html(localData.OfferingLabs[i].labArea);
                 $(td_lab_pin).html(localData.OfferingLabs[i].labPincode);
                 $(td_labs).css('width','250px');
                 $(td_lab_area).css('width','145px');
                 $(td_lab_pin).css('width','80px');
                 $(td_lab_btn).append(book_button);
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
                  	 form_handler(dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);
                	});//labs_tr onclick
               }//for offeringlabs
                 $(deal_details_element).append(offer_labs);
                 $(deal_details_element).append(labs_list);
                  var deal_contents = document.createElement('div');
                 $(deal_contents).css('marginTop','13px');
                 $(deal_contents).addClass("deal_heading");
                 $(deal_contents).css('marginRight','20px');
                 var contents_heading = document.createElement('h5');
                 $(contents_heading).html("Deal Contents");
                 $(contents_heading).css('fontWeight','bold');
                 $(contents_heading).css('textAlign','center');
                 $(contents_heading).css('height','20px');
                 $(contents_heading).css('backgroundColor','#41A7B3');
                 $(contents_heading).css('color','white');
                 $(deal_contents).append(contents_heading);
                 $(deal_details_element).append(deal_contents);
                 var count_var = 1;
                 var counter_element = document.createElement('div');
                 $(counter_element).addClass("tests-list");
                 $(counter_element).css('marginRight','20px');
                 var left_element = document.createElement('div');
                 $(left_element).addClass("left_list");
                 var right_element = document.createElement('div');
                 $(right_element).addClass("right_list");
                 var totalcount =0;
                 for(var i=0;i<localData.GroupsInfo.length;i++)
                 {
                 	  var new_str  =  localData.GroupsInfo[i].testsInGroup;
                 	  var temp_str = new_str.split(",");
                 	  totalcount = totalcount+temp_str.length+1;
                  }//for groupsinfo
                 if(localData.TestsInfo.length !=0)
                 {
                    totalcount = localData.TestsInfo.length+1+totalcount;                 
                 }//if testslength
                 if(localData.Consultations.length !=0)
                 {
                    totalcount = localData.Consultations.length+1+totalcount;                 
                 }//if consultationslength
                
              if(localData.GroupsInfo.length !=0)
               {
                for(var i=0;i<localData.GroupsInfo.length;i++)
                 {
                 	 
                    if((totalcount >20) && (count_var >(totalcount/2)) ) 
                    {  
                        var group_heading = document.createElement('div');
                 	      $(group_heading).addClass("deal_data");
                        $(group_heading).html(localData.GroupsInfo[0].GroupName);
                        $(group_heading).css('fontWeight', 'bold');
                        $(right_element).append(group_heading);
                        $(left_element).css('float','left');
                        count_var++;
                    }//if groupheading
                  else 
                   {
                   	 var group_heading = document.createElement('div');
                 	    $(group_heading).addClass("deal_data");
                      $(group_heading).html(localData.GroupsInfo[0].GroupName);
                      $(group_heading).css('fontWeight', 'bold');
                   	 $(left_element).append(group_heading);
                	    count_var++;
                	 }//else groupheading
                   var new_str = localData.GroupsInfo[i].testsInGroup;
                   var temp_str = new_str.split(",");
                   for(i=0;i<temp_str.length;i++)
                    {
                      
                       if((totalcount > 20)&& (count_var>(totalcount/2)))
                       { 
                         var group_data = document.createElement('div');
                         $(group_data).addClass("deal_data");
                         $(group_data).html(temp_str[i]);
                         $(group_data).css('textIndent','20pt');
                         $(right_element).append(group_data);
                         $(left_element).css('float','left');
                         count_var++;  
                       }//if groupdata
                       else 
                        { 
                           var group_data = document.createElement('div');
                           $(group_data).addClass("deal_data");
                           $(group_data).html(temp_str[i]);
                           $(group_data).css('textIndent','20pt');
                           $(left_element).append(group_data);
                           count_var++;
                        }//else groupdata
                    }//for strlength
                 } //for groupslength 
                }//if groupsinfolength
              if(localData.TestsInfo.length != 0)
              {
                if((totalcount >20) && (count_var >(totalcount/2)) ) 
                 {        
                    var tests_heading = document.createElement('div'); 
                    $(tests_heading).addClass("deal_data");
                    $(tests_heading).html("Individual Tests");
                    $(tests_heading).css('fontWeight','bold');
                    $(right_element).append(tests_heading);
                    $(left_element).css('float','left');
                    count_var++;
                 }//if testsheading
               else 
               {
               	 var tests_heading = document.createElement('div');
               	 $(tests_heading).addClass("deal_data");
                   $(tests_heading).html("Individual Tests");
                   $(tests_heading).css('fontWeight','bold');
                   $(left_element).append(tests_heading);
                   count_var++;               	
               }//else testsheading
                 
                for(var  i=0;i<localData.TestsInfo.length;i++)
                 {
                    
                     if((totalcount >20) && (count_var >(totalcount/2)) ) 
                      {
                      	  var content_data = document.createElement('div');
                          $(content_data).addClass("deal_data");
                          $(content_data).html(localData.TestsInfo[i]);
                          $(content_data).css('textIndent','20pt');
                          $(right_element).append(content_data);
                          $(left_element).css('float','left');
                          count_var++;
                      }//if contentdata
                    else 
                     {
                     	var content_data = document.createElement('div');
                        $(content_data).addClass("deal_data");
                        $(content_data).html(localData.TestsInfo[i]);
                        $(content_data).css('textIndent','20pt');
                    	   $(left_element).append(content_data);
                    	  count_var++;
                    	}//else contentdata
                 }//for TestsInfo
                }//if testsinfolength
              if(localData.Consultations.length !=0)
              {
                if((totalcount >20) && (count_var >(totalcount/2)) ) 
                   {
                   	   var consult_heading = document.createElement('div');
                   	   $(consult_heading).addClass("deal_data");
                        $(consult_heading).html("Consultations");
                        $(consult_heading).css('fontWeight','bold');
                        $(right_element).append(consult_heading);
                        $(left_element).css('float','left');
                      count_var++;
                   }//if consultheading
                 else  
                    {
                   	  var consult_heading = document.createElement('div');
                   	  $(consult_heading).addClass("deal_data");
                       $(consult_heading).html("Consultations");
                       $(consult_heading).css('fontWeight','bold');
                       $(left_element).append(consult_heading);
                       count_var++;
                 	 }//else consultheading
                      	
                 for(var i=0;i<localData.Consultations.length;i++)
                 {
                    
                    if((totalcount >20) && (count_var >(totalcount/2)) ) 
                     { 
                        var consult_data = document.createElement('div');
                        $(consult_data).addClass("deal_data");
                        $(consult_data).html(localData.Consultations[i]);
                        $(consult_data).css('textIndent','20pt');
                        $(right_element).append(consult_data); 
                        $(left_element).css('float','left');
                        count_var++;
                     }//if consultdata
                   else 
                    {
                    	  var consult_data = document.createElement('div');
                       $(consult_data).addClass("deal_data");
                       $(consult_data).html(localData.Consultations[i]);
                       $(consult_data).css('textIndent','20pt');
                   	 $(left_element).append(consult_data);
                   	 count_var++;        
                    }//else consultdata
                 }//for Consultations   
              }//if dataconsultationslength
               
                if((totalcount >20) && ((totalcount%2) !=0))  
                {
                var empty_element = document.createElement('div');
                $(empty_element).addClass("deal_data");
                $(empty_element).html("-");
                $(empty_element).css('textIndent','20pt')
                $(right_element).append(empty_element);
                }//if odd
                if(localData.GroupsInfo.length ==0 && localData.TestsInfo.length ==0 && localData.Consultations.length ==0 )
                {
                	  $(deal_contents).detach();
                                  
                }
                $(counter_element).append(left_element);
                $(counter_element).append(right_element);
                $(deal_details_element).append(counter_element);    
                $(deal_details_element).modal().open(); 
                
                 $(".close").on('click',function () 
                 {
               	  $(deal_details_element).modal().close(); 
                 });//click
             
     }//fnctn handler
    
  
      
            
               
    function datastore_handler()
    {
   	  var ptnt_name = document.getElementById("patient_name");
        var ptnt_email = document.getElementById("email");
        var ptnt_phone = document.getElementById("phone");
        var ptnt_apptime = document.getElementById("app_time");
         var ptnt_address = document.getElementById("hotdeal_pkg_address");
        localStorage.setItem("patient_name",ptnt_name.value);
        localStorage.setItem("email" ,ptnt_email.value);
        localStorage.setItem("phone" ,ptnt_phone.value);
        localStorage.setItem("app_time" ,ptnt_apptime.value);
        localStorage.setItem("hotdeal_pkg_address",ptnt_address.value);
    } //fnctn handler

    function Filling_localdata()
    {
     	    document.getElementById("patient_name").value = localStorage.getItem("patient_name");
          document.getElementById("email").value = localStorage.getItem("email");
          document.getElementById("phone").value = localStorage.getItem("phone");
          document.getElementById("app_time").value = localStorage.getItem("app_time");
          document.getElementById("hotdeal_pkg_address").value = localStorage.getItem("hotdeal_pkg_address");
    }//fnctn handler
    
   function preview_handler(dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea)
   {
   	            console.log(online_reports);
   	            console.log(visit_type);
   	            var hotdeal_ptnt_address = localStorage.getItem("hotdeal_pkg_address"); 
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
                  $(preview_box).css('height','364px')
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
                  $(deal_info).html("Deal Information");
                  $(deal_info).css('background','rgb(65, 167, 179)');
                  $(deal_info).css('color','white');
                  $(deal_info).css('fontWeight','bold');
                  $(deal_info).css('paddingLeft','6px');
                  $(deal_info).css('marginTop','10px');
                  var table_dealname = document.createElement('table');
                  $(table_dealname).css('float','left');
                  $(table_dealname).css('marginBottom','15px');
                  //$(table_dealname).css('marginTop','21px');
                  var deal_th = document.createElement('th');
                  $(deal_th).html("Deal Information");
                  //$(table_dealname).append(deal_th);
                   var tr_dealname = document.createElement('tr');
                  var td_dealname = document.createElement('td');
                  $(td_dealname).html("&nbsp"+"&nbsp"+"&nbsp"+dealname);
                  $(td_dealname).css('paddingTop','3px');
                  var tr_labname = document.createElement('tr');
                  var td_labname = document.createElement('td');
                  $(td_labname).html("&nbsp"+"&nbsp"+"&nbsp"+"Lab"+"&nbsp"+":"+"&nbsp"+labname+"&nbsp"+"&nbsp"+"("+labarea+")");
                  var td_labarea = document.createElement('td');
                  $(tr_dealname).append(td_dealname);
                  $(tr_labname).append(td_labname);
                  $(table_dealname).append(tr_dealname);
                  $(table_dealname).append(tr_labname);
                  var ptnt_info = document.createElement('div');
                  $(ptnt_info).html("Patient Information");
                  $(ptnt_info).css('fontWeight' ,'bold');
                  $(ptnt_info).css('background','rgb(65, 167, 179)');
                  $(ptnt_info).css('color','white');
                  $(ptnt_info).css('marginTop','60px');
                  $(ptnt_info).css('paddingLeft','6px');
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
                    $(ptnt_info).css('marginTop','72px');
                	}
                	
                	  if(visit_type.length == "13")
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
                   $(ptnt_info).css('marginTop','72px');       
                  }//if home visit
                  
                   if(visit_type.length > "13")
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
                    $(error_labvisit_homevisit_one_element).html('Home visit and lab visit available');
                 	  $(labvisit_homevisit_one_element).append(star_labvisit_homevisit_one);
                 	  $(labvisit_homevisit_one_element).append(error_labvisit_homevisit_one_element);
                  $(labvisit_homevisit_tr_one_element).append(labvisit_homevisit_one_element);   
                  $(table_dealname).append(labvisit_homevisit_tr_one_element); 
                  $(ptnt_info).css('marginTop','72px');  
                          
                  }//if home visit
                  
                   if ((online_reports == "yes" && visit_type.length  == "13") || (online_reports == "yes" && visit_type.length  > "13")) 
                   {
                      $(ptnt_info).css('marginTop','86px');
                   } 
                   
                  var price_table = document.createElement('table');
                  $(price_table).css('float','right');
                  $(price_table).css('marginBottom','15px');
                  //$(price_table).css('marginTop','44px');
                  var tr_price = document.createElement('tr');
                  var td_price = document.createElement('td');
                  $(td_price).html("Price");
                  var td_fp = document.createElement('td');
                  $(td_fp).html(":"+"&nbsp"+"Rs."+deal_finalprice);
                  $(td_fp).css('paddingLeft','11px');
                  var td_mrp_openbracket = document.createElement('td');
                  $(td_mrp_openbracket).html("&nbsp"+"(");
                  var td_mrp_price = document.createElement('td');
                  $(td_mrp_price).html(deal_mrp);
                  $(td_mrp_price).css('textDecoration','line-through');
                  $(td_mrp_price).css('color','rgb(236,73,73)');
                  var td_mrp_closebracket = document.createElement('td');
                  $(td_mrp_closebracket).html(")");
                  var tr_discount = document.createElement('tr');
                  var td_dealdiscount = document.createElement('td');
                  $(td_dealdiscount).html("Discount");
                  var td_deal_discount = document.createElement('td');
                  $(td_deal_discount).html(":"+"&nbsp"+deal_discount+"%");
                  $(td_deal_discount).css('paddingLeft','11px');
                  
                  //online_reports,visit_type
                 // if hme_vst , online rpts 
                  var patient_details_table = document.createElement('table');
                  $(patient_details_table).css('marginBottom','30px');
                  $(patient_details_table).css('width','100%');
                  $(patient_details_table).addClass("deals_ptnt_details");
                  var tr_ptntinfo_head = document.createElement('tr');
                  $(tr_ptntinfo_head).css('fontWeight' ,'bold');
                  $(tr_ptntinfo_head).css('background','rgb(65, 167, 179)');
                  $(tr_ptntinfo_head).css('color','white');
                  var th_ptntinfo_head = document.createElement('td');
                  $(th_ptntinfo_head).html("Patient Information");
                  $(th_ptntinfo_head).css('fontWeight','bold');
                  $(tr_ptntinfo_head).append(th_ptntinfo_head);
                  var tr_patient = document.createElement('tr');
                   $(tr_patient).css('lineHeight','2');
                   $(tr_patient).addClass("deals_ptnt_preview_info");
                   $(tr_patient).css('border' ,'1px solid rgb(221, 221, 221)');
                  var td_patientname = document.createElement('td');
                  $(td_patientname).html("&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"Name");
                  $(td_patientname).css('border','1px solid #ddd');
                  var td_patient_name = document.createElement('td');
                  $(td_patient_name).html("&nbsp"+localStorage.getItem("patient_name"));
                  var tr_email = document.createElement('tr');
                  $(tr_email).css('lineHeight','2');
                  $(tr_email).css('border' ,'1px solid rgb(221, 221, 221)');
                  $(tr_email).addClass("deals_ptnt_preview_info");
                  var td_emailheading = document.createElement('td');
                  $(td_emailheading).html("&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"Email");
                  $(td_emailheading).css('width','50%');
                  $(td_emailheading).css('border','1px solid #ddd');
                  var td_email_heading = document.createElement('td');
                  $(td_email_heading).html("&nbsp"+localStorage.getItem("email"));
                  var tr_phno = document.createElement('tr');
                  $(tr_phno).css('lineHeight','2');
                  $(tr_phno).addClass("deals_ptnt_preview_info");
                  $(tr_phno).css('border' ,'1px solid rgb(221, 221, 221)');
                  var td_phnoheading = document.createElement('td');
                  $(td_phnoheading).html("&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"Mobile No");
                  $(td_phnoheading).css('width','50%');
                  $(td_phnoheading).css('border','1px solid #ddd');
                  
                  var td_phno_heading = document.createElement('td');
                  $(td_phno_heading).html("&nbsp"+localStorage.getItem("phone"));
                  var tr_apptime = document.createElement('tr');
                  $(tr_apptime).css('lineHeight','2');
                  $(tr_apptime).addClass("deals_ptnt_preview_info");
                  $(tr_apptime).css('border' ,'1px solid rgb(221, 221, 221)');
                  var td_apptimeheading = document.createElement('td');
                  $(td_apptimeheading).html("&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"Appointment Timing");
                  $(td_apptimeheading).css('border','1px solid #ddd');
                  $(td_apptimeheading).css('width','50%');
                  var td_apptime_heading = document.createElement('td');
                  $(td_apptime_heading).html("&nbsp"+localStorage.getItem("app_time"));
                  var tr_address = document.createElement('tr');
                  $(tr_address).css('lineHeight','2');
                  $(tr_address).addClass("ptnt_preview_info");
                  $(tr_address).css('border' ,'1px solid rgb(221, 221, 221)');
                  var td_address_heading = document.createElement('td');
                  $(td_address_heading).html("&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"&nbsp"+"Address");
                  $(td_address_heading).css('width','50%');
                  $(td_address_heading).css('border','1px solid rgb(221, 221, 221)');
                  var td_address = document.createElement('td');
                  $(td_address).html("&nbsp"+localStorage.getItem("hotdeal_pkg_address"));
                  $(tr_address).append(td_address_heading);
                  $(tr_address).append(td_address);
                  var back_button = document.createElement('button');
                  $(back_button).html("Back");
                  $(back_button).css('float','left');
                  $(back_button).css('backgroundColor','#ec4949');
                  $(back_button).css('width','98px');
                  $(back_button).css('borderRadius','3px');
                  $(back_button).css('border','0px');
                  $(back_button).css('marginTop','11px');
                  var order_button = document.createElement('button');
                  $(order_button).html("Order");
                  $(order_button).css('float','right');
                  $(order_button).css('backgroundColor','#ec4949');
                  $(order_button).css('width','98px');
                  $(order_button).css('borderRadius','3px');
                  $(order_button).css('border','0px');
                  $(order_button).css('marginTop','11px');
                  var tmm_form_element = document.createElement('div');
                  $(tmm_form_element).attr('id','tmm-form-wizard');
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
                  $(tr_price).append(td_price);
                  $(tr_price).append(td_fp);
                  $(tr_price).append(td_mrp_openbracket);
                  $(tr_price).append(td_mrp_price);
                  $(tr_price).append(td_mrp_closebracket);
                  $(tr_discount).append(td_dealdiscount);
                  $(tr_discount).append(td_deal_discount);
                  $(price_table).append(tr_price);
                  $(price_table).append(tr_discount);
                  $(tr_patient).append(td_patientname);
                  $(tr_patient).append(td_patient_name);
                  $(tr_email).append(td_emailheading);
                  $(tr_email).append(td_email_heading);
                  $(tr_phno).append(td_phnoheading);
                  $(tr_phno).append(td_phno_heading);
                  $(tr_apptime).append(td_apptimeheading);
                  $(tr_apptime).append(td_apptime_heading);
                  //$(patient_details_table).append(tr_ptntinfo_head);
                  $(patient_details_table).append(tr_patient);
                  $(patient_details_table).append(tr_email);
                  $(patient_details_table).append(tr_phno);
                  $(patient_details_table).append(tr_apptime);
                  $(patient_details_table).append(tr_address);
                    if (hotdeal_ptnt_address == "")
                   {
                      $(tr_address).detach();
                   }
                  $(tmm_form_element).append(prevbtn_element);
                  $(tmm_form_element).append(orderbtn_element);
                  $(preview_div_element).append(preview_heading);
                  $("#modal_thirdpage").append(closing_element);
                  $(preview_box).append(preview_div_element);
                  //$(preview_box).append(time_error);
                  $(preview_box).append(deal_info);
                  $(preview_box).append(table_dealname); 
                  $(preview_box).append(price_table);
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
                      	 
                          form_handler(dataid,online_reports,visit_type,labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea);
                     	});//click fnctn  
                     	$(orderbtn_element).on('click',function ()
                     	 {
                            loadingimage_page();                    		
                             confirm_pagehandler(labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea)                     		
                     	      
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
 
 function confirm_pagehandler(labname,labslug,dealname,deal_slug,deal_mrp,deal_discount,deal_finalprice,labarea)
 {
 	 var pnt_name =localStorage.getItem("patient_name");
    var pnt_mobileno = localStorage.getItem("phone");
    var mail = localStorage.getItem("email");
    var appt_time = localStorage.getItem("app_time");
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
                       
         $.ajax({
         url:host_api+"/m-checkout/book-order",
         type:'POST',
         dataType:'json',
         data:{labSlug:labslug,hotDealSlugs:deal_slug,patientName:pnt_name,patientMobile:pnt_mobileno,patientEmail:mail,apptTime:sel_time},
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
                  $(labname_td).css('borderRight','1px solid #ddd');
                  var lab_name_td = document.createElement('td');
                  $(lab_name_td).html("&nbsp"+data.labName);
                  var orderid_tr = document.createElement('tr');
                  $(orderid_tr).addClass("order_class");
                  var orderid_td = document.createElement('td');
                  $(orderid_td).html("OrderId");
                  $(orderid_td).css('borderRight','1px solid #ddd');
                  var order_id_td = document.createElement('td');
                  $(order_id_td).html("&nbsp"+data.orderId);
                  var ptnt_name_tr = document.createElement('tr');
                  $(ptnt_name_tr).addClass("order_class");
                  $(ptnt_name_tr).attr('id','order_name');
                  var ptnt_name_td = document.createElement('td');
                  $(ptnt_name_td).html("Name");
                  $(ptnt_name_td).css('borderRight','1px solid #ddd');
                  var ptntname_td = document.createElement('td');
                  $(ptntname_td).html("&nbsp"+data.patientName);
                  var apptime_tr = document.createElement('tr');
                  $(apptime_tr).addClass("order_class");
                  var apptime_td = document.createElement('td');
                  $(apptime_td).html("Appointment Timing");
                  $(apptime_td).css('borderRight','1px solid #ddd');
                  var appt_time_td = document.createElement('td');
                  $(appt_time_td).html("&nbsp"+data.apptTime);
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
    
    	
     $("#subscriber_button").on('click', function() 
   { 
       var subscriber_fullname = $("#subscriber_name").val();
       var mobile_number = $("#subscriber_phonenumber").val();
       var subscriber_mailid = $("#subscriber_email").val();
       if ( !(subscriber_fullname.length >= 6 && subscriber_fullname.length <= 26) || subscriber_fullname.match(/[^a-zA-Z ]/)  )
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
                $(modal_name_body).html('Enter Full Name');
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
               return false;
          }//if sub_name
         var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
         if(!filter.test(subscriber_mailid))
         {
         
               var  email_alert = document.createElement('div');
               $(email_alert).addClass("modal");
               $(email_alert).attr('id', 'email_modal');
               $(email_alert).css('position','relative');
               $(email_alert).css('backgroundColor','#fff'); 
               $(email_alert).css('position','relative');
               $(email_alert).css('border','0px');
               $(email_alert).css('borderRadius','5px');
               $(email_alert).css('paddingRight','0px');
                $(email_alert).modal().open(); 
               var close_action  = document.createElement('a');
               $(close_action).addClass("close");
               $(close_action).attr('href','#');
               $(close_action).html("&times;");
               $(close_action).css('marginTop' ,'-21px');
               $(close_action).css('fontSize','30px');
               $(close_action).css('marginRight','7px');
               var modal_email_body = document.createElement('div');
                $(modal_email_body).html('Enter valid e-mail id');
               $(modal_email_body).css('padding' ,'10px');
               $(modal_email_body).css('position','relative');
              var modal_email_footer = document.createElement('div');
              $(modal_email_footer).css('textAlign','right');
              $(modal_email_footer).css('padding','15px');
              $(modal_email_footer).css('borderTop','1px solid #e5e5e5');
              $(modal_email_footer).css('marginRight','20px');
             var email_btnelement = document.createElement('button');
             $(email_btnelement).addClass("btn btn-primary");
             $(email_btnelement).html("Ok");
             $(close_action).on('click',function () 
             {
             	$(email_alert).modal().close(); 
             	});//close actn
             	$(email_btnelement).on('click',function () 
             	{
             		$(email_alert).modal().close();
             	});//close btn
                $(modal_email_footer).append(email_btnelement);
                $('#email_modal').append(close_action);
                $('#email_modal').append(modal_email_body);
                $('#email_modal').append(modal_email_footer);
                 return false;
        }//if subscriber_mail 
     });//sub btn
        	  $("#subscriber_phonenumber").on('keyup',function (event) 
        	   {
        		   var mobile_number = $("#subscriber_phonenumber").val();
        		   if (mobile_number.match(/^[a-zA-Z]+$/))
               {
                   var  letters_alert = document.createElement('div');
                   $(letters_alert).addClass("modal");
                   $(letters_alert).attr('id', 'letters_modal');
                   $(letters_alert).css('position','relative');
                   $(letters_alert).css('backgroundColor','#fff'); 
                   $(letters_alert).css('position','relative');
                   $(letters_alert).css('border','0px');
                   $(letters_alert).css('borderRadius','5px');
                   $(letters_alert).css('paddingRight','0px');
                   $(letters_alert).modal().open(); 
                   var close_action  = document.createElement('a');
                  $(close_action).addClass("close");
                  $(close_action).attr('href','#');
                  $(close_action).html("&times;");
                  $(close_action).css('marginTop' ,'-21px');
                  $(close_action).css('fontSize','30px');
                  $(close_action).css('marginRight','7px');
                  var modal_letters_body = document.createElement('div');
                  $(modal_letters_body).html('Enter  numeric digits only');
                  $(modal_letters_body).css('padding' ,'10px');
                  $(modal_letters_body).css('position','relative');
                  var modal_letters_footer = document.createElement('div');
                  $(modal_letters_footer).css('textAlign','right');
                  $(modal_letters_footer).css('padding','15px');
                  $(modal_letters_footer).css('borderTop','1px solid #e5e5e5');
                  $(modal_letters_footer).css('marginRight','20px');
                  var letters_btnelement = document.createElement('button');
                  $(letters_btnelement).addClass("btn btn-primary");
                  $(letters_btnelement).html("Ok");
                  $(close_action).on('click',function () 
                 {
             	      $(letters_alert).modal().close(); 
             	  });//close click
             	  $(letters_btnelement).on('click',function () 
             	  {
             		  $(letters_alert).modal().close();
            	  });//btn click
                $(modal_letters_footer).append(letters_btnelement);
                $('#letters_modal').append(close_action);
                $('#letters_modal').append(modal_letters_body);
                $('#letters_modal').append(modal_letters_footer);
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
                 $(modal_name_body).html('Enter Full Name');
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
               return false;
          }//if sub_name
         var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
         if(!filter.test(subscriber_mailid))
         {
         
               var  email_alert = document.createElement('div');
               $(email_alert).addClass("modal");
               $(email_alert).attr('id', 'email_modal');
               $(email_alert).css('position','relative');
               $(email_alert).css('backgroundColor','#fff'); 
               $(email_alert).css('position','relative');
               $(email_alert).css('border','0px');
               $(email_alert).css('borderRadius','5px');
               $(email_alert).css('paddingRight','0px');
                $(email_alert).modal().open(); 
               var close_action  = document.createElement('a');
               $(close_action).addClass("close");
               $(close_action).attr('href','#');
               $(close_action).html("&times;");
               $(close_action).css('marginTop' ,'-21px');
               $(close_action).css('fontSize','30px');
               $(close_action).css('marginRight','7px');
               var modal_email_body = document.createElement('div');
                $(modal_email_body).html('Enter valid e-mail id');
               $(modal_email_body).css('padding' ,'10px');
               $(modal_email_body).css('position','relative');
              var modal_email_footer = document.createElement('div');
              $(modal_email_footer).css('textAlign','right');
              $(modal_email_footer).css('padding','15px');
              $(modal_email_footer).css('borderTop','1px solid #e5e5e5');
              $(modal_email_footer).css('marginRight','20px');
             var email_btnelement = document.createElement('button');
             $(email_btnelement).addClass("btn btn-primary");
             $(email_btnelement).html("Ok");
             $(close_action).on('click',function () 
             {
             	$(email_alert).modal().close(); 
             	});
             	$(email_btnelement).on('click',function () 
             	{
             		$(email_alert).modal().close();
             		});
                $(modal_email_footer).append(email_btnelement);
                $('#email_modal').append(close_action);
                $('#email_modal').append(modal_email_body);
                $('#email_modal').append(modal_email_footer);
                 return false;
        }//if subscriber_mail
              if (mobile_number.match(/^[a-zA-Z]+$/))
               {
                   var  letters_alert = document.createElement('div');
                   $(letters_alert).addClass("modal");
                   $(letters_alert).attr('id', 'letters_modal');
                   $(letters_alert).css('position','relative');
                   $(letters_alert).css('backgroundColor','#fff'); 
                   $(letters_alert).css('position','relative');
                   $(letters_alert).css('border','0px');
                   $(letters_alert).css('borderRadius','5px');
                   $(letters_alert).css('paddingRight','0px');
                   $(letters_alert).modal().open(); 
                   var close_action  = document.createElement('a');
                  $(close_action).addClass("close");
                  $(close_action).attr('href','#');
                  $(close_action).html("&times;");
                  $(close_action).css('marginTop' ,'-21px');
                  $(close_action).css('fontSize','30px');
                  $(close_action).css('marginRight','7px');
                  var modal_letters_body = document.createElement('div');
                  $(modal_letters_body).html('Enter  numeric digits only.');
                  $(modal_letters_body).css('padding' ,'10px');
                  $(modal_letters_body).css('position','relative');
                  var modal_letters_footer = document.createElement('div');
                  $(modal_letters_footer).css('textAlign','right');
                  $(modal_letters_footer).css('padding','15px');
                  $(modal_letters_footer).css('borderTop','1px solid #e5e5e5');
                  $(modal_letters_footer).css('marginRight','20px');
                  var letters_btnelement = document.createElement('button');
                  $(letters_btnelement).addClass("btn btn-primary");
                  $(letters_btnelement).html("Ok");
                  $(close_action).on('click',function () 
                 {
             	      $(letters_alert).modal().close(); 
             	  });//close click
             	  $(letters_btnelement).on('click',function () 
             	  {
             		  $(letters_alert).modal().close();
            	  });//btn click
                $(modal_letters_footer).append(letters_btnelement);
                $('#letters_modal').append(close_action);
                $('#letters_modal').append(modal_letters_body);
                $('#letters_modal').append(modal_letters_footer);
                 return false;
                 }//if letters   
 
             if(mobile_number.match(/[^0-9]/) || mobile_number.length != 10) 
            {
              var  mbno_alert = document.createElement('div');
               $(mbno_alert).addClass("modal");
               $(mbno_alert).attr('id', 'mbno_modal');
               $(mbno_alert).css('position','relative');
               $(mbno_alert).css('backgroundColor','#fff'); 
               $(mbno_alert).css('position','relative');
               $(mbno_alert).css('border','0px');
               $(mbno_alert).css('borderRadius','5px');
               $(mbno_alert).css('paddingRight','0px');
               $(mbno_alert).modal().open(); 
              var close_action  = document.createElement('a');
               $(close_action).addClass("close");
               $(close_action).attr('href','#');
               $(close_action).html("&times;");
               $(close_action).css('marginTop' ,'-21px');
               $(close_action).css('fontSize','30px');
               $(close_action).css('marginRight','7px');
              var modal_mbno_body = document.createElement('div');
              $(modal_mbno_body).html('Enter correct mobile number');
              $(modal_mbno_body).css('padding' ,'10px');
              $(modal_mbno_body).css('position','relative');
              var modal_mbno_footer = document.createElement('div');
              $(modal_mbno_footer).css('textAlign','right');
              $(modal_mbno_footer).css('padding','15px');
              $(modal_mbno_footer).css('borderTop','1px solid #e5e5e5');
              $(modal_mbno_footer).css('marginRight','20px');
              var mbno_btnelement = document.createElement('button');
              $(mbno_btnelement).addClass("btn btn-primary");
              $(mbno_btnelement).html("Ok");
              $(close_action).on('click',function () 
             {
             	$(mbno_alert).modal().close(); 
             	});
             	$(mbno_btnelement).on('click',function () 
             	{
             		$(mbno_alert).modal().close();
             	});
              $(modal_mbno_footer).append(mbno_btnelement);
                $('#mbno_modal').append(close_action);
                $('#mbno_modal').append(modal_mbno_body);
                $('#mbno_modal').append(modal_mbno_footer);
                return false;
        }//if mobile_number
        if (!(mobile_number.charAt(0)=="9" || mobile_number.charAt(0)=="8" || mobile_number.charAt(0)=="7"))
        {
      
              var  invalid_mbno_alert = document.createElement('div');
               $(invalid_mbno_alert).addClass("modal");
               $(invalid_mbno_alert).attr('id', 'invalid_mbno');
               $(invalid_mbno_alert).css('position','relative');
               $(invalid_mbno_alert).css('backgroundColor','#fff'); 
               $(invalid_mbno_alert).css('position','relative');
               $(invalid_mbno_alert).css('border','0px');
               $(invalid_mbno_alert).css('borderRadius','5px');
               $(invalid_mbno_alert).css('paddingRight','0px');
                $(invalid_mbno_alert).modal().open(); 
             var close_action  = document.createElement('a');
               $(close_action).addClass("close");
               $(close_action).attr('href','#');
               $(close_action).html("&times;");
               $(close_action).css('marginTop' ,'-21px');
               $(close_action).css('fontSize','30px');
               $(close_action).css('marginRight','7px');
            var invalid_mbno_body = document.createElement('div');
             $(invalid_mbno_body).html('Mobile number is not valid');
             $(invalid_mbno_body).css('padding' ,'10px');
             $(invalid_mbno_body).css('position','relative');
             var invalid_mbno_footer = document.createElement('div');
             $(invalid_mbno_footer).css('textAlign','right');
             $(invalid_mbno_footer).css('padding','15px');
             $(invalid_mbno_footer).css('borderTop','1px solid #e5e5e5');
             var invalid_mbno_btn = document.createElement('button');
             $(invalid_mbno_btn).addClass("btn btn-primary");
             $(invalid_mbno_btn).html("Ok");
             $(close_action).on('click',function () 
             {
             	$(invalid_mbno_alert).modal().close(); 
             	});
             	$(invalid_mbno_btn).on('click',function () 
             	{
             		$(invalid_mbno_alert).modal().close();
             		});
              $(invalid_mbno_footer).append(invalid_mbno_btn);
                $('#invalid_mbno').append(close_action);
                $('#invalid_mbno').append(invalid_mbno_body);
                $('#invalid_mbno').append(invalid_mbno_footer);
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
 
      
     
   