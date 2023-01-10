const nodes = {
	output:document.querySelector('.output'),
	input:document.querySelector('input'),
	btnAdd:document.getElementById('buttonAdd'),
	ul:document.querySelector('ul'),
	divCounter:document.getElementById('counter'),
	
}

function renderTodos(todos){
	nodes.ul.innerHTML = "";
	todos.forEach(todo => {
		let i=0;
		let newLi = document.createElement("li");
		let elNew = nodes.ul.appendChild(newLi);
		const li = `<li>${todo.title}  <span onclick='delEl(this,${i})'><button id='btnDel'+i>X</button></span></li>`;
		elNew.innerHTML += li;
		i++;
		
	});
	nodes.input.value = '';	
	totalNumberTodos();
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

// var items = nodes.ul.getElementsByClassName("btnDel");
// // items.forEach(()=>items.addEventListener('click', (e)=>items.remcve(e.target)));
// console.dir(items);

// for (let key in nodes.ul.children)
// {
// 	key=>{
// 	let item = document.getElementById(`itemDelete${key}`);
// 	item.addEventListener('click', function(e){
// 	key.removeChild(nodes.ul.children[key]);
// 	})
// 	}
// }

// let TodoDelete = document.querySelector('buttonDelete');
// nodes.btnTodoDelete.forEach(
// 	});
// })


let todos = [];
// fetch todos
const url="https://jsonplaceholder.typicode.com/todos"

fetch(url)
.then(r=>r.json())
.then(todos=>renderTodos(todos))


console.dir(nodes.ul);
console.dir(nodes.ul.childNodes);
console.dir(nodes.ul.querySelectorAll('button'));
// // let items = nodes.ul.children;
// // items.forEach(i=> push )
// let Items = nodes.ul.childNodes;
// let btnItems = nodes.ul.getElementsByClassName('btnDel');
// console.dir(btnItems);
// let arrItems = Array.from(Items, i=>i.value);
// console.dir(arrItems);
// for (let key in btnItems){
	
// 	console.dir(btnItems[key]);
// 	btnItems.addEventListener('click', function(e){
// 	delEl(element);
// 	});
// 	}
function totalNumberTodos() { 
	return nodes.divCounter.innerHTML = `Total number of TODOs: ${todos.length}`;
}

function delEl(elementUl,elementTodos){
	let li=elementUl.parentNode;
	li.parentNode.removeChild(li);
	todos.splice(elementTodos, 1);
	totalNumberTodos();
}
