function renderTodos(todos){
	nodes.ul.innerHTML = "";
	todos.forEach(todo => {
		const li = `<li data-id="${todo.id}">${todo.id}. ${todo.title} <br><div class="tickBox">Completed:<input type="checkbox"></div> Remove:  <button class="btnDelete"> X</button></li>`;
		nodes.ul.innerHTML += li;
		totalNumberTodos();
	});
}

function addTodo(todos) {
	// get last todo id:
	let id = (todos[todos.length-1].id*1+1);

	// add to todos
	const newTodo = {
		id:id,
		title: nodes.input.value,
		completed:false
	}

	todos = [...todos, newTodo];
	return todos;
	
}

function deleteTodo(todos, todoId) {
	// change state
	//TODO: find bug:
	let condition = todo => todo.id == todoId;
	idx = todos.findIndex(condition);
		// console.dir(todo);
		
	console.log(`todoId: ${todoId};idx:${idx}`);

	if(idx!== -1){
		todos.splice(idx,1);
	}

	console.dir(todos);
	
}

function refreshTodo(todos, todoId){
	let condition = todo => todo.id == todoId;
	idx = todos.findIndex(condition);
		// console.dir(todo);
		
	console.log(`todoId: ${todoId};idx:${idx}`);

	if(idx!== -1){
		console.log(idx, todos[idx]);
		todos[idx].completed = !todos[idx].completed;
	}

	console.dir(todos);
	// render state
	// renderTodos(todos)

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

// State
let todos = [];
// fetch todos
const url="http://localhost:3000/todos";

fetch(url)
.then(r=>r.json())
.then(data=>{
	todos=data;
	renderTodos(todos);
	console.dir(todos);
});

nodes.btnAdd.addEventListener('click', function(e){
	// prevent default action on submit button click
	e.preventDefault();
	todos = addTodo(todos);
	renderTodos(todos)

})

nodes.ul.addEventListener('click', function (e) {
	// if btnDelete is clicked:
	if(e.target.className=='btnDelete'){
		let todoId = e.target.parentElement.dataset.id;
		
		deleteTodo(todos, todoId)
		
		// render state
		renderTodos(todos)
	}
	else if(e.target.parentElement.className=='tickBox'){
		let todoId = e.target.parentElement.parentElement.dataset.id;
		console.log(todoId);
		// let getBoxStatus = e.target.checked;
		refreshTodo(todos, todoId);

		// render state
		// renderTodos(todos)
	}
})

