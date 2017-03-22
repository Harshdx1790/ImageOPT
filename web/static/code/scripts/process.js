/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dir = "";
var globalData = {}
var userDetailsArr = [];
var userInfoVar = "";
function getDirectory(path){
    $("#runImageAnalytics").removeClass("disabled");
    var theFiles = path.target.files;
     
    var relativePath = theFiles[0].webkitRelativePath;
    var folder = relativePath;
    var directory = document.getElementById("file-7");
  
//      dir = directory.value;
      dir = folder.toString().split("/")[0];
          
}
function runEngine(){
    globalData = {};
   $('#floatBarsG').removeClass("modal "); 
   $('#floatBarsG').css("display","block"); 
    $("#downloadResult").removeClass("disabled");
//    $(".progress").css("display","block");
   $.ajax({
			url: '/AIEngine',
			data: {directory:dir},
			type: 'POST',
			success: function(response){
//			    alert(response)
                            var data = JSON.parse(response);
                            globalData = data;
                            dataDisplay(data);
			},
			error: function(error){
				console.log(error);
			}
		}); 
}

function dataDisplay(data){
    var keys = Object.keys(JSON.parse(data["user"])[0]);
    
    data = JSON.parse(data["user"])
    
    var htmlvar = "";
    htmlvar +="<table class=' highlight responsive-table'>";
    htmlvar +="<tr style='background-color: #01579b;color: #FFF;'>";
    for(var i in keys){
    htmlvar +="<th style='border:1px solid #d4d4d4'>"+keys[i]+"</th>";
    }
    htmlvar +="</tr>";
    
    for(var j in data){
        if(j!=0){
    htmlvar +="<tr>";
    for(var k in keys){
     htmlvar +="<td style='border:1px solid #d4d4d4'>"+data[j][keys[k]]+"</td>";
    }
    htmlvar +="</tr>";
    }
    }
    htmlvar +="</table>";
    setTimeout(function(){
    $('#floatBarsG').css("display","none");
    $("#reportViewDiv").html(htmlvar)
    }, 5000);
}

function downloadCSV(){
   
    JSONToCSVConvertor1(globalData["user"],"Output",true);
}

function JSONToCSVConvertor1(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
//    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
   
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function redirecttoLanding(){
  
    if (userDetailsArr.length > 0) {
        var first = $(location).attr('pathname');
        first.indexOf(1);
        first.toLowerCase();
        first = first.split("/")[1];
        first = "/" + first + "/landingPage.html"
        window.location.href = first;

    } else {
        alert("please sign in ")
    }
}
function shelfAnalysis(){
     var first = $(location).attr('pathname');
        first.indexOf(1);
        first.toLowerCase();
        first = first.split("/")[1];
        first = "/" + first + "/shelfAnalysis.html"
        window.location.href = first;
     
}
function storeFrontAnalysis(){
    var first = $(location).attr('pathname');
        first.indexOf(1);
        first.toLowerCase();
        first = first.split("/")[1];
        first = "/" + first + "/storeFrontAnalysis.html"
        window.location.href = first;
     
}

function userDetailsInfo(){
    var userName = $("#user_name").val();
    var password = $("#password").val();
    var htmlvar = "";
//    alert(userName+""+password);
    $.getJSON("static/json/userInfo.json",function(data){
        var userDetailsMap = {};
        var counter = 0;
       for(var i in data){
           
           if(data[i]["Username"]==userName && data[i]["password"]==password){
               userDetailsMap["Username"] = userName;
               userDetailsMap["password"] = password;
               userDetailsArr.push(userDetailsMap)
               htmlvar += "<div >";
               htmlvar += "<a class='dropdown-button ' href='#' data-activates='dropdown1'>"+data[i]["Username"]+"</a>";
               htmlvar += " <ul id='dropdown1' class='dropdown-content'  style='font-size: smaller;'>";
               htmlvar += " <li></li>";
               htmlvar += " <li style='border-bottom: 1px solid #d4d4d4;'><a align='center' style=''><i class='material-icons prefix'>account_circle</i> "+data[i]["Username"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'>First Name: "+data[i]["firstName"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'>Last Name: "+data[i]["lastName"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'><i class='material-icons prefix'>phone</i> "+data[i]["Mobile"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: smaller;'><i class='material-icons prefix'>email</i> "+data[i]["Email"]+"</a></li>";
               htmlvar += "</ul>";
               htmlvar += "</div>";
               document.cookie = JSON.stringify(userDetailsArr);
               $("#userLoginUI2").html(htmlvar);
               $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
               $(".hideClass").css("display","none");
               $("#userLoginUI1").css("display","block");
               $("#userLoginUI2").css("display","block");
               counter++;
              break;
           }else{
            
           }
       }
       if(counter==0){
           alert("user credentials not matched!")
       }
    });
}

function readShelfAnalysis(){ 
     $('#floatBarsG').removeClass("modal "); 
   $('#floatBarsG').css("display","block"); 
     $("#downloadResult").removeClass("disabled");
  $.get("static/extractedCSV/ShelfAnalysis.csv",function(data){
     
   JSONData =   csvJSON(data)
     TableGenerator(JSONData,"readShelf")
  });  
};

function downloadShelfAnalysis(){
   $.get("static/extractedCSV/ShelfAnalysis.csv",function(data){
    JSONToCSVConvertor(data, "Output", true); 
   
  }); 
}
function readStoreFrontAnalysis(){
     $('#floatBarsG').removeClass("modal "); 
   $('#floatBarsG').css("display","block"); 
    $("#downloadResult").removeClass("disabled");
  $.get("static/extractedCSV/StoreFrontAnalysis.csv",function(data){
     
   JSONData =   csvJSON(data)
     TableGenerator(JSONData,"storeFront")
  });  
};

function downloadStoreFrontAnalysis(){
   $.get("static/extractedCSV/StoreFrontAnalysis.csv",function(data){
    JSONToCSVConvertor(data, "Output", true); 
   
  }); 
}

function TableGenerator(data,flag){
    var mapr = {};
    mapr["ShopCode"] = "";
    mapr["GS_1"] = "Was the shop front signage (Glow sign board) with only 'Brand Store' written present?";
    mapr["GS_2"] = "Was the shop front signage (Glow sign board) properly installed (Not tilted and fitted to the wall)";
    mapr["GS_3"] = "Was the shop front signage (Glow sign board) clean (free of dust)";
    mapr["GS_4"] = "Was the shop front signage (Glow sign board) without wear and tear (no peel offs/ not faded)?";
    mapr["GS_5"] = "Other Signages - Shop front signage (Glow sign board) of the store";
    mapr["GS_6"] = "Other Signages - Shop front signage (Glow sign board) of handset brand like Samsung, Oppo, Sony, Lenovo etc.";
    mapr["GS_7"] = "Other Signages - Shop front signage (Glow sign board) of competition mobile operator brand like Airtel, Vodafone, Idea, Jio etc.";
    mapr["GS_8"] = "Was the main entrance to the shop clean (free of dust, free of obstacles)";
    mapr["GS_9"] = "Was the foot mat placed at the shop entrance";
    mapr["GS_10\r"] = "Was the front of the shop made of glass ? (The frame of the glass can only be of aluminium or steel)";
    
  var JSONData = "";
  var keys = Object.keys(data[0]);

  JSONData +="<table class=' highlight responsive-table'>"
  JSONData +="<tr style='background-color: #01579b;color: #FFF;'>"
  for(var k in keys){
      if(flag=="storeFront"){
  JSONData +="<th  title='"+mapr[keys[k]]+"' style='cursor:pointer;border:1px solid #d4d4d4'>"+keys[k]+"</th>"
      }else{
  JSONData +="<th   style='cursor:pointer;border:1px solid #d4d4d4'>"+keys[k]+"</th>"        
      }
  }
  JSONData +="</tr>"
  for(var i in data){
  JSONData +="<tr>"
  for(var j in keys){
  JSONData +="<td style='border:1px solid #d4d4d4'>"+data[i][keys[j]]+"</td>"
  }
  JSONData +="</tr>"
  }
  JSONData +="</table>"
  
  setTimeout(function(){
    $('#floatBarsG').css("display","none");
    $("#reportViewDiv").html(JSONData)
    }, 5000);
}



function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  
  //return result; //JavaScript object
  return result; //JSON
}




function JSONToCSVConvertor(CSV, ReportTitle, ShowLabel) {
  //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + "_Royal_Sundaram.csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);  
}

function appendUserInfo(){
    var userInfo = JSON.parse(document.cookie);
    var htmlvar ="";
    $.getJSON("static/json/userInfo.json",function(data){
        for(var i in data){
           if(data[i]["Username"]== userInfo[0]["Username"] && data[i]["password"]==userInfo[0]["password"]){
           htmlvar += "<div >";
               htmlvar += "<a class='dropdown-button ' href='#' data-activates='dropdown1'>"+data[i]["Username"]+"</a>";
               htmlvar += " <ul id='dropdown1' class='dropdown-content'  style='font-size: smaller;'>";
               htmlvar += " <li></li>";
               htmlvar += " <li style='border-bottom: 1px solid #d4d4d4;'><a align='center' style=''><i class='material-icons prefix'>account_circle</i> "+data[i]["Username"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'>First Name: "+data[i]["firstName"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'>Last Name: "+data[i]["lastName"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'><i class='material-icons prefix'>phone</i> "+data[i]["Mobile"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: smaller;'><i class='material-icons prefix'>email</i> "+data[i]["Email"]+"</a></li>";
               htmlvar += "</ul>";
               htmlvar += "</div>";    
           }
        }
        $(".userLoginLandingUI2").html(htmlvar)
        $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    })
     $(".userLoginLandingUI2").css("display","block")
        })
    
}