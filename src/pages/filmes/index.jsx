import React, {Component} from 'react';
import Menu from '../../components/menu';
import Jumbotron from '../../components/jumbotron';

class Filmes extends Component {
    
    constructor(){
        super();

        this.state = {
            url : 'https://5f872e1849ccbb0016177145.mockapi.io/api/Filme',
            filmes : [],
            id : '',
            nome : '',
            categoria : '',
            dataLanc : ''
        }
    }

    componentDidMount(){
        this.listar();
    }

    listar = () =>{
        fetch(this.state.url, {
            method : 'GET'
        })
        .then(response => response.json())  
        .then(dados => {
            this.setState({
                filmes : dados,
                id : '',
                nome : '',
                categoria : '',
                dataLanc : ''
            });
        })
        
        .catch(err => console.error(err));
    }
    
    remover(event){
        event.preventDefault();

        fetch(this.state.url + "/" + event.target.value, {
            method : 'DELETE'
          })
          .then(response => response.json())
          .then( dados => {
            alert('Filme removido');
            this.listar();
          })
          .catch(err => console.error(err))
        
    }
    
    salvar(event){
        event.preventDefault();

          const filme = {
            nome : this.state.nome,
            categoria : this.state.categoria,
            dataLanc : this.state.dataLanc,
          }
          let filmeId = this.state.id;
          let method = (filmeId === "" ? 'POST' : 'PUT');
          let urlRequest = (filmeId === "" ? this.state.url : this.state.url + '/' + filmeId);

          fetch(urlRequest, {
            method : method,
            body : JSON.stringify(filme),
            headers : {
              'content-type' : 'application/json'
            }
          })
          .then(response => response.json)
          .then(dado => {
            alert("Filme salvo");
        
            this.listar();
          })
          .catch(err => console.error(err));
    }

    setNome(event){
        event.preventDefault();

        this.setState({nome : event.target.value})
    }

    limparCampos(event){
        this.setState({
            id : '',
            nome : '',
            categoria : '',
            dataLanc : ''
        })
    }

    editar(event){
        event.preventDefault();

        fetch(this.state.url + "/" + event.target.value, {
            method : "PUT",

          })
          .then(response => response.json())
          .then( dado =>{
              this.setState({id : dado.id});
              this.setState({nome : dado.nome});
              this.setState({categoria : dado.categoria});
              this.setState({dataLanc : dado.dataLanc});

          })
          .catch(err => console.error(err))

    }

    render(){
        return (
            <div>
                <Menu />
                <Jumbotron titulo="Filmes" descricao="Gerencie os seus filmes" />
                <div className="container">
                    <div className="bd-example" >
                        <form id="formFilme" onSubmit={this.salvar.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" onChange={this.setNome.bind(this)} value={this.state.nome}  aria-describedby="nome" placeholder="Informe o Nome" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoria">Categoria</label>
                            <input type="text" className="form-control" id="categoria" onChange={event => this.setState({categoria : event.target.value})} value={this.state.categoria} placeholder="Informe a Categoria"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ano">Ano de Lançamento</label>
                            <input type="text" className="form-control small" id="ano" onChange={event => this.setState({dataLanc : event.target.value})} value={this.state.dataLanc} placeholder="Informe o Ano de Lançamento" />
                        </div>
                        <button type="reset" onClick={this.limparCampos.bind(this)} className="btn btn-secondary">Cancelar</button>
                        <button type="submit" className="btn btn-success">Salvar</button>
                    </form>
                    <table class="table" style={{margintop: "40px"}}>
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Ano Lançamento</th>
                            <th scope="col">Ações</th>
                            <th scope="col"><button type="reset" onClick={this.limparCampos.bind(this)}  className="btn btn-primary">Novo Filme</button></th>
                        </tr>
                        </thead>
                        <tbody id="tabela-lista-corpo">
                            {
                                this.state.filmes.map( item => {
                                   return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.dataLanc}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={this.remover.bind(this)} value={item.id}>Remover</button>
                                            <button type="button" className="btn btn-warning" onClick={this.editar.bind(this)} value={item.id}>Editar</button>
                                        </td>
                                    </tr>
                                   )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        )
    }
}

export default Filmes;  