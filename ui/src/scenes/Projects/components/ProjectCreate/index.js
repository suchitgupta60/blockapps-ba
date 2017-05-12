import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import TextField from 'react-md/lib/TextFields';
import { reduxForm, Field } from 'redux-form';
import { projectCreate } from './actions/project-create.actions';

// TODO: make this  reusable
const renderTextField = ({ input, meta: { touched, error }, ...others }) => (
  <TextField {...input} {...others} error={touched && !!error} errorText={error} />
);
const renderDatePicker = ({ input, meta: { touched, error }, ...others }) => (
  <DatePicker {...others} error={touched && !!error} errorText={error} />
);

class ProjectCreate extends Component {

  submit = (values) => {
    // todo: validate fields?
    this.props.projectCreate(
      {
        name: values['projectName'],
        buyer: this.props.login['username'],
      }
    );
  };

  render() {
    const {handleSubmit} = this.props;

    return (
      <section>
        <div className="md-grid">
          <Card className="md-cell md-cell--12">
            <CardTitle
              title="New Project"
            />
            <CardText>
              <form onSubmit={handleSubmit(this.submit)}>
                <div className="md-grid">
                  <Field
                    id="projectName"
                    name="projectName"
                    type="text"
                    label="Short name"
                    required
                    maxLength={100}
                    className="md-cell--4"
                    component={renderTextField} />
                  <div className="md-cell--12" />
                  <Field
                    id="projectDescription"
                    name="projectDescription"
                    type="text"
                    label="Description"
                    className="md-cell--4"
                    component={renderTextField} />
                  <div className="md-cell--12" />
                  <Field
                    id="priceDesired"
                    name="priceDesired"
                    type="number"
                    label="Desired price"
                    min="0.01"
                    step="0.01"
                    className="md-cell--4"
                    component={renderTextField} />
                  <div className="md-cell--12" />
                  <Field
                    id="desiredDeliveryDate"
                    name="desiredDeliveryDate"
                    label="desiredDeliveryDate"
                    className="md-cell--4"
                    component={renderDatePicker}
                  />
                  <div className="md-cell--12" />
                  <Field
                    id="addressStreet"
                    name="addressStreet"
                    type="text"
                    label="Street"
                    className="md-cell--4"
                    component={renderTextField} />
                  <div className="md-cell--12" />
                  <Field
                    id="addressCity"
                    name="addressCity"
                    type="text"
                    label="City"
                    className="md-cell--4"
                    component={renderTextField} />
                  <div className="md-cell--12" />
                  <Field
                    id="addressState"
                    name="addressState"
                    type="text"
                    label="State"
                    maxLength={2}
                    className="md-cell--4"
                    component={renderTextField} />
                  <div className="md-cell--12" />
                  <Field
                    id="addressZip"
                    name="addressZip"
                    type="text"
                    label="Zip code"
                    maxLength={5}
                    className="md-cell--4"
                    component={renderTextField} />
                  <div className="md-cell--12" />
                  <Field
                    id="specification"
                    name="specification"
                    type="text"
                    label="Specification"
                    maxLength={1000}
                    rows={6}
                    className="md-cell--4"
                    component={renderTextField} />
                  <div className="md-cell--12" />
                  <div className="md-cell--12" />
                  <Button raised primary label="Create" type="submit" />
                </div>
              </form>
            </CardText>
          </Card>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project,
    login: state.login,
  };
}

const connected = connect(mapStateToProps, { projectCreate })(ProjectCreate);

const formedComponent = reduxForm({ form: 'project-create'})(connected);

export default formedComponent;