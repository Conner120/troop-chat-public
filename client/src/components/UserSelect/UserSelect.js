import React from 'react';
import React, { Component } from "react";
import { render } from "react-dom";
import { FormControl, FormGroup, FormLabel } from "material-ui";
import starWarsNames from "starwars-names";

import MultiChipSelect from "./MultiChipSelect";

class UserSelect extends React.Component {
  state = {
    items: [],
    selectedItem: []
  };

  handleChange = selectedItem => {
    if (this.state.selectedItem.includes(selectedItem)) {
      this.removeSelectedItem(selectedItem);
    } else {
      this.addSelectedItem(selectedItem);
    }
  };

  addSelectedItem(item) {
    this.setState(({ selectedItem, items }) => ({
      inputValue: "",3
      selectedItem: [...selectedItem, item],
      items: items.filter(i => i.name !== item)
    }));
  }

  removeSelectedItem = item => {
    this.setState(({ selectedItem, items }) => ({
      inputValue: "",
      selectedItem: selectedItem.filter(i => i !== item),
      items: [...items, { name: item, id: item.toLowerCase() }]
    }));
  };

  handleChangeInput = inputVal => {
    const t = inputVal.split(",");
    if (JSON.stringify(t) !== JSON.stringify(this.state.selectedItem)) {
      this.setState({ inputValue: inputVal });
    }
  };

  render() {
    const { selectedItem, items } = this.state;
    return (
      <FormGroup>
        <FormControl>
          <FormLabel>Find a Star Wars character</FormLabel>
          <MultiChipSelect
            onInputValueChange={this.handleChangeInput}
            inputValue={this.state.inputValue}
            availableItems={items}
            selectedItem={selectedItem}
            onChange={this.handleChange}
            onRemoveItem={this.removeSelectedItem}
          />
        </FormControl>
      </FormGroup>
    );
  }
}
