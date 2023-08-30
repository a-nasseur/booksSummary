import { create } from "apisauce";

const client = create({
    baseURL: 'http://localhost:3000',
})

export default client