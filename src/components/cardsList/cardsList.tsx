import React, {useEffect, useState} from 'react';
import { Card, CardMedia } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export function CardsList({t, topicIndex, cardList, title, handleCreateBookmark, handleRemoveBookmark, sort=false}: any) {
    
    return (
    <div className='cardContainerWrapper'>
        <div className='cardListTitle'>{title}</div>
        {cardList && cardList.repos && cardList.repos.map((rep: any, index: any) => {

            return (
            <Card key={index} className='cardWrapper' sx={{ minWidth: 345, width: 345 }}>
                {!rep.markedAsBookmark && 
                    <StarBorderOutlinedIcon onClick={()=>handleCreateBookmark(topicIndex, index)} className='starFav' />
                }
                {rep.markedAsBookmark && 
                    <StarOutlinedIcon onClick={()=>handleRemoveBookmark(topicIndex, index)} className='starFav' />
                }
            <CardMedia
                sx={{ minHeight: 200, maxHeight: 200 }}
                image={`https://opengraph.githubassets.com/123abc/${rep.owner.login}/${rep.name}`}
                title="green iguana"
            />
            </Card>
        )
        })
        }
    </div>
    )
}
