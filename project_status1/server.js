var express = require('express'); 
var app = express();   
var document = require('html-element').document;
var stringSimilarity = require('string-similarity');
var mysql = require('mysql'); 
var bodyParser = require("body-parser"); 
var session = require('express-session');
var fs = require('file-system');
var fs1 = require('fs');
var connection = mysql.createConnection({ 
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'project_status',
});
var multer  = require('multer');
var path = require('path');
var token="";
var stdatetemp = "";
var sttimetemp = "";
var upload = "";
var vdate = "";
//console.log(token);

//app.use(multer({dest:'./uploads/'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
const fileUpload = require('express-fileupload');
 
// default options 
app.use(fileUpload());

app.get('/show',function(req,res){
   var data = {
        "error":1,
        "stud":""
    }
    connection.query("SELECT * from studinfo",function(err, rows, fields){
     if(rows.length != 0){
        data["error"] = 0;
        data["stud"] = rows;
        res.json(data);
     }else{
            data["stud"] = 'No record Found..';
            res.json(data);
        }
     });              
            
 });

app.get('/index.htm',function(req,res){
    res.sendFile( __dirname + "/" + "index.html" );
});


app.get('/create.html',function(req,res){
   // console.log(token);
    if(!!token)
    res.sendFile( __dirname + "/" + "create.html" );
    else
    res.sendFile( __dirname + "/" + "index.html" );
});
app.get('/upload.html',function(req,res){
   // console.log(token);
    if(!!token)
    res.sendFile( __dirname + "/" + "upload.html" );
    else
    res.sendFile( __dirname + "/" + "index.html" );
});
app.get('/newupload.html',function(req,res){
   // console.log(token);
    if(!!token)
    res.sendFile( __dirname + "/" + "newupload.html" );
    else
    res.sendFile( __dirname + "/" + "index.html" );
});
app.post('/check',function(req,res){
      //var hrtextbox = abc.getElementById('un');
      /*fs.readFile( __dirname + "/" + "index.html", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(err);
      return;
    }

    data = data.toString().replace('abc', 'your value here');
    res.writeHead(200);
    res.end(data, 'utf8');
  });*/

   var uname = req.body.uname;
   
   var pwd = req.body.pwd;
   var data = {
        "error":1,
        "user":""
    }
    if(!!uname && !!pwd){
         connection.query("SELECT * from credentials where uname = ? AND pwd = ?",[uname,pwd],function(err, rows, fields){
        if(rows.length != 0){
        data["error"] = 0;
        //data["user"] = rows;
       // res.sendFile( __dirname + "/" + "create.html" ); 
        connection.query("SELECT token from credentials where uname = ? AND pwd = ?",[uname,pwd],function(err, rows, fields){
                          data["user"] = rows;   
                           
                          token  =rows[0].token;  
                          console.log(token);
                         res.sendFile( __dirname + "/" + "home.html" );  
                            
                                                                                                                  
        });
                          
         }else{
            data["user"] = 'Username or password is invalid'; 
        }
     });      
    }else{
        data["user"] = "Please provide all required data";
        res.json(data);
    }        
           
 });
    
