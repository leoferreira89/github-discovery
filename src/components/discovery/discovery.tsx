import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HttpRequests } from '../../services/http/requests';
import { CardsList } from '../cardsList/cardsList';
import { TopicsList } from '../topicsList/topicsList';

export function Discovery({t}:{t: any}) {
    const [viewTopicLists, setViewTopicLists] = useState<any>([]);
    const [cardList, setCardList] = useState<any>([]);
    const repositories = useRef<any>([]);
    const {requests} = HttpRequests();

    useEffect(()=> {
        repositories.current = [];
        getNewRepos();
    },[viewTopicLists])

    // Pode ser mais eficiente, em vez de pedir todos, pedir apenas um de cada vez;
    const getNewRepos = useCallback( async()=> {
        const result = await requests.getMultipleRepositoriesByTopic({topics: viewTopicLists})
        const newList = [] as any;
        if (result.length > 0) {
            result.forEach((element: any, index: any) => {
                const topic = element.data;
                newList.push({name: viewTopicLists[index].name, repos: topic?.items});
            });
            setCardList(newList);
        }
    }, [viewTopicLists, repositories])

    return (
        <div className='mainPageWrapper'>
            <CardsList t={t} title={t('bookmarks') || 'Bookmarks'} />
            <br/>
            <br/>
            <TopicsList t={t} topicsList={[]} setViewTopicLists={setViewTopicLists} />
            <br/>
            {cardList && cardList.map((repo: any) => {
                console.log("repo ======>", repo);
                
                return(
                    <>
                    <CardsList t={t} title={t(repo.name) || repo.name} cardList={repo}/>
                    </>
                )
            })}
        </div>
    )
}
