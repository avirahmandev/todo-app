const todoForm = document.querySelector('.todo-form');
// ambil tag input form
const todoInput1 = document.querySelector('.todo-input1');
const todoInput2 = document.querySelector('.todo-input2');
// ambil tag <ul>
const todoItemsList = document.querySelector('.todo-items');

// array untuk penyimpanan todos
let todos = [];

todoForm.addEventListener('submit', function(event) {
	
	// cegah halaman untuk refresh
	event.preventDefault();

	// cek apakah input1 (judul) memiliki nilai/tidak kosong
	// input2 (deskripsi) optional
	if (todoInput1.value !== '' && ' ') {
		// panggil function addTodo untuk menambahkan item
		addTodo(todoInput1.value, todoInput2.value);
		// tutup modal input form
		$('#modalAdd').modal('hide');
	}
});

// function untuk memasukkan item
function addTodo(item1, item2) {
	// buat objek todo, yg memiliki id, nama, deskripsi, dan status
	const todo = {
		id: Date.now(), // gunakan waktu saat ini untuk nilai id
		name: item1,
		description: item2,
		status: false
	};

	// masukkan item ke dalam array todos
	todos.push(todo);
	// simpan data array todos di localStorage
	addToLocalStorage(todos);

	// hapus nilai input from
	todoInput1.value = '';
	todoInput2.value = '';
}

// function menampilkan data ke layar
function renderTodos(todos) {
	// bersihkan/hapus data yg ada sebelumnya di <ul>
	todoItemsList.innerHTML = '';

	// ambil data 1 per 1 dari array todos
	todos.forEach(function(item) {

		// buat tag <li>
		const li = document.createElement('li');
		// tambahkan class <li class=''></li>
		li.setAttribute('class', 'jumbotron item');
		// tambahkan data-key <li class='item' data-key='12345678></li>
		li.setAttribute('data-key', item.id);

		// li.setAttribute('onclick', "toggle("+item.id+")");
		
		// cek apakah status true/false
		if (item.status === true) {
			var checked = 'checked';
			// tambahkan class checked <li class='item checked'></li>
			li.setAttribute('class', 'jumbotron item checked');
		} else {
			var checked = '';
		}

		// tambahkan input cek list & tombol hapus di dalam <li>
		li.innerHTML = `
				<div class="sections custom-control custom-checkbox checkbox" onclick="toggle(${item.id})">
				<input type="checkbox" class="custom-control-input" id="checkbox" ${checked}>
				&nbsp;&nbsp;&nbsp;&nbsp;
				<label class="custom-control-label" for="checkbox"></label>
				<span class="judul">${item.name}</span>
				<p class="description">${item.description}</p>
				</div>
				<span class="delete" data-toggle="modal" data-target="#modalDel">&times;
				</span>
				<div class="clear"></div>
				
		`;

		// tambahkan/masukkan <li> ke dalam <ul>
		todoItemsList.append(li);
	});
}

// function untuk menambahkan todos ke localStorage
function addToLocalStorage(todos) {
	// convert array ke string
	localStorage.setItem('todos', JSON.stringify(todos));
	// tampilkan data ke layar
	renderTodos(todos);
}

// function mengambil data todos from localStorage
function getFromLocalStorage() {
	const getData = localStorage.getItem('todos');
	// convert kembali ke array dan masukkan ke array todos
	todos = JSON.parse(getData);
	renderTodos(todos);
}

// function untuk status selesai/belum
function toggle(id) {
	todos.forEach(function(item) {
		if (item.id == id) {
			// ubah nilai status
			item.status = !item.status;
		}
	});
	// update data
	addToLocalStorage(todos);
}

// function hapus item/todo
function deleteTodo(id) {

	  todos = todos.filter(function(item) {
	  	
    return item.id != id;
  });

	// update data
	addToLocalStorage(todos);
}

// cek apakah localStorage sudah dibuat
if (localStorage['todos']) {
	// ambil data dari localStorage
	getFromLocalStorage();
} else {
	// jika tidak ada buat localStorage
	localStorage.setItem('todos', '[]');
}

todoItemsList.addEventListener('click', function(event) {

	// cek apakah tombol button delete ditekan
	if (event.target.classList.contains('delete')) {

	// ambil id/data-key dari tag <li> dimana button delete ditekan
		deleteTodo(event.target.parentElement.getAttribute('data-key'));
	}
});