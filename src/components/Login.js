import React, { useState }  from 'react';
import { LOGIN } from '../query';
import { useMutation } from '@apollo/client';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const registerSchema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required().min(6),
  nickname: yup.string(),
});

const Register = ({ setLoginSwitch }) => {
  const registerSubmit = () => {
    setLoginSwitch('login')
  }
  return (
    <Col md={5}>
      <h3>注册</h3>
      <Formik
        validationSchema={registerSchema}
        onSubmit={registerSubmit}
        initialValues={{
          username: '',
          password: '',
          nickname: '',
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
          <Form.Label>用户名</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="..."
              name="username"
              value={values.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type='invalid' tooltip>{errors.username}</Form.Control.Feedback>
          </InputGroup>
          <Form.Label>昵称</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="..."
              name="nickname"
              value={values.nickname}
              onChange={handleChange}
              isInvalid={!!errors.nickname}
            />
            <Form.Control.Feedback type='invalid' tooltip>{errors.nickname}</Form.Control.Feedback>
          </InputGroup>
          <Form.Label>密码</Form.Label>
          <InputGroup>
            <Form.Control
              type="password"
              placeholder="..."
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid' tooltip>{errors.password}</Form.Control.Feedback>
          </InputGroup>
          <br/>
          <Button type="submit">提交</Button>
        </Form>
        )}
      </Formik>
    </Col>
  )
}



const Login = () => {
  const [loginSwitch, setLoginSwitch] = useState('login');
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
        console.log(error)
      }, 
  });
  const submit = (values) => {
    console.log(values);
    login({  variables: { username: values.username, password: values.password } });
    localStorage.setItem('user', values.username);
    console.log(localStorage.getItem('user'));
  };
  return (
    <div className='formDiv'>
    <Row>
    <Col>
      <img id='sanjiuLogin' src={require('../img/sanjiu.gif')} alt='welcome' />
    </Col>
    {
      loginSwitch === 'login'?
      ( <Col md={5}>
        <h3>登录</h3>
        <Formik
        validationSchema={loginSchema}
        onSubmit={submit}
        initialValues={{
          username: '219',
          password: '',
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
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="用户名.."
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type='invalid' tooltip>{errors.username}</Form.Control.Feedback>
            </InputGroup>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="密码.."
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            <br/>
            <Button type="submit">登录</Button>
            <Button type="button" onClick={()=>setLoginSwitch('register')}>注册</Button>
          </Form>
        )}
      </Formik>
      </Col>):
      <Register setLoginSwitch={setLoginSwitch}/>
    }
    
    <Col md={1}></Col>
    </Row>
    </div>
  )
  }
  






// const Login = ({ setToken, setPage, setUser }) => {
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [ login, result ] = useMutation(LOGIN, {
//         onError: (error) => {
//             console.log(error)
//           }, 
//     })

//     useEffect(() => {
//         if (result.data) {
//             const token = result.data.login.value
//             setToken(token)
//             localStorage.setItem('token', token)
//             setPage('authors')
//         }
//     },[result.data, setPage, setToken])

//     const submit = (e) => {
//         e.preventDefault()
//         login({  variables: { username, password } })
//         localStorage.setItem('user', username)
//         setUser(username)
//         console.log(localStorage.getItem('user'))
//         setUsername('')
//         setPassword('')
//     }
//     const schema = yup.object({
//         username: yup.string().required(),
//         password: yup.string().required(),
//       });


//     return (
//         <Formik
//             validationSchema={schema}
//             onSubmit={console.log}
//             initialValues={{
//             username: '',
//             password: '',
//             }}
//         >
//             {({       
//                 handleSubmit,
//                 handleChange,
//                 handleBlur,
//                 values,
//                 touched,
//                 isValid,
//                 errors,
//             }) => {
//                 console.log(values)
//                 console.log(errors)
//                 return(
//             <Form noValidate onSubmit={handleSubmit}>
//                 <Form.Group controlId="formBasicUsername">
//                     <Form.Label>name:</Form.Label>
//                     <Form.Control type="text" placeholder="用户名.." name="username"
//                     value={values.username} onChange = {handleChange}
//                     isInvalid={!!errors.username}/>
//                     <Form.Control.Feedback type="invalid">
//                         ?????
//                     </Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group controlId="formBasicPassword">
//                     <Form.Label>password:</Form.Label>
//                     <Form.Control type="password" placeholder="密码.." name="firstName"
//                     value={password} onChange = {({target}) => setPassword(target.value)}/>
//                 </Form.Group>
//                 <Button variant="primary" type="submit">login</Button>
//             </Form>)}}
//         </Formik>
//     )}


export default Login
