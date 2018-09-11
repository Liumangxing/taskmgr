import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>,
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    console.log(JSON.stringify(this.data));
  }

  onClick() {
    this.dialogRef.close('我接收到了你的消息');
  }

}
