import React, { useState } from "react";

const Home = () => {
  const [value, setValue] = useState("");
  // Creamos la lista 
  const [list, setList] = useState([{label:"First task and not least", id:"1",done:false}]); // Es un objeto que tenga label {label:"",id:"1",done: false} 

  // Ahora mismo -> Array(strings) -> ["First task and not least"]
  // Next -> Array(objects) -> [{label:"First task and not least", id:"1",done:false}]

  /**
   * Steps
   * 1. Cambiar la forma de nuestro estado
   * 2. Cambiar como accedemos a la lista en los componentes que la usen
   * 3. Poder añadir nuevos objetos a la lista
   * 4. Poder eliminar objectos de la lista
   */
  
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value.trim() !== "") {
      /** Esto seguro que hay que cambiarlo:3 */
      const newTask = { label: value, done: false };
      const updatedList = [...list, newTask];


      fetch('https://assets.breatheco.de/apis/fake/todos/user/jorgesamper', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });
    }
  };

  /** Esto seguro que hay que cambiarlo: 4 */
  const handleDelete = (index) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="text-center bg-light shadow-sm mx-3">
      <h1 className="text-center mt-5 pt-2">TodoList!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <input
          onChange={handleChange}
          value={value}
          placeholder="Write a task..."
          className="border w-100 bg-light text-center"
        />
      </form>

      <br />
      {/** Esto seguro que hay que cambiarlo: 2 */}
      {list.map((toDo, index, label) => (
        <div
          key={index}
          className="d-flex justify-content-start border-bottom"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(-1)}
        >
          <div className="text-start mx-3 d-flex align-items-center">
    
            {toDo.label}
          </div>
          {hoverIndex === index && (
            <button
            onClick={() => handleDelete(index)}
            className="btn ms-auto text-end mx-2"
            style={{ color: "red" }}
            >
              X
            </button>
          )}
        </div>
      ))}
      <span className="fw-bold text-primary mb-4">
        TOTAL Nº{list.length}
      </span>
    </div>
  );
};

export default Home;