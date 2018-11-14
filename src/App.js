import $ from "jquery";
import React, { Component } from 'react';
import logo from './minion.png';
import './App.css';
import Modal from 'react-responsive-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false, value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('O pedido foi enviado: ' + this.state.value);
    this.enviaForm(event)
    event.preventDefault();
  }
  enviaForm(event){
    event.preventDefault();
    $.ajax({
      url:'https://9bybkitu62.execute-api.us-east-1.amazonaws.com/dev/gerenciarPedidos/registrarPedido/' + this.state.value,
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data: JSON.stringify({nome:''}),
      headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Authorization": "Basic dXNlcjo5ZjA1ZmQ2MC1iODQxLTRkZjAtYWQ0My1jYjNhOGM1NjQ1Y2E=",
            "Content-Type": "application/json",
            "Host": "9bybkitu62.execute-api.us-east-1.amazonaws.com",
            "User-Agent": "PostmanRuntime/7.3.0",
            "Via": "1.1 387e6dddd12d03a0823f688d58241359.cloudfront.net (CloudFront)",
            
        },
      success: function(resposta){
        console.log(resposta);
      },
      error: function(resposta){
        console.log(resposta);
      }
    });
  }
  render() {
    const { open } = this.state;
    return (
      <div className="App">
        <section className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <span class="yellow">MinionStore </span>a sua loja de Minions.
          </p>
          <div>
            <button type="button" class="btn btn-primary" onClick={this.onOpenModal}>Registrar Pedido</button>
            <Modal open={open} onClose={this.onCloseModal} center>
              <h4>Faça aqui o seu pedido.</h4>
              <form id="form" onSubmit={this.handleSubmit} method="post">
                <div class="form-group">
                  <label>E-mail</label>
                  <input value={this.state.value} onChange={this.handleChange} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entre com o seu email" />
                </div>
                <input type="submit" class="btn btn-primary"/>
              </form>
            </Modal>
          </div>
          
          <footer>&copy; Copyright 2018 MinionStore</footer>

        </section>
      </div>
    );
  }
}

export default App;
