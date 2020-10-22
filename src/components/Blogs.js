import React from 'react'
import { Icon, Label, Menu, Table, Rating, Checkbox, Header, Button } from 'semantic-ui-react'
import { ALL_BLOGS } from '../query';
import { useQuery } from '@apollo/client';
import 'semantic-ui-css/semantic.css';
import {
  useHistory
} from 'react-router-dom';

const defaultBlogs = [
  {
    title:'no data!',
    author:'617',
    date:'2020-01-01',
    likes:99999,
    content:'nothing here.'
  }
];


const ShowBlog = ({ blog, updateObject, deleteObject }) => {
  // const [visible, setVisible] = useState(false)

  // const blogStyle = {
  //   padding: 5,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }
  
  // const updateLike = () => {
  //   const newObject = {
  //     ...blog,
  //     likes: blog.likes+1
  //   }
  //   console.log(newObject)
  //   updateObject(newObject)
  // }

  // const removeBlog = () => {
  //   if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)){
  //     deleteObject(blog.id)
  //   }
  // }

  // const toggleVisibility = () => {
  //   setVisible(!visible)
  // }
  // const hideWhenVisible = { display: visible ? 'none' : '' }
  // const showWhenVisible = { display: visible ? '' : 'none' }
  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox toggle />
      </Table.Cell>
      <Table.Cell>{blog.title}</Table.Cell>
      <Table.Cell>{blog.date}</Table.Cell>
      <Table.Cell>{blog.likes}</Table.Cell>
      <Table.Cell>
          <Rating icon='star' defaultRating={3} maxRating={3} />
      </Table.Cell>
      <Table.Cell>
          <Header as='h4' image>
          <Icon.Group >
            <Icon circular inverted color='teal' name='user' />
          </Icon.Group>
            <Header.Content>
              617
              <Header.Subheader>Handsome admin</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
    </Table.Row> 

  )
}




const Blogs = ({ updateObject, deleteObject }) => {
  const history = useHistory();
  const result = useQuery(ALL_BLOGS, 
    //   {
    //   pollInterval: 2000
    // }
    )
  const createBlog = () => {
    history.push('/blogs/createBlog');
  }


  if(result.loading)  {
    return <div className='mainSection'><Icon loading name='spinner' /></div>;
  }

  if(!result.data) {
    result.data = {allBlogs: defaultBlogs};
  }
  let currentBlogs = [...result.data.allBlogs];
  return(
  <div className='tableDiv'>
  <Table compact celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell><Label ribbon>标记</Label></Table.HeaderCell>
        <Table.HeaderCell>标题</Table.HeaderCell>
        <Table.HeaderCell>日期</Table.HeaderCell>
        <Table.HeaderCell>赞</Table.HeaderCell>
        <Table.HeaderCell>评分</Table.HeaderCell>
        <Table.HeaderCell>作者</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {currentBlogs?
        (currentBlogs.sort((a,b)=> b.likes - a.likes).map(blog =>
        <ShowBlog key={blog.title} blog={blog} updateObject={updateObject} deleteObject={deleteObject}/>)):
        (null)}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='6'>
          <Button type='button' onClick={() => createBlog()}>新建</Button> 
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
  
  </div>
  )}

export default Blogs