app.get('/validate',function(req,res){
   var data = {
        "error":1,
        "user":""
    }
    connection.query("SELECT * from stainfo where token = ?",[token],function(err, rows, fields){
     if(rows.length != 0){
        data["error"] = 0;
        data["user"] = rows[0].stdate;
        var str = "";
        var i = 0;
        //str=str+"<html> <body> <h1> History <h1> <br> <form action = "+"\""+"http://127.0.0.1:8003/search"+"\""+" "+"method= "+"\""+"POST"+"\""+">"+"<select name ="+"\""+"stdate"+"\""+">";
       str=str+"<html> <body> <h1> History <h1> <br>"; 
       str = str +"<table border = "+"\""+1+"\""+"> <tr><th>Upload</th><th>Date</th><th>Time</th><th>Hours</th><th>Status</th><th>Update</th><th>Delete</th></tr>"       
       while(i < rows.length){
        
        
        var str1 = rows[i].stdate.toString();
        str1 = str1.substr(4,12);
          console.log(str1);
          str2 = str1.substr(0,3).toString('utf-8').trim();
          str3 = str1.substr(3,3).toString('utf-8').trim();
          str4 = str1.substr(7,4).toString('utf-8').trim();
          console.log(str2);
          //var similarity = stringSimilarity.compareTwoStrings(str2, 'Aug');
          //console.log(similarity);
          //var matches = stringSimilarity.findBestMatch('healed', ['edward', 'sealed', 'theatre']);
          //console.log(matches["bestMatch"]);
          if(str2 == "Jan"){
             str2 = "01";
          }
          else if(str2 == String("Feb").toString('utf-8').trim()){
            str2 = "02";
          }
          else if(str2 ==  String("Mar").toString('utf-8').trim()){
            str2 = "03";
          }
          else if(str2 == String("Apr").toString('utf-8').trim()){
            str2 = "04";
          }
          else if(str2 ==  String("May").toString('utf-8').trim()){
            str2 = "05";
          }
          else if(str2 ==  String("Jun").toString('utf-8').trim()){
            str2 = "06";
          }
          else if(str2 == String("Jul").toString('utf-8').trim()){
            str2 = "07";
          }
          else if(str2 == String("Aug").toString('utf-8').trim()){
            str2 = "08";
          }
          else if(str2 == String("Sep").toString('utf-8').trim()){
            str2 = "09";
          }
          else if(str2 == String("Oct").toString('utf-8').trim()){
            str2 = "10";
          }
          else if(str2 == String("Nov").toString('utf-8').trim()){
            str2 = "11";
          }
          else{
            str2 = "12";
          }
          str5 = str4 +"-"+str2+"-"+str3;
          //var path = __dirname + '/uploads/'+rows[i].token+'/'+rows[i].upload;
          console.log(path);
           console.log(str5);
           str =str + "<tr><form action = "+"\""+"http://127.0.0.1:8004/download"+"\""+" "+"method= "+"\""+"GET"+"\""+">"
          str = str + "<td><input type= "+"\""+"submit"+"\"" +" name="+"\""+"upload1"+"\""+" value = "+"\""+rows[i].upload+"\""+"></form></td>";
          str = str + "<form action = "+"\""+"http://127.0.0.1:8004/search"+"\""+" "+"method= "+"\""+"GET"+"\""+">";
          str = str + "<td><input type= "+"\""+"text"+"\"" +" name="+"\""+"stdate"+"\""+" value = "+"\""+str5+"\""+" size = "+"\""+8+"\""+"readonly></td>";
          str = str + "<td><input type= "+"\""+"text"+"\"" +" name="+"\""+"sttime"+"\""+" value = "+"\""+rows[i].sttime+"\""+" size = "+"\""+8+"\""+"readonly></td>";
          str = str + "<td><input type= "+"\""+"text"+"\"" +" name="+"\""+"sthrs"+"\""+" value = "+"\""+rows[i].sthrs+"\""+" size = "+"\""+5+"\""+"readonly></td>";
          str = str + "<td><input type= "+"\""+"text"+"\"" +" name="+"\""+"crtstatus"+"\""+" value = "+"\""+rows[i].crtstatus+"\""+"readonly></td>";
         // str = str + "<td><input type= "+"\""+"button"+"\"" +" name="+"\""+"upload1"+"\""+" value = "+"\""+rows[i].upload+"\""+" onclick = "+"\""+"window.location.href = "+"\'"+"http://127.0.0.1:8004/download"+"\'"+"\""+"></td>";
          
          str = str + "<td><input type="+"\""+"submit"+"\""+ " value="+"\""+"Update"+"\""+"></form></td>";
          str = str + "<form action = "+"\""+"http://127.0.0.1:8004/delete"+"\""+" "+"method= "+"\""+"POST"+"\""+">";
          str = str + "<input type= "+"\""+"hidden"+"\"" +" name="+"\""+"stdate"+"\""+" value = "+"\""+str5+"\""+" size = "+"\""+8+"\""+"></td>";
          str = str + "<input type= "+"\""+"hidden"+"\"" +" name="+"\""+"sttime"+"\""+" value = "+"\""+rows[i].sttime+"\""+" size = "+"\""+8+"\""+"></td>";
          str = str + "<td><input type="+"\""+"submit"+"\""+ " value="+"\""+"Delete"+"\""+"></form></td></tr>";
          //str=str + "<option value="+str5.toString('utf-8').trim()+">"+str5.toString('utf-8').trim()+"</option>";
          //<input type="button" value="Put Your Text Here" onclick="window.location.href='http://www.hyperlinkcode.com/button-links.php'" />
          i=i+1;
          console.log(i);
          

        }
        str =str + "</table>";
        str=str+"</body></html>";
        res.write(str);

        //res.write("<html> <body> <form action = "+"\""+"http://127.0.0.1:8003/search"+"\""+" "+"method= "+"\""+"POST"+"\""+"> Date : <input type= "+"\""+"text"+"\"" +" name="+"\""+"stdate"+"\""+" value = "+"\""+rows[i].stdate+"\""+"> <br> <input type="+"\""+"submit"+"\""+ " value="+"\""+"Update"+"\""+"> </form> <br> </body> </html>");
     }else{
            data["user"] = 'No record Found..';
            res.json(data);
        }
     }); 
    
  
});

