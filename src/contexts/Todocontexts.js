import { useContext, createContext } from "react";

export const Todocontexts = createContext({
    todos: [{
        id: 1,
        text: "message",
        completed: false
    }
    ],
    addTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleCompleted: (id) => { }
})

export const Todocontextprovider = Todocontexts.Provider

export const UseTodo = () => {
    return useContext(Todocontexts)
}
