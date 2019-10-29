import React from 'react'

class NewPost extends React.Component {
  render() {
    return (
      <div className="new-post">
        <div className="row">

          <div className="col-2">
            <div className="nav flex-column nav-pills col" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a className="nav-link active" id="v-pills-post-tab" data-toggle="pill" href="#v-pills-post" role="tab"
                aria-controls="v-pills-post" aria-selected="true">Post</a>
              <a className="nav-link" id="v-pills-comments-tab" data-toggle="pill" href="#v-pills-comments" role="tab"
                aria-controls="v-pills-comments" aria-selected="false">Comment</a>
              <a className="nav-link" id="v-pills-beef-tab" data-toggle="pill" href="#v-pills-beef" role="tab"
                aria-controls="v-pills-beef" aria-selected="false">Beef Mode</a>
            </div>
          </div>


          <div className="col-10">
            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-post" role="tabpanel" aria-labelledby="v-pills-post-tab">

                <form className="row" action="/api/posts" id="np-submit" method="POST" encType="multipart/form-data">
                  <div className="col-9 new-post-inputs">
                    <input className="title-input" type="text" name="title" placeholder="Post Title:" required />
                    <textarea className="content-input" type="text" name="content" placeholder="Post Content:" required />
                  </div>
                  <div className="col-3 px-0">
                    <input className="d-none" type="file" name="file" />
                    <label htmlFor="file" className="btn-2"><i className="fas fa-camera"></i></label>
                    <button className="btn btn-light">Create Post</button>
                  </div>
                </form>

              </div>
              <div className="tab-pane fade" id="v-pills-comments" role="tabpanel" aria-labelledby="v-pills-comments-tab"></div>
              <div className="tab-pane fade" id="v-pills-beef" role="tabpanel" aria-labelledby="v-pills-beef-tab">...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewPost