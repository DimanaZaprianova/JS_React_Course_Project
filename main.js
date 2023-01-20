function renderTodos(todos){
	nodes.ul.innerHTML = "";
	todos.forEach(todo => {
		const li = `<li data-id="${todo.id}"> ${todo.title} <br><div>Completed:<button class="tickBox" id="tickBox${todo.id}"> DONE</button></div> Remove:  <button class="btnDelete"> X</button></li>`;
		nodes.ul.innerHTML += li;
		if (todo.completed){
			document.getElementById(`tickBox${todo.id}`).style.color='rgba(14,141,34,0.33)'
		};
		totalNumberTodos();
		nodes.input.value = '';
	});
}

function addTodo(todos) {
	// get last todo id:
	// let id = (todos[todos.length-1].id)+1;

	// add to todos
	const newTodo = {
		"title": nodes.input.value,
		"completed":false
	}

	let route = '/todos'
	fetch(base+route, {
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify(newTodo)
	})
	.then(resp=>{
		if (resp.ok){
			return resp.json()
		}else{
			throw('can not post data')
		}
	})
	.then(data=>{
		console.log(data);
		todos = [...todos, data]
	})
	.catch(err=>console.error(`ERROR: ${err}`))
};

function deleteTodo(todos, todoId) {
	// change state
	console.log(todoId);
	idx = todos.findIndex(todo => todo.id === todoId*1);
	// console.dir(todo);
		
	console.log(`todoId: ${todoId};idx:${idx}`);

	if(idx!== -1){
		todos.splice(idx,1);
		deleteTodoDB(todoId);
	}

	console.dir(todos);
	
}

function deleteTodoDB(idx) {
	let route = '/todos/'+idx; 
	fetch(base+route, {method:'DELETE'})
	.then(resp=>{
		if (resp.ok){
			todos = todos.filter(todo=>id!=todo.id);
			console.log(todos);
		}else{
			throw('cannot delete data')
		}
	})
	.catch(err=>console.error(`ERROR: ${err}`))
}

function updateTodo(todos, todo){
	let todoId = todo.charAt(todo.length-1);
	console.log(todoId);
	idx = todos.findIndex(todo => todo.id === todoId*1);
		// console.dir(todo);
		
	console.log(`todoId: ${todoId};idx:${idx}`);

	if(idx!== -1){
		console.log(idx, todos[idx]);
		todos[idx].completed = !todos[idx].completed;
		console.log(todos[idx].completed);
		updateTodoDB(idx, todoId, todos);
		console.log(todos[idx]);
	}

}

function updateTodoDB(idx, todoId, todos) {
	let route = '/todos/'+todoId; 
	console.log(todos[idx]);
	fetch(base+route, {
		method:'PUT',
		body: JSON.stringify(todos[idx]),
		headers: {
			'Content-Type': 'application/json'
		  }
	}
	)
	.then(resp=>{
		if (resp.ok){
		
		}else{
			throw('cannot update data')
		}
	})
	.catch(err=>console.error(`ERROR: ${err}`))

}

function totalNumberTodos() { 
	return nodes.divCounter.innerHTML = `Total number of TODOs: ${todos.length}`;
}

const nodes = {
	output:document.querySelector('.output'),
	input:document.querySelector('input'),
	btnAdd:document.querySelector('button'),
	ul:document.querySelector('ul'),
	divCounter:document.getElementById('counter'),
}

let base = 'http://localhost:9999'

let todos = [];

let newTodo = {
	"title":"TodoNew",
	"completed":false
};

function fetchTodos() {
	let route = '/todos';
	fetch(base+route)
	.then(resp=>{
		if (resp.ok){
			return resp.json()
		}else{
			throw new Error(`Error: response status code is ${response.status}`)
		}
	})
	.then(data=>{
		todos = [...data];
		renderTodos(todos);
	})
	.catch(err=>console.error(err.message));
}


nodes.btnAdd.addEventListener('click', function(e){
	// prevent default action on submit button click
	e.preventDefault();
	todos = addTodo(todos);
	renderTodos(todos)

})

nodes.ul.addEventListener('click', function (e) {
	// if btnDelete is clicked:
	if(e.target.className =='btnDelete'){
		let todoId = e.target.parentElement.dataset.id;
		deleteTodo(todos, todoId);
		renderTodos(todos)
	}
	else if(e.target.className =='tickBox'){
		console.log(e.target);
		let todo = e.target.getAttribute('id');
		updateTodo(todos, todo);
		renderTodos(todos);
		
	}
})

fetchTodos();
