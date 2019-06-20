import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";

class ProjectItem extends Component {

  onDeleteClick = id => {
    this.props.deleteProject(id);
  };

  render() {
    function convertMS( milliseconds ) {
      var day, hour, minute, seconds;
      seconds = Math.floor(milliseconds / 1000);
      minute = Math.floor(seconds / 60);
      seconds = seconds % 60;
      hour = Math.floor(minute / 60);
      minute = minute % 60;
      day = Math.floor(hour / 24);
      hour = hour % 24;
      return {
          day: day,
          hour: hour,
          minute: minute,
          seconds: seconds
      };
    }
    const { project } = this.props;

    const isUpdated = (
      <p>Updated at: <strong>{project.updated_At}</strong></p>
    );
    
    const notUpdated = (
      <p>This project was <strong>never updated</strong></p>
    );

    const isStartDate = (
      <p>{project.start_date}</p>
    );
    const notStartDate = (
      <p>Start date is not set</p>
    );
    
    const isEndDate = (
      <p>{project.end_date}</p>
    );

    const notEndDate = (
      <p>End date is not set</p>
    );

    const startEndDate = (
      <div className="container start-end-dates">
        <div className="row">
        <div className="col-6 start-date">
          <div>Start Date: </div>
          <div>{project.start_date ? isStartDate : notStartDate }</div>
        </div>
        <div className="col-6 end-date">
          <div>End date: </div>
          <div>{project.end_date ? isEndDate : notEndDate }</div>
        </div>
        </div>
      </div>
    );
    
    let overDueTag;
    let overDueFinalTime = '';
    
    const endDateTime = project.end_date;
    if (endDateTime) {
      const eDate = new Date(endDateTime);
      const dateNow = Date.now();
      if (dateNow > eDate) {
        const timeObj = convertMS(Math.abs(dateNow - eDate));
        overDueFinalTime = timeObj.day + " day" + ((timeObj.day>1)?'s':'') +" "+ timeObj.hour + " hour"+ ((timeObj.hour>1)?'s':'') + " " + timeObj.minute + " minute" +((timeObj.minute>1)?'s':'');

        const overDueMessage = (
          <div className="container over-due">
            <div>Warning! <i className="fw-400">Project timing has a delay of </i> {overDueFinalTime}</div>
          </div>
        );

        overDueTag = overDueMessage;

      }
    }



    let updatedField;
    if (project.updated_At) {
      updatedField = isUpdated;
    } else {
      updatedField = notUpdated;
    }

    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{project.projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{project.projectName}</h3>
              <p>{project.description}</p>
              <p>Created at: <strong>{project.created_At}</strong></p>
              {updatedField}
              {startEndDate}
              {overDueTag}
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered">Project Board </i>
                  </li>
                </Link>
                <Link to={`/updateProject/${project.projectIdentifier}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1">Update Project Info</i>
                  </li>
                </Link>
                <li className="list-group-item delete" onClick={this.onDeleteClick.bind(this, project.projectIdentifier)}>
                  <i className="fa fa-minus-circle">Delete Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteProject }
)(ProjectItem);
