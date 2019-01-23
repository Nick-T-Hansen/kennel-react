import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/Owner'
import AnimalManager from "../modules/AnimalManager"
import LocationManager from "../modules/LocationManager"
import EmployeeManager from "../modules/EmployeeManager"
import OwnerManager from "../modules/OwnerManager"
import AnimalDetail from './animal/AnimalDetail'
import OwnerDetail from './owner/OwnerDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import AnimalForm from './animal/AnimalForm'


class ApplicationViews extends Component {

    state = {
        employees: [],
        animals: [],
        locations: [],
        owners: []
    }

    deleteAnimal = (id) => {
        return AnimalManager.removeAndList(id)
        .then(() => AnimalManager.getAll())
        .then(animals => this.setState({
            animals: animals
        }))
    }

    // deleteAnimal = id => {
    //     return fetch(`http://localhost:5002/animals/${id}`, {
    //         method: "DELETE"
    //     })
    //     .then(e => e.json())
    //     .then(() => fetch(`http://localhost:5002/animals`))
    //     .then(e => e.json())
    //     .then(animals => this.setState({
    //         animals: animals
    //     })
    //   )
    // }

    deleteEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/employees`))
        .then(e => e.json())
        .then(employees => this.setState({
            employees: employees
        })
        )
    }

    deleteOwner = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/owners`))
        .then(e => e.json())
        .then(owners => this.setState({
            owners: owners
        })
        )
    }

    addAnimal = (animal) => AnimalManager.post(animal)
    .then(() => AnimalManager.getAll())
    .then(animals => this.setState({
        animals: animals
        })
    )

    componentDidMount() {

        AnimalManager.getAll().then(allAnimals => {
            this.setState({
                animals: allAnimals
            })
        })

        LocationManager.getAll().then(allLocations => {
            this.setState({
                locations: allLocations
            })
        })
        EmployeeManager.getAll().then(allEmployees => {
            this.setState({
                employees: allEmployees
            })
        })
        OwnerManager.getAll().then(allOwners => {
            this.setState({
                owners: allOwners
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList {...props} deleteAnimal={this.deleteAnimal}animals={this.state.animals} />
                }} />
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props} addAnimal={this.addAnimal} employees={this.state.employees} />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />
                <Route exact path="/employees" render={(props) => {
                    return <EmployeeList deleteEmployee= {this.deleteEmployee} employees={this.state.employees} />
                }} />
                    <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    return <EmployeeDetail {...props} deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
                }} />

                <Route exact path="/owners" render={(props) => {
                    return <OwnerList deleteOwners= {this.deleteOwners} owners ={this.state.owners} />
                }} />
                <Route path="/owners/:ownerId(\d+)" render={(props) => {
                    return <OwnerDetail {...props} deleteOwner={this.deleteOwner} owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews