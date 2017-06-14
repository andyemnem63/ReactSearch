// Include React
import React from "react";

// Creating the Results component
class Results extends React.Component{
    // Here we render the function
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Results</h3>
                </div>
                <div className="panel-body text-center">
                    {this.url}
                  {/*Maps through the results array in the constructor*/}
                    {this.props.results.map((search, i) => {
                        return (
                            <p key={i}>
                                <a href={search.url} target="_blank">{search.head}</a>
                                <button onClick={this.props.getClicked} type="button btn-success">Save</button>
                            </p>
                        );
                    })}
                </div>
            </div>
        );
    }
};

// Export the component back for use in other files
export default Results;
