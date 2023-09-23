$(function() {
    todoInput = $('#todo-input')
    updateBtn = document.getElementById('btn-update')
    removeBtn = $('#btn-remove')
    list = $('#todo-list')

    currentTodoInput = ''

    todoInput.on({
        'input': function(e){
            currentTodoInput = e.target.value
        },
        'keyup': function(e){
            if(e.keyCode === 13) {
                createTODOItemAtBackend()
            }
        }
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

    function clearInputData() {
        todoInput.val('')
        currentTodoInput = ''
    }



    $('#btn-add').click(createTODOItemAtBackend)

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

    removeBtn.click(function() {
        if (list.firstElementChild === null) {
            alert("there's no item to be deleted")
        } else {
            list.remove()
        }
        
    })
    // removeBtn.addEventListener('click', function() {
    //     if (list.firstElementChild === null) {
    //         alert("there's no item to be deleted")
    //     } else {
    //         list.remove()
    //     }
        
    // })

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
        $.get('https://jsonplaceholder.typicode.com/todos', function(data, status){
            const response = data
            for(i=0; i < response.length; i++) {
                list.append(createTODODynamically(response[i].id, response[i].title))
            }
        })
        // const http = new XMLHttpRequest()
        // http.onreadystatechange = function() {
        //     if(this.readyState === 4 ){
        //         if(this.status === 200) {
        //             const response = JSON.parse(this.responseText)
        //             for(i=0; i < response.length; i++) {
        //                 list.append(createTODODynamically(response[i].id, response[i].title))
        //             }
        //         } else {
        //             console.log("Called Failed")
        //         }
                
        //     }
        // }
        // http.open('GET', 'https://jsonplaceholder.typicode.com/todos', true)
        // http.send()
    }

    getTODOListFromBackend()


    function createTODOItemAtBackend() {
        // const http = new XMLHttpRequest()
        // http.open('POST', 'https://jsonplaceholder.typicode.com/todos', true)
        // http.onreadystatechange = function(){
        //     if(this.readyState === 4) {
        //         if(this.status === 201) {
        //             const response = JSON.parse(this.responseText)
        //             list.append(createTODODynamically(response.id, currentTodoInput))

        //             // Clear Input
        //             clearInputData()
        //         } else {
        //             console.log('Submission Failed')
        //         }
        //     }
            
        // }
        // http.send(obj)

        const obj = {
            "userId": 1,
            "title": currentTodoInput,
            "completed": false
        }
        
        $.post('https://jsonplaceholder.typicode.com/todos', obj, function(data, status) {
            const response = data
            list.append(createTODODynamically(response.id, currentTodoInput))

            // Clear Input
            clearInputData()
        })
    }
})

