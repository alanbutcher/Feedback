import _ from 'lodash'; 
//SurveyForm shows a form a user to add input
import React, { Component } from 'react';
//redux form helper allows redux form to communicate with redux store
import { reduxForm, Field } from 'redux-form'; 
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => { //map over FIELDS, for every object, return custom Field
      return <Field key={ name } component={SurveyField}
        type="text"
        label={label}
        name={name}
      />
    }) 
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          < Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>  
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>  
      </div>
    );
  }
}

//validation 
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });


  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);