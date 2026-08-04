document.getElementById("marksForm").addEventListener("submit",function(e){

e.preventDefault();

let student={

name:document.getElementById("name").value,

cn:Number(document.getElementById("cn").value),

cc:Number(document.getElementById("cc").value),

dc:Number(document.getElementById("dc").value),

ai:Number(document.getElementById("ai").value),

js:Number(document.getElementById("js").value),

sc:Number(document.getElementById("sc").value)

};

for(let key in student){

if(key!="name"){

if(student[key]<0 || student[key]>100){

alert("Marks should be between 0 and 100");

return;

}

}

}

localStorage.setItem("student",JSON.stringify(student));

window.location.href="result.html";

});