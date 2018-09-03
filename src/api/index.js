import axios from 'axios';

export default {
  data: {
    fetchData: param =>
      axios
        .get(`http://ergast.com/api/f1/drivers.json?limit=10&offset=${param}`)
        .then(res => res.data),
    fetchSchedule: param =>
      axios
        .get(`http://ergast.com/api/f1/drivers/${param}/circuits.json`)
        .then(res => res.data.MRData.CircuitTable)
  }
};
