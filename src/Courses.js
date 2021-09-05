import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Event from './Course';

const Courses = () => (
  <Query
    query={gql`
      {
          id 
          title
      }
    `}
  >
      {({loading, error, data}) => {
          if(loading) return <p>Loading...</p>
          if(error) return <p>Error</p>
          return data.id.map((e, i) => (
            <div className='card' id={e}>
                {data.title[i]}
            </div>
          ));
      }
      
      }
    {/* {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      console.log(data)
      if (error) return <p>Error :(</p>;
        return data.id.map((e) => (
            <Event event={e} ></Event>
        ));
    }} */}
  </Query>
);
export default Courses;