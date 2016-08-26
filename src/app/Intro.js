import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
export default class HomePage extends Component {
  constructor (props) {
    super(props);
    this.props = props;
  }

  componentWillMount () {
    this.props.appBarTitle('Intro');
  }

  render () {
    var {stylesRoot} = this.props;
    return (
      <div style={stylesRoot}>
        <Card>
          <CardTitle title="Post Traumatic Stress" subtitle="A subtitle here" />
          <CardText>
            Post-traumatic stress is a common response to experiencing traumatic events.
            This program has been designed to provide a wide range of support for coping with post-traumatic stress.
            Take an assessment to get feedback on how you are doing or jump into the workshops to learn about how post-traumatic
            symptoms are triggered and what to do when this happens. Check out the videos of others who are dealing with
            post-traumatic stress, and explore the e-library for in-depth information.
          </CardText>
          <CardActions>
            <RaisedButton containerElement={<Link to="/main/home" />} primary={true} label="Get Started!" />
          </CardActions>
        </Card>
      </div>
    );
  }
}