app.post('/signup',function(req,res){
 var uname = req.body.uname;
 var name = req.body.name1;
 var dob = req.body.dob;
 var pwd = req.body.pwd;
 var gender = req.body.gender;
 var tkn="";
   var data = {
        "flag":1,
        "user":""
    }
    if(!!uname && !!pwd && !!dob && !!name && !!gender){
         connection.query("SELECT * from credentials where uname = ?",[uname],function(err, rows, fields){
        
        if(rows.length != 0){
          data["user"] = 'Username is already exist';                 
         }else{
             
            tkn = String(Math.floor(Math.random() * (5000 - 1000) + 1000));
           connection.query("INSERT INTO credentials VALUES(?,?,?,?,?,?)",[tkn,uname,pwd,name,dob,gender],function(err, rows, fields){
            if(!!err){
                data["user"] = "Error Adding data";
            }else{
                   
                data["user"] = 'Details added Successfully..';
                //res.json(data);
                res.sendFile( __dirname + "/" + "index.html" );  
          }
           });
        }
     });     
    }else{
        data["user"] = "Please provide all required data";
        res.json(data);
    } 
});

app.post('/add',function(req,res){
   var date = new Date();
   var year = date.getFullYear();
   var month = date.getMonth() + 1;
    var day  = date.getDate();
   var hour = date.getHours();
   var min  = date.getMinutes();
   var sec  = date.getSeconds();
   var ampm;
    if(hour >= 12){
        ampm = "PM";  
    }
    else{
      ampm = "AM";
    }

    if(hour > 12){
       hour = hour - 12;
    }

    var sttime = hour+":"+min+":"+sec+" "+ampm;
   console.log(sttime);

    var stdate = year +"-"+month+"-"+day;
    var stdate = String(stdate).trim();
    var sttime = String(sttime).trim();
     console.log(stdate);
    var hrs = req.body.hrs;
    var msg = req.body.message;
    //var t1 = String(token);
    console.log(token);
    console.log(msg);
    console.log(hrs);
    var data = {
        "user":""
    };
    if(hrs && !!msg){
      if(hrs<=15){ 
        connection.query("INSERT INTO stainfo VALUES(?,?,?,?,?,?)",[token,String(stdate).trim(),String(sttime).trim(),hrs,msg,upload],function(err, rows, fields){
            if(!!err){
                data["user"] = "Error Adding data";
            }else{
                   
            		data["user"] = 'Details added Successfully..';
                stdatetemp = "";
                sttimetemp = "";
                upload = "";
            		res.redirect('/validate');
        	  }
              });
        }
        else{
                data["user"] = 'Hours should be less than 15..';
                res.json(data);
        }
    			
    }else{
        data["user"] = "Please provide all required data";
        res.json(data);
    }
});

