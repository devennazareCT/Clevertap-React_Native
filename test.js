<style type="text/css">@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700&display=swap');
.CT_Banner{ position:relative;padding:0;}
.ctContent{position:relative;background-color:#f2f2f2;}
.ctContent img{display:inline-block;width:50%;height:50%;}
.stickyBannerMain{
height: 40px; font-family: "Open Sans", Verdana, "sans-serif" !important;
width: 100%;
/* background: rgb(2,165,105); */
/* background: -moz-linear-gradient(top, rgba(2,165,105,1) 0%, rgba(2,110,70,1) 100%);*/
/* background: -webkit-linear-gradient(top, rgba(2,165,105,1) 0%,rgba(2,110,70,1) 100%); */
/* background: linear-gradient(to bottom, rgba(2,165,105,1) 0%,rgba(2,110,70,1) 100%); */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#02A569', endColorstr='#026E46',GradientType=0 );
font-family: "Open Sans", Verdana, "sans-serif";
position: relative;
background: #FFD454;
}
.closeBanner{position: absolute;
right: 10px;
top: 7px;
width: 26px;
height: 26px;
background-color: #74CEAD;
border-radius: 50%;
color: #fff;
text-indent: -9999;}
.closeBanner:before{ content: "X";
position: absolute;
text-indent: 0!important;
left: 9px;
opacity: 1!important;font-weight:600;
font-size: 13px;
z-index: 99999;
display: block;
top: 3px;
color: #455D54!important;}
.stickyRight .button{
/*background-color: #E56C5B;*/
background-color:#385371;
color: #fff;
border: 1px solid #E56C5B;
font-weight: 500;
display: inline-block;
text-align: center;
cursor: pointer;
border: none;
height: 30px;
margin-left: 20px;
padding: 0 5px;
min-width: 110px;
border-radius: 4px;
font-size: 14px;
outline: none;
text-decoration: none;
line-height: 28px;
-webkit-transition: all 0.3s ease;
-ms-transition: all 0.3s ease;
-moz-transition: all 0.3s ease;
-o-transition: all 0.3s ease;
transition: all 0.3s ease;
}
.stickyRight .button:hover, .stickyRight .button:focus{
/*background: #DF4C38;*/
background: #151515;
}
.stickyInn{display: table;color: #000;margin:0 auto;height:100%;}
.stickyLeft{font-size:16px; font-weight: 600;
}
.stickyLeft, .stickyRight{display: table-cell;vertical-align: middle;}
@media only screen and (max-width: 600px) {
.stickyLeft{font-size:14px;font-weight: normal;}
.stickyBannerMain{height:50px;}
.stickyInn{padding:5px 10px;}
.stickyRight .button{min-width: 55px; margin: 0 20px 0 5px; height: 25px;
line-height: 22px;
font-size: 13px;}
.closeBanner{ right: 3px;
top: 3px;
width: 20px;
height: 20px;}
.closeBanner:before{ content: "X";
position: absolute;
text-indent: 0!important;
left: 7px;
opacity: 1!important;
font-size: 12px;
z-index: 99999;
display: block;
top: 2px;
color: #455D54!important;}
}
</style>
<div class="ctContent">
<div class="stickyBannerMain">
<div class="stickyInn">
<div class="stickyLeft">Top 100+ Careers after Class 12th</div>
<div class="stickyRight"><a class="button" onclick="submit_pressed()" href="https://school.careers360.com/download/ebooks/100-careers-after-10-2?utm_source=clevertap&utm_medium=clevertap-sticky&utm_campaign=gujarat-board-12th-news-domain-web-wap" onclick="window.clevertap.event.push('top_banner_clicked',{'url':window.location.href});" target="_blank">Check Now</a></div>
<button onclick="submit_pressed()">Click you :)</button>

</div>
<a class="closeBanner" href="javascript:void()"> </a></div>
</div>
<script>
var btn = document.querySelector('.closeBanner');
var wrapper = window.parent.document.getElementById('wizParDiv2');
var mainContainer = wrapper.parentElement;
var header = wrapper.parentElement.parentElement.nodeName;
console.log("Hello world!");
function check(){
if(wrapper.style.display = "block"){
console.log("inside");
console.log(mainContainer);
mainContainer.classList.add("addActive");
}
}
window.onload = check;
console.log("outside");
btn.addEventListener('click', closePopUp);
function closePopUp() {
window.clevertap.event.push('top_banner-closed',{'url':window.location.href}); wrapper.remove(); 
mainContainer.classList.remove("addActive");
}

var notificationObj;
window.clevertap.popupCallback = (notificationData) => { notificationObj = notificationData; };
console.log("object is"+notificationObj+"data is" + notificationData);
function submit_pressed() { 
window.clevertap.raisePopupNotificationClicked(notificationObj) 
console.log("pressed");
window.clevertap.event.push('top_banner-closed',{'url':window.location.href}); wrapper.remove(); 
mainContainer.classList.remove("addActive");
}

</script>