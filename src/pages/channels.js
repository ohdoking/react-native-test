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
  RefreshControl,
  Modal
} = React;

var UIExplorerPage = require('./../components/UIExplorerPage');

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var Channels = React.createClass({
  /*
    ListView.DataSource 는 data blobs 의 간단한 배열을 만들어준다.
    

   */
  getInitialState: function() {
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      refreshing: false,
      animationType: 'none',
      modalVisible: false,
      transparent: false
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

  /*
    List의 Item을 클릭하면 해당 리스트에 대한 정보를 다음 장면으로 넘겨주는 이벤트를 정의했다.

    this.props.navigator.push에 passProps로 다음 장면에 원하는 데이터를 전달해 줄 수 있다.
    renderScene에서 <Component route={route} navigator={navigator} {...route.passProps} />
    {...route.passProps}를 정의 해줘야 가능하다!

   */
  onListPress: function(movie) {    
    this.props.navigator.push({ 
      name: 'detail', 
      passProps: {movie},
    });

    ToastAndroid.show(movie.title + " // "+ movie.year, ToastAndroid.SHORT);
  },

  /*
    랜딩될 ListView의 Item 컴포넌트를 정의한다.

    Image 는 이미지 컴포넌트이다.
    source는 이미지를 가져올 경로인데 
    source={require('./img/check.png')} 와 같이 로컬에 있는 이미지를 가져오는 방법과
    source={{uri: movie.posters.thumbnail}} 와 같이 외부 cdn에 있는 이미지를 가져오는 방법이 있다.

   */
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

  renderListHeader: function(){
    return (
      <View style={{
        borderBottomWidth: 1,
        borderColor: "#465353",
        backgroundColor: "#565656"
      }}>
        <Text style={{
          fontSize: 20,
          marginBottom: 8,           
          }}>Movie List</Text>
      </View>
    );
  },
  /*
    state를 업데이터 시켜준다.
    
    Fetch

    Fetch 는 표준 Committe가 애쓰는 더 좋은  네트워크 API로 동작하는... ?
    (fetch is a better networking API being worked on by the standards committee)

    기본 사용법

    fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })

    비동기로 동작가능하고 promise 패턴을 사용가능하다.

    1. then과 catch 를 사용하여 비동기로 사용가능하다.
    2. ES7의 aysnc/ await 문법을 사용하여 사용 가능하다.

   */
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
  /*
    ListView가 로딩되기 전의 화면을 정의해준다.
   */
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },
  /*
    Refresh 이벤트 호출시에 이벤트를 발생시킨다.
   */
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
  /*
    ToolbarAndroid에 아이콘을 클릭했을때 이벤트가 정의되어 있다. 
   */
  onActionSelected: function(position) {
    // ToastAndroid.show("toolbar : " + position + "!", ToastAndroid.SHORT);
    this.props.navigator.push({ 
      name: 'webview'
    });   
  },

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },

  /*
    ListView 가 로딩이 다 안되었다면 로딩 화면을 보여주고 
    로딩이 다되면 ListView를 보여준다.

    UIExplorerPage
    
    ?
    
    ToolbarAndroid

    ToolbarAndroid는 Toolbar widget을 감싸고잇는 React 컴포넌트이다.
    ToolbarAndroid는 로고, 네비게이션 아이콘, 타이틀, 서브타이틀, 액션리스트를 보여주는 컴포넌트이다. 
    ToolbarAndroid는 오직 Android에서만 사용가능하다.
    actions는 action 메뉴의 부분에서 사용할 action을 설정하는 부분이다.
    사용법 : ( [{title: string, icon: optionalImageSource, show: enum('always', 'ifRoom', 'never'), showWithText: bool}])
    onActionSelected는 action 버튼이 클릭되었을때 위치를 파라미터로 호출되는 이벤트이다.


    ListView

    ListView는 변화화는 데이터 리스트의 세로 스크롤링 되도록 효과적으로 보여주도록 디자인된 핵심 컴포넌트이다.
    refreshControl는 RefreshControl 컴포넌트를 담을수 있다.
    dataSource는 리스트 뷰의 데이터이다.
    renderRow는 ListView의 각 아이템을 정의해놓은 컴포넌트를 불러온다.
    호출 되어지는 : ((rowData, sectionID, rowID, highlightRow) => renderable)

    RefreshControl

    RefreshControl는 내부에서 당겼을때 새로 고쳐지는 기능을 추가한 ScrollView나 ListView 사용할 수 있게하는 컴포넌트이다.
    refreshing는 리프레쉬가 됬는지 안됬는지 여부를 반환한다.
    onRefresh는 view가 refresh 될 때 불러주는 함수이다.

   */
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
            onActionSelected={(position) => {this.onActionSelected(position)}}/>          
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(null,this)}
              />
            }
            dataSource={this.state.dataSource}
            renderRow={this.renderMovie}
            renderHeader={this.renderListHeader}
            style={styles.listView}/>
      </UIExplorerPage>
    );
  }
});

/*
  Toolbar에 들어갈 action 버튼을 정의함
 */
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
