import React, { createContext, useContext } from 'react'
import axios from 'axios';

let defaultValue: any

export const HTTPContext = createContext<any>(defaultValue);

const baseUrl = 'https://api.github.com/search/repositories?q=';

export const HTTPProvider = ({children}: any) => {
    const token = process.env.GIT_TOKEN || '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';

    const getRepositoriesByTopic = async ({topic, perPage = 10, page = 1, sort=''}: {topic: string, perPage: number, page: number, sort: string}) => {
        const axiosOptions = {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }}
        const response = await axios.get(`${baseUrl}topic:${topic}&per_page=${perPage}&page=${page}&sort=${sort}`, axiosOptions)
        return response.data;
    }
    
    const getMultipleRepositoriesByTopic = async ({topics, perPage = 10, page = 1}: {topics: Array<string>, perPage: number, page: number}) => {
        const axiosOptions = {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }}
        const requests = topics.map((topic: any)=>axios.get(`${baseUrl}topic:${topic.name}&per_page=${perPage}&page=${page}`, axiosOptions))
        const result = await axios.all(requests);
        return result;
    }
    
    const requests = {
        getRepositoriesByTopic,
        getMultipleRepositoriesByTopic
    }

    return (
        <HTTPContext.Provider value={{requests}}>
            {children}
        </HTTPContext.Provider>
    )
}

export const HttpRequests = () => {
    return useContext(HTTPContext);
}
