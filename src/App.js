import React, { Component } from 'react';
import './App.css';
import FileParser from './components/FileParser';
import PackageFileReader from './components/PackageFileReader';
import PackageList from './components/PackageList';
import PackageListFast from './components/PackageListFast';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class App extends Component {
  constructor() {
    super();
    this.state = {
      packages: [],
      hidden: false,
      fast: true,
      search: ""
    };
  }

  fileReaderHandler = () => {
    const file = document.querySelector('input[type=file]').files[0];
    const packageFileReader = new PackageFileReader();
    packageFileReader.readFile(file, this.fileParserHandler);
  }

  fileParserHandler = (file) => {
    const fileParser = new FileParser(file);
    try {
      this.packageHandler(fileParser.parseFile());
    }
    catch {
      alert("Invalid file");
      window.location.reload(false);
    }

  }

  packageHandler = (packages) => {
    this.setState({
      packages: packages,
      hidden: true
    })
  }

  checkboxHandler = (input) => {
    this.setState({
      fast: input.target.checked
    })
  }

  searchHandler = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  updateSearch = (event) => {
    this.setState({
      search: event.target.id
    })
    console.log(event.target)
  }

  render() {
    let packageList;
    if (this.state.fast) {
      packageList = <PackageListFast packages={this.state.packages} search={this.state.search} updateSearch={this.updateSearch}/>;
    }
    else {
      packageList = <PackageList packages={this.state.packages} search={this.state.search} updateSearch={this.updateSearch}/>;
    }

    return (
      <div className="App">
        <h1 className="Header">GNU/Linux Package Navigation Utility :)</h1>
        <form className="SearchBox">
          <TextField id="standard-full-width" label="Search" onChange={this.searchHandler} variant="outlined" value={this.state.search} fullWidth />
        </form>
        <div style={{ display: this.state.hidden ? 'none' : '', }}>
          <label className="label" htmlFor="button" >
            <Button className="button" variant="contained" component="span" size="medium">File input
              <input color="primary" accept=".real" type="file" onChange={this.fileReaderHandler} id="button" style={{ display: 'none', }}/>
            </Button>
          </label>
          <label className="label">
            Fast UI
            <input className="label" name="Fast" type="checkbox" checked={this.state.fast} onChange={this.checkboxHandler}/>
          </label>
        </div>
          {packageList}
      </div>
    );
  }
}

export default App;
