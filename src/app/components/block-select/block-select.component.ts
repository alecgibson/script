import { Component, OnInit } from "@angular/core";
import { BlockClass } from "../../quill/formats/block-class";

@Component({
  selector: 'app-block-select',
  templateUrl: './block-select.component.html',
})
export class BlockSelectComponent implements OnInit {
  public blockTypes = Object.keys(BlockClass);

  public constructor() {}

  public ngOnInit() {
    // TODO: Add ngrepeat to HTML template and populate with BlockClass enum
    // TODO: Watch a new service that tracks the current selection type
  }
}
