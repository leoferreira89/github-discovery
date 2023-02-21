import React, {useCallback, useEffect, useState} from 'react';
import { Chip } from '@mui/material';

export function TopicsList({t, topicsList, handleSetViewTopicLists, addTopic, removeTopic}: {t: any, topicsList: Array<any>, handleSetViewTopicLists: Function, addTopic: Function, removeTopic: Function}) {
    const [list, setList] = useState<any>([]);

    useEffect(()=> {
        //TODO: replace with a list of a TOPICS request from github
        setList(topicsList)
    }, [topicsList])

    const handleClick = useCallback((topic: any) => {
        const auxList = list.map((element: any) => {
            if (element.name === topic.name) {
                element.selected = !element.selected;
                if (element.selected) {
                    addTopic(topic.name)
                } else {
                    removeTopic(topic.name);
                }
            }
            return element
        });
        handleSetViewTopicLists(auxList)
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
