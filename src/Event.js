import './App.css';
import {React, Component} from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import './Event.css'
import { Card, CardTitle, CardBody, Container, Row, Col } from 'reactstrap';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {

  constructor(props) {
    super(props);

    // this.handleChange = this.handleChange.bind(this);
  }

  render(){

    document.body.style.backgroundColor = "#e0e0e0";
    const image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" //this.props.location.state.source

    return(
    <ApolloProvider client={client} className='container'>
      <Container>
        <Row>
          <Col sm='1' md='2' lg='3' xl='4'></Col>
          <Col sm='10' md='8' lg='6' xl='4'>
            <Card className="card-display" style={{textAlign: 'center'}}>
              <CardTitle>{this.props.location.state.title}</CardTitle>
              <CardBody id='inline'>
                <div id="inline">
                  <div>
                    <img class='img' src={image}/>
                  </div>
                  <br/>
                  <div>
                    {this.props.location.state.date}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col  sm='1' md='2' lg='3' xl='4'></Col>
        </Row>
      </Container>
    </ApolloProvider>)
  }
  
};

export default App;