import View from './lib/View';

class Home extends View {
	mount (props = {}, context) {
		const {
			backgroundColor = '000',
			className = '',
			text
		} = props;
		this.root = this.createElement('div', `min-h-screen`);
		console.log(backgroundColor);
		this.root.style.background = `#${backgroundColor}`;
		
		this.buttonPush = this._createButton({
			text: 'Push New Home Controller',
			className: 'bg-green-500 text-white'
		});

		this.buttonPop = this._createButton({
			text: 'Pop Current Home Controller',
			className: 'bg-red-500 text-white'
		});


		this.root.appendChild(this.buttonPush);
		this.root.appendChild(this.buttonPop);
	}

	_createButton ({
		text,
		className,
	} = {}) {
		const button = this.createElement('button', `rounded-full ${className}`);
		const buttonText = this.createElement('span');
		buttonText.textContent = text || '';
		button.appendChild(buttonText)

		return button;
	}

	getRoot () {
		return this.root;
	}

	unmount (props = {}, root, context) {
		// any set timeouts or set intervals

	}

	rehydrate (root, context) {

	}

	dehydrate (root, context) {

	}

	// displayTodos(todos) {
 //    // Delete all nodes
 //    while (this.todoList.firstChild) {
 //      this.todoList.removeChild(this.todoList.firstChild)
 //    }

 //    // Show default message
 //    if (todos.length === 0) {
 //      const p = this.createElement('p')
 //      p.textContent = 'Nothing to do! Add a task?'
 //      this.todoList.append(p)
 //    } else {
 //      // Create nodes
 //      todos.forEach(todo => {
 //        const li = this.createElement('li')
 //        li.id = todo.id

 //        const checkbox = this.createElement('input')
 //        checkbox.type = 'checkbox'
 //        checkbox.checked = todo.complete

 //        const span = this.createElement('span')
 //        span.contentEditable = true
 //        span.classList.add('editable')

 //        if (todo.complete) {
 //          const strike = this.createElement('s')
 //          strike.textContent = todo.text
 //          span.append(strike)
 //        } else {
 //          span.textContent = todo.text
 //        }

 //        const deleteButton = this.createElement('button', 'delete')
 //        deleteButton.textContent = 'Delete'
 //        li.append(checkbox, span, deleteButton)

 //        // Append nodes
 //        this.todoList.append(li)
 //      })
 //    }

 //    // Debugging
 //    console.log(todos)
 //  }


	bindButtonPush (handler) {
		this.buttonPush.addEventListener('click', e => {
			handler && handler();
		});
	}

	bindButtonPop (handler) {
		this.buttonPop.addEventListener('click', e => {
			handler && handler();
		});
	}
}

export default Home;