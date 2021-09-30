
import React from 'react'
import {Form, Button} from 'semantic-ui-react';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks';

import {useForm} from '../../util/hooks';
import {FETCH_POSTS_QUERY} from '../../util/graphql';

function PostForm() {

    // this is pulling the already established features i created in the useForm from the hooks.
    const {values, onChange, onSubmit} = useForm(createPostCallback, {
        
        body: ''
    })

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {

        variables: values,
        update(cache, result) {
            const data = cache.readQuery({
                query: FETCH_POSTS_QUERY,
            });
            console.log(`in PostForm ${data}`);
            cache.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                getPosts: [result.data.createPost, ...data.getPosts],
                },
            });
            values.body = "";
        },
    });

    function createPostCallback(){
        createPost()
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
            <h2>Create a Post: </h2>
            <Form.Field>
                <Form.Input 
                    placeholder="Hi World!"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error={error ? true : false}
                    />
                <Button type="submit" color="teal">Submit</Button>

            </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{marginBottom: 20}}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </div>
        
    )
}

// this will handle the input of the body of a post into the databse
const CREATE_POST_MUTATION = gql`
    mutation createPost ($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`




export default PostForm