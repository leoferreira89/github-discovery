import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HttpRequests } from '../../services/http/requests';
import { CardsList } from '../cardsList/cardsList';
import { TopicsList } from '../topicsList/topicsList';

export function Discovery({t}:{t: any}) {
    const [viewTopicLists, setViewTopicLists] = useState<Array<any>>([{name: 'Javascript', selected: true},{name: 'Typescript', selected: false},{name: 'Vue', selected: false},{name: 'React', selected: false},{name: 'Angular', selected: false},{name: 'CSS', selected: false},{name: 'Node', selected: false}]);
    const [cardList, setCardList] = useState<any>([]);
    const [bookmarks, setBookmarks] = useState<any>({name: 'bookmarks', repos: []});
    const {requests} = HttpRequests();

    useEffect(()=> {
        if (viewTopicLists.length>0) {
            getNewRepos();
        } else {
            setCardList([])
        }
    },[])

    const addTopic = useCallback(async(topic: string)=> {
        const result = await requests.getRepositoriesByTopic({topic});
        const items = checkBookmarks(result.items)
        const newCardList = [{name: topic, repos: items}] as any;
        setCardList((prevState: any)=>[...prevState, ...newCardList]);
    },[cardList])
    
    const removeTopic = useCallback(async(topic: string)=> {
        setCardList((prevState: any)=>{
            let removeIndex=0;
            prevState.forEach((element: any, index: number) => {
                if (element.name === topic) {
                    removeIndex = index;
                }
            });
            prevState.splice(removeIndex, 1);
            return[...prevState]
        }
        );
    },[cardList])


    /**
     * Check if there are bookmarks in localstorage. If so, set them to list to be shown
     */
    useEffect(() => {
        const localStoreAux = localStorage.getItem("github-discovery-bookmarks");
        if (localStoreAux) {
            const localBookmarks = JSON.parse(localStoreAux) as Array<any>;
            setBookmarks({name: 'bookmarks', repos: localBookmarks})
        }
    }, [])

    const requestTopicSorted = useCallback(async(topic: string, sort: string) => {
        const result = await requests.getRepositoriesByTopic({topic, sort});
        const items = checkBookmarks(result.items)
        setCardList((prevState: any)=> {
            prevState.forEach((element: any) => {
                if (element.name === topic) {
                    element.repos = items
                }
            });
            return[...prevState]
        })
    },[cardList])

    /**
     * Get in batch
     */
    const getNewRepos = useCallback( async()=> {
        const requestList = viewTopicLists.filter((elem: any) => {
            if (elem.selected){
                return elem
            }
        })
        const result = await requests.getMultipleRepositoriesByTopic({topics: requestList})
        const newList = [] as any;
        if (result.length > 0) {
            result.forEach((element: any, index: any) => {
                const topic = element.data;
                const repos = checkBookmarks(topic?.items)
                newList.push({name: viewTopicLists[index].name, repos: repos});
            });
            setCardList(newList);
        }
    }, [viewTopicLists])

    /** 
     * Check for localStorage bookmarks and creates list
     */
    const checkBookmarks = useCallback((repos: Array<any>) => {
        const localStoreAux = localStorage.getItem("github-discovery-bookmarks");
        if (localStoreAux) {
            const localBookmarks = JSON.parse(localStoreAux) as Array<any>;
            const newCardList = [...repos];
            newCardList.forEach((element: any) => {
                localBookmarks.forEach((bookm: any) => {
                    if (bookm.id === element.id) {
                        element.markedAsBookmark = true;
                    }
                })
            });
            return newCardList;
        } else {
            return repos
        }
    }, [])


    /**
     * Marks a repo as bookmark
     * @param topicIndex index of the topic in the array
     * @param repoIndex index of the repository inside the array
     */
    const handleCreateBookmark = (topicIndex: string, repoIndex: number) => {
        const newCardList = [...cardList] as any;
        newCardList[topicIndex].repos[repoIndex].markedAsBookmark = true;
        setCardList(newCardList);
        addLocalBookmark(newCardList[topicIndex].repos[repoIndex])
    }

    /**
     * Unmarks a repo as bookmark
     * @param topicIndex index of the topic in the array
     * @param repoIndex index of the repository inside the array
     */
    const handleRemoveBookmark = (topicIndex: string, repoIndex: number, repo: any) => {
        removeLocalBookmarks(repo)
        const newCardList = [...cardList] as any;
        if (newCardList[topicIndex]) {
            newCardList[topicIndex].repos[repoIndex].markedAsBookmark = false;
            setCardList(newCardList);
        }
    }

    /**
     * Adds a repoId in the localStorage
     * @param repoId id of the repository
     */
    const addLocalBookmark = (repo: any) => {
        const localBookmarkRepo = {
            id: repo.id,
            name: repo.name,
            owner: {
                login: repo.owner.login
            },
            markedAsBookmark: true,
            html_url: repo.html_url
        }
        const localStoreAux = localStorage.getItem('github-discovery-bookmarks');
        let localBookmarks;
        const newBookmarkList = {...bookmarks};
        if (localStoreAux) {
            localBookmarks = JSON.parse(localStoreAux) as Array<any>;
            localBookmarks.push(localBookmarkRepo);
            localStorage.setItem("github-discovery-bookmarks", JSON.stringify(localBookmarks))
        } else {
            localBookmarks = [localBookmarkRepo]
            localStorage.setItem("github-discovery-bookmarks", JSON.stringify(localBookmarks))
        }
        newBookmarkList.repos.push(localBookmarkRepo);
        setBookmarks(newBookmarkList)
    }

    /**
     * Removes a repoId from the localStorage
     * @param repoId id of the repository
     */
    const removeLocalBookmarks = (repo: any) => {
        const localStoreAux = localStorage.getItem('github-discovery-bookmarks');
        let localBookmarks;
        const newBookmarkList = {...bookmarks};
        if (localStoreAux) {
            localBookmarks = JSON.parse(localStoreAux) as Array<any>;
            let index = -1;
            localBookmarks.forEach((elem: any, elemIndex)=> {
                if (elem.id === repo.id) {
                    index = elemIndex;
                }
            })
            if (index >= 0) {
                localBookmarks.splice(index, 1);
                newBookmarkList.repos.splice(index, 1);
                localStorage.setItem("github-discovery-bookmarks", JSON.stringify(localBookmarks))
                setBookmarks(newBookmarkList)
            }
        } else {
            return false
        }
    }


    return (
        <div className='mainPageWrapper'>
            <CardsList t={t} hasSort={false} title={t('bookmarks') || 'Bookmarks'} cardList={bookmarks} handleRemoveBookmark={handleRemoveBookmark}  />
            <br/>
            <br/>
            <TopicsList t={t} topicsList={viewTopicLists} setViewTopicLists={setViewTopicLists} addTopic={addTopic} removeTopic={removeTopic} />
            <br/>
            {cardList && cardList.map((repo: any, index: number) => {

                return(
                    <>
                    <CardsList
                        t={t}
                        topicIndex={index}
                        title={repo.name}
                        cardList={repo}
                        handleCreateBookmark={handleCreateBookmark}
                        handleRemoveBookmark={handleRemoveBookmark} 
                        requestTopicSorted={requestTopicSorted}
                        />
                    </>
                )
            })}
        </div>
    )
}
