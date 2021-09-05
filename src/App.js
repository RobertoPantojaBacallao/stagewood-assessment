import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {React, Component} from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';

const client = new ApolloClient({
  uri: "/graphql"
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventList: '',
      Search: '',
      Sort: 0,
    }

    this.handleChange = this.handleChange.bind(this);
    this.returnEventList = this.returnEventList.bind(this);
  }

  componentDidMount(){
    this.setState({ eventList: this.returnEventList('') })
  }

  // Returns a list of events that matches the filter and automatically sorts
  returnEventList(filter = this.state.Search, sort = this.state.Sort){
    return <Query
                query={gql`
                  {
                      id 
                      title
                      startDate
                      source
                  }
                `}
              >
            {({loading, error, data}) => {
                if(loading) return <p>Loading...</p>
                if(error) return <p>Error</p>
                // sets ret to a list of events
                let ret = data.title.map(function(e,i){
                        if(e.toLowerCase().includes(filter.toLowerCase())){
                          return <Row title={e} id={data.id[i]} date={data.startDate[i]}> 
                          <Col sm='1' md='2' lg='4' xl='4'>&nbsp;</Col>
                          <Col sm='10' md='8' lg='4' xl='4'>
                            <Link className='link' to={{pathname:'/Event', state:{title: data.title[i], date: data.startDate[i], source: data.source[i]}}}>
                            <div className='event' >{e}</div>
                            </Link>
                            </Col>
                            <Col sm='1' md='2' lg='4' xl='4'>&nbsp;</Col>
                            </Row>
                        }
                      });

                // Sort ret depending on value of sort
                ret.sort(function(a,b) {
                    if(sort == 0){
                      return a.props.title.localeCompare(b.props.title)
                    } else if (sort == 1) {
                      return b.props.title.localeCompare(a.props.title)
                    } else if (sort == 2) {
                      return a.props.date.localeCompare(b.props.date)
                    } else {
                      return b.props.date.localeCompare(a.props.date)
                    }
                    
                })

                return ret;

              }
            }

          </Query>
  }

  // Updates state on change of Search or Sort
  handleChange(e){
    if(e.target.id == 'search')
      this.setState({Search: e.target.value}, () => {
        let list = this.returnEventList()
        this.setState({eventList: list})})
    else if(e.target.id == 'sort')
      this.setState({Sort: e.target.value}, () => {
        let list = this.returnEventList()
        this.setState({eventList: list})})

  }

  render(){

    document.body.style.backgroundColor = "#e0e0e0";

    return(<ApolloProvider className='container' client={client}>
      <div className="container">
        <form>
          <input id='search' type="text" onChange={this.handleChange}/>
          <label id='sort-label' for='sort'>Sort By</label>
          <select id='sort' onChange={this.handleChange}>
            <option value='0'>A - Z</option>
            <option value='1'>Z - A</option>
            <option value='2'>Date Asc</option>
            <option value='3'>Date Desc</option>
          </select>
        </form>
        <br/>
        <Container>
            {this.state.eventList}
        </Container>
      </div>
    </ApolloProvider>)
  }
  
};

export default App;
