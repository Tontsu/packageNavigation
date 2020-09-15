import React, { Component } from 'react';
import { Table, Segment, Grid } from "semantic-ui-react";
import { generateDependencyLinkList, searchFilter } from "../utils/UIUtils";

class PackageListFast extends Component {
  constructor() {
    super();
    this.state = {
      expandedRows: [],
      names: [],
      panels: {},
      panelsToShow: []
    };
  }

  handleRowClick = (rowId) => {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({
      expandedRows: newExpandedRows
    });
  }

  renderItemDetails = (item) => {
    const linkList = generateDependencyLinkList(item, this.props.updateSearch);
    const linebreakedLinkList = linkList.map(s => <React.Fragment key={s.key}>{s}<br/></React.Fragment>);
    return (
      <Segment basic>
        <Grid columns={1}>
          <Grid.Column className="Content">
            <span className="saveLineBreaks">{item.description}</span>
              <br/>
              {linebreakedLinkList}
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }

  renderItem = (item, index) => {
    const clickCallback = () => this.handleRowClick(index);
    const itemRows = [
      <Table.Row onClick={clickCallback} key={"row-data-" + index} id={"panel-" + item.name}>
        <Table.Cell className="Title">{item.name}</Table.Cell>
      </Table.Row>
    ];

    if (this.state.expandedRows.includes(index)) {
      itemRows.push(
        <Table.Row key={"row-expanded-" + index}>
          <Table.Cell colSpan="4">{this.renderItemDetails(item)}</Table.Cell>
        </Table.Row>
      );
    }

    return itemRows;
  }

  generatePanelsList = () => {
    const packages = this.props.packages;
    let names = [];
    let panels = {};

    packages.forEach((item, index) => {
      const itemRows = this.renderItem(item, index);
      names = names.concat(item.name);
      panels[item.name] = itemRows;
    });
    return [names, panels];
  }

  componentDidUpdate = (prevProps) => {
    const differentPackages = this.props.packages !== prevProps.packages;
    const differentSearch = this.props.search !== prevProps.search;
    if(differentPackages) {
      const values = this.generatePanelsList();
      this.setState({
        names: values[0],
        panels: values[1],
        panelsToShow: searchFilter(values[0], values[1], this.props.search)
      })
    }
    if(differentSearch) {
      let panelsToShow = searchFilter(this.state.names, this.state.panels, this.props.search);
      this.setState({
        panelsToShow: panelsToShow
      })
    }
  }

  render () {
    return (
      <div>
        <Table selectable className="Table">
          <Table.Header>
          </Table.Header>
          <Table.Body className="Item">{this.state.panelsToShow}</Table.Body>
        </Table>
      </div>
    )
  }
}

export default PackageListFast;
