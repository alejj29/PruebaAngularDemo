import { Component, OnInit, ViewChild } from '@angular/core';
import { usersListData } from './users-list.data';
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";

@Component({
  selector: 'app-corporativo',
  templateUrl: './corporativo.component.html',
  styleUrls: ['./corporativo.component.scss']
})
export class CorporativoComponent implements OnInit {

  token: string;
  currentUser: string;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  // row data
  public ColumnMode = ColumnMode;
  public rows = usersListData;
  public limitRef = 10;
  // private
  private tempData = [];
  // column header
  public columns = [
    { name: "CORPORATIVO", prop: "CORPORATIVO" },
    { name: "Username", prop: "Username" },
    { name: "Name", prop: "Name" },
    { name: "Last Activity", prop: "Last Activity" },
    { name: "Verified", prop: "Verified" },
    { name: "Role", prop: "Role" },
    { name: "Status", prop: "Status" },
    { name: "Actions", prop: "Actions" },
  ];
  constructor() { }

  ngOnInit() {
    this.token = localStorage.getItem('tokenscloud');
  }

  /**
 * filterUpdate
 *
 * @param event
 */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.Username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  /**
 * updateLimit
 *
 * @param limit
 */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }
}
