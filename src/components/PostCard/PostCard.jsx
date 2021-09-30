import React, {useContext } from 'react';
import { Card, Icon, Label, Image} from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

import {Link} from 'react-router-dom';
import moment from 'moment';

// import 'semantic-ui-css/semantic.min.css';

import {AuthContext} from '../../context/auth'
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton'
import MyPopup from '../../util/MyPopup';

function PostCard({ 
    post: { body, createdAt, id, username, likeCount, commentCount, likes } 
}) {

    const {user} = useContext(AuthContext);

    const likePost =() => {
        console.log('Like Post')
    }

    return (
        <div>
            <Card fluid>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    />
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                    <Card.Description>
                        {body}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {/* buttons go here
                    <button>Testing</button> */}
                    <LikeButton post={{id, likes, likeCount}} user={user}/>
                <MyPopup 
                    content="Comment on Post"
                >
                    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                            <Button color='blue' basic>
                                <Icon name='comments' />
                                Comments
                            </Button>
                            <Label as='a' basic color='blue' pointing='left'>
                                {commentCount}
                            </Label>
                        </Button>
                </MyPopup>
                
                {/* so if we are logged in equals to the username of this poist, this is the owner, so we want to show a delete button */}
                {user && user.username === username && 
                    <DeleteButton postId={id}/>
                // (
                //     <Button as='div'  color="red" onClick={()=> console.log('Delete post') }>
                //         <Icon style ={{margin: 0}} name="trash"/>
                //     </Button>
                // )
    
                
                }
                </Card.Content>
            </Card>
    
        </div>
        
    )
}

export default PostCard;