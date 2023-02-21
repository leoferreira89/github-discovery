import React from 'react';
import { Card, CardMedia } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//TODO: Falta paginação (infinite Scroll maby...)
export function CardsList({t, topicIndex, cardList, title, handleCreateBookmark, handleRemoveBookmark, requestTopicSorted, hasSort=true}: any) {
    const [open, setOpen] = React.useState<any>(null);

    const handleClick = (url: string) => {
        window.open(url,'_blank')
    }

    return (
    <>
        <div className='topicHeaderWrapper'>
        <div className='cardListTitle'>{title}</div>
        {hasSort && <div className='arrowWrapper' onClick={()=>setOpen(!open)}>
        <ExpandMoreIcon />
            {open && 
            <div className='popover'>
            {/* FIXME: Em vez de criar a lista hardcoded, deveria estar decalrado numa constante o tipo de sorts permitidos */}
            <Box sx={{ width: 250, maxWidth: 360, bgcolor: 'background.paper' }}>
                <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{requestTopicSorted(title, 'stars')}}>
                    {t("sortByStars") || "Sort by stars"}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{requestTopicSorted(title, 'forks')}}>
                    {t("sortByForks") || "Sort by forks"}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{requestTopicSorted(title, 'help-wanted-issues')}}>
                    {t("sortByHelpWanted") || "Sort by help wanted issues"}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={()=>{requestTopicSorted(title, 'updated')}}>
                    {t("sortByUpdated") || "Sort by updated"}
                    </ListItemButton>
                </ListItem>
                </List>
            </Box>
            </div>
            }
        </div>}
        </div>
        <div className='cardContainerWrapper'>
            {cardList && cardList.repos && cardList.repos.map((repo: any, index: any) => {

                return (
                <Card key={index} className='cardWrapper'  sx={{ minWidth: 345, width: 345 }}>
                    {!repo.markedAsBookmark && 
                        <StarBorderOutlinedIcon onClick={()=>{handleCreateBookmark(title, topicIndex, index)}} className='starFav' />
                    }
                    {repo.markedAsBookmark && 
                        <StarOutlinedIcon onClick={()=>handleRemoveBookmark(title, topicIndex, index, repo)} className='starFav' />
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
