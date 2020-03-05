import React, { Component } from 'react'
import gql from 'graphql-tag';
import {Query, graphql} from 'react-apollo';
import {Link} from 'react-router-dom';

const LAUNCH_QUERY = gql`
    query LaunchQuery ($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
      }
    }
  }
`;



class Launch extends Component {
    render() {
        let { params } = this.props.match;
        let { flight_number } = params
        flight_number = parseInt(flight_number);
        return (
          <React.Fragment>
            <Query query={LAUNCH_QUERY} variables={{
                flight_number: flight_number
            }}>
              {({ loading, error, data }) => {
                console.log("data ", data);
                if (loading) return <h4>Loading...</h4>;
                if (error) console.log(error);
                let { launch } = data;
                let { rocket } = launch;
                return (
                  <div>
                    <h1 className="display-4 my-3">
                      <span className="text-dark">Mission:</span>
                      {launch.mission_name}
                    </h1>
                    <h4 className="mb-3">Launch Details</h4>
                    <ul className="list-group">
                      <li className="list-group-item">
                        Flight Number: {launch.flight_number}
                      </li>
                      <li className="list-group-item">
                        Launch Year: {launch.launch_year}
                      </li>
                      <li className="list-group-item">
                        Launch Success:{" "}
                        {launch.launch_success ? (
                          <span className="text-success">Yes</span>
                        ) : (
                          <span className="text-danger">No</span>
                        )}
                      </li>
                    </ul>
                    <h4 className="my-3">Rocket Details</h4>
                    <ul className="list-group">
                      <li className="list-group-item">
                        Rocket ID: {rocket.rocket_id}
                      </li>
                      <li className="list-group-item">
                        Rocket Name: {rocket.rocket_name}
                      </li>
                      <li className="list-group-item">
                        Rocket Type: {rocket.__typename}
                      </li>
                    </ul>
                    <Link to="/" className="btn btn-secondary my-3">
                      Back
                    </Link>
                  </div>
                );
              }}
            </Query>

          </React.Fragment>
        );
    }
}

export default Launch;

// export default graphql(LAUNCH_QUERY, {
//   options: props => {
//     let { flight_number } = parseInt(props.match.params);
//     return {
//         variables: {
//             flight_number
//         }
//     }

//   }
// })(Launch);