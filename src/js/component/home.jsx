import React, { useState, useEffect } from "react";

const Home = () => {
  const [value, setValue] = useState("");
  // Creamos la lista 
  const [list, setList] = useState([{
    label:"First task and not least", 
    id:"1",
    done:false
  }]); // Es un objeto que tenga label {label:"",id:"1",done: false} 

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
      // Se crea un nuevo objeto de tarea con el valor actual y estado inicial de "done"
      const newTask = { label: value, done: false,  id: Date.now().toString() };
      // Crear una nueva lista con la tarea agregada al final
      const updatedList = [...list, newTask];

      // Enviar la lista actualizada al servidor utilizando el método PUT
      fetch("https://assets.breatheco.de/apis/fake/todos/user/jorgesamper", {
        method: "PUT",
        body: JSON.stringify(updatedList),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          // Actualizar la lista local y restablecer el valor del campo de entrada
          setList(updatedList);
          setValue("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDelete = (id) => {
    // Filtrar la lista para eliminar la tarea con el ID especificado
    const updatedList = list.filter((item) => item.id !== id);

    // Enviar la lista actualizada al servidor utilizando el método PUT
    fetch("https://assets.breatheco.de/apis/fake/todos/user/jorgesamper", {
      method: "PUT",
      body: JSON.stringify(updatedList),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // Actualizar la lista local
        setList(updatedList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Cargar la lista inicial desde el servidor cuando el componente se monta
    fetch("https://assets.breatheco.de/apis/fake/todos/user/jorgesamper")
      .then((resp) => resp.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
