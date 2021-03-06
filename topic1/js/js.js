window.onload = aparecer();

function aparecer() {
  var section = document.getElementById('section');
  section.className += "aparecer";
}

function mensaje() {
  e = window.event;
  e.preventDefault();
  alert('mensaje de alerta');
}

function httpGet() {
  var xmlHttp = new XMLHttpRequest();
  var theUrl = "http://api.icndb.com/jokes/random";
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  var response = document.getElementById('response');
  response.innerHTML = xmlHttp.responseText;
}

function httpAjax(config) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(new Error(request.statusText));
        }
      }
    };
    request.onerror = function () {
      reject(new Error(this.statusText));
    };
    if ("withCredentials" in request) {
      request.open(config.method, config.url, true);
      request.setRequestHeader('Content-Type', 'text/plain');
    } else if (typeof XDomainRequest != "undefined") {
      request = new XDomainRequest();
      request.open(config.method, config.url);
      request.setRequestHeader('Content-Type', 'text/plain');
    } else {
      request = null;
    }
    request.send();
  });
};

let ajax = document.getElementById('ajax');
httpAjax({
  url: 'http://api.icndb.com/jokes/random',
  method: 'GET'
}).then(function (value) {
  console.log("success");
  ajax.className += "success";
}).catch(function (reason) {
  console.log("error ", reason);
  ajax.className += "error";
});

/*Cree una función para obtener la respuesta de 
https://api.github.com/search/repositories 
con parámetros q = 'JavaScript'.*/
function httpRepo(config) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(new Error(request.statusText));
        }
      }
    };
    request.onerror = function () {
      reject(new Error(this.statusText));
    };
    if ("withCredentials" in request) {
      request.open(config.method, config.url, true);
      request.setRequestHeader('Content-Type', 'text/plain');
    } else if (typeof XDomainRequest != "undefined") {
      request = new XDomainRequest();
      request.open(config.method, config.url);
      request.setRequestHeader('Content-Type', 'text/plain');
    } else {
      request = null;
    }
    request.send();
  });
};

let repo = document.getElementById('resprepo');
httpRepo({
  url: 'https://api.github.com/search/repositories?q="+Javascript',
  method: 'GET'
}).then(function (value) {
  console.log(value);

  for (i = 0; i < 50; i++) {
    
    var datos = JSON.parse(value);
    console.log(datos.items[i]);
    var z = document.createElement('li');
    z.className += "right";
    z.innerHTML = 'nombre del repo: '+datos.items[i].name;

    document.body.appendChild(z);
  }
  repo.className += "success";
  console.log("success");
}).catch(function (reason) {
  console.log("error ", reason);
  repo.className += "error";
});


function seeTable() {
  var body = document.getElementsByTagName("body")[0];

  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");

  for (var i = 0; i < 2; i++) {
    var fila = document.createElement("tr");
 
    for (var j = 0; j < 2; j++) {
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode("fila:"+i+", columna:"+j);
      celda.appendChild(textoCelda);
      fila.appendChild(celda);
    }
    tblBody.appendChild(fila);
  }
  tabla.appendChild(tblBody);
  body.appendChild(tabla);
  tabla.setAttribute("border", "1");
}