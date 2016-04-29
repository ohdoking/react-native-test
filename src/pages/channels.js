var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Component,
  Image,
  ListView,
  TouchableHighlight,
  ToastAndroid,
  ToolbarAndroid,
  UIExplorerPage,
  RefreshControl
} = React;

var UIExplorerPage = require('./../components/UIExplorerPage');

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';


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



var Channels = React.createClass({
  getInitialState: function() {
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      refreshing: false,
    };

    return this.state;

  },
  componentDidMount: function() {
    this.fetchData();

    /*var url = IntentAndroid.getInitialURL(url => {
      if (url) {
        console.log('Initial url is: ' + url);
      }
    });*/
  },
  renderMovie: function(movie) {
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
  },
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },
  onRefresh: function() {
    this.setState({refreshing: true});
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .then(() => {
      this.setState({refreshing: false});
    })
    .done();
  },

  render: function() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (      
      <UIExplorerPage
        title={this.props.navigator ? null : '<ListView>'}
        noSpacer={true}
        noScroll={true}>
          <ToolbarAndroid style={styles.toolbar}
            title={'Ohdoking ReactNative Test'}
            titleColor={'#FFFFFF'}/>
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            dataSource={this.state.dataSource}
            renderRow={this.renderMovie}
            style={styles.listView}/>
      </UIExplorerPage>
    );
  }
});

var styles = StyleSheet.create({
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
    /*paddingTop: 20,*/
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#FF6600'
  },
});

module.exports = Channels;
