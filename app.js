class TodoList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        todos: [],
        newTodo: '',
        filter: 'all',
        theme: 'light'
      };
    }
  
    componentDidMount() {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        this.setState({ todos: JSON.parse(storedTodos) });
      }
  
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        this.setState({ theme: storedTheme });
      }
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.todos !== this.state.todos) {
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
      }
  
      if (prevState.theme !== this.state.theme) {
        localStorage.setItem('theme', this.state.theme);
      }
    }
  
    handleInputChange = (event) => {
      this.setState({ newTodo: event.target.value });
    }
  
    handleAddTodo = () => {
      if (this.state.newTodo.trim() === '') {
        return;
      }
  
      const newTodoItem = {
        id: Date.now(),
        text: this.state.newTodo,
        completed: false
      };
  
      this.setState((prevState) => ({
        todos: [...prevState.todos, newTodoItem],
        newTodo: ''
      }));
    }
  
    handleTodoToggle = (id) => {
      this.setState((prevState) => ({
        todos: prevState.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      }));
    }
  
    handleTodoDelete = (id) => {
      this.setState((prevState) => ({
        todos: prevState.todos.filter(todo => todo.id !== id)
      }));
    }
  
    handleFilterChange = (filter) => {
      this.setState({ filter });
    }
  
    handleThemeChange = () => {
      const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
      this.setState({ theme: newTheme });
    }
  
    render() {
      const filteredTodos = this.state.filter === 'active'
        ? this.state.todos.filter(todo => !todo.completed)
        : this.state.filter === 'completed'
        ? this.state.todos.filter(todo => todo.completed)
        : this.state.todos;
  
      const themeClass = this.state.theme === 'dark' ? 'dark-theme' : '';
  
      return (
        <div className={`container ${themeClass}`}>
          <h1>Todo List</h1>
          <div className="todo-form">
            <input
              className="todo-input"
              type="text"
              value={this.state.newTodo}
              onChange={this.handleInputChange}
              placeholder="Enter a new todo..."
            />
            <button className="todo-button" onClick={this.handleAddTodo}>Add Todo</button>
          </div>
          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
              >
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.handleTodoToggle(todo.id)}
                />
                <span className="text">{todo.text}</span>
                <button
                  className="delete-button"
                  onClick={() => this.handleTodoDelete(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="filter-buttons">
            <button
              className={`filter-button ${this.state.filter === 'all' ? 'active' : ''}`}
              onClick={() => this.handleFilterChange('all')}
            >
              All
            </button>
            <button
              className={`filter-button ${this.state.filter === 'active' ? 'active' : ''}`}
              onClick={() => this.handleFilterChange('active')}
            >
              Active
            </button>
            <button
              className={`filter-button ${this.state.filter === 'completed' ? 'active' : ''}`}
              onClick={() => this.handleFilterChange('completed')}
            >
              Completed
            </button>
          </div>
          <button className="theme-button" onClick={this.handleThemeChange}>
            {this.state.theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
          </button>
        </div>
      );
    }
  }
  
  ReactDOM.render(<TodoList />, document.getElementById('root'));
  