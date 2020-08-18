import React, { Component } from 'react';
import './App.css';
import FileParser from './components/FileParser';
import PackageFileReader from './components/PackageFileReader';
import PackageList from './components/PackageList';
import PackageListFast from './components/PackageListFast';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor() {
    super();
    this.state = {
      packages: [],
      hidden: false,
      fast: true
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

  render() {
    let packageList;
    if (this.state.fast) {
      packageList = <PackageListFast packages={this.state.packages}/>;
    }
    else {
      packageList = <PackageList packages={this.state.packages}/>;
    }

    return (
      <div className="App">
        <h1 className="Header">GNU/Linux Package Navigation Utility :)</h1>
        <div style={{ display: this.state.hidden ? 'none' : '', }}>
          <label className="label" htmlFor="button" >
            <Button className="button" variant="contained" component="span" size="medium">File input
              <input color="primary" accept=".real" type="file" onChange={this.fileReaderHandler} id="button" style={{ display: 'none', }}/>
            </Button>
          </label>
          <label>
            Fast UI
            <input name="Fast" type="checkbox" checked={this.state.fast} onChange={this.checkboxHandler}/>
          </label>
        </div>
          {packageList}
      </div>
    );
  }
}

export default App;
