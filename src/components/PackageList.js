import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { generateDependencyLinkList, searchFilter } from "../utils/UIUtils";



class PackageList extends Component {
  constructor() {
    super();
    this.state = {
      names: [],
      panels: {},
      panelsToShow: []
    };
  }

  generatePanel = (item, index) => {
    const linkList = generateDependencyLinkList(item, this.props.updateSearch);
    const linebreakedLinkList = linkList.map(s => <React.Fragment key={s.key}>{s}<br/></React.Fragment>);

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
              {linebreakedLinkList}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    );
  }

  generatePanelsList = () => {
    const packages = this.props.packages;
    let names = [];
    let panels = {};

    packages.forEach((item, index) => {
      let panel = this.generatePanel(item, index);
      names = names.concat(item.name);
      panels[item.name] = panel;
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

  render() {
    return (
      <div>
        {this.state.panelsToShow}
      </div>
    )
  }
}

export default PackageList;
