import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HttpRequests } from '../../services/http/requests';
import { CardsList } from '../cardsList/cardsList';
import { TopicsList } from '../topicsList/topicsList';

export function Discovery({t}:{t: any}) {
    const [viewTopicLists, setViewTopicLists] = useState([]);
    const [cardList, setCardList] = useState<any>([]);
    const repositories = useRef<any>([]);
    const {requests} = HttpRequests();

    useEffect(()=> {
        repositories.current = [];
        console.log("viewTopicLists ==>", viewTopicLists);
        getNewRepos();
    },[viewTopicLists])

    const getNewRepos = useCallback( async()=> {
        const result = await requests.getMultipleRepositoriesByTopic({topics: viewTopicLists})
        console.log("result for resqueaa", result);
        const newList = [] as any;
        if (result.length > 0) {
            result.forEach((element: any) => {
                const topic = element.data;
                newList.push({name: topic.name, repos: topic?.items});
            });
            console.log("fazer set da list aqui");
            setCardList(newList);
        }
        
        // if (viewTopicLists.length > 0) {
        //      await viewTopicLists.forEach(async (topic: any) => {
        //         const {data} = await requests.getRepositoriesByTopic({topic: topic.name});
        //         console.log("aquiiii", data);
        //         repositories.current.push({name: topic.name, repos: data?.items});
        //     })
        //     console.log("repositories ==>", repositories.current);
        // }
    }, [viewTopicLists, repositories])

    return (
        <div className='mainPageWrapper'>
            <CardsList t={t} title={t('bookmarks') || 'Bookmarks'} />
            <br/>
            <br/>
            <TopicsList t={t} topicsList={[]} setViewTopicLists={setViewTopicLists} />
            <br/>
            {cardList && cardList.map((repo: any) => {
                return(
                    <>
                    <CardsList t={t} title={t(repo.name) || repo.name} cardList={repo}/>
                    </>
                )
            })}
        </div>
    )
}
