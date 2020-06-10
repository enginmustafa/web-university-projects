import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class Cars extends Component {
  state = {
    cars: [],
    newCarData: {
      brand: '',
      model: '',
      color: ''
    },
    editCarData: {
      id: '',
      brand: '',
      model: '',
      color: ''
    },
    newCarModal: false,
    editCarModal: false
  }
  componentWillMount() {
    this._refreshCars();
  }
  toggleNewCarModal() {
    this.setState({
      newCarModal: ! this.state.newCarModal
    });
  }
  toggleEditCarModal() {
    this.setState({
      editCarModal: ! this.state.editCarModal
    });
  }
  addCar() {
    axios.post('http://localhost:3000/cars', this.state.newCarData).then((response) => {
      let { cars } = this.state;

      cars.push(response.data);

      this.setState({ cars, newCarModal: false, newCarData: {
        brand: '',
        model: '',
        color: ''
      }});
    });
  }
  updateCar() {
    let { brand, model, color } = this.state.editCarData;

    axios.put('http://localhost:3000/cars/' + this.state.editCarData.id, {
      brand, model,color
    }).then((response) => {
      this._refreshCars();

      this.setState({
        editCarModal: false, editCarData: { id: '', brand:'', model: '', color: '' }
      })
    });
  }
  editCar(id, brand, model, color) {
    this.setState({
      editCarData: { id, brand, model, color }, editCarModal: ! this.state.editCarModal
    });
  }
  deleteCar(id) {
    axios.delete('http://localhost:3000/cars/' + id).then((response) => {
      this._refreshCars();
    });
  }
  _refreshCars() {
    axios.get('http://localhost:3000/cars').then((response) => {
      this.setState({
        cars: response.data
      })
    });
  }
  render() {
    let cars = this.state.cars.map((car) => {
      return (
        <tr key={car.id}>
          <td>{car.id}</td>
          <td>{car.brand}</td>
          <td>{car.model}</td>
          <td>{car.color}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editCar.bind(this, car.id, car.brand, car.model, car.color)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteCar.bind(this, car.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <Button className="my-3" color="primary" onClick={this.toggleNewCarModal.bind(this)}>Create car</Button>

      <Modal isOpen={this.state.newCarModal} toggle={this.toggleNewCarModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewCarModal.bind(this)}>Create new car</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="brand">Brand</Label>
            <Input id="brand" value={this.state.newCarData.brand} onChange={(e) => {
              let { newCarData } = this.state;

              newCarData.brand = e.target.value;

              this.setState({ newCarData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="model">Model</Label>
            <Input id="model" value={this.state.newCarData.model} onChange={(e) => {
              let { newCarData } = this.state;

              newCarData.model = e.target.value;

              this.setState({ newCarData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="color">Color</Label>
            <Input id="color" value={this.state.newCarData.color} onChange={(e) => {
              let { newCarData } = this.state;

              newCarData.color = e.target.value;

              this.setState({ newCarData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addCar.bind(this)}>Create car</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewCarModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editCarModal} toggle={this.toggleEditCarModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditCarModal.bind(this)}>Edit car</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="brand">Brand</Label>
            <Input id="brand" value={this.state.editCarData.brand} onChange={(e) => {
              let { editCarData } = this.state;

              editCarData.brand = e.target.value;

              this.setState({ editCarData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="model">Model</Label>
            <Input id="model" value={this.state.editCarData.model} onChange={(e) => {
              let { editCarData } = this.state;

              editCarData.model = e.target.value;

              this.setState({ editCarData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="color">Color</Label>
            <Input id="color" value={this.state.editCarData.color} onChange={(e) => {
              let { editCarData } = this.state;

              editCarData.color = e.target.value;

              this.setState({ editCarData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateCar.bind(this)}>Update car</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditCarModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Color</th>
            </tr>
          </thead>

          <tbody>
            {cars}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Cars;
