import { useState } from "react";

export default function useApi (apiFunc: any) {
    const [data, setData] = useState<SummaryResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const request = async (...args: any) => {
        // setting the loading state to true
        setLoading(true);


        // fetching data
        const response = await apiFunc(...args);

        
        // setting the loading state to false 
        setLoading(false);
        

        // conditionnaly checking response for errors
        if(!response.ok) return setError(true);

        
        // else
        setError(false);
        setData(response.data);
  
        

    }


    return {
        data,
        error,
        loading,
        request, 
    }
}
