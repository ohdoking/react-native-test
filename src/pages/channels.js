var React = require('react-native');

var {
  View,
  Text,
  Button,
  StyleSheet,
  Component,
  Image,
  ListView,
  TouchableHighlight,
  ToastAndroid,
  ToolbarAndroid,
  UIExplorerPage,
  RefreshControl,
  Modal
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
      animationType: 'none',
      modalVisible: false,
      transparent: false,
      movie: {},
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

  onListPress: function(movie) {    
    this.props.navigator.push({ 
      name: 'detail', 
      passProps: {movie},
    });

    ToastAndroid.show(movie.title + " // "+ movie.year, ToastAndroid.SHORT);
  },

  renderMovie: function(movie) {
    return (
      <TouchableHighlight onPress={() => {this.onListPress(movie)}}>
        <View style={styles.container}>       
          <Image source={{uri: movie.posters.thumbnail}} style={styles.thumbnail}/>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}!!</Text>
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
        //custom add
          responseData.movies.push({
            id: "770795709",
            title: "kenny Oh",
            year: 1988,
            posters: {
              thumbnail: "http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default_thumb.gif"              
            }
          });

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

  onActionSelected: function(position) {
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title,
    });
    // ToastAndroid.show("toolbar : " + position + "!", ToastAndroid.SHORT);
    this.props.navigator.push({ 
      name: 'webView'
    });

    console.log("webView")

  },

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
            logo={require('./../img/app.png')}
            title={'Ohdoking ReactNative Test'}
            titleColor={'#FFFFFF'}
            actions={toolbarActions}
            onActionSelected={() => {this.onActionSelected}}/>          
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(null,this)}
              />
            }
            dataSource={this.state.dataSource}
            renderRow={this.renderMovie}
            style={styles.listView}/>
      </UIExplorerPage>
    );
  }
});

var toolbarActions = [
  {title: 'Settings', icon: require('./../img/app.png'), show: 'always'}
];

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
