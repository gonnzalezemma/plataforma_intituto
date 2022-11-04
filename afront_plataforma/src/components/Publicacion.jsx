import { useEffect, useState } from "react";

function Publicacion() {
  const url = "http://localhost:3000/materia/633b1af3a816e7168f742159/publicacion/";
  const [todos, setTodos] = useState();

  const fetchApi = async () => {
    const response = await fetch(url);

    const responseJSON = await response.json();

    setTodos(responseJSON.posts);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
<>
<ul>

{!todos? 'cargando...': Array.from(todos).map((todos,index)=>
{return <li key={todos._id}> {todos.content}</li>})}

</ul>

</>
  );
}

export default Publicacion;