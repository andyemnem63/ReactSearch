// Include React
import React from "react";

// Here we include all of the sub-components
import Form from "./children/Form";
import Results from "./children/Results";
import Saved from "./children/Saved";

// Helper for making AJAX requests to our API
import helpers from "./utils/helpers";

// Creating the Main component
class Main extends React.Component{

    // This is the equivalent of our "getInitialState"
    constructor(props){
        // This super(props) line lets us access our parents properties as props.
        super(props);

        this.state = {
            searchTerm: "",
            results: "",
            Saved: []
        };

        this.setTerm = this.setTerm.bind(this);
    }

    // The moment the page renders get the Saved
    componentDidMount() {
        // Get the latest Saved.
        helpers.getSaved().then(function (response) {
            console.log(response);
            if (response !== this.state.Saved) {
                console.log("Saved", response.data);
                this.setState({Saved: response.data});
            }
        }.bind(this));
    }

    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate(){

        // Run the query for the Search
        helpers.runQuery(this.state.searchTerm).then(function (data) {
            if (data !== this.state.results) {
                console.log("Search Data", data);
                this.setState({results: data});

                // After we've received the result... then post the search term to our Saved.
                helpers.postSaved(this.state.searchTerm).then(function () {
                    console.log("Updated!");

                    // After we've done the post... then get the updated Saved
                    helpers.getSaved().then(function (response) {
                        console.log("Current Saved", response.data);

                        console.log("Saved", response.data);

                        this.setState({Saved: response.data});

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

                        <Results results={this.state.results}/>

                    </div>

                </div>

                <div className="row">

                    <Saved Saved={this.state.Saved}/>

                </div>

            </div>
        );
    }
};

// Export the component back for use in other files
export default Main;
