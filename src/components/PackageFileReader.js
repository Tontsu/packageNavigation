class PackageFileReader {
  readFile = (file, callback) => {
    const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result.split('\n');

        callback(result);
      }

    reader.readAsText(file);
  }
}

export default PackageFileReader;
