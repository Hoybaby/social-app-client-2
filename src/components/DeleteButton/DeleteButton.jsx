import React, {useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks';

import {Button, Confirm, Icon, } from 'semantic-ui-react';

import {FETCH_POSTS_QUERY} from '../../util/graphql';

import MyPopup from '../../util/MyPopup';

function DeleteButton({postId, commentId,  callback}) {

    const [confirmOpen, setConfirmOpen] = useState(false);

    // if we want to delete a comment, if we have a commentId this means the button will know its on a comment instead of a post
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(cache) {
            // once we reach the update, we have confirmed the modal
            setConfirmOpen(false)
            // have to remove post from cache

            // this if statement, if we are deleting a comment we dont want to do the below function, if we do delete a post, we will not have a comment ID and everything will run fine
            if(!commentId) {
                const data = cache.readQuery({
                    query: FETCH_POSTS_QUERY,
                });
                data.getPosts = data.getPosts.filter(p=> p.id !== postId);
                cache.writeQuery({ query: FETCH_POSTS_QUERY, data})
            }
            // we might not always havea a callback so this if check makes sure everything works fine
            if(callback) callback();
        },
        variables: {
            postId,
            commentId
        }
    });


    return (
            <>
            <MyPopup 
                content={commentId ? 'Delete comment' : 'Delete post'}> 
                
                {/* the button is the children for the trigger on the other popup */}
                    <Button as="div" 
                        color="red" 
                        floated="right"
                        onClick={() => setConfirmOpen(true)}
                        >
                            <Icon name="trash" style ={{margin: 0}}/>
                    </Button>
                </MyPopup>
                
            <Confirm
                open={confirmOpen}
                onCancel={()=> setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
        

    )
    
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`

    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                username
                createdAt
                body  
            }
            commentCount
        }
    }

`
export default DeleteButton;