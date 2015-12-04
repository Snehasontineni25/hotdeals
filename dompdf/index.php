
<?php
// somewhere early in your project's loading, require the Composer autoloader
// see: http://getcomposer.org/doc/00-intro.md
/* require 'load_font.php'; */
 
// disable DOMPDF's internal autoloader if you are using Composer
/* define('DOMPDF_ENABLE_AUTOLOAD', false); */
 
// include DOMPDF's default configuration
require_once 'dompdf_config.inc.php';
 
 
$htmlString =
  '<html><head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <style>body,p{font-family:Helvetica !important;font-size:14px !important;}.table-data, .table-data tr,.table-data td{border: 1px solid black; border-collapse: collapse;border-color:#ddd;text-align:center;}.table-data tr td:nth-child(2){text-align:left !important;padding-left: 10px;}th, td{padding: 5px;padding-left:15px;padding-right:15px;}thead{background:#41a7b3;color:#fff;font-weight:600;}.table-data tbody tr:nth-child(2n){background:rgba(65, 167, 179, 0.1);}p{margin:0px;}ul li{padding-bottom:5px;padding-top:5px;}.trm-tble tr td{padding:0px !important;}.trm-tble tr td p{ margin-left: 10px;}.trm-tble tr td{padding-top:10px !important;}</style></head><body>'.'<div class="wrapper" style="width:100%;margin:0px;background:#f8f8f8;pad"><div class="pdf-container" style="width:100%;background:#fff;margin:20px auto;padding-bottom:20px;margin:10px;"><table style="width:100%;border:0px;" cellspacing="0"><tr ><td style="border-bottom:2px solid #41a7b3"><div class="mail-log" style=""><img src="logo.png"></img></div></td><td align="right" style="border-bottom:2px solid #41a7b3"><div class="right-head" style=""><p style="margin:0px;padding-top: 16px;font-weight: 600;">Appointment ID :<span style="font-weight:500"> 00001</span></p><p style="margin:0px;padding-top:5px; font-weight:600;">Timings :<span style="font-weight:500" >5th Dec 15, 12:00pm </span></p></div></td></tr><tr><td><div class="patient-details" style="float:left;"><p style=""><span style="font-weight:600;color:#41a7b3;padding-bottom:5px;padding-top:5px;display:inline-block;text-decoration:underline;font-size: 15px;">Patient Details</span><br><span style="display:inline-block;">Mr. Ram Prakash<br>Male, 30 Years,<br>9988776655 <br>ramprakash@gmail.com</span></p></div></td><td align="right"><div class="provider-details" style="padding-left:217px;"><p style="text-align:left;"><span style="text-decoration:underline;font-weight:600;color:#41a7b3;padding-bottom:5px;padding-top:5px;display:inline-block;font-size: 15px;">Service Provider Details</span><br><span style="display:inline-block; padding-left: 2px;">Vittals Medicare,<br>270, 3rd Cross,<br>Domlur 2nd stage, Indiranagar<br>Bangalore – 560075.<br></span></p></div></td></tr><tr><td colspan="2"><h3 style="font-size:15px;font-weight:600;margin:0px;padding-top:3px;color:#41a7b3">Order Details</h3></td></tr><tr><td colspan="2"><table style="width:100%" class="table-data" ><thead><tr><th style="width:10%;border-right:1px solid #ddd;">S.No</th><th style="width:30%;border-right:1px solid #ddd;">Tests/Packages</th><th style="width:15%;border-right:1px solid #ddd;">MRP</th><th style="width:15%;border-right:1px solid #ddd;">Final Price</th><th style="width:15%">Discount(%)</th></tr></thead><tbody> <tr><td>1</td><td>Package 1</td><td><img src="rr.png" style="margin-top:3px;">1000</td><td><img src="rr.png" style="margin-top:3px;">500</td><td>50%</td></tr><tr><td>2</td><td>Package 2</td><td><img src="rr.png" style="margin-top:3px;">1000</td><td><img src="rr.png" style="margin-top:3px;">500</td><td>50%</td></tr><tr><td>3</td><td>Test 1</td><td><img src="rr.png" style="margin-top:3px;">1000</td><td><img src="rr.png" style="margin-top:3px;">500</td><td>50%</td></tr><tr><td>4</td><td>Test 2</td><td><img src="rr.png" style="margin-top:3px;">1000</td><td><img src="rr.png" style="margin-top:3px;">500</td><td>50%</td></tr><tr style="font-weight:bold;text-align:center;"><td colspan="2">Total</td><td style="text-align:center !important;"><img src="rr.png" style="margin-top:3px;">1000</td><td><img src="rr.png" style="margin-top:3px;">500</td><td>50%</td></tr></tbody></table></td></tr><tr><td colspan="2"><div class="pkg-data" style="padding:5px;padding-left:0px;"><p style="padding:5px;padding-left:0px;" ><span style="font-weight:600">*Final Price in words :</span> One Thousand and Four Hundred rupees only.</p><div></td></tr><tr><td colspan="2" style="padding-top:0px;"><p style="padding:5px;padding-left:0px;"><span style="font-weight:bold">*</span>Pay final price amount (or discounted price) at service provider’s billing counter to avail above medical investigations.</p></td></tr><tr><td colspan="2"><h5 style="margin:0px;padding:5px;font-size:15px;background:#41a7b3;color:#fff;">Terms & Conditions</h5><table class="trm-tble"><tr ><td style="" valign="top">1.</td><td style=""><p style="margin-top:0px;"> Zotey is an aggregator and online market placeof medical diagnostic service providers listed in www.zotey.com</p></td></tr><tr><td valign="top">2.</td><td><p> Zotey takes utmost care in screening and listing of diagnostic service providers. Zotey lists down service providers and never endorses nor recommends any service provider and their services.</p></td></tr><tr><td valign="top">3.</td><td><p> Its Zotey’s customers responsibility and their discretion to avail medical services from service provider’s listed in www.zotey.com</p></td></tr><tr><td valign="top">4.</td><td><p> Zotey is not responsible for any dealings between Zotey customers and service providers in terms of monetary transactions, medical investigation procedures and their complications (if any).</p></td></tr><tr><td valign="top">5.</td><td><p> Zotey books appointments as per latest information available from service providers. Appointment timings and availability of tests/packages are subjected to vary as per service provider’s changes.</p></td></tr></table></td></tr></table></div></div>'
  .'</body></html>';
;
ob_start();
/*  include('html_to_dpf.html');  */
$htmlString .= ob_get_clean();

$dompdf = new DOMPDF();
$dompdf->load_html($htmlString);
$dompdf->render();
$dompdf->stream("sample.pdf");

?>