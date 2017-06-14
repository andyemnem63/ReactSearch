// Include React
import React from "react";

// This is the History component. It will be used to show a log of  recent searches.
    class History extends React.Component {
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
                            <p key={i}>{search.head} - {search.date} - {search.url}</p>
                        );
                    })}
                </div>
            </div>
        );
    }
};

export default History;
