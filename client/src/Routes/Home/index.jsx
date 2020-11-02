
import React, { useState } from 'react';
import { Table, Tag, Input } from 'antd';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
const { Search } = Input;

const GET_BIKES = gql`
  {
    getBikeStatus {
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

const RenderBool = (isTrue) => {
  return (
    <>
      <Tag color={isTrue ? 'green' : 'volcano'}>
        {isTrue ? 'YES' : 'NO'}
      </Tag>
    </>
  )
}



const columns = [
  {
    dataIndex: "bike_id", title: "Bike ID", key: "bike_id", render: (bikeId) => <Link to={`/bike/${bikeId}`}>{bikeId}</Link>,

  },
  { dataIndex: "lat", title: "Latitude", key: "lat" },
  { dataIndex: "lon", title: "Longitude", key: "lon" },
  { dataIndex: "is_disabled", title: "Is Disabled", key: "is_disabled", render: RenderBool },
  { dataIndex: "is_reserved", title: "Is Reserved", key: "is_reserved", render: RenderBool },
  { dataIndex: "vehicle_type", title: "Vehicle Type", key: "vehicle_type" },
]

const Home = () => {
  const [searchVal, setSearchVal] = useState('');
  const { loading, error, data } = useQuery(GET_BIKES);
  if (error) return `Error! ${error.message}`;

  const bikes = data?.getBikeStatus?.data?.bikes;

  return (
    <div>
      <Search placeholder="Search By ID" onSearch={setSearchVal} style={{ width: 200 }} />
      <br />
      <br />
      <Table dataSource={bikes?.filter(b => b.bike_id.toLocaleUpperCase().includes(searchVal))} columns={columns} loading={loading} />;
    </div>
  );
}

export default Home;