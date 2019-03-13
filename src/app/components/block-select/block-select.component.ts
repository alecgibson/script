import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { BlockClass } from "../../quill/formats/block-class";
import { BlockService } from "../../services/block.service";

@Component({
  selector: 'app-block-select',
  templateUrl: './block-select.component.html',
  styleUrls: ['./block-select.component.scss'],
})
export class BlockSelectComponent implements OnInit, OnChanges {
  public blockTypes = Object.keys(BlockClass);
  public selectedBlockType: string;

  public constructor(public blockService: BlockService) {
    this.selectedBlockType = this.blockService.blockType;
  }

  public ngOnInit() {}

  public ngOnChanges(changes) {
    console.log('CHANGES');
    console.log(this.selectedBlockType);
    console.log(changes);
  }
}
