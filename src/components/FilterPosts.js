import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap';

class FilterPosts extends Component {

  render () {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="filter-field" className="mr-sm-2">Filter by title:</Label>
          <Input type="text" name="email" id="filter-field" onChange={ (e) => this.props.filter(e.target.value)}/>
        </FormGroup>
      </Form>
    )
  }
}

export default FilterPosts