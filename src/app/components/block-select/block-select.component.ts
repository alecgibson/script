import { Component, OnInit } from "@angular/core";
import { BlockClass } from "../../quill/formats/block-class";
import { BlockService } from "../../services/block.service";
import { QuillService } from "../../services/quill.service";

@Component({
  selector: 'app-block-select',
  templateUrl: './block-select.component.html',
  styleUrls: ['./block-select.component.scss'],
})
export class BlockSelectComponent implements OnInit {
  public blockTypes = Object.keys(BlockClass);
  public selectedBlockType: string;

  public constructor(
    public blockService: BlockService,
    public quillService: QuillService
  ) {
    this.blockService.blockType.subscribe((blockType: string) => {
      this.selectedBlockType = blockType;
    });
  }

  public ngOnInit() {}

  public updateBlockType() {
    this.blockService.setBlockType(this.selectedBlockType);
    this.quillService.focus();
  }
}
