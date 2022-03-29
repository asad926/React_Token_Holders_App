import React, { Component } from "react";
import DataGrid from 'react-data-grid';
import getTokenHolders from '../getTokenHolders';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class navBar extends Component {
  state = {
    columns : [{
        dataField: 'id',
        text: 'Rank'
      }, {
        dataField: 'holder',
        text: 'Holders'
      }, {
        dataField: 'amount',
        text: 'Quantity'
      }],
  holders:[]
  
  };

  componentDidMount=async()=>{ 
    let data = JSON.parse(localStorage.getItem("holders"))
    this.addKeys(data);
    console.log(data)
    this.setState({holders:data});
    let holders = await getTokenHolders();
    this.addKeys(holders);
    this.setState({holders:holders});
  }

  addKeys = (obj)=>{
    obj.forEach((h,i)=>{
        h["id"] = i+1;
 })
  }
  

  render() {
    return (
        <BootstrapTable keyField='id' data={ this.state.holders } columns={ this.state.columns } 
        striped
        hover
        condensed />
    );
  }
}

export default navBar;
