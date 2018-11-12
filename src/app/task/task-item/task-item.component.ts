import { Component, OnInit, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { itemAnim } from '../../anims/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Input() avatar;
  @Output() taskClick = new EventEmitter<void>();
  widerPrioity = 'out';
  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }


  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPrioity = 'in';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPrioity = 'out';
  }

  onItemClick(){
    this.taskClick.emit();
  }

  onCheckBoxClick(ev:Event){
    ev.stopPropagation();
  }

}
