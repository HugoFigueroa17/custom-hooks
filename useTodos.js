import { useReducer, useEffect } from 'react';
import { todoReducer } from '../08-useReducer';

const initialState = [
    /*  {
         id: new Date().getTime(),
         description: 'Conectar la API lotobet',
         done: false,
     },
     {
         id: new Date().getTime() * 3,
         description: 'Registrar asistencia de los usuarios',
         done: false,
     } */
 ];
 
 //Para inicializar y que al recargar la pagina no se borren los datos
 const init = () => {
     return JSON.parse(localStorage.getItem('todos')) || [];//Si es null return un array vacion
 }

export const useTodos = () => {
  
    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos',JSON.stringify( todos ) );
    }, [todos]);


    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) =>{
       
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        });
    }

    const handleToggleTodo = ( id ) =>{

        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    } 

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    };
}
