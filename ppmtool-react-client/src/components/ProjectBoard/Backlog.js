import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ProjectTask from './ProjectTasks/ProjectTask';
class Backlog extends Component {

    render() {
        const id = this.props.id;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {/* <ProjectTask /> */}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Backlog;