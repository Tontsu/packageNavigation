import React from 'react';
import Button from '@material-ui/core/Button';

export function generateDependencyLinkList(dependency, updateSearch) {
  let linkList = [];

  dependency.depends.forEach((dep, index) => {
    const depLink = <a key={"dep-" + index} id={dep.link} href={"#panel-" + dep.link}
    onClick={updateSearch}>{dep.fulldep}</a>;
    linkList = linkList.concat(depLink);
  });

  return linkList;
};
