import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Job from './Job';
import EventEmitter from './EventEmitter';
import "react-datepicker/dist/react-datepicker.css";
import './Form.css';

function Form(props) {
  const [ form, setForm ] = useState({ company: '', role: '', link: '', description: '' })
  const [ jobs, setJobs ] = useState([]);

  EventEmitter.subscribe('jobsLoaded', (jobs) => setJobs(jobs));
  
  const handleInput = e => {
    const {name, value} = e.target;
    setForm({...form, [name]: value})
  }

  const submitForm = (e) => {
    e.preventDefault();
    const { company, role, link, description } = form;
    axios.post(`http://localhost:8080/job?company=${company}&role=${role}&link=${link}&description=${description}`)
      .then(res => {
        EventEmitter.dispatch('jobAdded', null)
      })
      .catch(err => console.error(err))

  }

  useEffect(() => {
    setJobs(props.jobs)
  }, [props.jobs])

  return (
    
    <table className="Form">
      <tbody>
        <tr className="Form-tr">
          <th>Company</th>
          <th>Role</th>
          <th>Description</th>
          <th>Link</th>
        </tr>
        <tr>
          <td>
            <input value={form.company} className="Form-input" placeholder="Company" name="company" onChange={handleInput}/>
          </td>
          <td>
            <input value={form.role} className="Form-input Form-input-role" placeholder="Role" name="role" onChange={handleInput}/>
          </td>
          <td>
            <input value={form.description} className="Form-input Form-input-description" placeholder="Description" name="description" onChange={handleInput}/>
          </td>
          <td>
            <input value={form.link} 
            className="Form-input Form-input-url" placeholder="Job Post URL" name="link" onChange={handleInput}/>
          </td>
          <td>
            <button className="Form-input-button" onClick={submitForm}>submit</button>
          </td>
        </tr>
        {
          jobs.map(job => <Job job={job} key={job.id}/>)
        }
      </tbody>
    </table>
 );
}
export default Form;