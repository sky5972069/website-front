import { gql } from '@apollo/client'

const BLOG_DETAILS = gql`
  fragment BlogDetails on Blog {
    title
    content
    user{
        nickname
    }
    date
    likes
}
`




export const ALL_BLOGS = gql`
    query {
        allBlogs  {
            ...BlogDetails
    }
}
${BLOG_DETAILS}
`

export const ADD_BLOG = gql`
    mutation addBlog($title:String!, $content:String) {
        addBlog(
            title: $title,
            content: $content,
        ) {
            title
            date
            content
            user{
                nickname
            }
        }
    }
`


export const SET_BIRTHDAY = gql`
    mutation editAuthor($name:String!, $setBornTo:Int!) {
        editAuthor(name:$name, setBornTo:$setBornTo) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation login($username:String!, $password:String!) {
        login(username:$username, password:$password) {
            value
        }
    }
`


export const SELECT_BOOKS = gql`
    query allBooks($author:String, $genre:String) {
        allBooks(author:$author, genre:$genre) {
            ...BlogDetails
        }
    }
${BLOG_DETAILS}
`

export const ME = gql`
    query me($username: String!) {
        me(username:$username) {
            username
            favouriteGenre
        }
    }
`


export const BLOG_ADDED = gql`
  subscription {
    blogAdded {
        ...BlogDetails
  }
}
${BLOG_DETAILS}
`