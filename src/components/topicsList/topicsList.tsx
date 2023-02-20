import React, {useCallback, useEffect, useState} from 'react';
import { Chip } from '@mui/material';

export function TopicsList({t, topicsList, setViewTopicLists, addTopic, removeTopic}: {t: any, topicsList: Array<any>, setViewTopicLists: Function, addTopic: Function, removeTopic: Function}) {
    const [list, setList] = useState<any>([]);

    useEffect(()=> {
        //TODO: replace with a list of real TOPICS from github {topicsList}
        setList(topicsList)
    }, [])

    const handleClick = useCallback((topic: any) => {
        const newViewTopicList = [] as any;
        const auxList = list.map((element: any) => {
            if (element.name === topic.name) {
                element.selected = !element.selected;
                if (element.selected) {
                    addTopic(topic.name)
                    newViewTopicList.push(element);
                } else {
                    removeTopic(topic.name);
                }
            }
            return element
        });
        setViewTopicLists(newViewTopicList)
        setList(auxList)
    }, [list])
    

    return (
        <div className='topicListContainerWrapper'>
            <div className='topicListTitle'>{t("toggleTopicsTitle")}</div>
            <div>
                {list && list.map((topic: any)=> {
                    return (
                        <>
                        <Chip className='chipWrapper' label={topic.name} variant={topic.selected ? "filled" : "outlined"} onClick={()=>handleClick(topic)}/>
                        </>
                    )
                })}
            </div>
        </div>
    )
}
