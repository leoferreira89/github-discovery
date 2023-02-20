import React from 'react';
import { Card, CardMedia } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export function CardsList({t, topicIndex, cardList, title, handleCreateBookmark, handleRemoveBookmark, sort=false}: any) {

    const handleClick = (url: string) => {
        window.open(url,'_blank')
    }

    return (
    <>
        <div className='cardListTitle'>{title}</div>
        <div className='cardContainerWrapper'>
            {cardList && cardList.repos && cardList.repos.map((repo: any, index: any) => {

                return (
                <Card key={index} className='cardWrapper'  sx={{ minWidth: 345, width: 345 }}>
                    {!repo.markedAsBookmark && 
                        <StarBorderOutlinedIcon onClick={()=>{handleCreateBookmark(topicIndex, index)}} className='starFav' />
                    }
                    {repo.markedAsBookmark && 
                        <StarOutlinedIcon onClick={()=>handleRemoveBookmark(topicIndex, index, repo)} className='starFav' />
                    }
                <CardMedia
                    onClick={(e)=>handleClick(repo.html_url)}
                    sx={{ minHeight: 200, maxHeight: 200 }}
                    image={`https://opengraph.githubassets.com/123abc/${repo.owner.login}/${repo.name}`}
                    title="Repository card"
                />
                </Card>
            )
            })
            }
        </div>
    </>
    )
}
