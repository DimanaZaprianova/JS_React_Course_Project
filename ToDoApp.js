const nodes = {
	output:document.querySelector('.output'),
	input:document.querySelector('input'),
	btnAdd:document.querySelector('button'),
	ul:document.querySelector('ul')
}

function renderInput(title){
	// add <li>Item 1 span	</li> into ul

	// Variant 1
	const li = `<li>${title}  <span>X</span></li>`;
	nodes.ul.innerHTML += li;

	// Variant 2
	// Create element object
	// const li = document.createElement('LI');
	// console.dir(li);
	// li.innerHTML = title;
	// // Add it into DOM
	//  nodes.ul.appendChild(li);
}

function renderTodos(todos){
	nodes.ul.innerHTML = "";
	todos.forEach(todo => {
		const li = `<li>${todo.title}  <span>X</span></li>`;
		nodes.ul.innerHTML += li;
	});
}

nodes.btnAdd.addEventListener('click', function(e){
	// prevent default action on submit button click
	e.preventDefault();
	// add to todos
	const newTodo = {
		title: nodes.input.value,
		complete:false
	}
	todos = [...todos, newTodo];
	console.dir(todos);
	renderTodos(todos)

})

let todos = [];
// fetch todos
const url="https://jsonplaceholder.typicode.com/todos"

fetch(url)
.then(r=>r.json())
.then(todos=>renderTodos(todos))
