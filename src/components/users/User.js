import React, {Fragment ,Component } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

export class User extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  render() {
    const {
      name, 
      avatar_url, 
      location, 
      bio, 
      blog,
      company,
      login, 
      html_url, 
      followers, 
      following,
      public_repos,
      public_gists,
      hireable
          } = this.props.user
    const {loading, repos} = this.props; 

    if(loading) return <Spinner/>
    
    return (
     <Fragment>
       <Link to='/' className="btn btn-light">Volver..</Link>
       Contratable: {' '}
       { 
        hireable ? <i className="fas fa-check text-success"></i> : 
        <i className="fas fa-times-circle text-danger"></i>
       }
       <div className="card grid-2">
         <div className="all-center">
           <img src={avatar_url} className="round-img" alt="Avatar img" style={{width: '150px'}}/>
           <h1>{name}</h1>
           <p>Ubicacion: {location}</p>
         </div>
         <div>
           {bio && (<Fragment> <h3>Bio</h3><p>{bio}</p></Fragment>) }
           <a href={html_url} className="btn btn-dark my-1">Visitar Perfil</a>
           <ul>
             <li>
               {login && <Fragment><strong>Usuario: </strong>{login}</Fragment>}
             </li>
             <li>
               {company && <Fragment><strong>Empresa: </strong>{company}</Fragment>}
             </li>
             <li>
               {blog && <Fragment><strong>Blog: </strong>{blog}</Fragment>}
             </li>
           </ul>
         </div>
       </div>
       <div className="card text-center">
         <div className="badge badge-primary">Seguidores: {followers}</div>
         <div className="badge badge-success">Siguiendo: {following}</div>
         <div className="badge badge-light">Repositorios Publicos: {public_repos}</div>
         <div className="badge badge-dark">Gists Publicos: {public_gists}</div>
       </div>
       <Repos repos={repos}/>
     </Fragment>
    )
  }
}

export default User
