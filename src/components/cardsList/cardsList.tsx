import React, {useEffect, useState} from 'react';
import { Card, CardMedia } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

export function CardsList({t, cardList, title, sort=false}: any) {
    const [list, setList] = useState();

    useEffect(()=> {
        console.log("cardList ===>", cardList);
        setList(cardList)
    }, [cardList])
    
    return (
    <div className='cardContainerWrapper'>
        <div className='cardListTitle'>{title}</div>
        {cardList && cardList.repos.map((rep: any, index: any) => {
            return (
            <Card key={index} className='cardWrapper' sx={{ minWidth: 345, width: 345 }}>
                <StarBorderOutlinedIcon className='starFav' />
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
