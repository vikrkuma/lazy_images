class ImageGetter {
  images = ['1.jpeg', '2.jpeg', '3.jpeg'];
  currentImageIndex = 0;

  next() {
    this.currentImageIndex = this.currentImageIndex % 3;
    return this.images[this.currentImageIndex++];
  }
}

const image = new ImageGetter();

function imageAdder(observer) {
  const div = document.createElement('div');
  const img = document.createElement('img');

  div.classList.add('img-placeholder');
  img.src = './placeholder-image.png';
  img.width = '318';
  img.height = '180';

  div.appendChild(img);
  observer.observe(div);
  document.querySelector('body').appendChild(div);
}


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      const img = entry.target.querySelector('img');
      img.src = image.next();
      imageAdder(observer);
    } else {
      entry.target.classList.remove('in-view');
    }
  });
});

function setObserver() {
  const elements = document.querySelectorAll('.img-placeholder');
  elements.forEach(element => {
    observer.observe(element);
  });
}
setObserver();
