import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {

  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if(text === ''){
      alertContext.setAlert('Ingresa algo en el formulario..', 'light');
    }else{
      githubContext.searchUsers(text);
      setText('');
    }
    
  };

  
  
  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input type="text" 
              name="text" 
              placeholder="Buscar Perfiles..."
              value={text}
              onChange={onChange}
        />
        <input type="submit" value="Buscar" className="btn btn-dark btn-block"/>
      </form>
      {githubContext.users.length > 0 && 
        <button onClick={githubContext.clearUsers} className="btn btn-ligth btn-block">Limpiar</button> }
      
    </div>
  )
};



export default Search
