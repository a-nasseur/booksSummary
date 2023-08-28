import { create } from "apisauce";

const client = create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default client