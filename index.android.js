/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
/*
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  ToastAndroid,
  View
} from 'react-native';


var MOCKED_MOVIES_DATA = [
  {
    title: 'Title',
    year: '2015',
    posters:
    {
      thumbnail: 'http://i.imgur.com/UePbdph.jpg'
    }
  },
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class ReactNativeTestProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();

    var url = IntentAndroid.getInitialURL(url => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    });
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    // var movie = this.state.movies[0];
    return (   
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderMovie}
      style={styles.listView}/>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <TouchableHighlight onPress={() => ToastAndroid.show(movie.title + " / "+ movie.year, ToastAndroid.SHORT)}>
        <View style={styles.container}>       
          <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail}/>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}!!!!</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
      </TouchableHighlight>
      
    );
  }

  pressRow(movie){
    
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 82,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },

});

AppRegistry.registerComponent('ReactNativeTestProject', () => ReactNativeTestProject);
*/

var React = require('react-native');

var {
  AppRegistry
} = React;

var Main = require('./src/main');


AppRegistry.registerComponent('OhdokingChat',() => Main);