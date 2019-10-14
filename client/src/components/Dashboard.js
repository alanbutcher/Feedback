import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
        <Link to="/surveys/new">
          <a class="waves-effect waves-light btn-large">New Survey</a> 
        </Link>
    </div>
    
  );
};

export default Dashboard;