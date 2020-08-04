import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

export const GET_USERS = gql`
  query GetUsers {
     users {
      _id
      name {
        first
        last
        middle
        prefix
        nick
      }
      address {
        line_1
        line_2
        zip_code
        city
        state
        country
      }
      friends {
        id
        name
      }
      hobbies
    }
  }
`;

export default (props) => {
  return (<Query query={GET_USERS}>
    {({ loading, data }) => !loading && (
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Address</th>
            <th>Friends</th>
            <th>Hobbies</th>
          </tr>

        </thead>
        <tbody>
          {data.users.map(user => (
            <tr key={user._id}>
              <td><input type="checkbox" name="name1" onClick={() => props.selectRow(user)}/></td>
              <td>{user.name.prefix+" "+user.name.first+" "+user.name.middle +" "+user.name.last}</td>
              <td>
              <address>
                <div>{user.address.line_1}</div>
                <div>{user.address.line_2}</div>
                <div>{user.address.zip_code}</div>
                <div>{user.address.city}</div>
                <div>{user.address.state}</div>
                <div>{user.address.country}</div>
              </address>
              </td>
              <td>
              {
                user.friends.map((friend,index) => <div key={index}>{friend.name}</div>)
              }
              </td>
              <td>{user.hobbies.map((hobbie,index) => <div key={index}>{hobbie}</div>)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </Query>
)};