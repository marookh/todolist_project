const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test("todolist has a an array", () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test("Check the first todo", () => {
    expect(list.first()).toEqual(todo1);
  });

  test("Check the last todo", () => {
    expect(list.last()).toEqual(todo3);
  });

  test("Shift removes and returns the first todo", () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.size()).toBe(2);
  });

  test("pop removes and returns the last todo", () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test("isDone returns true if all items are done", () => {
    expect(list.isDone()).toBe(false);
  });

  test("add raises an error when the item isn't a todo", () => {
    expect(() => list.add("a todo")).toThrow(TypeError);
    expect(() => list.add(2)).toThrow(TypeError);
    expect(() => list.add((new TodoList()))).toThrow(TypeError);
  });

  test("itemAt raises a reference error for out of bount access", () => {
    expect(() => list.itemAt(5)).toThrow(ReferenceError);
    expect(() => list.itemAt(-5)).toThrow(ReferenceError);
  });

  test('markDoneAt marks todo at given index done', () => {
    expect(() => list.markDoneAt(6)).toThrow(ReferenceError);
  
    list.markDoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test("markUndoneAt undones a todo at give index", () => {
    expect(() => list.markUndoneAt(8).toThrow(ReferenceError));

    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(false);
  });

  test("markAllDone marks all item done", () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test("removeAt removes an item at a give index", () => {
    expect(() => list.removeAt(4)).toThrow(ReferenceError);
    expect(list.removeAt(1)).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });
  
  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });
  
  test("forEach iterates over all items in list", () => {
    list.toArray().forEach((todo) => {
      todo.markUndone();
    });

    expect(list.isDone()).toBe(false);
  });

  test("forEach iterates over all todos", () => {
    let result = [];

    list.toArray().forEach(item => result.push(item));
    expect(result).toEqual([todo1, todo2, todo3]);
  });

  test("filter fiters out todo list and returns a new todo list", () => {
    let filteredList = list.filter((item) => item.isDone());
    let expected = {title: "Today's Todos", todos: []}
    expect(filteredList).toEqual(expected);
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);
  
    expect(newList.title).toBe(list.title);
  
    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });

  test("allNotDone returns an array of undone items", () => {
    let undones = list.allNotDone();
    expect(typeof undones).toBe("object");
  });

  test("getTitle gets the title of a todo", () => {
    expect(todo1.getTitle()).toBe("Buy milk");
  });

  test("findByTitle returns the first item with the specified title", () => {
    expect(list.findByTitle("Clean room")).toEqual(todo2);
  });
});