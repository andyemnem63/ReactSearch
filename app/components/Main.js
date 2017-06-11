// Include React
// var React = require("react");
import React from "react";

// Here we include all of the sub-components
// var Form = require("./children/Form");
// var Results = require("./children/Results");
// var History = require("./children/History");

import Form from "./children/Form";
import Results from "./children/Results";
import History from "./children/History";

// Helper for making AJAX requests to our API
// var helpers = require("./utils/helpers");
import helpers from "./utils/helpers";

// Creating the Main component
// var Main = React.createClass
class Main extends React.Component{

    // This is the equivalent of our "getInitialState"
    constructor(props){
        // This super(props) line lets us access our parents properties as props.
        super(props);

        this.state = {
            searchTerm: "",
            results: "",
            history: []
        };

        this.setTerm = this.setTerm.bind(this);
    }

    // The moment the page renders get the History
    componentDidMount() {
        // Get the latest history.
        helpers.getHistory().then(function (response) {
            console.log(response);
            if (response !== this.state.history) {
                console.log("History", response.data);
                this.setState({history: response.data});
            }
        }.bind(this));
    }

    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate(){

        // Run the query for the address
        helpers.runQuery(this.state.searchTerm).then(function (data) {
            if (data !== this.state.results) {
                console.log("Address", data);
                this.setState({results: data});

                // After we've received the result... then post the search term to our history.
                helpers.postHistory(this.state.searchTerm).then(function () {
                    console.log("Updated!");

                    // After we've done the post... then get the updated history
                    helpers.getHistory().then(function (response) {
                        console.log("Current History", response.data);

                        console.log("History", response.data);

                        this.setState({history: response.data});

                    }.bind(this));
                }.bind(this));
            }
        }.bind(this));
    }
    // This function allows childrens to update the parent.
    setTerm(term) {
        this.setState({searchTerm: term});
    }
    // Here we render the function
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <h2 className="text-center">Ny Time Article Scrubber</h2>
                        <p className="text-center">
                            <em>Search for article of interest</em>
                        </p>
                    </div>

                    <div className="col-md-6">

                        <Form setTerm={this.setTerm}/>

                    </div>

                    <div className="col-md-6">

                        <Results address={this.state.results}/>

                    </div>

                </div>

                <div className="row">

                    <History history={this.state.history}/>

                </div>

            </div>
        );
    }
};

// Export the component back for use in other files
export default Main;
