import React, { useCallback, useEffect, useState } from 'react';
import { HttpRequests } from '../../services/http/requests';
import { CardsList } from '../cardsList/cardsList';
import { TopicsList } from '../topicsList/topicsList';

const LOCALSTORAGE_FILTERS = 'github-discovery-topics'
const LOCALSTORAGE_BOOKMARKS = 'github-discovery-bookmarks'

export function Discovery({t}:{t: any}) {
    const [viewTopicLists, setViewTopicLists] = useState<Array<any>>([
        {name: 'Javascript', selected: true, activeSort: 'stars'},
        {name: 'Typescript', selected: true, activeSort: 'stars'},
        {name: 'Vue', selected: false, activeSort: 'stars'},
        {name: 'React', selected: false, activeSort: 'stars'},
        {name: 'Angular', selected: false, activeSort: 'stars'},
        {name: 'CSS', selected: false, activeSort: 'stars'},
        {name: 'Node', selected: false, activeSort: 'stars'}
    ]);
    const [cardList, setCardList] = useState<any>([]);
    const [bookmarks, setBookmarks] = useState<any>({name: 'bookmarks', repos: []});
    const {requests} = HttpRequests();

    useEffect(()=> {
        if (viewTopicLists.length>0) {
            checkLocalActiveFilters();
        } else {
            setCardList([])
        }
    },[])


    const handleSetViewTopicLists = useCallback((viewTopics: any) => {
        setViewTopicLists(viewTopics)
        localStorage.setItem(LOCALSTORAGE_FILTERS, JSON.stringify(viewTopics));
    },[viewTopicLists])

    const checkLocalActiveFilters = useCallback(() => {
        const auxLocalFilters = localStorage.getItem(LOCALSTORAGE_FILTERS);
        if (auxLocalFilters) {
            const localActiveFilters = JSON.parse(auxLocalFilters);
            setViewTopicLists(localActiveFilters);
            getNewRepos(localActiveFilters);
        } else {
            localStorage.setItem(LOCALSTORAGE_FILTERS, JSON.stringify(viewTopicLists))
            getNewRepos(viewTopicLists);
        }
    }, [viewTopicLists])

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
        const localStoreAux = localStorage.getItem(LOCALSTORAGE_BOOKMARKS);
        if (localStoreAux) {
            const localBookmarks = JSON.parse(localStoreAux) as Array<any>;
            setBookmarks({name: 'bookmarks', repos: localBookmarks})
        }
    }, [])

    const requestTopicSorted = useCallback(async(topic: string, sort: string) => {
        setViewTopicLists((prevState)=> {
            const auxList = prevState.map((element: any) => {
                if (element.name === topic) {
                    element.activeSort = sort;
                }
                return element
            });
            localStorage.setItem(LOCALSTORAGE_FILTERS, JSON.stringify(auxList))
            return auxList;
        });

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
    const getNewRepos = useCallback( async(filterList: any)=> {
        const requestList = filterList.filter((elem: any) => {
            if (elem.selected){
                return elem
            }
        })
        
        const result = await requests.getMultipleRepositoriesByTopic({topics: requestList})
        const newList = [] as any;
        if (result && result.length > 0) {
            result.forEach((element: any, index: any) => {
                const topic = element.data;
                const repos = checkBookmarks(topic?.items)
                newList.push({name: requestList[index].name, repos: repos});
            });
            setCardList(newList);
        }
    }, [viewTopicLists])

    /** 
     * Check for localStorage bookmarks and creates list
     */
    const checkBookmarks = useCallback((repos: Array<any>) => {
        const localStoreAux = localStorage.getItem(LOCALSTORAGE_BOOKMARKS);
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
    const handleCreateBookmark = (title: string, topicIndex: string, repoIndex: number) => {
        const newCardList = [...cardList] as any;
        newCardList[topicIndex].repos[repoIndex].markedAsBookmark = true;
        setCardList(newCardList);
        addLocalBookmark(title, newCardList[topicIndex].repos[repoIndex])
    }

    /**
     * Unmarks a repo as bookmark
     * @param topicIndex index of the topic in the array
     * @param repoIndex index of the repository inside the array
     */
    const handleRemoveBookmark = (topic: string, topicIndex: string, repoIndex: number, repo: any) => {
        removeLocalBookmarks(repo)
        const newCardList = [...cardList] as any;
        
        if (newCardList[topicIndex]) {
            newCardList[topicIndex].repos[repoIndex].markedAsBookmark = false;
            setCardList(newCardList);
        }

        // If removing start from bookmark, then tries to remove it also
        // from the original list
        if (repo.topicName) {
            setCardList((prevState: any)=> {
                prevState.map((topic: any) => {
                    if (topic.name === repo.topicName) {
                        topic.repos.forEach((element: any) => {
                            if (element.id === repo.id) {
                                element.markedAsBookmark = false;
                            }
                        });
                    }
                });
                return prevState;
            })
        }
    }

    /**
     * Adds a repoId in the localStorage
     * @param repoId id of the repository
     */
    const addLocalBookmark = (title: string, repo: any) => {
        const localBookmarkRepo = {
            id: repo.id,
            topicName: title,
            name: repo.name,
            owner: {
                login: repo.owner.login
            },
            markedAsBookmark: true,
            html_url: repo.html_url
        }
        const localStoreAux = localStorage.getItem(LOCALSTORAGE_BOOKMARKS);
        let localBookmarks;
        const newBookmarkList = {...bookmarks};
        if (localStoreAux) {
            localBookmarks = JSON.parse(localStoreAux) as Array<any>;
            localBookmarks.push(localBookmarkRepo);
            localStorage.setItem(LOCALSTORAGE_BOOKMARKS, JSON.stringify(localBookmarks))
        } else {
            localBookmarks = [localBookmarkRepo]
            localStorage.setItem(LOCALSTORAGE_BOOKMARKS, JSON.stringify(localBookmarks))
        }
        newBookmarkList.repos.push(localBookmarkRepo);
        setBookmarks(newBookmarkList)
    }

    /**
     * Removes a repoId from the localStorage
     * @param repoId id of the repository
     */
    const removeLocalBookmarks = (repo: any) => {
        const localStoreAux = localStorage.getItem(LOCALSTORAGE_BOOKMARKS);
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
                localStorage.setItem(LOCALSTORAGE_BOOKMARKS, JSON.stringify(localBookmarks))
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
            <TopicsList t={t} topicsList={viewTopicLists} handleSetViewTopicLists={handleSetViewTopicLists} addTopic={addTopic} removeTopic={removeTopic} />
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
