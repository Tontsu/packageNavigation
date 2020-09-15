import React from 'react';
import Button from '@material-ui/core/Button';

export function generateDependencyLinkList(dependency, updateSearch) {
  let linkList = [];
  dependency.depends.forEach((dep, index) => {
    const depLink = <Button key={"dep-" + index} color="primary" id={dep.link}
    onClick={updateSearch}>{dep.fulldep}</Button>;
    linkList = linkList.concat(depLink);
  });

  return linkList;
};

export function searchFilter(names, panels, searchString) {
  let panelsToShow = []

  let startsWith = names.filter(name => name.startsWith(searchString));
  let includes = names.filter(name => name.includes(searchString));
  let filtered = [...new Set([...startsWith, ...includes])].slice(0, 20);

  filtered.forEach((name) => {
    panelsToShow = panelsToShow.concat(panels[name]);
  });

  return panelsToShow;

}
