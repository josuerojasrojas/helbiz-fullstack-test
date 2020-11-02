const { runIfAuthenticated } = require("../../utils");
const fetch = require('node-fetch');
const { GBFS_API } = require('../../../constants/index');

async function getBikeStatus(args) {

  const fetchResp = await fetch(GBFS_API);
  const fetchData = await fetchResp.json();

  const { bikes } = fetchData.data;
  const { id } = args;
  if (id) {
    const singleBike = bikes.filter(b => b.bike_id === id);
    fetchData.data.bikes = [...singleBike];
  }

  return fetchData;
}

const Query = {
  getBikeStatus: (parent, args, context, info) => runIfAuthenticated(parent, args, context, info, () => getBikeStatus(args)),
};

module.exports = Query;
