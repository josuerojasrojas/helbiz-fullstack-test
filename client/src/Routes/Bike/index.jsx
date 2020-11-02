import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  useParams
} from "react-router-dom";
import { Card, Tag } from 'antd';


const GET_BIKES = gql`
  query GET_BIKES($id: String!){
    getBikeStatus(id: $id) {
        data {
            bikes {
                bike_id
                lat
                lon
                is_disabled
                is_reserved
                vehicle_type
            }
        }
    }
  }
`

const RenderBool = (isTrue, text) => {
  return (
    <>
      <Tag color={isTrue ? 'green' : 'volcano'}>
        {isTrue ? 'Is ' : 'Is not '} {text}
      </Tag>
    </>
  )
}



const Bike = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BIKES, { variables: { id } });

  if (error) return `Error! ${error.message}`;
  if (loading) return 'loading...';

  const bikes = data?.getBikeStatus?.data?.bikes;

  if (!bikes.length) return <div>No Bike found with that id</div>
  const bikeData = bikes[0];

  return <div>
    <Card title={`${bikeData.bike_id} - ${bikeData.vehicle_type}`} style={{ width: 300 }}>
      {RenderBool(bikeData.is_disabled, 'disabled')}
      {RenderBool(bikeData.is_reserved, 'reserved')}
      <br></br>
      <br></br>
      <p>Located at: {bikeData.lat}, {bikeData.lon}</p>
    </Card>
  </div>;
}

export default Bike;