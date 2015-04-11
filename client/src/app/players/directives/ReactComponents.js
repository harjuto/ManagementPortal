angular.module('areas.players.components', [])

.factory("PlayerComponents", function() {
  var PlayerComponents = {};
  var self = PlayerComponents;

  PlayerComponents.Table = React.createClass({
    getInitialState: function() {
      return {
        filterText: '',
        showCount: 50
      };
    },
    handleFiltering: function(state) {
      this.setState({
        filterText: state.filterText,
        showCount: state.showCount
      });
    },

    render: function() {
      return ( < div className = "row" >
        < div className = "col-md-12" >
        < self.FilterBar tableState = {
          this.state
        }
        onFilterUpdate = {
          this.handleFiltering
        }
        /> < /div > < div className = "col-md-12" >
        < self.List players = {
          this.props.players
        }
        tableState = {
          this.state
        }
        onRowClick = {
          this.props.onRowClick
        }
        /> < /div > < /div>
      );
    }
  });
  PlayerComponents.List = React.createClass({
    render: function() {
      var rows = [];
      for (var i = 0; i < Math.min(this.props.tableState.showCount, this.props.players.length); i++) {
        var player = this.props.players[i];
        if (player.name.indexOf(this.props.tableState.filterText) === -1) {
          continue;
        }
        rows.push( < self.Row handleClick = {
            this.props.onRowClick
          }
          player = {
            player
          }
          key = {
            player.id
          }
          />);
        }
        return ( < table className = "table table-condensed" >
          < thead >
          < tr >
          < th > id < /th> < th > name < /th > < th > Date created < /th> < th > Last login < /th > < /tr> < /thead > < tbody > {
            rows
          } < /tbody> < /table >
        );
      }
    }); PlayerComponents.FilterBar = React.createClass({
      getInitialState: function() {
        return {
          filterText: '',
          showCount: 50
        };
      },
      updateParentState: function() {
        this.props.onFilterUpdate(this.state);
      },
      changeFilterText: function(text) {
        this.setState({
          filterText: text
        }, this.updateParentState);

      },
      changeShowCount: function(count) {
        this.setState({
          showCount: count
        }, this.updateParentState);

      },
      render: function() {
        return ( < form className = "form-inline" >
          < self.FilterTextInput text = {
            this.props.tableState.filterText
          }
          handleChange = {
            this.changeFilterText
          }
          /> < self.FilterShowCount count = {
          this.props.tableState.showCount
        }
        handleChange = {
          this.changeShowCount
        }
        /> < /form >
      )
    }
  });
  PlayerComponents.FilterTextInput = React.createClass({
    handleChange: function() {
      this.props.handleChange(
        this.refs.filterTextInput.getDOMNode().value
      );
    },
    render: function() {
      return ( < div className = "form-group" >
        < input type = "text"
        className = "form-control"
        placeholder = "Search..."
        name = "searchQuery"
        value = {
          this.props.filterText
        }
        ref = "filterTextInput"
        onChange = {
          this.handleChange
        }
        /> < /div >
      );
    }
  })

  PlayerComponents.FilterShowCount = React.createClass({
    handleChange: function() {
      this.props.handleChange(
        this.refs.showCountInput.getDOMNode().value
      );
    },
    render: function() {
      return ( < div className = "form-group" >
        < label
        for = "sel1" > Show count: < /label> < select className = "form-control"
        id = "sel1"
        onChange = {
          this.handleChange
        }
        ref = "showCountInput" >
        < option > 10 < /option> < option > 50 < /option > < option > 250 < /option> < option > 500 < /option > < /select> < /div >

      )
    }
  });

  PlayerComponents.Row = React.createClass({
    rowClicked: function() {
      this.props.handleClick(this.props.player.id)
    },
    render: function() {
      return ( < tr onClick = {
          this.rowClicked
        } >
        < td > {
          this.props.player.id
        } < /td> < td > {
        this.props.player.name
      } < /td> < td > {
      this.props.player.dateCreated
    } < /td> < td > {
    this.props.player.lastLogin
  } < /td> < /tr > );
}
});

return PlayerComponents;

});