app.get('/update.html',function(req,res){
   console.log(token);
    if(!!token){
    res.sendFile( __dirname + "/" + "update.html" );
     var stdate = req.body.stdate;
    /* if(!!stdate){
     connection.query("SELECT sthrs,crtstatus from from stinfo where token = ? AND stdate = ?",[token,stdate],function(err, rows, fields){
                           var hrs = rows[0].sthrs;
                           var status = rows[0].crtstatus;
                           var hrtextbox = document.getElementById('hr');
                           var sttextbox = document.getElementById('msg');
                           hrtextbox.value = hrs;
                           sttextbox.value = status;
                                                                                                                  
          });
       } 
       else{
        res.send("Please provide all required data");
       }*/
    }else{
    res.sendFile( __dirname + "/" + "index.html" );}
});

app.get('/search',function(req,res){
    var stdate;
    var sttime;
     //vdate = req.query.date;
     if(!! stdatetemp && !! sttimetemp){
       console.log(stdatetemp);
        //stdate = vdate.substr(0,8).toString('utf-8').trim();
        //sttime = vdate.substr(8,18).toString('utf-8').trim();
       // stdatetemp = stdate;
        //sttimetemp = sttime;
        //console.log("vdate");
        console.log(sttimetemp);
      //  console.log(sttime);
       
     }
     else{
     stdate = req.query.stdate;
     sttime = req.query.sttime;
    stdatetemp = stdate;
    sttimetemp = sttime;
      
     console.log(token);
     console.log(stdatetemp);
    console.log(sttimetemp);
    }
    if(!!stdatetemp){
     connection.query("SELECT * from stainfo where token = ? AND stdate = ? AND sttime = ?",[token,stdatetemp,sttimetemp],function(err, rows, fields){
                         var hrs = rows[0].sthrs;
                          console.log("hello");
                          console.log(sttimetemp);
                          var status = rows[0].crtstatus;
                           console.log(hrs);
                          console.log(status);
                          /*if(rows.length != 0){
                             res.sendFile( __dirname + "/" + "update.html" );
                          var hrtextbox = form.getElementById('hr');
                           var sttextbox = form.getElementById('msg');
                           hrtextbox.value = hrs;
                           sttextbox.value = status;
                            //console.log(rows);
                           res.send(hrtextbox.value);}
                           else{
                            res.send("Record not found");
                           }*/    
                                    
                        fs.readFile( __dirname + "/" + "update.html", (err, data) => {
                        if (err) {
                            res.writeHead(500);
                             res.end(err);
                                return;
                            }
                            data = data.toString().replace('msg',status);
                            data = data.toString().replace('hours',hrs);
                            res.writeHead(200);
                            res.end(data, 'utf8');
                        });                                                                                      
          });
       } 
       else{
        res.send("Please provide all required data");
       }
});

app.post('/update',function(req,res){

    var hrs = req.body.hrs;
    var msg = req.body.message;
    console.log(stdatetemp);
     console.log(token);
    var data = {
        "user":""
    };
    if(!!hrs && !!msg){
        connection.query("UPDATE stainfo SET sthrs=?,crtstatus = ? WHERE token=? AND stdate = ? AND sttime = ?",[hrs,msg,token,String(stdatetemp).trim(),String(sttimetemp).trim()],function(err, rows, fields){
            if(!!err){
                data["user"] = "Error Updating data";
            }else{
                data["user"] = "Details updated Successfully";
            }
            stdatetemp = "";
            sttimetemp = "";
            upload = "";
            res.redirect('/validate');
            //res.json(data);
           
        });
    }else{
        data["user"] = "Please provide all required data";
        res.json(data);
    }
});


