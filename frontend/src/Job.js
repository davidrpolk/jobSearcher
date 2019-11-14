import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Job({ job }) {


  return (
    <Router>
      <tr>
        <td>
          <Link to={`/company/${job.id}`}>{job.company}</Link>      
        </td>
        <td>
          {job.role}
        </td>
        <td className="description">
          {job.description}
        </td>
        <td>
          <a href={job.link}>View Post</a>
        </td>
      </tr>
      {/* <Route path="/company/:companyId">
        <Company />
      </Route> */}
    </Router>
  );
}
export default Job;