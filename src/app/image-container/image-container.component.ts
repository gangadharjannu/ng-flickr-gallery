import {
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
} from '@angular/core';
// TypeScript doesn't about cv so it complains about type. Inorder to prevent this we have to delcare a vriable of type any.
declare var cv: any;

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss'],
})
export class ImageContainerComponent implements OnInit {
  @Input() images;
  @Output() scrolled = new EventEmitter<boolean>();
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  show = false;
  ctx;
  title;
  postedDate;
  ownerName;

  ngOnInit(): void {
    // get the native element of canvas and store it in instance variable
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  /**
   * Reads the image directly from event.target instead of again download the image (Improvement).
   * detect the edges and render it on canvas along with image data in a modal window.
   *
   * @param event - Image click event
   * @param image - Image data received from API
   */
  detectEdge(event, image) {
    const src = cv.imread(event.target);
    const dst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    // You can try more different parameters
    cv.Canny(src, dst, 50, 100, 3, false);
    cv.imshow(this.canvas.nativeElement, dst);
    src.delete();
    dst.delete();
    this.title = image.title;
    this.postedDate = new Date(image.postedDate * 1000).toLocaleDateString();
    this.ownerName = image.ownerName;
    this.showModal();
  }

  closeModal() {
    this.show = false;
  }

  showModal() {
    this.show = true;
  }

  onScroll() {
    this.scrolled.emit();
  }

  trackByFn(index, item) {
    return item.id;
  }
}
