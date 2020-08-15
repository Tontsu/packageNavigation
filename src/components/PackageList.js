import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { generateDependencyLinkList } from "../utils/UIUtils";



class PackageList extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  generatePanel = (item, index) => {
    const linkList = generateDependencyLinkList(item);

    return (
        <ExpansionPanel key={"panel-" + index} className="content">
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={index + "content"}
            id={"panel-" + item.name}
          >
            <Typography>{item.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className="saveLineBreaks">
              {item.description}
              <br/>
              {linkList.map((item, key) => {
                return <span key={key}>{item}<br/></span>
              })}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    );
  }

  render() {
    let allPanels = [];

    this.props.packages.forEach((item, index) => {
      const panel = this.generatePanel(item, index);
      allPanels = allPanels.concat(panel);
    });

    return (
      <div>
        {allPanels}
      </div>
    )
  }
}

export default PackageList;
