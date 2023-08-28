class Announcement {
  constructor(model, encapsulatedUser) {
    this._id = model._id;
    (this.title = model.title), (this.author = encapsulatedUser);
    this.content = model.content;
    this.photo_img_links = model.photo_img_links;
  }
}

export default Announcement;
