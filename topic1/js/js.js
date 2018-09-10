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
  url: ' http://api.icndb.com/jokes/random',
  method: 'get'
}).then(function (value) {
  console.log("success");
  ajax.className += "success";
}).catch(function (reason) {
  console.log("error ", reason);
  ajax.className += "error";
});
