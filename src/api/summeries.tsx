import client from "./client";

const url = 'api/summaries'


// Post api
const addSummary = (values: Summary) => client.post(url, values);

// Get api
const getSummaries = () => client.get(url);

// delete
const deleteSummary = (id: number) => client.delete(`${url}?id=${id}`)


export default { addSummary, getSummaries, deleteSummary }