$(function() {
    todoInput = document.getElementById('todo-input')
addBtn = document.getElementById('btn-add')
updateBtn = document.getElementById('btn-update')
removeBtn = document.getElementById('btn-remove')
list = $('#todo-list')

currentTodoInput = ''

todoInput.addEventListener('input', function(e){
    currentTodoInput = e.target.value
})

function createNewNode() {
    newListElement = document.createElement('li')
    buttonDelete = document.createElement('span')
    textNode = document.createTextNode(currentTodoInput)
    newListElement.id = ('item' + (list.childElementCount + 1))
    buttonDelete.innerHTML = "Delete"
    newListElement.append(textNode, buttonDelete)

    buttonDelete.addEventListener('click', function() {
        item = this.parentNode
        item.remove()
    })

    return newListElement
}

function addListItem() {
    if (currentTodoInput !== '') {

        newListElement = createNewNode()
        
        list.append(newListElement)
    
        todoInput.value = ''
        currentTodoInput = ''
    } else {
        alert('Enter a todo list')
    }    
    // firstListItem = list.firstElementChild
    // list.insertBefore(newListElement, firstListItem)
}

todoInput.addEventListener('keyup', function(e){
    if(e.keyCode === 13) {
        createTODOItemAtBackend()
    }
})

addBtn.addEventListener("click", createTODOItemAtBackend)

updateBtn.addEventListener("click", function() {
    firstElement = list.firstElementChild
    if (firstElement === null) {
        alert('No item to be updated')
    }else if(currentTodoInput !== '') {
        newListElement = createNewNode()
        list.replaceChild(newListElement, firstElement)
    } else {
        alert('Enter an item to update')
    }
})

removeBtn.addEventListener('click', function() {
    if (list.firstElementChild === null) {
        alert("there's no item to be deleted")
    } else {
        list.remove()
    }
    
})

function createTODODynamically(id, title) {
    newListElement = document.createElement('li')
    buttonDelete = document.createElement('span')
    textNode = document.createTextNode(title)
    newListElement.id = ('item' + id)
    buttonDelete.innerHTML = "Delete"
    newListElement.append(textNode, buttonDelete)

    buttonDelete.addEventListener('click', function() {
        item = this.parentNode
        item.remove()
    })

    return newListElement
}

function getTODOListFromBackend() {
    const http = new XMLHttpRequest()
    http.onreadystatechange = function() {
        if(this.readyState === 4 ){
            if(this.status === 200) {
                const response = JSON.parse(this.responseText)
                for(i=0; i < response.length; i++) {
                    list.append(createTODODynamically(response[i].id, response[i].title))
                }
            } else {
                console.log("Called Failed")
            }
            
        }
    }
    http.open('GET', 'https://jsonplaceholder.typicode.com/todos', true)
    http.send()
}

getTODOListFromBackend()


function createTODOItemAtBackend() {
    const http = new XMLHttpRequest()
    http.open('POST', 'https://jsonplaceholder.typicode.com/todos', true)
    http.onreadystatechange = function(){
        if(this.readyState === 4) {
            if(this.status === 201) {
                const response = JSON.parse(this.responseText)
                list.append(createTODODynamically(response.id, currentTodoInput))
            } else {
                console.log('Submission Failed')
            }
        }
        
    }
    const obj = JSON.stringify({
        "userId": 1,
        "title": currentTodoInput,
        "completed": false
    })
    http.send(obj)
}
})

