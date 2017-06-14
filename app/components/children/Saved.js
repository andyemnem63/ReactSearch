// Include React
import React from "react";

// This is the History component. It will be used to show a log of  recent searches.
    class Saved extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Saved Articles</h3>
                </div>
                <div className="panel-body text-center">

                    {/* Here we use a map function to loop through an array in JSX */}
                    {this.props.Saved.map(function (search, i) {
                        return (
                            <div>
                                <a href={search.url} key={i}>{search.title} - {search.date}</a>
                                <button className="btn btn-danger">Delete</button>
                                <br/>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
};

export default Saved ;
