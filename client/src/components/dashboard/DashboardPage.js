import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBoard, getBoard } from '../../actions';

import List       from './List'      ;
import Breadcrumb from './Breadcrumb';

class DashboardPage extends Component {
  state = {
    authenticated: false,
    loading: true,
    activePage: 'all-lists'
  };

  componentDidMount() {
    const { auth, lists } = this.props;
    let authenticated, loading;
    if (auth.authenticated) {
      authenticated = true;
      if (!auth.user.hasBoard) {
        // Go create board
        loading = true;
        this.props.createBoard(); 
      } else if (!lists.serverLists) {
        // Go get serverLists
        // TODO: GO GET SERVERLISTS
        loading = true;
        this.props.getBoard()
      } else {
        loading = false;
      }
    } else {
      // Just render clientLists
      authenticated = false;
    }
    this.setState({ authenticated, loading });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lists.serverLists) {
      this.setState({
        authenticated: true,
        loading: false,
        activePage: nextProps.navigation.page
      });
    }
  }

  renderLoading(lists) {
    // TODO: Make a Loading Screen
    return <div>Loading</div>
  }

  renderMain() {
    switch (this.state.activePage) {
      case 'all-lists':
        return this.renderLists();
      case 'in-progress':
        return this.renderProgress();
      case 'finished':
        return this.renderFinished();
      default:
        return this.renderLists();
    }
  }

  renderLists() {
    const lists = this.state.authenticated ? this.props.lists.serverLists : this.props.lists.clientLists;
    return lists.map((list, i) => {
      return <List key={i} list={list} />
    });
  }

  renderProgress() {
    const lists = this.state.authenticated ? this.props.lists.serverLists : this.props.lists.clientLists;
    return lists.map((list, i) => {
      if (list.progress > 0 && list.progress < 1) {
        return <List key={i} list={list} />
      }
      return null;
    });
  }

  renderFinished() {
    // QUESTION: Finished but progress != 1
    const lists = this.state.authenticated ? this.props.lists.serverLists : this.props.lists.clientLists;
    return lists.map((list, i) => {
      if (list.progress === 1) {
        return <List key={i} list={list} />
      }
      return null;
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="dashboard">
        <Breadcrumb visible={false} />
        <div className="dashboard__lists">
          { loading ? this.renderLoading() : this.renderMain() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth      : state.auth ,
    lists     : state.lists,
    navigation: state.navigation
  };
}

export default connect(mapStateToProps, { createBoard, getBoard })(DashboardPage);