import React from 'react';

function handleOpenPanel (event) {
  try {
    document.getElementById("panel-" + event.target.id).click();
  }
  catch {
    alert("No dep");
  }
};

export function generateDependencyLinkList(dependency) {
  let linkList = [];

  dependency.depends.forEach((dep, index) => {
    const depLink = <a key={"dep-" + index} id={dep.link} href={"#panel-" + dep.link}
    onClick={handleOpenPanel}>{dep.fulldep}</a>;
    linkList = linkList.concat(depLink);

  });
  
  return linkList;
};
