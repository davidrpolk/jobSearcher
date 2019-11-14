import React from 'react';
import axios from 'axios';
import Form from './Form';
import logo from './spark2.jpg';
import  EventEmitter from './EventEmitter'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: []
    }
    this.addJobs = this.addJobs.bind(this);
    EventEmitter.subscribe('jobAdded', () => this.addJobs());
  }

  componentDidMount() {
    this.addJobs();
  }
  
  addJobs() {
    axios.get('http://localhost:8080/allJobs')
      .then(response => {
        this.setState({jobs: response.data})
        EventEmitter.dispatch('jobsLoaded', this.state.jobs)
      })
      .catch(err => console.error(err));

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
        <img className="App-logo" src={logo} alt="Halle Bot"/>
          <h1>Get Dem JOBS</h1>
        </header>
        <Form jobs={this.state.jobs} addJobs={this.addJobs}/>
        
      </div>
    );
  }
}

export default App;