app.post('/delete',function(req,res){
    var stdate = req.body.stdate;
    var sttime = req.body.sttime;
     console.log(token);
     console.log(stdate);
     console.log(sttime);
    var data = {
        "user":""
    };
    if(!!stdate && !!sttime){
        connection.query("Delete from stainfo WHERE token=? AND stdate = ? AND sttime = ?",[token,String(stdate).trim(),String(sttime).trim()],function(err, rows, fields){
            if(!!err){
                data["user"] = "Error in deleting data";
            }else{
                data["user"] = "Details deleted Successfully";
                res.redirect('/validate');
            }
            
            //res.json(data);  
        });
    }else{
        data["user"] = "Please provide all required data";
        res.json(data);
    }
});
/*app.use(multer({
  dest:'./uploads/'+token
}).single('sampleFile'));
/*var upload = multer({ dest: __dirname +'/uploads/'});*/
/*
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
})*/
app.post('/upload', function(req, res) {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day  = date.getDate();
var hour = date.getHours();
var min  = date.getMinutes();
var sec  = date.getSeconds();
var ampm;
if(hour >= 12){
        ampm = "PM";
}
else{
      ampm = "AM";
}

if(hour > 12){
        hour = hour - 12;
}
var sttime = hour+":"+min+":"+sec+" "+ampm;
var stdate = year +"-"+month+"-"+day;
var stdate = String(stdate).trim();
var sttime = String(sttime).trim();
  var sampleFile = req.files.sampleFile;
  console.log(sampleFile);
   var dir = './uploads/'+token+'/';

  if (!fs.existsSync(dir)){
             fs.mkdirSync(dir);
  }      
  
 var name =req.files.sampleFile.name;
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv(dir+stdate+' '+sttime+".txt", function(err) {
   
      console.log(req.files.sampleFile.name);
         console.log(req.files.sampleFile['name']);
      console.log(req.params.filepath);
  // // }
  //fs.readFile('./sampleFile.txt', function (err, data) {
  // ...
  //var newPath = __dirname + "/upload/sampleFile1.txt";
  //fs.writeFile(newPath, data, function (err) {
    //console.log(data);
    //res.redirect("back");
 // });
//});          
     upload = stdate+' '+sttime+".txt";
     res.redirect('/create.html'); 
  });
  });
 app.post('/newupload', function(req, res) {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day  = date.getDate();
var hour = date.getHours();
var min  = date.getMinutes();
var sec  = date.getSeconds();
var ampm;
if(hour >= 12){
        ampm = "PM";
}
else{
      ampm = "AM";
}

if(hour > 12){
        hour = hour - 12;
}
var sttime = hour+":"+min+":"+sec+" "+ampm;
var stdate = year +"-"+month+"-"+day;
var stdate = String(stdate).trim();
var sttime = String(sttime).trim();
  var sampleFile = req.files.sampleFile;
  console.log(sampleFile);
   var dir = './uploads/'+token+'/';

  if (!fs.existsSync(dir)){
             fs.mkdirSync(dir);
  }      
  
 var name =req.files.sampleFile.name;
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv(dir+stdate+' '+sttime+".txt", function(err) {
   
      console.log(req.files.sampleFile.name);
         console.log(req.files.sampleFile['name']);
      console.log(req.params.filepath);
  // // }
  //fs.readFile('./sampleFile.txt', function (err, data) {
  // ...
  //var newPath = __dirname + "/upload/sampleFile1.txt";
  //fs.writeFile(newPath, data, function (err) {
    //console.log(data);
    //res.redirect("back");
 // });
//});          
     upload = stdate+' '+sttime+".txt";
     connection.query("UPDATE stainfo SET upload = ? WHERE token=? AND stdate = ? AND sttime = ?",[upload,token,String(stdatetemp).trim(),String(sttimetemp).trim()],function(err, rows, fields){
        });
    //stdatetemp = stdate;
   //sttimetemp = sttime;
   res.redirect('/search');

  });

});

app.get('/download', function(req, res){
  var file = req.query.upload1;
  var path = __dirname + '/uploads/'+token+'/'+file;
  console.log("file");
  console.log(path);
    console.log(file);
  //var file = __dirname + '/sampleFile.txt';
  res.download(path); // Set disposition and send it.
});

var server = app.listen(8004, function () {  
  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
  
})  