import React from 'react'
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";
import { ADD_BLOG } from '../query';
import { useMutation } from '@apollo/client';

const blogSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
});


const BlogForm = ({ createBlog }) => {
  const history = useHistory();
  const [ addBlog ] = useMutation(ADD_BLOG, {
    onError: (error) => {
      console.log(error)
    }, 
  });
  const submitNewBlog = (values) => {
    addBlog({  variables: { title:values.title, content:values.content } })
    history.push("/blogs");
  }

  const back = () => {
    history.push("/blogs");
  }

  return (
    <div className='formDiv'>
      <Row>
        <Col>
          <img id='breadLogin' src={require('../img/loadingbread.gif')} alt='welcome' />
        </Col>
      <Col md={5}>
        <h3>新建博客</h3>
        
        <Formik
          validationSchema={blogSchema}
          onSubmit={submitNewBlog}
          initialValues={{
            title: '',
            content: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Label>标题</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="..."
                name="title"
                value={values.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type='invalid' tooltip>{errors.title}</Form.Control.Feedback>
            </InputGroup>
            <Form.Label>内容</Form.Label>
            <InputGroup>
              
              <Form.Control
                as="textarea"
                rows='3'
                type="text"
                placeholder="..."
                name="content"
                value={values.content}
                onChange={handleChange}
                isInvalid={!!errors.content}
              />
              <Form.Control.Feedback type='invalid' tooltip>{errors.content}</Form.Control.Feedback>
            </InputGroup>
            <br/>
            <Button variant="outline-primary" type='submit'>提交</Button>
            <Button variant="outline-secondary" type='button' onClick={back}>返回</Button>
          </Form>)}
        </Formik>
        </Col>
        <Col md={1}></Col>
      </Row>
    </div>
  )
}


export default BlogForm
