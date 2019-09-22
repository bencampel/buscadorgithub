import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Search extends Component {

  state = {
    text: ''
  };

  static propTypes = {
    searchUser: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    if(this.state.text === ''){
      this.props.setAlert('Ingresa algo en el formulario..', 'light');
    }else{
      this.props.searchUser(this.state.text);
      this.setState({text: ''});
    }
    
  };

  render() {
    const {showClear, clearUser} = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input type="text" 
                 name="text" 
                 placeholder="Buscar Perfiles..."
                 value={this.state.text}
                 onChange={this.onChange}
          />
          <input type="submit" value="Buscar" className="btn btn-dark btn-block"/>
        </form>
        {showClear && <button onClick={clearUser} className="btn btn-ligth btn-block">Limpiar</button> }
        
      </div>
    )
  };
}

export default Search
