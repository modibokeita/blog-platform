import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="home">
          <div className="posts">

              <div className="post" >
                <div className="img">
                  <img src="" />
                </div>
                <div className="content">
                  <Link className="link" to="">
                    <h1>Tilte</h1>
                  </Link>
                  <p>description</p>
                  <button>Read More</button>
                </div>
              </div>
          </div>
        </div>
      );
}

export default Home

