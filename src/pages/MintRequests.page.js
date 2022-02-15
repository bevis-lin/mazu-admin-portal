import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Image, Button, Divider } from 'semantic-ui-react';
import { useAuth } from '../providers/AuthProvider';
const baseURL = '/api/mint/requests';
const baseURLApprove = '/api/mint/requests/approve';

export default function MintRequests() {
  const [mintRequests, setMintRequests] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    console.log('in the mint requests');

    axios.get(baseURL).then((response) => {
      setMintRequests(response.data);
    });
  }, []);

  const approveMintRequest = (requestId) => {
    alert(requestId);
    var formData = new FormData();
    formData.append('requestId', requestId);

    axios
      .post(baseURLApprove, formData, {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert('transaction sent');
      });
  };

  if (!mintRequests) return <div>Loading...</div>;

  return (
    <div>
      <Divider hidden />
      <Divider hidden />
      <Table celled inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Total Supply</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Minted</Table.HeaderCell>
            <Table.HeaderCell>Mint</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {mintRequests.map((request, index) => (
            <Table.Row key={index}>
              <Table.Cell>{request.requestId}</Table.Cell>
              <Table.Cell>{request.template.name}</Table.Cell>
              <Table.Cell>{request.template.totalSupply}</Table.Cell>
              <Table.Cell>{request.template.description}</Table.Cell>
              <Table.Cell>
                <Image
                  src={request.template.imageUrl}
                  size="tiny"
                  onClick={() => window.open(request.template.imageUrl)}
                />
              </Table.Cell>
              <Table.Cell>{request.template.totalMinted}</Table.Cell>
              <Table.Cell>
                {request.completed ? (
                  'Approved'
                ) : (
                  <Button
                    disabled={request.completed}
                    onClick={() => approveMintRequest(request.requestId)}
                  >
                    Approve
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
