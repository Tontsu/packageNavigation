import React, { Component } from 'react';
import { Table, Segment, Grid } from "semantic-ui-react";
import { generateDependencyLinkList } from "../utils/UIUtils";

class PackageListFast extends Component {
  constructor() {
    super();
    this.state = {
      expandedRows: []
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
    return (
      <Segment basic>
        <Grid columns={1}>
          <Grid.Column className="Content">
            <span className="saveLineBreaks">{item.description}</span>
              <br/>
              {linkList.map((item, key) => {
                return <span key={key}>{item}<br/></span>
              })}
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

  render () {
    let allItemRows = [];
    let filtered = this.props.packages.filter(pack => pack.name.startsWith(this.props.search));

    filtered.slice(0, 50).forEach((item, index) => {
      const itemRows = this.renderItem(item, index);
      allItemRows = allItemRows.concat(itemRows);
    });

    return (
      <div>
        <Table selectable className="Table">
          <Table.Header>
          </Table.Header>
          <Table.Body className="Item">{allItemRows}</Table.Body>
        </Table>
      </div>
    )
  }
}

export default PackageListFast;
