import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, useHistory
} from "react-router-dom";
import NavbarCom from './components/Navbar';
// import Buttons from './components/Buttons';
import Headline from './components/Headline';
// import EchartsTest from './components/Echarts';
import MainCharts from './components/MainCharts';
import { Container } from 'react-bootstrap';
import Collections from './components/Collections';
import TransAmap from './components/TransAmap';
import PowerCharts from './components/PowerCharts';
import Forum from './components/Forum';
import Login from './components/Login';
import Blogs from './components/Blogs';
import BlogForm from './components/CreateBlog';
import { useSubscription, useApolloClient } from '@apollo/client';
import { ALL_BLOGS, BLOG_ADDED } from './query';
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import './css/index.css';
gsap.registerPlugin(CSSRulePlugin);


const Alien = () => {
  const history = useHistory();
  setTimeout(()=>{
    history.push('/');
  },5000);
  return(
  <div className='alienBody'>
    <p>Expel in 5 seconds!!</p>
    <div class="alien">
      </div>
  </div>
  )
};

function App() {
  
  const [ scrollTop, setScrollTop ] = useState(0)
  window.onscroll=()=>{
    setScrollTop(document.documentElement.scrollTop);
  }

//token  



//缓存处理
  const client = useApolloClient()
  const updateCacheWith = (addedBlog) => {
    const includedIn = (set, object) => 
      set.map(b => b.title).includes(object.title)  

    const dataInStore = client.readQuery({ query: ALL_BLOGS })
    if (!includedIn(dataInStore.allBlogs, addedBlog)) {
      console.log(dataInStore)
      client.writeQuery({
        query: ALL_BLOGS,
        data: {...dataInStore, allBlogs : dataInStore.allBlogs.concat(addedBlog) }
      })
    }   
  }

  useSubscription(BLOG_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBlog = subscriptionData.data.blogAdded;
      alert(`new book ${addedBlog.title} is added`);
      updateCacheWith(addedBlog);
    }
  })
  return (
    <>
    <Router>
      <NavbarCom />
      <Container>
        <Switch>
          <Route path="/hotpot">
            <Alien />
          </Route>
          <Route path="/forum">
            <Alien />
          </Route>
          <Route path="/blogs/createBlog">
            <BlogForm/>
          </Route>
          <Route path="/blogs">
            <Blogs/>
          </Route>
          <Route path="/data/power">
            <PowerCharts />
          </Route>
          <Route path="/data/transportation">
            <TransAmap />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Headline/>
            <MainCharts scrollTop={scrollTop}/>
            <Forum scrollTop={scrollTop}/>
            <Collections scrollTop={scrollTop}/>
          </Route>
        </Switch>
      </Container>
    </Router>
    </>
  );
}

export default App;
