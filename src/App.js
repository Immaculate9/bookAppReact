import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Axios from "axios";
import { Modal, Label, Input, FormGroup, ModalHeader,ModalBody, ModalFooter, Table, Button } from "reactstrap";

class App extends Component {
      state ={
        books: [],
        newBookData:{
          title: '',
          author: '',
          publisher: ''
        },
        editBookData:{
          title: '',
          author: '',
          publisher: ''
        },
        newBookModal:false
      }

     componentDidMount(){
     
             Axios.get('https://localhost:44354/api/Books')
       .then((response) =>{
        this.setState({
          books: response.data
        });        
       })
       .catch(error =>{
         console.log(error);
       })
    
      }
      toggleNewBookModel(){
        this.setState({
          newBookModal: ! this.state.newBookModal
        });
      }
      addBook(){
        Axios.post('https://localhost:44354/api/Books', this.state.newBookData).then((response)=>{
          //console.log(response.data);
          let {books} = this.state;

          books.push(response.data);

          this.setState({books, newBookModal: false,  newBookData:{
            title: '',
            author: '',
            publisher: ''
          }});
        });
      }
      
      editBook(title, author, publisher){
        console.log(title)

      }
      
    render() {
      const books = this.state.books.map((book=>{
        return(
          <tr key ={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>
                  <Button color ="success" size="sm" className="mr-2" 
                  onClick={this.editBook.bind(this, book.title, book.author, book.publisher)}>Edit</Button>
                  <Button color ="danger" size="sm">Delete</Button>
                  </td>
                </tr>

        );
      }));
      
      return(
          <div className="App-container">
            <h1>Book App</h1>

   <Button className="my-3" color="primary" onClick={this.toggleNewBookModel.bind(this)}>Add Book</Button>
      <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModel.bind(this)}>
        <ModalHeader toggle={this.toggleNewBookModel.bind(this)}>Add a new book</ModalHeader>
        <ModalBody>
        <FormGroup>
        <Label for="title">Title</Label>
        <Input id="title" value={this.state.newBookData.title}
        onChange={(e)=>{
          let {newBookData} = this.state;
          
          newBookData.title = e.target.value;

          this.setState({newBookData});
        }} />
      </FormGroup>
        <FormGroup>
        <Label for="author">Author</Label>
        <Input id="author"value={this.state.newBookData.author}
        onChange={(e)=>{
          let {newBookData} = this.state;
          
          newBookData.author = e.target.value;

          this.setState({newBookData});
        }} />
      </FormGroup>
        <FormGroup>
        <Label for="publisher">Publisher</Label>
        <Input id="publisher"value={this.state.newBookData.publisher}
        onChange={(e)=>{
          let {newBookData} = this.state;
          
          newBookData.publisher = e.target.value;

          this.setState({newBookData});
        }} />
      </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addBook.bind(this)}>Add book</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBookModel.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

            <Table>
              <thead>
                <tr className="TableBody" >
                  <th>Book Id</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher </th>
                  <th>Actions </th>
                </tr>
              </thead>

              <tbody>
              {books}
              </tbody>
            </Table>
            
          </div>
      );
    }




  }

export default App;
