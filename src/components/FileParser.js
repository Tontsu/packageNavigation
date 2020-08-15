class FileParser{
  constructor(file) {
    this.file = file;
    this.packages = [];
  }

  parseFile = () => {
    let id = 0;
    let name = "";
    let description = "";
    let dependencies = [{
      link: "",
      fulldep:  ""
    }];

    for(let lineIndex = 0; lineIndex < this.file.length-1; lineIndex++) {
      const currentLine = this.file[lineIndex];

      if (currentLine.startsWith("Package: ")) {
        name = this.ignoreFirstWord(currentLine);
      }

      if (currentLine.startsWith("Description: ")) {
        description = this.parseDescription(this.file, currentLine, lineIndex);
      }

      if (currentLine.startsWith("Depends: ")) {
        dependencies = this.parseDependencies(currentLine);
      }

      if (currentLine.match("^$")) {
        this.packages.push({
          id: id,
          name: name,
          description: description,
          depends: dependencies
        });
        this.prepareVariables(id, dependencies);

      }
    }

    return this.packages;
  }

  prepareVariables = (id, dependencies) => {
    id++;
    dependencies = [{
      link: "",
      fulldep:  ""
    }];
  }

  parseDescription = (file, currentLine, lineIndex) => {
    let description = this.ignoreFirstWord(currentLine);
    let descLine = lineIndex;
    descLine++;

    while(file[descLine].startsWith(" ")) {
      description = description.concat("\n" + file[descLine]);
      descLine++;
    }

    return description;
  }

  parseDependencies = (currentLine) => {
    let dependencies = this.ignoreFirstWord(currentLine);
    dependencies = dependencies.split(/, |\| /);

    for(let i = 0; i < dependencies.length; i++){
      let link = dependencies[i];
      let fullDep = dependencies[i];

      if(dependencies[i].includes(" (")){
        link = dependencies[i].split(/ \((.+)/)[0];
        fullDep = dependencies[i];
      }

      let tempDep = {
        link: link,
        fulldep:  fullDep
      }
      dependencies[i] = tempDep;
    }
    return dependencies;
  }

  ignoreFirstWord = (currentLine) => {
    return currentLine.split(/: (.+)/)[1];
  }

}

export default FileParser
