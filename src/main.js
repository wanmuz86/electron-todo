const electron = require('electron');
    const {ipcRenderer} = electron;
    const ul = document.querySelector('ul');

    ipcRenderer.on('item:add', function(e, item){
      ul.className = 'collection';
      const li = document.createElement('li');
      li.className = 'collection-item';
      const itemText = document.createTextNode(item);

      li.appendChild(itemText);
      ul.appendChild(li);
    });

    ipcRenderer.on('item:clear', function(){
        ul.className = '';
        ul.innerHTML = '';
      });

      
      ul.addEventListener('dblclick', removeItem);

    function removeItem(e){
      event.target.remove();
      if(ul.children.length == 0){
        ul.className = '';
      }
    }