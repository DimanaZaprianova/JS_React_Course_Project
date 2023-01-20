let base = 'http://localhost:3000'

let todos = [];

let newTodo = {
	"title":"TodoNew",
	"completed":false
};

function fetchTodos() {
	let route = '/todos'
	fetch(base+route)
	.then(resp=>{
		if (resp.ok){
			return resp.json()
		}else{
			throw('can not post data')
		}
	})
	.then(data=>{
		todos = [...data]
		console.log(todos);
	})
	.catch(err=>console.error(`ERROR: ${msg}`))
}

function addTodo(title) {
	let newTodo = {
		"title":title,
		"completed":false
	};

	let route = '/todos'
	fetch(base+route,{
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
	.catch(err=>console.error(`ERROR: ${msg}`))
};

function deleteTodo(id) {
	let route = '/todos/'+id
	fetch(base+route, {method:'DELETE'})
	.then(resp=>{
		if (resp.ok){
			todos = todos.filter(todo=>id!=todo.id);
			console.log(todos);
		}else{
			throw('can not post data')
		}
	})
}

// fetchTodos();
// deleteTodo(5);
addTodo('Todo 8');