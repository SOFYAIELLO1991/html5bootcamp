document.getElementById('guardar').addEventListener('click', function(){
    var texto = document.getElementById('texto').value ;
    localStorage.setItem('texto', texto) ;
    alert('storage full') ;
    console.log(localStorage);
} , false);

document.getElementById('borrar').addEventListener('click', function(){
	var texto= document.getElementById('texto').value;
	localStorage.clear()
	alert('storage clear');
	console.log(localStorage);
} , false);

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;

    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('archivos').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; 
  }

  var dropZone = document.getElementById('dropzone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);