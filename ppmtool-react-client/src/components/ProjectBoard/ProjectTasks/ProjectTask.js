import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProjectTask } from "../../../actions/backlogActions";
class ProjectTask extends Component {

    onDeleteClick = (backlog_id, id) => {
        this.props.deleteProjectTask(backlog_id, id);
    };

    render() {
        const { project_task } = this.props;

        /* Calculate the overdue */

        
        const endDateTime = project_task.dueDate;
        let overDueFinalTime = '';
        let overDueTag;
        if (endDateTime) {
            const eDate = new Date(endDateTime);
            const dateNow = Date.now();

            if (dateNow > eDate) {
              const timeObj = convertMS(Math.abs(dateNow - eDate));
              overDueFinalTime = timeObj.day + " day" + ((timeObj.day>1)?'s':'') +" "+ timeObj.hour + " hour"+ ((timeObj.hour>1)?'s':'') + " " + timeObj.minute + " minute" +((timeObj.minute>1)?'s':'');
      
              const overDueMessage = (
                <div className="container over-due overdue-project">
                  <div>Warning! <i className="fw-400">Task timing has a delay of </i> {overDueFinalTime}</div>
                </div>
              );
      
              overDueTag = overDueMessage;
      
            }
          }

        /* Set Priority String */
        let priorityString;
        let priorityClass;

        if (project_task.priority === 1) {
            priorityClass = "bg-danger text-light";
            priorityString = "HIGH";
        }
        if (project_task.priority === 2) {
            priorityClass = "bg-warning text-light";
            priorityString = "MEDIUM";
        }
        if (project_task.priority === 3) {
            priorityClass = "bg-info text-light";
            priorityString = "LOW";
        }
    
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

        

        return (
            <div>
                <div className="card mb-1 bg-light project-task">
                    <div className={`card-header text-primary ${priorityClass}`}>
                        <table>
                            <tbody>
                            <tr>
                            <td>Task name:</td> 
                            <td><strong>{project_task.summary}</strong><br /></td>
                            </tr>
                            <tr>
                            <td>Priority:</td> 
                            <td><strong>{priorityString}</strong><br /></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-body bg-light">
                        <h5 className="card-title">Task description: </h5>
                        <p className="card-text text-truncate ">
                            {project_task.acceptanceCriteria}
                        </p>
                        <h5 className="card-title">Task details: </h5>
                        <p className="start-date"><strong>Due date: {project_task.dueDate}</strong></p>
                        {overDueTag}
                        <Link to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`} className="btn btn-light">
                            View / Update
                        </Link>
                        <button className="btn btn-danger ml-4" onClick={this.onDeleteClick.bind(this, project_task.projectIdentifier, project_task.projectSequence)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div >
        )
    }
}

export default connect(
    null,
    { deleteProjectTask }
)(ProjectTask);

